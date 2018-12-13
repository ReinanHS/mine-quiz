<?php

session_start();

$file = str_replace("index.php", "", $_SERVER['SCRIPT_FILENAME']);

if (!file_exists('config.ini')) 
{
	header("Location: install.php");
}
else
{

	require_once($file."vendor/PHPMailer/class.phpmailer.php");
	require_once($file.'controller/action.php');
	require_once($file.'controller/class.banco.php');
	require_once($file.'rotas.php');

	$action = new action();
	$rotas = new rotas();

}

?>