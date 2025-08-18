'use strict';

function esperarPeloElemento(selector, options = {}) {
  const {
    timeout = 5000,
    visible = false,
    parent = document,
    interval = 100
  } = options;

  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    function verificarElemento() {
      const element = parent.querySelector(selector);

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
