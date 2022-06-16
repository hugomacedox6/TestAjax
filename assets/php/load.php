<?php
    //
    header('Content-Type: application/json');
    //
    $idclient = $_GET['idclient'];
    //
    $pdo = new PDO('mysql:host=localhost; dbname=bdcontroleusuario','root','');
    $stmt = $pdo->prepare('CALL select_idcliente(:idclient);');
    $stmt->bindValue(':idclient', $idclient);
    $stmt->execute();

    if ($stmt->rowCount() >= 1) {
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('Nenhum Usuario Encontrado');
    };