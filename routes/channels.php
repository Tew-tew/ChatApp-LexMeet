<?php

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/
Broadcast::routes(['middleware' => ['web']]);

// Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//     return (int) $user->id === (int) $id;
// });

Broadcast::channel('online-status', function ($user) {
    return $user;
});

Broadcast::channel('private-chat.{conversationId}', function (User $user, $conversationId)
{
    if (!$user) {
        return false; // User is not authenticated, so not authorized.
    }
    // Check if the user is authorized to join the conversation.
    $conversation = Conversation::find($conversationId);

    if (!$conversation) {
        return false; // Conversation does not exist, user is not authorized.
    }

    // Check if the user is one of the participants in the conversation.
    if ($conversation->participants->contains($user->id)) {
        return true; // User is authorized to join the conversation.
    }

    return false;
});

Broadcast::channel('group-chat', function (User $user)
{
    if (!$user) {
        return false; // User is not authenticated, so not authorized.
    }

    return true;
});
