<?php

namespace App\Http\Controllers;

use App\Services\NWPSService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class NWPSController extends Controller
{
    public function getLoginQrCode(Request $request, NWPSService $nwps): JsonResponse
    {
        $couponCode = $request->query('coupon_code');
        $token = $request->query('token');
        
        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => 'Token is required'
            ], 400);
        }
        
        // Validate coupon code if provided
        if ($couponCode) {
            $request->validate([
                'coupon_code' => 'string|max:16|regex:/^[a-zA-Z0-9!"#$%&\'()*+,-.\/:;<=>?@[\]^_`{|}~]+$/'
            ]);
        }

        try {
            $result = $nwps->getLoginQrCode($token, $couponCode);
            
            return response()->json([
                'success' => true,
                'data' => $result
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get QR code: ' . $e->getMessage()
            ], 500);
        }
    }
}
