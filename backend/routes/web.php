<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/logged', function () {
    return view('logged-in');
})->middleware('auth:sanctum');
