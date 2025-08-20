let mainFrameDoc = null;
let userMainFrame = null;
let isSetup = false;

function setupAutomation() {
  if (!userMainFrame || isSetup) return;

  console.log('✅ Configuração da automação iniciada', userMainFrame.location.href);
  isSetup = true;

  adicionarCaixaAutomacoes(userMainFrame);

  const buscarAutomacao = setInterval(async function () {
    console.log('Buscando continuação de automações');

    const automacaoAtual = sessionStorage.getItem(CHAVE_AUTOMACAO);
    if (automacaoAtual) {
      console.log('Automacao encontrada', automacaoAtual);

      clearInterval(buscarAutomacao);
      sessionStorage.setItem(CHAVE_AUTOMACAO, null);

      let automacaoData = JSON.parse(automacaoAtual);
      switch (automacaoData && automacaoData.automacao) {
        case PRE_ANALISE_PROCESSOS:
          switch (automacaoData.passo) {
            case PRE_ANALISE_PROCESSOS_PASSO_2:
              const tipoSelect = await esperarPeloElemento('#tipoConclusao', { parent: userMainFrame });
              tipoSelect.value = '-1';

              let result = await chrome.storage.sync.get(['idAgrupadorPreAnalise']);
              if (result.idAgrupadorPreAnalise) {
                const agrupadorSelect = await esperarPeloElemento('#idAgrupador', { parent: userMainFrame });
                agrupadorSelect.value = result.idAgrupadorPreAnalise;
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
              break;

            case PRE_ANALISE_PROCESSOS_PASSO_3:
              (await esperarPeloElemento('a[onclick^="openDialog(\'/seeu/processo/preAnalise.do', { parent: userMainFrame })).click();
              const iframeModal = await esperarPeloElemento('iframe', { parent: userMainFrame });
              iframeModal.addEventListener('load', async () => {
                const result = await chrome.storage.sync.get(['modeloMinutaPreAnalise']);
                if (!result.modeloMinutaPreAnalise) {
                  alert('Modelo de minuta não cadastrado');
                } else {
                  const campoTexto = iframeModal.contentDocument.querySelector('#textoPesq');
                  campoTexto.focus();
                  const texto = result.modeloMinutaPreAnalise;
                  enviarCharsToAutoComplete(campoTexto, texto);
                }
              })
          }
      }
    }
  }, 500);

  console.log('✅ Configuração da automação finalizada', userMainFrame.location.href);
}

function checkForFrames() {
  try {
    const mainFrame = document.getElementById('mainFrame');
    if (!mainFrame) {
      return;
    }

    mainFrameDoc = mainFrame.contentDocument;
    if (!mainFrameDoc) {
      return;
    }

    const userMainFrameElement = mainFrameDoc.querySelector('#userMainFrame');
    if (!userMainFrameElement) {
      return;
    }

    const userMainFrameDoc = userMainFrameElement.contentDocument;
    if (!userMainFrameDoc) {
      return;
    }

    if (userMainFrame !== userMainFrameDoc) {
      console.log('🎉 userMainFrame detectado:', userMainFrameDoc.location.href);
      userMainFrame = userMainFrameDoc;
      isSetup = false;

      if (userMainFrame.readyState === 'loading') {
        userMainFrame.addEventListener('DOMContentLoaded', setupAutomation);
      } else {
        setTimeout(setupAutomation, 200);
      }
    }

  } catch (error) {
    // Ignorar erros de same-origin policy silenciosamente
  }
}

setInterval(checkForFrames, 2000);
checkForFrames();

let lastUrl = window.location.href;
setInterval(function () {
  if (lastUrl !== window.location.href) {
    lastUrl = window.location.href;
    console.log('🔄 URL mudou:', lastUrl);
    userMainFrame = null;
    isSetup = false;
  }
}, 1000);

console.log('✅ Monitoramento dos frames iniciado');

function adicionarCaixaAutomacoes(userMainFrame) {
  if (userMainFrame.querySelector('#caixa-automacoes')) {
    return
  }
  const preAnaliseProcessos = new ElementBuilder('button').id('botao-pre-analise').style({ 'margin-bottom': '10px' }).text('Pré-analise de processos')
    .style({ 'margin-left': '10px' })
    .on('click', async () => await preAnalisarProcesso(mainFrameDoc)).build()

  const automacao2 = new ElementBuilder('button').id('botao-pre-analise2').style({ 'margin-bottom': '10px' }).text('Antecipação de Benefícios de Progressão')
    .style({ 'margin-left': '10px' })
    .on('click', async function () {
      alert('clicado')
    }).build()

  const automacao3 = new ElementBuilder('button').id('botao-pre-analise3').style({ 'margin-bottom': '10px' }).text('Intimar Pessoalmente a partir de Despacho PréDeterminado')
    .style({ 'margin-left': '10px' })
    .on('click', async function () {
      alert('clicado')
    }).build()

  const automacao4 = new ElementBuilder('button').id('botao-pre-analise4').style({ 'margin-bottom': '10px' }).text('Instaurar Incidentes a Vencer e Realização de Intimação')
    .style({ 'margin-left': '10px' })
    .on('click', async function () {
      alert('clicado')
    }).build()

  const automacao5 = new ElementBuilder('button').id('botao-pre-analise5').style({ 'margin-bottom': '10px' }).text('Intimação de Ministério Público, Advogado e Defensor Público de uma decisão ou sentença')
    .style({ 'margin-left': '10px' })
    .on('click', async function () {
      alert('clicado')
    }).build()

  const automacao6 = new ElementBuilder('button').id('botao-pre-analise6').style({ 'margin-bottom': '10px' }).text('Instauração dos Incidentes a Vencer e Realização de Citação')
    .style({ 'margin-left': '10px' })
    .on('click', async function () {
      alert('clicado')
    }).build()

  const automacao7 = new ElementBuilder('button').id('botao-pre-analise7').style({ 'margin-bottom': '10px' }).text('Realizar Mudança de Competência no BNMP')
    .style({ 'margin-left': '10px' })
    .on('click', async function () {
      alert('clicado')
    }).build()

  const caixaAutomacoes = new ElementBuilder('div').id('caixa-automacoes').build()
  caixaAutomacoes.appendChild(preAnaliseProcessos)
  caixaAutomacoes.appendChild(automacao2)
  caixaAutomacoes.appendChild(automacao3)
  caixaAutomacoes.appendChild(automacao4)
  caixaAutomacoes.appendChild(automacao5)
  caixaAutomacoes.appendChild(automacao6)
  caixaAutomacoes.appendChild(automacao7)

  const conteudo = userMainFrame.querySelector('#content')
  conteudo.insertAdjacentElement('beforebegin', caixaAutomacoes)
}
