<?php
namespace App\Http\Controllers;

use App\User;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth')->except(['usersWithAssociation']);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
      return view('home');
    }

    /****/
    public function account() {
      $user = User::findOrFail(Auth::id());
      return view('account')->with(['user' => $user]);
    }

    public function usersWithAssociation()
    {
      $usersWithAssociation = User::select('id','name')->with(['associations'])->get();
      return response()->json($usersWithAssociation, 200);
    }

  public function test(){

      $user = User::create([
        'uid' => uniqid(),
        'name' => 'Peanut',
        'email' => 'Peanut@email.com',
        'photoURL' => 'some-url',
        'description' => 'A short bio',
        'registration_date' => time(),
        'points' => '0',
        'status' => 'Admin',
        'online' => false,
        'signup_procedure' => 'app',
        'disabled' => false,
        'email_verified_at' => time(),
      ]);

      return response()->json($user);

    }
}
