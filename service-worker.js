chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'abrirAbaIncidentePendente') {
    console.log('solicitação de abertura de nova aba recebida');

    chrome.tabs.create({
      url: request.url,
      active: true
    }).then(tab => {
      sendResponse({ id: tab.id });
    });

    return true;
  }

  if (request.action === 'executarScriptIncidentePendente') {
    chrome.scripting.executeScript({
      target: { tabId: request.tabId },
      func: async function () {
        alert('ok');
        return {
          success: true
        }
      }
    }).then(results => {
      sendResponse({ success: true, results });
    }).catch(error => {
      console.log('Erro ao executar script na aba de incidentes pendentes', error);
      sendResponse({ success: false, error: error.message });
    });

    return true;
  }

  if (request.action === 'fecharAbaIncidentePendente') {
    chrome.tabs.remove(request.tabId).then(() => {
      sendResponse({ sucess: true });
    });

    return true;
  }
});
