<?php

namespace Bootstrap;

use Bootstrap\System\View;

class BaseController{
  public function view(String $name, array $data = []) : void{
    View::render($name, $data);
  }
}