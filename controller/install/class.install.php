<?php
/**
 * Install
 */
class install
{
	// Atributos
	// Métodos Especiais
	public function __construct()
	{
		return false;
	}
	// Métodos
	public function testDB()
	{
		$dsn = 'mysql:dbname='.$_POST['dbname'].';host='.$_POST['host'];
		$user = $_POST['user'];
		$password = $_POST['senha'];

		try {
		    $dbh = new PDO($dsn, $user, $password);
		    echo ("Conexão com o banco de dados realizada com sucesso!");
		    return false;
		} catch (PDOException $e) {
		    echo 'Connection failed: ' . $e->getMessage(); exit();
		}
	}
	public function createConfig(){
		$log = include_once('config.php');
		var_dump($log);
	}

}
?>