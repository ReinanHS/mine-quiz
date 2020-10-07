<?php

namespace Zacarias\Controller;

use Zacarias\Controller\Controller;

class HomeController extends Controller{
    public function __construct($router)
    {
        $this->router = $router;
    }

	public function home(){
		return $this->view('pages.home', [
            'api_url' => ENV["APP_URL"],
        ]);
    }

    public function calcularResult(){
        return $this->resultados($_POST);
    }

    public function resultados(array $quiz){
        return $this->view('pages.resultados', [
            'api_url' => ENV["APP_URL"],
            'quiz_i' => $quiz['quiz_i'],
            'quiz_c' => $quiz['quiz_c'],
            'quiz_a' => $quiz['quiz_a'],
            'quiz_o' => $quiz['quiz_o'],
        ]);
    }

    public function redirect(): void
    {
        $this->router->redirect("/");
    }
}
