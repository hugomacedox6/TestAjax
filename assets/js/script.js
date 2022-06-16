//////////////////////////////////
//////Insert no banco/////////////
//////////////////////////////////
$('#formcadastro').submit(function (e) {
  ////////////
  e.preventDefault();
  var nome = $('#nome').val();
  var cpf = $('#cpf').val();
  if (!validarCPF(cpf)) {
    alert("CPF INVALIDO");
    return;
  };
  var nascimento = $('#nascimento').val();
  var email = $('#email').val();
  var celular = $('#celular').val();
  var cep = $('#cep').val();
  var rua = $('#rua').val();
  var observacao = $('#observacao').val();
  ////////////////
  $.ajax({
    ////////////////////////
    url: 'assets/php/insert.php',
    method: 'POST',
    data: { nome: nome, cpf: cpf, nascimento: nascimento, email: email, celular: celular, cep: cep, rua: rua, observacao: observacao },
    dataType: 'json'
    ////////////////////////
  })
    .done(function (result) {
      console.log(result);
      if (result == 'Falha ao Cadastrar Cliente') {
        alert("Erro ao cadastrar cliente");
        return;
      };
      alert("Cliente Cadastrado com Sucesso");
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      ///
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
      ///
    });
});
//////////////////////////////////
//////Select no banco/////////////
//////////////////////////////////
$('#formselect').submit(function (e) {
  ////////////////////////
  e.preventDefault();
  ////////////////////////
  var typefilter = $('#typefilter').val();
  var search = $('#search').val();
  ////////////////////////
  $.ajax({
    url: 'assets/php/select.php',
    method: 'GET',
    data: { search: search, typefilter: typefilter },
    dataType: 'json'
  })
    .done(function (result) {
      ////////////////////////
      console.log(result);
      if (result == 'Nenhum Usuario Encontrado') {
        alert("Erro ao procurar");
        return;
      };
      for (var i = 0; i < 10; i++) {
        $('#users').append('<tr><td>' + result[i].ID_Cliente + '</td ><td>' + result[i].Nome + '</td ><td>' + result[i].DataNascimento + '</td><td>' + result[i].CPF + '</td><td>' + result[i].Celular + '</td><td>' + result[i].Email + '</td><td>' + result[i].CEP + '</td><td>' + result[i].Rua + '</td><td>' + result[i].Obervacao + '</td></tr>');
      };
      ////////////////////////
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      ///
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
      alert("Erro ao Realizar Consulta");
      ///
    });
});
//////////////////////////////////
//////Delete no banco/////////////
//////////////////////////////////
$('#formdelete').submit(function (e) {
  ////////////////////////
  e.preventDefault();
  ////////////////////////
  var idclient = $('#idclient').val();
  ////////////////////////
  $.ajax({
    url: 'assets/php/delete.php',
    method: 'POST',
    data: { idclient: idclient },
    dataType: 'json'
  })
    .done(function (result) {
      ////////////////////////
      console.log(result);
      if (result == 'Falha ao Deletar Cliente') {
        alert("Erro ao deletar cliente");
        return;
      }else{
        alert("Cliente deletado");
      };
      ////////////////////////
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      ///
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
      ///
    });
});
//////////////////////////////////
//////Update no banco/////////////
//////////////////////////////////
$('#formupdate').submit(function (e) {
  ////////////////////////
  e.preventDefault();
  ////////////////////////
  var idclient = $('#idclient').val();
  var nomecliente = $('#nome').val();
  var nascimentocliente = $('#nascimento').val();
  var emailcliente = $('#email').val();
  var celularcliente = $('#celular').val();
  var cpflciente = $('#cpf').val();
  var cepcliente = $('#cep').val();
  var ruacliente = $('#rua').val();
  var observacaocliente = $('#observacao').val();
  ////////////////////////
  $.ajax({
    url: 'assets/php/update.php',
    method: 'POST',
    data: { idclient: idclient, nomecliente: nomecliente, nascimentocliente: nascimentocliente, emailcliente: emailcliente, celularcliente: celularcliente, cpflciente: cpflciente, cepcliente: cepcliente, ruacliente: ruacliente, observacaocliente: observacaocliente },
    dataType: 'json'
  })
    .done(function (result) {
      ////////////////////////
      console.log(result);
      if (result == 'Falha ao Atualizar Cliente') {
        alert("Erro ao atualizar");
        return;
      };
      alert("Cliente Atualizado!");
      ////////////////////////
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      ///
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
      ///
    });
});
//////////////////////////////////
//////Validar CPF/////////////////
//////////////////////////////////
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf == '') return false;
  // Elimina CPFs invalidos conhecidos	
  let primeira = cpf.charAt(0);
  if (cpf == primeira.repeat(11))
    return false;
  // Valida 1o digito	
  add = 0;
  for (i = 0; i < 9; i++)
    add += parseInt(cpf.charAt(i)) * (10 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11)
    rev = 0;
  if (rev != parseInt(cpf.charAt(9)))
    return false;
  // Valida 2o digito	
  add = 0;
  for (i = 0; i < 10; i++)
    add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11)
    rev = 0;
  if (rev != parseInt(cpf.charAt(10)))
    return false;
  return true;
};
//////////////////////////////////
//////Validar Formulario//////////
//////////////////////////////////
function validarnome() {
  var nome = $('#nome').val();
  var nome = nome.replace(/[^a-zA-Z\u00C0-\u00FF]/g, ' ');
  $('#nome').val(nome);
};
function validarcpf() {
  var cpf = $('#cpf').val();
  var cpf = cpf.replace(/[^0-9]/, '');
  $('#cpf').val(cpf);
};
////////////////////////////////////////////////////
//////Selecionar Cliente para Alteracao/////////////
////////////////////////////////////////////////////
$('#formload').submit(function (e) {
  ////////////////////////
  e.preventDefault();
  ////////////////////////
  var idclient = $('#idclient').val();
  ////////////////////////
  $.ajax({
    url: 'assets/php/load.php',
    method: 'GET',
    data: { idclient: idclient },
    dataType: 'json'
  })
    .done(function (result) {
      ////////////////////////
      console.log(result);
      if (result == 'Nenhum Usuario Encontrado') {
        alert("Erro ao visualizar cliente");
        return;
      };
      $('#nomedisplay').append(result[0].Nome);
      $('#observationdisplay').append(result[0].Observacao);
      ////////////////////////
      $('#nome').val(result[0].Nome);
      $('#nascimento').val(result[0].DataNascimento);
      $('#email').val(result[0].Email);
      $('#celular').val(result[0].Celular);
      $('#cpf').val(result[0].CPF);
      $('#cep').val(result[0].CEP);
      $('#rua').val(result[0].Rua);
      $('#observacao').val(result[0].Observacao);
      ////////////////////////
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      ///
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
      ///
    });
});