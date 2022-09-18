let conta_banco = new conta();
let nmr_conta = 0;
let array_contas = [];
let valor;
let menuContas = "";
let flag_contaExiste = false;
let opcao = "";
let limiteBasico = 1000;
let limiteEstudante = 300;
let limExtrato_basico = 3;
let limTransferencia_basico = 3;
let limExtrato_estudante = 1;
let limTransferencia_estudante = 1;

function montar_menu(nome, nmr_conta) {
  menuContas += `${nmr_conta}- ${nome}\n    `;
}

function abrir_Conta() {
  let nome_usuario = prompt(`Digite o nome do usuario!`);
  let tipo_conta =
    prompt(`  Digite o número correspondente ao tipo da conta que deseja!
  
  1- Platinum
  2- Básica
  3- Estudante
  `);
  nmr_conta++;
  conta_banco = new conta(nmr_conta, tipo_conta, nome_usuario);
  array_contas.push(conta_banco);
  montar_menu(conta_banco.nome_user, conta_banco.nmr_conta);
}

function retorna_nmrConta() {
  let conta = parseInt(
    prompt(`  Digite o número da conta que deseja fazer essa operaçāo!
  
    ${menuContas}
  
  `)
  );

  for (let i = 0; i < array_contas.length; i++) {
    if (array_contas[i].nmr_conta == conta) {
      return conta;
    }
  }
}

function saque_limite(aux, i, tipo_limite) {
  aux -= valor;
  opcao = "3";
  if (array_contas[i].get_dinheiro() > 0 && aux >= 0) {
    array_contas[i].sacar(valor);
    array_contas[i].gerar_extrato("Sacou", valor, 1);
    if (tipo_limite == 2) {
      limiteBasico = aux;
    } else if (tipo_limite == 3) {
      limiteEstudante = aux;
    }
  } else {
    alert(`ERRO! Conta vazia ou excedeu o seu limite de saque no mês`);
  }
}

function sacar_depoisitar() {
  let verificacao = retorna_nmrConta();
  let aux_estudante = limiteEstudante;
  let aux_basico = limiteBasico;

  for (let i = 0; i < array_contas.length; i++) {
    if (array_contas[i].nmr_conta == verificacao) {
      flag_contaExiste = true;
    }
  }

  if (flag_contaExiste) {
    do {
      opcao = prompt(`
        Qual operaçāo deseja fazer?
    
        1- Sacar
        2- Depositar
        3- Voltar
        `);
      switch (opcao) {
        case "1":
          valor = parseFloat(prompt(`Digite o valor que deseja sacar!`));
          for (let i = 0; i < array_contas.length; i++) {
            if (verificacao == array_contas[i].nmr_conta) {
              if (array_contas[i].tipo_conta == "2") {
                saque_limite(aux_basico, i, 2);
              } else if (array_contas[i].tipo_conta == "3") {
                saque_limite(aux_estudante, i, 3);
              } else if (array_contas[i].tipo_conta == "1") {
                if (array_contas[i].get_dinheiro() > 0) {
                  array_contas[i].sacar(valor);
                  array_contas[i].gerar_extrato("Sacou", valor, 1);
                } else {
                  alert(`ERRO! Conta vazia!`);
                }
              }
            }
          }
          break;

        case "2":
          valor = parseFloat(prompt(`Digite o valor que deseja depositar!`));
          for (let i = 0; i < array_contas.length; i++) {
            if (verificacao == array_contas[i].nmr_conta) {
              array_contas[i].depositar(valor);
              array_contas[i].gerar_extrato("Deposito", valor, 1);
              opcao = "3";
            }
          }

          break;

        case "3":
          break;

        default:
          alert(`Opçāo inválida`);
          break;
      }
    } while (opcao != "3");
  } else {
    alert(`Conta nāo existe`);
  }
}

function taxa_transferencia(limite_transferencia, tipo, indice) {
  if (!(limite_transferencia > 0)) {
    array_contas[indice].sacar(0.5);
  } else {
    limite_transferencia--;
    if (tipo == 2) {
      limTransferencia_basico = limite_transferencia;
    } else if (tipo == 3) {
      limTransferencia_estudante = limite_transferencia;
    }
  }
}

function realizar_transferencias() {
  let Flag_envia = false;
  let Flag_recebe = false;
  let valor;
  let envia = parseInt(
    prompt(`Digite qual conta irá fazer a transferência! (número da conta)
${menuContas}`)
  );
  let recebe = parseInt(
    prompt(`Digite qual conta irá receber a transferência! (número da conta)
${menuContas}`)
  );
  do {
    valor = parseFloat(prompt(`Digite o valor que deseja tranferir!`));
    if (valor < 0) {
      alert(`Valor inválido`);
    }
  } while (valor < 0);

  for (let i = 0; i < array_contas.length; i++) {
    if (array_contas[i].nmr_conta == envia) {
      Flag_envia = true;
    }
    if (array_contas[i].nmr_conta == recebe) {
      Flag_recebe = true;
    }
  }

  if (Flag_envia && Flag_recebe) {
    array_contas[envia - 1].transferencia(valor * -1);
    array_contas[envia - 1].gerar_extrato("Transferiu", valor, 1);
    array_contas[recebe - 1].transferencia(valor, 2);
    array_contas[recebe - 1].gerar_extrato(
      "Recebeu uma transferência",
      valor,
      2
    );
    if (array_contas[envia - 1].tipo_conta == "2") {
      taxa_transferencia(limTransferencia_basico, 2, envia - 1);
    } else if (array_contas[envia - 1].tipo_conta == "3") {
      taxa_transferencia(limTransferencia_estudante, 3, envia - 1);
    }
  } else {
    alert(`Alguma das contas nāo é válida!`);
  }
}
function mostrar_extrato() {
  opcao = parseInt(
    prompt(`Digite de qual conta deseja gerar o extrato!(Número da conta)
  
  ${menuContas}
  `)
  );

  for (let i = 0; i < array_contas.length; i++) {
    if (array_contas[i].nmr_conta == opcao) {
      alert(`${array_contas[i].nome_user} extrato! 

        ${array_contas[i].operacoes}`);
    }
  }
}
