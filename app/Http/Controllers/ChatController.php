<?php

namespace App\Http\Controllers;

use App\Events\PrivateMessageEvent;
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
            $recipientId = $request->recipientId; // Add this line

            // Check if a conversation exists between the sender and recipient
            $conversation = Conversation::whereHas('participants', function ($query) use ($user, $recipientId) {
                $query->where('user_id', $user->id);
            })->whereHas('participants', function ($query) use ($recipientId) {
                $query->where('user_id', $recipientId);
            })
            ->where('type', 'private')
            ->first();

            // If a conversation doesn't exist, create a new one
            if (!$conversation) {
                $conversation = new Conversation([
                    'type' => 'private',
                ]);
                $conversation->save();

                // Attach participants (sender and recipient) to the conversation
                $conversation->participants()->sync([$user->id, $recipientId]);
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
                    'content' => $filename,
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
            $lastMessage = Message::where('user_id', $user->id)
            ->where('conversation_id', $conversation->id)
            ->latest()
            ->first();
            // Dispatch the message event
            if ($lastMessage) {
                broadcast(new PrivateMessageEvent($lastMessage))->toOthers();
            }

            return response()->json(['message' => 'Message sent successfully.']);

        } catch (\Exception $e) {
            return $e;
        }
    }
    // getting conversationId
    public function getConversationId($recipientId) {
        try {
            $currentUser = Auth::user();
            $conversation = Conversation::whereHas('participants', function ($query) use ($currentUser) {
                $query->where('user_id', $currentUser->id);
            })->whereHas('participants', function ($query) use ($recipientId) {
                $query->where('user_id', $recipientId);
            })->first();

            if ($conversation) {
                return response()->json(['conversationId' => $conversation->id]);
            } else {
                // Handle the case when no conversation exists
                return response()->json(['error' => 'No conversation found for the recipient'], 404);
            }
        } catch (\Exception $e) {

            return response()->json(['error' => 'No conversation found for the recipient'], 404);
        }
    }

    // getting messages
    public function displayMessages($conversationId)
    {
        // Retrieve the conversation by its ID
        try {
            // Retrieve messages for the given conversation ID
            $messages = Message::where('conversation_id', $conversationId)->with('user')->get();

            // Return the messages as JSON
            return response()->json(['messages' => $messages]);
        } catch (\Exception $e) {
            // Log and handle any errors
            return $e;
            // return response()->json(['error' => 'Error fetching messages'], 500);
        }
    }
}
