'use strict';

(function () {
  document.addEventListener('DOMContentLoaded', async function () {
    let tipoConclusao = null;
    let modeloMinutaPreAnalise = null;
    let agrupadorPreAnalise = null;

    const result = await chrome.storage.sync.get(['tipoConclusao', 'agrupadorPreAnalise', 'modeloMinutaPreAnalise']);
    if (result.tipoConclusao) {
      tipoConclusao = result.tipoConclusao
      document.getElementById('tipoConclusao').value = tipoConclusao;
    }
    if (result.agrupadorPreAnalise) {
      agrupadorPreAnalise = result.agrupadorPreAnalise
      document.getElementById('agrupadorPreAnalise').value = agrupadorPreAnalise;
    }
    if (result.modeloMinutaPreAnalise) {
      modeloMinutaPreAnalise = result.modeloMinutaPreAnalise;
      document.getElementById('modeloMinutaPreAnalise').value = modeloMinutaPreAnalise;
    }

    document.getElementById('saveConfig').addEventListener('click', function () {
      tipoConclusao = document.getElementById('tipoConclusao').value;
      modeloMinutaPreAnalise = document.getElementById('modeloMinutaPreAnalise').value;
      agrupadorPreAnalise = document.getElementById('agrupadorPreAnalise').value;

      if (!tipoConclusao || !modeloMinutaPreAnalise || !agrupadorPreAnalise) {
        alert('Campos obrigatórios não preenchidos');
      } else {
        chrome.storage.sync.set({
          'tipoConclusao': tipoConclusao,
          'agrupadorPreAnalise': agrupadorPreAnalise,
          'modeloMinutaPreAnalise': modeloMinutaPreAnalise
        }, function () {
          alert('Configurações salvas com sucesso');
        })
      }
    });
  });
})();
