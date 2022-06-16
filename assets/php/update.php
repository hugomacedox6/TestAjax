<?php
    //
    header('Content-Type: application/json');
    //
    $idclient = $_POST['idclient'];
    $cpf = $_POST['cpflciente'];
    $nome = $_POST['nomecliente'];
    $email = $_POST['emailcliente'];
    $nascimento = $_POST['nascimentocliente'];
    $celular = $_POST['celularcliente'];
    $observacao = $_POST['observacaocliente'];
    $cep = $_POST['cepcliente'];
    $rua = $_POST['ruacliente'];
    //
    $pdo = new PDO('mysql:host=localhost; dbname=bdcontroleusuario','root','');
    $stmt = $pdo->prepare('CALL update_cliente(:idclient ,:cpf, :nome, :email, :nascimento, :celular, :observacao, :cep, :rua);');
    $stmt->bindValue(':idclient', $idclient);
    $stmt->bindValue(':cpf', $cpf);
    $stmt->bindValue(':nome', $nome);
    $stmt->bindValue(':email', $email);
    $stmt->bindValue(':nascimento', $nascimento);
    $stmt->bindValue(':celular', $celular);
    $stmt->bindValue(':observacao', $observacao);
    $stmt->bindValue(':cep', $cep);
    $stmt->bindValue(':rua', $rua);
    $stmt->execute();
    //
    if ($stmt->rowCount() >= 1) {
        echo json_encode('Cliente Atualizado com Sucesso');
    } else {
        echo json_encode('Falha ao Atualizar Cliente');
    };