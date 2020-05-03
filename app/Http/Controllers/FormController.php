<?php

namespace App\Http\Controllers;

use App\Form;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FormController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

  /**
   * Store a newly created resource in storage.
   *
   * @param \Illuminate\Http\Request $request
   * @param Form $form
   * @return \Illuminate\Http\Response
   */
    public function store(Request $request, Form $form)
    {
      /*
* ✅ Check the file extension type
* ✅ Create a unique name for file
* ✅ Send back filename and URL
* ✅ Send correct status codes
*/
//      $fileExtension = $request->file_upload_one->getClientOriginalExtension();
//      $imageName = Carbon::now()->timestamp . $request->file_upload_one->getClientOriginalName();

      /*
       * Check only for second files
       * */

/*      if ($fileExtension !== 'pdf')
        return response()->json(['status' => 400, 'message' => 'error. Invalid file type.', 'extension' => $fileExtension, 'data' => $request->all()]);

      if (Storage::disk('s3')->putFileAs('company_forms', $request->file_upload_one, $imageName)) {
        $fileUrl = Storage::disk('s3')->url('company_forms') . '/' . $imageName;
        return response()->json($form, 200);
      } else
        return response()->json(['status' => 500, 'message' => 'error. Failed to store file.', 'data' => $request->all()]);*/

      $fileUrl = $this->uploadFileAndReturnFileUrl($request);
      ($request->has('file_upload_one')) ? $form->file_one_url = $fileUrl : $form->file_two_url = $fileUrl;
      $form->save();
      return response()->json($form, 201);
    }

  /**
   * @param Request $request
   */
  private function uploadFileAndReturnFileUrl(Request $request){
      $file = ($request->has('file_upload_one')) ? $request->file_upload_one : $request->file_upload_two;
      $fileExtension = $file->getClientOriginalExtension();
      $imageName = Carbon::now()->timestamp . $file->getClientOriginalName();
      Storage::disk('s3')->putFileAs('company_forms', $file, $imageName);
      $fileUrl = Storage::disk('s3')->url('company_forms') . '/' . $imageName;
      return $fileUrl;
  }

    /**
     * Display the specified resource.
     *
     * @param  \App\Form  $form
     * @return \Illuminate\Http\Response
     */
    public function show(Form $form)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Form  $form
     * @return \Illuminate\Http\Response
     */
    public function edit(Form $form)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Form  $form
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Form $form)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Form  $form
     * @return \Illuminate\Http\Response
     */
    public function destroy(Form $form)
    {
        //
    }
}
