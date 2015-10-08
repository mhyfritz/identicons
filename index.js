'use strict';

require('./style.css');

let domready = require('domready');
let equal = require('deep-equal');
let append = require('insert/append');
let newElement = require('new-element');

class Config {
  constructor() {
    this.cellWidth = 70;
    this.cellHeight = this.cellWidth;
    this.rows = 5;
    this.cols = this.rows;
    this.padding = this.cellWidth / 2;
    this.width = this.cols * this.cellWidth + 2 * this.padding;
    this.height = this.rows * this.cellHeight + 2 * this.padding;
    this.backgroundColor = '#f0f0f0';
  }
}

class Cell {
  constructor(x, y, isActive) {
    this.x = x;
    this.y = y;
    this.isActive = isActive;
  }
}

class App {
  constructor(config, parentSelector) {
    this.config = config;
    this.parentSelector = parentSelector;
    this.canvas = null;
    this.ctx = null;
    this.cells = new Map();
    for (let i = 0; i < this.config.rows * this.config.cols; i++) {
      let x = (i % this.config.cols) * this.config.cellWidth
        + this.config.padding;
      let y = Math.floor(i / this.config.rows) * this.config.cellWidth
        + this.config.padding;
      this.cells.set(i, new Cell(x, y, false));
    }
  }

  drawRect(x, y, width, height, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  isPadding(x, y) {
    if (x < this.config.padding || y < this.config.padding) {
      return true
    }
    if (x > (this.config.width - this.config.padding)
        || y > (this.config.height - this.config.padding)) {
      return true;
    }
    return false;
  }

  getCellByCoords(x, y) {
    if (this.isPadding(x, y)) {
      return null;
    }
    let row = Math.floor((y - this.config.padding) / this.config.cellHeight);
    let col = Math.floor((x - this.config.padding) / this.config.cellWidth);
    let id = row * this.config.rows + col;
    return this.cells.get(id);
  }

  run() {
    this.canvas = newElement('<canvas width="{w}" height={h}></canvas>', {
      w: this.config.width + 2 * this.config.padding,
      h: this.config.height + 2 * this.config.padding
    });

    append(document.querySelector(this.parentSelector), this.canvas);

    this.ctx = this.canvas.getContext('2d');

    this.drawRect(0,0, this.config.width, this.config.height,
      this.config.backgroundColor);

    this.canvas.addEventListener('mousemove', (e) => {
      let cell = this.getCellByCoords(e.clientX, e.clientY);
      if (cell === null) {
        return;
      }
    });
  }
}

let config = new Config();
let app = new App(config, 'body');

domready(() => { app.run() });
