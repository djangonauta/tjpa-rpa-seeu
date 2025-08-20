const preAnalisarProcesso = async (mainFrameDoc) => {
  if (confirm('Confirma execução do automação Pré-Análise de Processos?')) {
    console.log('Iniciando pré-análise de processos');

    const menuDespacho = Array.from(mainFrameDoc.querySelectorAll('a'))
      .find(link => link.textContent.trim().toLowerCase() === 'minutas');
    menuDespacho.click();

    const paraDespachoLink = Array.from(mainFrameDoc.querySelectorAll('a'))
      .find(link => link.textContent.trim().toLowerCase() === 'para despacho');
    paraDespachoLink.click();

    const automacaoData = { automacao: PRE_ANALISE_PROCESSOS, passo: PRE_ANALISE_PROCESSOS_PASSO_2 };
    sessionStorage.setItem(CHAVE_AUTOMACAO, JSON.stringify(automacaoData));
  }
}
