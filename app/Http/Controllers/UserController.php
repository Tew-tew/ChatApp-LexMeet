<?php

namespace App\Http\Controllers;

use App\Events\UserStatusEvent;
use App\Models\User;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isFalse;

class UserController extends Controller
{
    public function showUserLists()
    {

        $user_id = auth()->user()->id;
        $data = User::where('id', '!=', $user_id)->get();
        // $data = User::all();
        return response()->json($data);
    }

    public function updateUserStatusToOnline(User $user, $id){

        $user = $user->find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->isOnline = true; // Set it to false
        $user->save();
        event(new UserStatusEvent($user));
        return response()->json(['message' => 'User status updated successfully', 'user' => $user]);
    }

    public function updateUserStatusToOffline(User $user, $id){

        $user = $user->find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->isOnline = false; // Set it to false
        $user->save();
        event(new UserStatusEvent($user));
        return response()->json(['message' => 'User status updated successfully', 'user' => $user]);
    }
}
