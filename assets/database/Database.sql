/*Criacao do banco de dados*/
CREATE DATABASE bdcontroleusuario;

/*Selecionando o banco*/
USE bdcontroleusuario;

/*Criando tabela de clientes*/
CREATE TABLE tbcliente(
 ID_Cliente INT NOT NULL AUTO_INCREMENT,
 CPF VARCHAR(14) NOT NULL unique,
 Nome VARCHAR(50) NOT NULL,
 Email VARCHAR(50) NOT NULL,
 DataNascimento DATE NOT NULL,
 Celular INT NOT NULL,
 Observacao VARCHAR(300),
 PRIMARY KEY (ID_Cliente, CPF)
);

/*Criando tabela de enderecos*/
CREATE TABLE tbendereco(
  ID_Endereco INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  COD_Cliente INT REFERENCES tbcliente (ID_Cliente),
  CEP INT NOT NULL,
  Rua VARCHAR(50) NOT NULL
);

/*Procedure para cadastro de cliente*/
Delimiter $$
CREATE PROCEDURE cadastro_cliente(
  /*dados cliente*/
  IN vcpf VARCHAR(14),
  IN vnome VARCHAR(50),
  IN vemail VARCHAR(50),
  IN vdatanscimento DATE,
  IN vcelular INT,
  IN vobersavacao VARCHAR(300),
  /*endereco cliente*/
  IN vcep INT,
  IN vrua VARCHAR(50)
)
BEGIN
/**/
Declare vcodigocliente INT;
/**/
INSERT INTO tbcliente(CPF, Nome, Email, DataNascimento, Celular, Observacao)
VALUES(vcpf, vnome, vemail, vdatanscimento, vcelular, vobersavacao);
/**/
Select ID_Cliente into vcodigocliente from tbcliente where CPF = vcpf;
/**/
INSERT INTO tbendereco(COD_Cliente, CEP, Rua)
VALUES(vcodigocliente, vcep, vrua);
/**/
END
$$
/*Fim procedure cadastro cliente*/

/*Procedure para update cliente*/
Delimiter $$
CREATE PROCEDURE update_cliente(
  /*dados cliente*/
  IN vidcliente INT,
  IN vcpf VARCHAR(14),
  IN vnome VARCHAR(50),
  IN vemail VARCHAR(50),
  IN vdatanscimento DATE,
  IN vcelular INT,
  IN vobersavacao VARCHAR(300),
  /*endereco cliente*/
  IN vcep INT,
  IN vrua VARCHAR(50)
)
BEGIN
/**/
UPDATE tbcliente set Nome=vnome, CPF=vcpf, Email=vemail, DataNascimento=vdatanscimento, Observacao=vobersavacao, Celular=vcelular WHERE ID_Cliente=vidcliente;
UPDATE tbendereco set CEP=vcep, Rua=vrua WHERE COD_Cliente=vidcliente;
/**/
END
$$
/*Fim procedure update cliente*/

/*Procedure para exclusao de cliente*/
Delimiter $$
CREATE PROCEDURE delete_cliente(
	IN vidcliente int
)
BEGIN
  DELETE FROM tbendereco WHERE COD_Cliente=vidcliente;
	DELETE FROM tbcliente WHERE ID_Cliente=vidcliente;
END
$$
/*Fim procedure exclusao cliente*/

/*Procedure para consulta de cliente*/
Delimiter $$
CREATE PROCEDURE select_cliente(
  IN Search VARCHAR(50),
  IN Typefilter INT
)
BEGIN
/**/
CREATE OR REPLACE VIEW vclient AS
SELECT *
FROM tbcliente, tbendereco
WHERE ID_Cliente = COD_Cliente;
/**/
if Typefilter > 0 then
  SELECT * from vclient
  WHERE LOWER(Email) LIKE LOWER(CONCAT('%',Search,'%'));
end if;
if Typefilter < 0 then
  SELECT * from vclient
  WHERE LOWER(Nome) LIKE LOWER(CONCAT('%',Search,'%'));
end if;
/**/
END
$$
/*Fim procedure consulta cliente*/
/* procedure consulta idcliente*/
Delimiter $$
CREATE PROCEDURE select_idcliente(
  IN idclient INT
)
BEGIN
/**/
SELECT * from tbcliente, tbendereco
WHERE Cod_Cliente = idclient AND ID_Cliente = idclient;
/**/
END
$$
/*fim procedure consulta idcliente*/
/* CALL cadastro_cliente('454', 'roberto', 'adas@sadfsdf', 2020-24-8, '1321321', NULL, 5425, 'sdfsdf');
call select_cliente('o', 'r');
CALL update_cliente(1 ,'4532453', 'robeo', 'adas@sadfsdf', '2008-08-04', '131', NULL, 5425, 'sdfsdf');
CALL delete_cliente(1); */

/*
CALL cadastro_cliente('33156578401', 'Alberto', 'Alberto@gmail.com', '2020-24-8', '17991000000', NULL, 04180112, 'Rua Nova');
CALL cadastro_cliente('43361382572', 'Roger', 'Roger@gmail.com', '2020-24-8', '17991000000', NULL, 04180112, 'Rua Antiga');
CALL cadastro_cliente('56942112860', 'Livia', 'lindinha@gmail.com', '2020-24-8', '17991000000', NULL, 5425, 'Rua Da Vida');
CALL cadastro_cliente('70826628400', 'Thiago', 'tetelk@gmail.com', '2020-24-8', '17991000000', NULL, 5425, 'Rua Da Vida');
CALL cadastro_cliente('42562374614', 'Fernando', 'Noro@gmail.com', '2020-24-8', '17991000000', NULL, 5425, 'Rua Da Vida');
CALL cadastro_cliente('88658277186', 'Bianca', 'bia01@gmail.com', '2020-24-8', '17991000000', NULL, 5425, 'Rua Da Vida');
CALL cadastro_cliente('45753168302', 'Flavio', 'flavao@gmail.com', '2020-24-8', '17991000000', NULL, 5425, 'Rua Da Vida');
CALL cadastro_cliente('11545101230', 'Gilberto', 'Gilbertao@gmail.com', '2020-24-8', '17991000000', NULL, 5425, 'Rua Da Vida');
*/