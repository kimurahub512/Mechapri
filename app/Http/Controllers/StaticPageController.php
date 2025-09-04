<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StaticPageController extends Controller
{
    public function home()
    {
        return Inertia::render('Home');
    }

    public function beginner()
    {
        return Inertia::render('Beginner');
    }

    public function howToPrint()
    {
        return Inertia::render('HowToPrint');
    }

    public function productDetailsFree()
    {
        return Inertia::render('ProductDetailsFree');
    }

    public function tokushoho()
    {
        return Inertia::render('Legal/Tokushoho');
    }

    public function privacy()
    {
        return Inertia::render('Legal/Privacy');
    }

    public function terms()
    {
        return Inertia::render('Legal/Terms');
    }

    public function categoryEdit()
    {
        return Inertia::render('MyShopManagement/CategoryEdit');
    }

    public function accountSetting()
    {
        return Inertia::render('AccountSetting');
    }

    public function idolUpload()
    {
        return Inertia::render('Idol/ImageUpload');
    }

    public function shopLow()
    {
        return Inertia::render('ShopLow');
    }
}
