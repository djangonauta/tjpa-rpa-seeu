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

const preAnalisarProcessoPasso2 = async (userMainFrame) => {
  const tipoSelect = await esperarPeloElemento('#tipoConclusao', { parent: userMainFrame });
  tipoSelect.value = '-1';

  let result = await chrome.storage.sync.get(['agrupadorPreAnalise']);
  if (result.agrupadorPreAnalise) {
    const agrupadorSelect = await esperarPeloElemento('#idAgrupador', { parent: userMainFrame });
    selecionarOpcaoPorLabel(agrupadorSelect, result.agrupadorPreAnalise);

  } else {
    alert('Agrupador não configurado');
    return;
  }

  const preAnaliseRadio = await esperarPeloElemento('#processoConclusaoForm > seeu-preference > table:nth-child(2) > tbody > tr > td:nth-child(1) > fieldset > table > tbody > tr:nth-child(1) > td:nth-child(2) > label:nth-child(2) > input[type=radio]', {
    parent: userMainFrame
  });
  preAnaliseRadio.click();

  (await esperarPeloElemento('#searchButton', { parent: userMainFrame })).click();
  automacaoData = { automacao: PRE_ANALISE_PROCESSOS, passo: PRE_ANALISE_PROCESSOS_PASSO_3 };
  sessionStorage.setItem(CHAVE_AUTOMACAO, JSON.stringify(automacaoData));
}

const preAnalisarProcessoPasso3 = async (userMainFrame) => {
  (await esperarPeloElemento('a[onclick^="openDialog(\'/seeu/processo/preAnalise.do', { parent: userMainFrame })).click();

  const iframeModal = await esperarPeloElemento('iframe', { parent: userMainFrame });
  const load = async () => {
    const result = await chrome.storage.sync.get(['modeloMinutaPreAnalise']);

    if (!result.modeloMinutaPreAnalise) {
      alert('Modelo de minuta não cadastrado');
    } else {
      const campoTexto = iframeModal.contentDocument.querySelector('#textoPesq');
      campoTexto.focus();
      const texto = result.modeloMinutaPreAnalise;
      enviarCharsToAutoComplete(campoTexto, texto);

      console.log('passou por aqui');
      const modeloAutoComplete = await esperarPeloElemento('#ajaxAuto_textoPesq ul li', { parent: iframeModal.contentDocument });
      modeloAutoComplete.click();
      iframeModal.removeEventListener('load', load);
    }
  };
  iframeModal.addEventListener('load', load);
}