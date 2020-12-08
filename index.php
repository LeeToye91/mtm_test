<?php

require_once 'vendor/autoload.php';
$loader = new Twig_Loader_Filesystem('/');
$twig = new Twig_Environment($loader);

// Informal router incase additional URL parameters are added

$page = '';


if ($page == '') {
    echo $twig->render('view/index.html');
}
else {
    http_response_code(404);
    echo $twig->render('view/404.html');
}

?>