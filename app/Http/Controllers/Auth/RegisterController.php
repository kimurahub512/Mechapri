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
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed',
            ]);

            if ($validator->fails()) {
                Log::error('Registration validation failed', ['errors' => $validator->errors()]);
                return back()->withErrors($validator)->withInput();
            }

            $user = User::create([
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            auth()->login($user);
            Log::info('User registered successfully', ['user_id' => $user->id]);

            return redirect()->intended('/dashboard');
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