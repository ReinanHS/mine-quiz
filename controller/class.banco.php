<?php
/**
 * Banco de Dados
 */
class banco
{
	// Atributos
	private $host;
	private $dbname;
	private $user;
	private $senha;

	// Métodos Especiais
	public function __construct()
	{
		
	}
	// Métodos
	public function getDB()
	{
		$file = str_replace("controller", "", __DIR__);
		$cofig = parse_ini_file( $file.'config.ini', true );

		$dsn = 'mysql:dbname='.$cofig['database']['dbname'].';host='.$cofig['database']['host'];
		$user = $cofig['database']['user'];
		$password = $cofig['database']['senha'];

		try {
		    $dbh = new PDO($dsn, $user, $password);
		    return $dbh;
		} catch (PDOException $e) {
		    echo 'Connection failed: ' . $e->getMessage(); exit();
		}
	}
}
?>