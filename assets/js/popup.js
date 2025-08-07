'use strict';

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('botao').addEventListener('click', function () {
      alert('botão de popup clicado');
    });
  });
})();

console.log(this); // Window
