<?php

namespace Zacarias\Controller;

use Zacarias\Controller\Controller;

class HomeController extends Controller{
	public function home(){
		return $this->view('welcome');
    }
}
