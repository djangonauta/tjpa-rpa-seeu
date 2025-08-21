function esperarPeloElemento(selector, options = {}) {
  const {
    timeout = 5000,
    visible = false,
    parent = document,
    interval = 100,
    all = false
  } = options;

  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    function verificarElemento() {
      const element = all ? parent.querySelectorAll(selector) : parent.querySelector(selector);

      if (element) {
        if (!visible) {
          resolve(element);
          return;
        }

        const rect = element.getBoundingClientRect();
        const isVisible = rect.width > 0 && rect.height > 0 &&
          window.getComputedStyle(element).visibility !== 'hidden';

        if (isVisible) {
          resolve(element);
          return;
        }
      }

      if (Date.now() - startTime >= timeout) {
        reject(new Error(`Elemento ${selector} não foi encontrado em ${timeout}ms`));
        return;
      }

      setTimeout(verificarElemento, interval);
    }

    verificarElemento();
  });
}

function enviarCharsToAutoComplete(campoTexto, texto) {
  for (let i = 0; i < texto.length; i++) {
    const char = texto[i];
    const keyCode = char.charCodeAt(0);

    const keydownEvent = new KeyboardEvent('keydown', {
      key: char,
      keyCode: keyCode,
      which: keyCode,
      charCode: keyCode,
      bubbles: true,
      cancelable: true
    });
    campoTexto.dispatchEvent(keydownEvent);

    const keypressEvent = new KeyboardEvent('keypress', {
      key: char,
      keyCode: keyCode,
      which: keyCode,
      charCode: keyCode,
      bubbles: true,
      cancelable: true
    });
    campoTexto.dispatchEvent(keypressEvent);

    campoTexto.value = texto.substring(0, i + 1);

    const inputEvent = new InputEvent('input', {
      inputType: 'insertText',
      data: char,
      bubbles: true
    });
    campoTexto.dispatchEvent(inputEvent);

    const keyupEvent = new KeyboardEvent('keyup', {
      key: char,
      keyCode: keyCode,
      which: keyCode,
      charCode: keyCode,
      bubbles: true,
      cancelable: true
    });
    campoTexto.dispatchEvent(keyupEvent);
  }
}

function selecionarOpcaoPorLabel(select, label) {
  const option = Array.from(select.options).find(opt => opt.textContent.trim() === label);
  select.value = option.value;
}

class ElementBuilder {
  constructor(tag) {
    this.element = document.createElement(tag);
  }

  id(value) {
    this.element.id = value;
    return this;
  }

  className(value) {
    this.element.className = value;
    return this;
  }

  text(value) {
    this.element.textContent = value;
    return this;
  }

  html(value) {
    this.element.innerHTML = value;
    return this;
  }

  attr(key, value) {
    this.element.setAttribute(key, value);
    return this;
  }

  data(key, value) {
    this.element.dataset[key] = value;
    return this;
  }

  style(styles) {
    Object.assign(this.element.style, styles);
    return this;
  }

  on(event, handler) {
    this.element.addEventListener(event, handler);
    return this;
  }

  append(...children) {
    children.forEach(child => {
      if (typeof child === 'string') {
        this.element.appendChild(document.createTextNode(child));
      } else {
        this.element.appendChild(child);
      }
    });
    return this;
  }

  build() {
    return this.element;
  }
}
