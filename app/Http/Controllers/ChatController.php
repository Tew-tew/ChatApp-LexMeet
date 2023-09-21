<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function chat($id) {

        $user = User::find($id);
        return Inertia::render('Chat', ['recipientId' => $id]);
    }

    public function checkConversation() {

    }


    public function sendMessage(Request $request) {
        $request->validate([
            'content' => 'required|string',
            'conversation_id' => 'required|exists:conversations,id',
        ]);
    }
}
