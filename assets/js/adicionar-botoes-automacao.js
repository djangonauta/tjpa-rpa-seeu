'use strict';

(function () {
  let userMainFrame = null;
  let isSetup = false;

  function setupAutomation() {
    if (!userMainFrame || isSetup) return;

    console.log('✅ Configuração da automação iniciada', userMainFrame.location.href);
    isSetup = true;

    adicionarCaixaAutomacoes(userMainFrame);

    console.log('✅ Configuração da automação finalizada', userMainFrame.location.href);
  }

  function checkForFrames() {
    try {
      const mainFrame = document.getElementById('mainFrame');
      if (!mainFrame) {
        return;
      }

      const mainFrameDoc = mainFrame.contentDocument;
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
    const automacao1 = new ElementBuilder('button').id('botao-pre-analise').style({'margin-bottom': '10px'}).text('Pré-analise de processos')
      .style({ 'margin-left': '10px' })
      .on('click', async function () {
        alert('clicado')
      }).build()
    const automacao2 = new ElementBuilder('button').id('botao-pre-analise2').style({'margin-bottom': '10px'}).text('Antecipação de Benefícios de Progressão')
      .style({ 'margin-left': '10px' })
      .on('click', async function () {
        alert('clicado')
      }).build()
    const automacao3 = new ElementBuilder('button').id('botao-pre-analise3').style({'margin-bottom': '10px'}).text('Intimar Pessoalmente a partir de Despacho PréDeterminado')
      .style({ 'margin-left': '10px' })
      .on('click', async function () {
        alert('clicado')
      }).build()
    const automacao4 = new ElementBuilder('button').id('botao-pre-analise4').style({'margin-bottom': '10px'}).text('Instaurar Incidentes a Vencer e Realização de Intimação')
      .style({ 'margin-left': '10px' })
      .on('click', async function () {
        alert('clicado')
      }).build()
    const automacao5 = new ElementBuilder('button').id('botao-pre-analise5').style({'margin-bottom': '10px'}).text('Intimação de Ministério Público, Advogado e Defensor Público de uma decisão ou sentença')
      .style({ 'margin-left': '10px' })
      .on('click', async function () {
        alert('clicado')
      }).build()
    const automacao6 = new ElementBuilder('button').id('botao-pre-analise6').style({'margin-bottom': '10px'}).text('Instauração dos Incidentes a Vencer e Realização de Citação')
      .style({ 'margin-left': '10px' })
      .on('click', async function () {
        alert('clicado')
      }).build()
    const automacao7 = new ElementBuilder('button').id('botao-pre-analise7').style({'margin-bottom': '10px'}).text('Realizar Mudança de Competência no BNMP')
      .style({ 'margin-left': '10px' })
      .on('click', async function () {
        alert('clicado')
      }).build()

    const caixaAutomacoes = new ElementBuilder('div').id('caixa-automacoes').build()
    caixaAutomacoes.appendChild(automacao1)
    caixaAutomacoes.appendChild(automacao2)
    caixaAutomacoes.appendChild(automacao3)
    caixaAutomacoes.appendChild(automacao4)
    caixaAutomacoes.appendChild(automacao5)
    caixaAutomacoes.appendChild(automacao6)
    caixaAutomacoes.appendChild(automacao7)

    const conteudo = userMainFrame.querySelector('#content')
    conteudo.insertAdjacentElement('beforebegin', caixaAutomacoes)
  }
})();
