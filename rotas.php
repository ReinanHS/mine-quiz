<?php
/**
 * Rotas
 */
class rotas extends action
{
	// Atributos
	public $urls, $key, $file;
	// Métodos Especiais
	public function __construct()
	{
		$this->getUrl();	
	}
	// Métodos
	public function getUrl()
	{
		if(isset($_GET['url']) && !empty($_GET['url'])) $this->roteamento();
		else $this->PageHome();
	}
	public function roteamento()
	{
		$this->urls = explode('/', $_GET['url']);
		$this->key = array_search('', $this->urls) ? array_search('', $this->urls) : false;
		$this->file = str_replace("index.php", "", $_SERVER['SCRIPT_FILENAME']);

		if($this->key)
		{
			return $this->fileNotFind();
		}
		else
		{
			if($this->urls[0] == 'home')
			{
		    	$this->PageHome();
				return true;
			}
			elseif($this->urls[0] == 'quiz' && isset($this->urls[1]))
			{
				if(is_numeric($this->urls[1]))
				{
					$this->PageQuiz($this->urls[1]);
					return true;
				}
				
				return $this->fileNotFind();
			}
		    else return $this->fileNotFind();
		}
	}

}