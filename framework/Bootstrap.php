<?php
namespace Bootstrap;

use CoffeeCode\Router\Router;
use josegonzalez\Dotenv\Expect;
use josegonzalez\Dotenv\Loader;
use \Exception as Exception;

class Bootstrap{
	private $env_array;

	public function __construct(){
		$this->envLoad();
		$this->run();
	}

	public function envLoad() : void{
		$loader = new Loader(dirname(__DIR__). '/.env');
        $loader->parse();

		$this->env_array = $loader->toArray();
        define('ENV', $loader->toArray());
	}

	public function env(String $key){
		if(array_key_exists($key, $this->env_array)){
			return $this->env_array[$key];
		}else return null;
	}

	public static function getDir(): String{
		return dirname(__DIR__);
	}

	public function run(): void{
		$router = new Router($this->env('APP_URL'));
		$router->namespace("Zacarias\Controller");

		include dirname(__DIR__) . "/src/Routing/web.php";

		$router->dispatch();
	}
}
 ?>
