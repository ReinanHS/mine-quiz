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
		$this->email();
	}
	// Métodos
	public function email()
	{
		$file = str_replace("controller", "", __DIR__);
		$cofig = parse_ini_file( $file.'config.ini', true );

		$html = file_get_contents($cofig['main']['url'].'get/email');

		$mail = new PHPMailer(true);
		try {
		    //Server settings
		    $mail->SMTPDebug = false;                               	// Enable verbose debug output
		    $mail->do_debug = 0;
		    $mail->isSMTP();                                    // Set mailer to use SMTP
		    $mail->Host = $cofig['email']['host'];  			// Specify main and backup SMTP servers
		    $mail->SMTPAuth = $cofig['email']['sMTPAuth'];      // Enable SMTP authentication
		    $mail->Username = $cofig['email']['username'];      // SMTP username
		    $mail->Password = $cofig['email']['password'];      // SMTP password
		    $mail->SMTPSecure = $cofig['email']['sMTPSecure'];  // Enable TLS encryption, `ssl` also accepted
		    $mail->Port = $cofig['email']['port'];              // TCP port to connect to

		    //Recipients
		    $mail->setFrom($cofig['email']['username'], 'Prepara Cursos Simão Dias');
		    $mail->addAddress($_SESSION['email'], 'ReinanHS');     		// Add a recipient
		    //Content
		    $mail->isHTML(true);                                  	// Set email format to HTML
		    $mail->Subject = 'Análise comportamental!';
		    $mail->Body    = $html;
		    $mail->AltBody = 'Obrigado pela atenção!';

		    $mail->send();
		    
			return true;

		} catch (Exception $e) {
			header('HTTP/1.0 303 Erro ao enviar email');
            echo "Não foi possível enviar o e-mail.";
  			echo "<b>Informações do erro:</b> " . $mail->ErrorInfo;
			return false;
		}

	}

}
?>