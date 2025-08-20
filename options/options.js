'use strict';

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    let modeloMinutaPreAnalise = null;
    let idAgrupadorPreAnalise = null;

    chrome.storage.sync.get(['idAgrupadorPreAnalise', 'modeloMinutaPreAnalise'], function (result) {
      if (result.idAgrupadorPreAnalise) {
        idAgrupadorPreAnalise = result.idAgrupadorPreAnalise
        document.getElementById('idAgrupadorPreAnalise').value = idAgrupadorPreAnalise;
      }
      if (result.modeloMinutaPreAnalise) {
        modeloMinutaPreAnalise = result.modeloMinutaPreAnalise;
        document.getElementById('modeloMinutaPreAnalise').value = modeloMinutaPreAnalise;
      }
    });

    document.getElementById('saveConfig').addEventListener('click', function () {
      modeloMinutaPreAnalise = document.getElementById('modeloMinutaPreAnalise').value;
      idAgrupadorPreAnalise = document.getElementById('idAgrupadorPreAnalise').value;

      if (!modeloMinutaPreAnalise || !idAgrupadorPreAnalise) {
        alert('Campos obrigatórios não preenchidos');
      } else {
        chrome.storage.sync.set({
          'idAgrupadorPreAnalise': idAgrupadorPreAnalise,
          'modeloMinutaPreAnalise': modeloMinutaPreAnalise
        }, function () {
          alert('Configurações salvas com sucesso');
        })
      }
    });
  });
})();
