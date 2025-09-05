<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function show()
    {
        return Inertia::render('Registration');
    }

    public function register(Request $request)
    {
        // Debug: Log the request data
        Log::info('Registration request data:', $request->all());
        
        try {
            $validator = Validator::make($request->all(), [
                'email' => [
                    'required',
                    'string',
                    'email:rfc,dns',
                    'max:255',
                    'unique:users',
                    'regex:/^[^@]+@[^@]+\.[^@]+$/',
                ],
                'password' => 'required|string|min:8|confirmed',
            ]);

            if ($validator->fails()) {
                Log::error('Registration validation failed', ['errors' => $validator->errors()]);
                return back()->withErrors($validator)->withInput();
            }

            // Check if email was verified (this will be set by the frontend after verification)
            Log::info('Email verification check:', [
                'has_email_verified' => $request->has('email_verified'),
                'email_verified_value' => $request->email_verified,
                'email_verified_type' => gettype($request->email_verified)
            ]);
            
            if (!$request->has('email_verified') || !filter_var($request->email_verified, FILTER_VALIDATE_BOOLEAN)) {
                return back()->withErrors([
                    'error' => 'Email verification is required before registration.'
                ])->withInput();
            }

            $user = User::create([
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'email_verified_at' => now(), // Mark email as verified
            ]);

            // Set default name and shop title after user creation
            $user->update([
                'name' => 'mechapri' . $user->id,
                'shop_title' => 'mechapri' . $user->id . "'s shop"
            ]);

            auth()->login($user);
            Log::info('User registered successfully', ['user_id' => $user->id]);

            // Check if user is admin and redirect to dashboard
            if ($user->user_type === 'admin') {
                return redirect('/dashboard');
            }

            return redirect('/homelogin');
        } catch (\Exception $e) {
            Log::error('Registration failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return back()->withErrors([
                'error' => 'Registration failed. Please try again.'
            ])->withInput();
        }
    }
} 