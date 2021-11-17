<?php

/**
 * @author Muhammad Adnan <adnannadeem1994@gmail.com>
 * @date   2021/11/12
 *
 * This class send Curl request
 */

namespace App\Classes;

use DB;
use App\Classes\RestAPI;

class Select2AjaxHelper
{
    public function __construct()
    {

    }
    public function Generate($request_data)
    {

        try {

            // checking the request type
            $request_type = gettype($request_data);
            if ($request_type == 'object') {
                $request_data = $request_data->all();
            }

            $model = 'App\Models\\' . $request_data['class'];
            $columns = $request_data['columns'];
            $search = $request_data['q'];
            $query = [];
            $status = false;
            // checking query data exist
            if (!empty($search) && !is_null($search)) {


                // data base query
                $query = $model::query();
                // checking the Query columns is > 1
                if (count($columns) > 1) {
                    foreach ($columns as $index => $column) {
                        if ($index == 0) {
                            $query->where($column, 'like', $search . '%');
                        } else {
                            $query->orWhere($column, 'like', $search . '%');
                        }
                    }
                } else {
                    $query->where($columns[0], 'like', $search . '%');
                }

                // getting query
                $query = $query->get();

                //updating status
                if (!$query->isEmpty()) {
                    $status = true;
                }

            }

            return RestAPI::response($query, $status, '');

        }
        catch (\Exception $e)
        {
            return RestAPI::response($e, false, 'Something went wrong');
        }

    }




}