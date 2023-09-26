<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

use function Laravel\Prompts\error;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $imageName = 'default_profile.jpg';
        if($request->image) {
            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('images'), $imageName);
        }

        $user = User::create([
            'name' => $request->name,
            'image' => $imageName,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $this->createGroupParticipant($user);

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }

    private function createGroupParticipant($user) {
        // Check if Conversation 1 exists
        try {

            $conversationId = 1;
            $conversation = Conversation::find($conversationId);

            if (!$conversation) {
                // Conversation 1 doesn't exist, create it as a group conversation
                $conversation = Conversation::create([
                    'type' => 'group',
                ]);
            }

             // Attach the newly registered user to Conversation 1 in the conversations table
            $user->conversations()->syncWithoutDetaching([$conversation->id]);

            // Attach the newly registered user to Conversation 1 in the participants table
            $user->participants()->syncWithoutDetaching([$conversation->id]);
        } catch (\Exception $e) {
            return $e;
        }
    }
}
