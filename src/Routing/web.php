<?php

$router->get("/", "HomeController:home");
$router->get("/resultados", "HomeController:redirect");
$router->get("/{errcode}", "HomeController:redirect");
$router->post("/resultados", "HomeController:calcularResult");
