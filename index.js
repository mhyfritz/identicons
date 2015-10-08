'use strict';

require('./style.css');

let domready = require('domready');
let equal = require('deep-equal');

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
  constructor(config, selector) {
    this.config = config;
    this.selector = selector;
    this.canvas = null;
    this.ctx = null;
    this.cells = new Map();
    for (let i = 0; i < this.config.rows * this.config.cols; i++) {
      let x = i * this.config.cols * this.config.cellWidth + this.config.padding;
      let y = i * this.config.rows * this.config.cellHeight + this.config.padding;
      this.cells.set(i, new Cell(x, y, false));
    }
  }

  drawRect(x, y, width, height, color) {
    console.log(x, y, width, height, color);
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  run() {
    this.canvas = document.querySelector(this.selector);
    this.ctx = this.canvas.getContext('2d');

    this.drawRect(0,0, this.config.width, this.config.height,
      this.config.backgroundColor);
  }
}

let config = new Config();
let app = new App(config, '#canvas');

domready(() => { app.run() });
