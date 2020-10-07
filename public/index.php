<?php

use Bootstrap\Bootstrap;
use Bootstrap\System\ErrorController;

// Set the full path to the docroot
define('DOCROOT', dirname(__DIR__));

if (file_exists(DOCROOT . '/vendor/autoload.php')) {
  header("Access-Control-Allow-Origin: *");

  require "../vendor/autoload.php";
  require "../vendor/larapack/dd/src/helper.php";
  require "../framework/System/Debug.php";

  $init = new Bootstrap();
} else {
  require_once('../framework/System/ErrorController.php');
  ErrorController::abort('Para usar o <b>Zacarias</b> é necessário baixar as dependências do projeto com o comando <pre><code>composer install</code></pre>');
}
