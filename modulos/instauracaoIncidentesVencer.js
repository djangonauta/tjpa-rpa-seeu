const TEMPO_ANTES_DE_CARREGAR = 1000;
const TEMPO_ANTES_DE_FECHAR = 1000;

const instaurarIncidentesVencer = async (userMainFrame) => {
  sessionStorage.setItem(CHAVE_AUTOMACAO, null);

  if (confirm("Confirma a execução da automação Instaurar Incidentes a Vencer e Realizar Intimação?")) {
    const tab = await esperarPeloElemento('#tabItemprefix1 > div.tabCenter > a', { parent: userMainFrame });
    tab.click();

    const automacaoData = { automacao: INSTAURAR_INCIDENTES_VENCER, passo: INSTAURAR_INCIDENTES_VENCER_PASSO_2 };
    sessionStorage.setItem(CHAVE_AUTOMACAO, JSON.stringify(automacaoData));
  }
}

const instaurarIncidentesVencerPasso2 = async (userMainFrame) => {
  const link = await esperarPeloElemento('#tabprefix1 > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(2) > a', {
    parent: userMainFrame
  });
  link.click();

  const automacaoData = { automacao: INSTAURAR_INCIDENTES_VENCER, passo: INSTAURAR_INCIDENTES_VENCER_PASSO_3 };
  sessionStorage.setItem(CHAVE_AUTOMACAO, JSON.stringify(automacaoData));
}

const instaurarIncidentesVencerPasso3 = async (userMainFrame) => {
  const todosRadio = await esperarPeloElemento('#idStatusALL', { parent: userMainFrame });
  todosRadio.click();

  const botaoPesquisar = await esperarPeloElemento('#searchButton', { parent: userMainFrame });
  botaoPesquisar.click();

  const automacaoData = { automacao: INSTAURAR_INCIDENTES_VENCER, passo: INSTAURAR_INCIDENTES_VENCER_PASSO_4 };
  sessionStorage.setItem(CHAVE_AUTOMACAO, JSON.stringify(automacaoData));
}

const executarAutomacao = async (tabId) => {
  await chrome.runtime.sendMessage({
    action: 'executarScriptIncidentePendente',
    tabId: tabId
  })
}

const instaurarIncidentesVencerPasso4 = async (userMainFrame) => {
  const ancora = await esperarPeloElemento('#pendenciaIncidenteForm > table.resultTable > tbody > tr:nth-child(1) > td:nth-child(5) > div > a', {
    parent: userMainFrame
  });

  console.log('Enviando solicitação de criação de nova aba');
  const novaAba = await chrome.runtime.sendMessage({
    action: 'abrirAbaIncidentePendente',
    url: ancora.href
  });

  setTimeout(async () => {
    await executarAutomacao(novaAba.id);

    setTimeout(async () => {
      await chrome.runtime.sendMessage({
        action: 'fecharAbaIncidentePendente',
        tabId: novaAba.id
      });
    }, TEMPO_ANTES_DE_FECHAR);

  }, TEMPO_ANTES_DE_CARREGAR);
}