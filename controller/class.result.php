<?php
/**
 * Verificação de conta
 */
class result
{
	// Atributos
	// Métodos Especiais
	public function __construct()
	{
		$_SESSION['quiz_i'] = $_POST['i'];
		$_SESSION['quiz_c'] = $_POST['c'];
		$_SESSION['quiz_a'] = $_POST['a'];
		$_SESSION['quiz_o'] = $_POST['o'];
		$_SESSION['email'] = $_POST['email'];
	}
	// Métodos
	public function email()
	{
	}

}
?>