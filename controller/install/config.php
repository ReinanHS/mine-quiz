<?php
if (file_exists('config.ini')) {
	$my_file = 'config.ini';
	unlink($my_file);
}
try {
$my_file = 'config.ini';
$handle = fopen($my_file, 'w') or die('Cannot open file:  '.$my_file);
$data = "; Banco de Dados
[database]
host = 	'".$_POST['host']."'	
dbname = '".$_POST['dbname']."'
user = '".$_POST['user']."'
senha = '".$_POST['senha']."'

; Configuração do Email
[email]
host = '".$_POST['email_host']."'
sMTPAuth = true                               	
username = '".$_POST['email_user']."'           	
password = '".$_POST['email_senha']."'                  	
sMTPSecure = '".$_POST['email_sMTPSecure']."'                         	
port = ".$_POST['email_port']."

; Configurações do servidor
[main]
url = '".$_POST['url']."'
type = '".$_POST['type']."'
admin = '".$_POST['admin']."'
senha = '".$_POST['admin_senha']."'";

fwrite($handle, $data);

if($_POST['type'] == 'mysql'){
	$dsn = 'mysql:dbname='.$_POST['dbname'].';host='.$_POST['host'];
	$user = $_POST['user'];
	$password = !empty($_POST['senha']) ? $_POST['senha'] : '';

	try 
	{
	    $db = new PDO($dsn, $user, $password);

	    $log = $db->query("SHOW TABLES LIKE 'questions'")->rowCount() > 0;

	    if (!$log) 
	    {
	    	$db->query("CREATE TABLE `questions` (
				`id` int(11) NOT NULL,
  				`question` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  				`i` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  				`c` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  				`a` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  				`o` varchar(255) COLLATE utf8_unicode_ci NOT NULL
				) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
			");

	    	if (!$db) 
	    	{
				echo "Erro ao criar a tabela 'questions' por favor tente de novo!";
				exit();
			}
			else
			{
				header('Content-Type: text/html; charset=utf-8');
				$db->query("ALTER TABLE `questions` ADD PRIMARY KEY (`id`);");
				$db->query("ALTER TABLE `questions` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0; COMMIT;");
				$db->query("SET NAMES utf8");
				$db->query("INSERT INTO `questions` (`id`, `question`, `i`, `c`, `a`, `o`) VALUES (NULL, 'Eu sou...', 'Idealista, criativo e visionário', 'Divertido, espiritual e benéfico', 'Focado, determinado e persistente', 'Confiável, meticuloso e previsível'), (NULL, 'Eu gosto de....', 'Explorar novas rotas', 'Conversar com os passageiros', 'Ser piloto', 'Planejar a viagem'), (NULL, 'Se você quiser se dar bem comigo...', 'Me dê liberdade', 'Seja amigável, carinhoso e compreensivo', 'Lidere, siga ou saia do caminho', 'Me deixe saber sua expectativa'), (NULL, 'Para conseguir obter bons resultados é preciso...', 'Ter incertezas', 'Diversão e cerebração', 'Planejar e obter recursos', 'Controlar o essencial'), (NULL, 'Eu me divirto quando...', 'Tenho novidades', 'Estou com os outros', 'Estou me exercitando', 'Estou com os outros'), (NULL, 'Eu penso que...', 'É bom ser manso, mas andar com um porrete', 'Unidos venceremos, divididos perderemos', 'O ataque é melhor que a defesa', 'Um homem prevenido vale por dois'), (NULL, 'Minha preocupação é...', 'Gerar a ideia global', 'Fazer com que as pessoas gostem', 'Fazer com que aconteça', 'Fazer com que funcione'), (NULL, 'Eu prefiro...', 'Perguntas a respostas', 'Que todos tenham a chance de ser ouvido', 'Vantagens a meu favor', 'Ter todos os detalhes'), (NULL, 'Eu gosto de...', 'Tornar as pessoas confortáveis', 'Construir memórias', 'Fazer progresso', 'Fazer sentido'), (NULL, 'Eu gosto de chegar...', 'Em outro lugar', 'Junto', 'Na frente', 'Na hora'), (NULL, 'Um ótimo dia para mim é quando...', 'Desfruto de coisas novas e estimulantes', 'Me divirto com meus amigos', 'Consigo fazer muitas coisas', 'Tudo segue conforme planejado'), (NULL, 'Eu vejo a morte como...', 'Uma grande aventura misteriosa', 'Oportunidade para rever os falecidos', 'Algo que sempre chega muito cedo', 'Oportunidade para rever os falecidos'), (NULL, 'Minha filosofia de vida é...', 'Para ganhar, é necessário inventar novas regras', 'Para eu ganhar, ninguém precisa perder', 'Há ganhadores e perdedores, e eu acredito ser um ganhador', 'Para ganhar é preciso seguir as regras'), (NULL, 'Eu sempre gostei de...', 'Explorar', 'Realizar uma abordagem natural', 'Focalizar a meta', 'Evitar surpresas'), (NULL, 'Eu gosto de mudanças se...', 'For divertido e puder ser compartilhado', 'For divertido e puder ser compartilhado', 'Me der uma vantagem competitiva', 'For divertido e puder ser compartilhado'), (NULL, 'Não existe nada de errado em...', 'Mudar de ideia', 'Colocar os outros na frente', 'Se colocar na frente', 'Ser consistente'), (NULL, 'Eu gosto de buscar conselhos de...', 'Lugares, os mais estranhos', 'Anciões e conselheiros', 'Pessoas bem-sucedidas', 'Autoridades no assunto'), (NULL, 'Meu lema é...', 'Fazer o que precisa ser feito', 'Fazer junto com o grupo', 'Simplesmente fazer', 'Fazer bem feito'), (NULL, 'Eu gosto de...', 'Complexidade, mesmo se confuso', 'Calor humano e animação', 'Coisas claras e simples', 'Ordem e sistematização'), (NULL, 'Tempo para mim é...', 'Irrelevante', 'Um grande ciclo', 'Algo que detesto desperdiçar', 'Uma flecha que leva ao inevitável'), (NULL, 'Se eu fosse bilionário...', 'Faria o que desse na cabeça', 'Faria doações para muitas entidades', 'Exibiria bastante com algumas pessoas', 'Criaria uma poupança avantajada'), (NULL, 'Eu acredito que...', 'Bastam um navio e uma estrela para navegar', 'A jornada é mais importante que o destino', 'O destino é mais importante que a jornada', 'Um centavo economizado é um centavo ganho'), (NULL, 'Eu acredito também que...', 'Um sorriso ou uma careta é o mesmo para quem é cego', 'O que vai, volta', 'Aquele que hesita está perdido', 'De grão em grão a galinha enche o papo'), (NULL, 'Eu acredito ainda que...', 'A autoridade deve ser desafiada', 'O coletivo é mais importante do que o individual', 'Ganhar é fundamental', 'É melhor prudência do que arrependimento'), (NULL, 'Eu penso que...', 'Não é fácil ficar encurralado', 'Duas cabeças pensam melhor que do que uma', 'Se você não tem condições de competir, não compita', 'É preferível olhar, antes de pular');");
					
				if (!$db) 
				{
					echo "Erro ao criar a tabela 'questions' por favor tente de novo!";
					exit();
				}
			}
	    }
	}catch (PDOException $e) {
		echo 'Connection failed: ' . $e->getMessage(); exit();
	}
}


}catch (PDOException $e) {
	echo 'Connection failed: ' . $e->getMessage(); exit();
}
?>