<?php
/**
 * Verificação de conta
 */
class result
{
	// Atributos
	public $token;
	public $quiz_i;
	public $quiz_c;
	public $quiz_a;
	public $quiz_o;
	public $nome;
	public $idade;
	// Métodos Especiais
	public function __construct()
	{
		$this->token 	= $_POST['token'];

		$this->quiz_i 	= $_POST['i'];
		$this->quiz_c 	= $_POST['c'];
		$this->quiz_a 	= $_POST['a'];
		$this->quiz_o 	= $_POST['o'];
		
		$this->nome 	= $_POST['nome'];
		$this->idade 	= $_POST['idade'];
	}
	// Métodos
	public function valida(){
		if($_SESSION['token'] == $this->token){ return true; }
		else return false;
	}
	public function getEmailHTML(){
		$file = str_replace("controller", "", __DIR__);
		$cofig = parse_ini_file( $file.'config.ini', true );

		$url = ($cofig['main']['url'].'get/email/');
		
		$url = $url.urlencode($this->nome).'WPV';
		$url = $url.$this->idade.'WPV';

		$url = $url.$this->quiz_i.'WPV';
		$url = $url.$this->quiz_c.'WPV';
		$url = $url.$this->quiz_a.'WPV';
		$url = $url.$this->quiz_o;

		return file_get_contents($url);
	}
	public function email()
	{
		$assunto = 'Análise de Comportamento';
		
		$header = "MINE-Version: 1.0\n";
		$header .= "Content-type: text/html; charset=iso-8859-1\n";
		
		try {
		    
		    $html = $this->getEmailHTML();

		    mail('reinangabriel1520@gmail.com', $assunto, $html, $header);
		    
			return true;

		} catch (Exception $e) {
			header('HTTP/1.0 303 Erro ao enviar email');
            echo "Ocorreu um erro ao enviar as informações via email!";

			$html = $this->getEmailHTML();
		    $success = mail('reinangabriel1520@gmail.com', $assunto, $html, $header);
		    if ($success) return true;	

			$errorMessage = error_get_last()['message'];
	    	print_r($errorMessage);

			return false;
		}

		//echo $this->getEmailHTML();

	}
}
?>