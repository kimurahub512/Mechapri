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
            
            Log::info('Google OAuth callback', [
                'email' => $googleUser->email,
                'id' => $googleUser->id,
                'name' => $googleUser->name
            ]);
            
            // Check if user exists by email
            $user = User::where('email', $googleUser->email)->first();
            
            if ($user) {
                Log::info('Updating existing user', ['user_id' => $user->id]);
                // Update existing user with Google ID
                $user->update([
                    'google_id' => $googleUser->id,
                    'source' => 'google',
                ]);
            } else {
                Log::info('Creating new user');
                // Create new user with Google OAuth data
                $user = User::create([
                    'email' => $googleUser->email,
                    'google_id' => $googleUser->id,
                    'name' => $googleUser->name,
                    'source' => 'google',
                    'email_verified_at' => now(), // Google users are pre-verified
                    'password' => bcrypt(Str::random(32)), // Generate random password for OAuth users
                ]);
                Log::info('New user created', ['user_id' => $user->id]);
            }

            Auth::login($user);
            Log::info('User logged in successfully', ['user_id' => $user->id]);
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
            
            $user = User::updateOrCreate(
                ['email' => $lineUser->email],
                [
                    'email' => $lineUser->email,
                    'line_id' => $lineUser->id,
                ]
            );

            Auth::login($user);
            return redirect()->intended('/dashboard');
        } catch (\Exception $e) {
            return redirect()->route('login')->with('error', 'LINE authentication failed');
        }
    }
} 