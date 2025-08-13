<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Mail;
use Illuminate\View\View;
use Inertia\Inertia;
use App\Models\User;
use App\Mail\VerificationCodeMail;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): View
    {
        return view('profile.edit', [
            'user' => $request->user(),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validateWithBag('userDeletion', [
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    /**
     * Get user account settings data
     */
    public function getAccountSettings(Request $request)
    {
        $user = $request->user();
        
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'notification_settings' => [
                'notification_purchase' => $user->notification_purchase,
                'notification_relist' => $user->notification_relist,
                'notification_follow' => $user->notification_follow,
                'notification_new_item' => $user->notification_new_item,
                'notification_medi_panel' => $user->notification_medi_panel,
            ]
        ]);
    }

    /**
     * Update user account settings
     */
    public function updateAccountSettings(Request $request)
    {
        $user = auth()->user();
        
        $request->validate([
            'name' => 'required|string|max:20',
            'notification_settings' => 'required|array',
            'notification_settings.notification_purchase' => 'boolean',
            'notification_settings.notification_relist' => 'boolean',
            'notification_settings.notification_follow' => 'boolean',
            'notification_settings.notification_new_item' => 'boolean',
            'notification_settings.notification_medi_panel' => 'boolean',
        ]);

        try {
            $user->name = $request->name;
            $user->notification_purchase = $request->notification_settings['notification_purchase'];
            $user->notification_relist = $request->notification_settings['notification_relist'];
            $user->notification_follow = $request->notification_settings['notification_follow'];
            $user->notification_new_item = $request->notification_settings['notification_new_item'];
            $user->notification_medi_panel = $request->notification_settings['notification_medi_panel'];
            $user->save();

            return response()->json([
                'message' => 'Settings updated successfully',
                'user' => $user
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update settings',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function checkEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        try {
            $email = $request->email;
            $currentUser = auth()->user();
            
            // Check if email exists for any user other than the current user
            $existingUser = User::where('email', $email)
                               ->where('id', '!=', $currentUser->id)
                               ->first();

            return response()->json([
                'exists' => $existingUser !== null
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to check email',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        try {
            $user = auth()->user();
            $user->email = $request->email;
            $user->save();

            return response()->json([
                'message' => 'Email updated successfully',
                'email' => $user->email
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update email',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function sendVerificationCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        try {
            $email = $request->email;
            
            // Generate 6-digit code
            $code = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
            
            // Store code in session for verification (in production, use cache or database)
            session(['email_verification_code' => $code]);
            session(['email_verification_email' => $email]);
            
            // Set a shorter timeout for email sending
            $timeout = 15; // 15 seconds timeout
            
            // Send the verification email
            try {
                // Force new connection by clearing any existing connections
                Mail::purge('smtp');
                
                Mail::to($email)->send(new VerificationCodeMail($code));
                
                return response()->json([
                    'message' => 'Verification code sent successfully'
                ]);
            } catch (\Exception $mailException) {
                // Log the specific mail error
                \Log::error('Email sending failed: ' . $mailException->getMessage());
                
                // For development/testing, you can return the code directly
                if (app()->environment('local')) {
                    return response()->json([
                        'message' => 'Email sending failed, but here is your code for testing: ' . $code,
                        'code' => $code,
                        'error' => $mailException->getMessage()
                    ], 500);
                }
                
                return response()->json([
                    'message' => 'Failed to send verification code. Please try again later.',
                    'error' => 'Email service temporarily unavailable'
                ], 500);
            }
        } catch (\Exception $e) {
            \Log::error('Verification code generation failed: ' . $e->getMessage());
            
            return response()->json([
                'message' => 'Failed to send verification code',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function verifyEmailCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string|size:6'
        ]);

        try {
            $email = $request->email;
            $code = $request->code;
            
            // Get stored code from session
            $storedCode = session('email_verification_code');
            $storedEmail = session('email_verification_email');
            
            if ($storedCode && $storedEmail === $email && $storedCode === $code) {
                // Clear session
                session()->forget(['email_verification_code', 'email_verification_email']);
                
                return response()->json([
                    'verified' => true,
                    'message' => 'Code verified successfully'
                ]);
            } else {
                return response()->json([
                    'verified' => false,
                    'message' => 'Invalid verification code'
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to verify code',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
