<?php

namespace Bootstrap\System;

class ErrorController
{
    public static function render(String $class, String $message, String $file, int $line)
    {
        if (isset(ENV['APP_DEBUG']) && ENV['APP_DEBUG'] == true) {
            $type = 'render';
            $file_code = ErrorController::getFileCode($file, $line);
        } else {
            $type = 'abort';
            $message = "Ocorreu um erro inesperado.";
        }

        http_response_code(500);
        include_once(DOCROOT . '/framework/System/views/error.phtml');

        exit();
    }

    public static function getFileCode(String $filePath, int $line_code)
    {
        $lines = [];

        $handle = fopen($filePath, "r");
        if ($handle) {
            while (($line = fgets($handle)) !== false) {
                $line = str_replace("\n", "", $line);
                $line = str_replace("<?php", "", $line);
                $lines[] = $line;
            }
            fclose($handle);
        }

        $linha_inicial = ( $line_code - 5 >= 0 ) ? $line_code - 5 : 0;
        $linha_final = ( $line_code + 5 <= sizeof($lines) ) ? $line_code + 5 : sizeof($lines);

        $output = array_slice($lines, $linha_inicial, $linha_final);
        $error_line = sizeof($output);

        foreach ($output as $key => $item){
            if($item == $lines[$line_code-1]){
                $error_line = $key;
                break;
            }
        }

        return [
            'code' => implode("\n", $output),
            'error_line' => $error_line,
        ];
    }

    public static function abort(String $message, int $status = 500)
    {
        $type = 'abort';

        http_response_code($status);
        include_once(DOCROOT . '/framework/System/views/error.phtml');

        exit();
    }
}
