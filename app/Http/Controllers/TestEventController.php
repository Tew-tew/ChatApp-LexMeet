<?php

namespace App\Http\Controllers;

use App\Events\TestingEvent;
use Illuminate\Http\Request;


class TestEventController extends Controller
{
    function testingEvent()
    {
        event(new TestingEvent);
    }
}
