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
      $usersWithAssociation = User::select('id','name', 'email')->with(['associations'])->get();
      return response()->json($usersWithAssociation, 200);
    }
}
