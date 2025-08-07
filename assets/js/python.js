(function () {
  console.log('enviando mensagem para quem estiver ouvindo.')
  chrome.runtime.sendMessage({chave: 'mensagem'}, function (response) {
    console.log('Resposta obtida do background service', response);
  })
})();
