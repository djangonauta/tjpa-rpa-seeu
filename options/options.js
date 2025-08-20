'use strict';

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    let modeloMinutaPreAnalise = null;
    let agrupadorPreAnalise = null;

    chrome.storage.sync.get(['agrupadorPreAnalise', 'modeloMinutaPreAnalise'], function (result) {
      if (result.agrupadorPreAnalise) {
        agrupadorPreAnalise = result.agrupadorPreAnalise
        document.getElementById('agrupadorPreAnalise').value = agrupadorPreAnalise;
      }
      if (result.modeloMinutaPreAnalise) {
        modeloMinutaPreAnalise = result.modeloMinutaPreAnalise;
        document.getElementById('modeloMinutaPreAnalise').value = modeloMinutaPreAnalise;
      }
    });

    document.getElementById('saveConfig').addEventListener('click', function () {
      modeloMinutaPreAnalise = document.getElementById('modeloMinutaPreAnalise').value;
      agrupadorPreAnalise = document.getElementById('agrupadorPreAnalise').value;

      if (!modeloMinutaPreAnalise || !agrupadorPreAnalise) {
        alert('Campos obrigatórios não preenchidos');
      } else {
        chrome.storage.sync.set({
          'agrupadorPreAnalise': agrupadorPreAnalise,
          'modeloMinutaPreAnalise': modeloMinutaPreAnalise
        }, function () {
          alert('Configurações salvas com sucesso');
        })
      }
    });
  });
})();
