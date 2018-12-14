<?php
/**
 * Action
 */
class action
{
	// Atributos
	public $file;
	// Métodos Especiais
	public function __construct()
	{
		$_SESSION['token'] = !isset($_SESSION['token']) ? md5(time()) : $_SESSION['token'];

		$this->file = str_replace("index.php", "", $_SERVER['SCRIPT_FILENAME']);
	}
	// Métodos
	public function PageHome()
	{
		$file = str_replace("controller", "", __DIR__);
		$cofig = parse_ini_file( $file.'config.ini', true );
		
		include_once($this->file.'view/home.phtml');

		return false;
	}
	public function PageQuiz($id)
	{
		require_once($this->file.'controller/class.quiz.php');

		$quiz = new quiz($id);
		$log = $quiz->getQuiz();
		
		if($log) return true;
		else return $this->fileNotFind();
	}
	public function fileNotFind()
	{
		header('HTTP/1.0 404 Not Found');
		include_once($this->file.'view/404.phtml');

		return false;
	}
}