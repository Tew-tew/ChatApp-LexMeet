<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TestEventController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('test' , [TestEventController::class, 'testingEvent']);

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // user route to display user list
    Route::get('/users', [UserController::class, 'showUserLists'])->name('user-list');
    Route::put('/users/{id}/update-status-offline', [UserController::class, 'updateUserStatusToOffline']);
    Route::put('/users/{id}/update-status-online', [UserController::class, 'updateUserStatusToOnline']);

    // chat route
    Route::get('/chat-page/{id}', [ChatController::class, 'chat']);
    Route::post('/send-message', [ChatController::class, 'sendMessage']);

    // displaying messages
    Route::get('/get-conversation-id/{recipientId}', [ChatController::class, 'getConversationId']);
    Route::get('/messages/{id}', [ChatController::class, 'displayMessages']);
});

require __DIR__.'/auth.php';
