<?php
    //
    header('Content-Type: application/json');
    //
    $idclient = $_POST['idclient'];
    //
    $pdo = new PDO('mysql:host=localhost; dbname=bdcontroleusuario','root','');
    //
    $stmt = $pdo->prepare('CALL delete_cliente(:idclient);');
    $stmt->bindValue(':idclient', $idclient);
    $stmt->execute();
    //
    if ($stmt->rowCount() >= 1) {
        echo json_encode('Cliente Deletado com Sucesso');
    } else {
        echo json_encode('Falha ao Deletar Cliente');
    };

