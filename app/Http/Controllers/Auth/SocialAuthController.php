<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
             
            // Check if user exists by email
            $user = User::where('email', $googleUser->email)->first();
            
            if ($user) {
                // Update existing user with Google ID
                $user->update([
                    'google_id' => $googleUser->id,
                    'source' => 'google',
                ]);
            } else {
                // Create new user with Google OAuth data
                $user = User::create([
                    'email' => $googleUser->email,
                    'google_id' => $googleUser->id,
                    'name' => $googleUser->name,
                    'source' => 'google',
                    'email_verified_at' => now(), // Google users are pre-verified
                    'password' => bcrypt(Str::random(32)), // Generate random password for OAuth users
                ]);
            }

            Auth::login($user); 
            return redirect()->intended('/homelogin');
        } catch (\Exception $e) {
            Log::error('Google OAuth error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
            return redirect()->route('register')->with('error', 'Google authentication failed: ' . $e->getMessage());
        }
    }

    public function redirectToLine()
    {
        return Socialite::driver('line')->redirect();
    }

    public function handleLineCallback()
    {
        try {
            $lineUser = Socialite::driver('line')->user();
            
            Log::info('LINE OAuth callback', [
                'email' => $lineUser->email,
                'id' => $lineUser->id,
                'name' => $lineUser->name
            ]);
            
            // Handle case where LINE user might not have email
            $email = $lineUser->email;
            if (!$email) {
                // Generate a unique email based on LINE ID
                $email = 'line_' . $lineUser->id . '@line.local';
            }
            
            // Check if user exists by LINE ID first, then by email
            $user = User::where('line_id', $lineUser->id)->first();
            if (!$user && $email) {
                $user = User::where('email', $email)->first();
            }
            
            if ($user) {
                Log::info('Updating existing user', ['user_id' => $user->id]);
                // Update existing user with LINE ID
                $user->update([
                    'line_id' => $lineUser->id,
                    'source' => 'line', // Using 'line' for LINE
                    'email' => $email, // Update email if it was generated
                ]);
            } else {
                Log::info('Creating new user');
                // Create new user with LINE OAuth data
                $user = User::create([
                    'email' => $email,
                    'line_id' => $lineUser->id,
                    'name' => $lineUser->name,
                    'source' => 'line', // Using 'line' for LINE
                    'email_verified_at' => now(), // LINE users are pre-verified
                    'password' => bcrypt(Str::random(32)), // Generate random password for OAuth users
                ]);
                Log::info('New user created', ['user_id' => $user->id]);
            }

            Auth::login($user);
            Log::info('User logged in successfully', ['user_id' => $user->id]);
            return redirect()->intended('/homelogin');
        } catch (\Exception $e) {
            Log::error('LINE OAuth error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
            return redirect()->route('register')->with('error', 'LINE authentication failed: ' . $e->getMessage());
        }
    }
} 