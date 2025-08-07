// ServiceWorkerGlobalScope
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('request', request);
  console.log('sender', sender);
  if ('chave' in request) {
    console.log('mensagem recebida, enviando mensagem de volta para o contentScript.')
    sendResponse({mensagem: 'mensagem do background service'})
  }
})
