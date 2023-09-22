<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function chat($id) {

        $user = User::find($id);
        return Inertia::render('Chat', ['recipientId' => $id]);
    }

    public function sendMessage(Request $request) {
        $request->validate([
            'text' => 'required|string',
            'recipientId' => 'required|exists:users,id',
            'messageType' => 'required|in:text,image',
        ]);

        try {
            $user = Auth::user();

            // Check if a conversation exists between the sender and recipient
            $conversation = Conversation::whereHas('participants', function ($query) use ($user, $request) {
                $query->where('user_id', $user->id)
                    ->orWhere('user_id', $request->recipientId);
            })
            ->where('type', 'private') // Assuming this is a private conversation
            ->first();

            // If a conversation doesn't exist, create a new one
            if (!$conversation) {
                $conversation = new Conversation([
                    'type' => 'private', // Assuming this is a private conversation
                ]);
                $conversation->save();

                // Attach participants (sender and recipient) to the conversation
                $conversation->participants()->sync([$user->id, $request->recipientId]);
            }


            if ($request->messageType === 'image' && $request->has('imageData')) {
                // Handle base64-encoded image data
                $imageData = $request->input('imageData');
                $imageData = base64_decode($imageData);

                // Generate a unique filename for the image
                $filename = Str::random(20) . '.jpg';

                // Save the image to a storage path (you may configure your storage in Laravel)
                $path = storage_path('app/public/chat-images/' . $filename);
                File::put($path, $imageData);

                $message = new Message([
                    'content' => $filename, // Save the filename or path in the 'content' column
                    'conversation_id' => $conversation->id,
                    'user_id' => $user->id,
                    'message_type' => 'image',
                ]);

                $message->save();

            } elseif ($request->messageType === 'text' && $request->has('text')) {
                // Handle text messages
                $text = $request->input('text');

                $message = Message::create([
                    'content' => $text,
                    'message_type' => 'text',
                    'conversation_id' => $conversation->id,
                    'user_id' => $user->id,
                ]);
            }

            return response()->json(['message' => 'Message sent successfully.']);

        } catch (\Exception $e) {
            return $e;
        }

    }
}
