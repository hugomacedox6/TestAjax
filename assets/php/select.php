<?php
    //
    header('Content-Type: application/json');
    //
    $search = $_GET['search'];
    $typefilter = $_GET['typefilter'];
    //
    //$stmt = $pdo->prepare('SELECT * FROM tbcliente;');
    //
    $pdo = new PDO('mysql:host=localhost; dbname=bdcontroleusuario','root','');
    $stmt = $pdo->prepare('CALL select_cliente(:search, :typefilter);');
    $stmt->bindValue(':search', $search);
    $stmt->bindValue(':typefilter', $typefilter);
    $stmt->execute();

    if ($stmt->rowCount() >= 1) {
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('Nenhum Usuario Encontrado');
    };