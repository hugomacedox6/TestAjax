<?php
    //
    header('Content-Type: application/json');
    //
    $cpf = $_POST['cpf'];
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $nascimento = $_POST['nascimento'];
    $celular = $_POST['celular'];
    $observacao = $_POST['observacao'];
    $cep = $_POST['cep'];
    $rua = $_POST['rua'];
    //
    $pdo = new PDO('mysql:host=localhost; dbname=bdcontroleusuario','root','');
    $stmt = $pdo->prepare('CALL cadastro_cliente(:cpf, :nome, :email, :nascimento, :celular, :observacao, :cep, :rua);');
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
        echo json_encode('Cliente Cadastrado com Sucesso');
    } else {
        echo json_encode('Falha ao Cadastrar Cliente');
    };