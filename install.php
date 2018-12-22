<?php
if(!file_exists('config.ini')){
	require_once('./controller/install/class.install.php');
	$install = new install();
	
	//print_r($_SERVER["REQUEST_URI"]);
	
	$url = $_SERVER["REQUEST_URI"];
	
	$url = substr($url, strpos($url, "install.php"));
	$url = explode('/', $url);
	
	if(!isset($url[1])){
		include_once('./view/config/main.phtml');
	}else{
	
		if(!empty($url[1]) && $url[1] == 'db'){
			return $install->testDB();
		}else if(!empty($url[1]) && $url[1] == 'ff'){
			return $install->createConfig();
		}
	}
}else echo("Acesso proibido: Você não pode fazer uma instalação em cima de outra!");
?>