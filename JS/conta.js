class conta {
  constructor(nmr_conta, tipo_conta, nome_user) {
    this.nmr_conta = nmr_conta;
    this.tipo_conta = tipo_conta;
    this.nome_user = nome_user;
    this.dinheiro = 0;
    this.operacoes = "";
  }
  set_dinheiro(dinheiro) {
    this.dinheiro = dinheiro;
  }
  get_dinheiro() {
    return this.dinheiro;
  }
  sacar(valor) {
    let novo_saldo = this.get_dinheiro() - valor;
    this.set_dinheiro(novo_saldo);
  }
  depositar(valor) {
    let novo_saldo = this.get_dinheiro() + valor;
    this.set_dinheiro(novo_saldo);
  }
  gerar_extrato(operacao, valor, tipo) {
    if (tipo == 1) {
      this.operacoes += `${operacao} ${valor} reais\n`;
    } else if (tipo == 2) {
      this.operacoes += `${operacao} de ${valor} reais\n`;
    }
  }
  transferencia(valor) {
    let novo_saldo = this.get_dinheiro() + valor;
    this.set_dinheiro(novo_saldo);
  }
}
