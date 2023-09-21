<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function chat($id) {

        $user = User::find($id);
        Inertia::render('chat-page', ['user' => $user]);
    }
}
