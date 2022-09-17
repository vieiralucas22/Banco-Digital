let conta_banco = new conta();
let nmr_conta = 0;
let array_contas = [];
let valor;
let menuContas = "";

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

function sacar_depoisitar() {
  let opcao = "";
  let flag_contaExiste = false;

  let verificacao = retorna_nmrConta();

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
              if (array_contas[i].get_dinheiro() > 0) {
                array_contas[i].sacar(valor);
              } else {
                alert(
                  `${array_contas[i].nome_user} nāo tem dinheiro na conta para poder sacar!`
                );
              }
            }
          }
          break;

        case "2":
          valor = parseFloat(prompt(`Digite o valor que deseja depositar!`));
          for (let i = 0; i < array_contas.length; i++) {
            if (verificacao == array_contas[i].nmr_conta) {
              array_contas[i].depositar(valor);
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

function realizar_transferencias() {}
