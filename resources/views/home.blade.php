@extends('layouts.app')

@section('content')

  <application-container :t_8974="'{{ asset('FORM_8974.png') }}'"
                         :t_941="'{{ asset('img/Form_941.png') }}'"
                         :t_941_url="'{{ asset('forms/FORM_941.pdf') }}'"
                         :t_941s_url="'{{ asset('forms/f941sb.pdf') }}'"
                         :t_941s="'{{ asset('img/941S.png') }}'"
                         :t_941x_url="'{{ asset('forms/form 941X.pdf') }}'"
                         :t_941x="'{{ asset('img/Form941X.png') }}'"
                         :t_6765="'{{ asset('img/form_6765.png') }}'"
                         :t_6765_url="'{{ asset('forms/form_6765.pdf') }}'"
                         :t_3523="'{{ asset('img/form_3523.png') }}'"
                         :t_3523_url="'{{ asset('forms/Form_3523.pdf') }}'"
                         :t_8821="'{{ asset('img/Form 8821.png') }}'"
                         :t_8821_url="'{{ asset('forms/Form_8821.pdf') }}'"
                         :t_941_2020="'{{ asset('img/form_941_2020.png') }}'"
                         :t_941_2020_url="'{{ asset('forms/Form _941_2020.pdf') }}'"
                         :auth_object="{{ Auth()->user() }}"
                         environment_type="production"/>

@endsection
