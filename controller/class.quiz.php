<?php
/**
 * Verificação de conta
 */
class quiz extends banco
{
	// Atributos
	public $id;
	// Métodos Especiais
	public function __construct($id)
	{
		$this->id = $id;
	}
	// Métodos
	public function getQuiz()
	{
		$db = $this->getDB();
		$con = $db->prepare('SELECT * FROM `questions` WHERE `id` = :id');
		$con->bindValue(':id', $this->id, PDO::PARAM_INT);
		$con->execute();

		if($con->rowCount() == 0)
		{
			return false;
		}
		else
		{
			header("Content-type:application/json");

			$dados = array();

			foreach ($con->fetch(PDO::FETCH_ASSOC) as $key => $value) {
				$dados[$key] = utf8_encode($value);
			}

			echo json_encode($dados);
			return true;
		}


	}

}
?>