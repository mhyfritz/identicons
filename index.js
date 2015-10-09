'use strict';

let domready = require('domready');
let append = require('insert/append');
let newElement = require('new-element');
let crayons = require('crayola-colors');

let styles = require('./style.css');

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
    this.color = 'DodgerBlue';
    this.highlightColor = 'rgba(30, 144, 255, 0.2)';
    this.mirror = true;
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
    this.canvasClientRect = null;
    this.ctx = null;
    this.previousCell = null;
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
    if (x > (this.config.width - this.config.padding - 1)
        || y > (this.config.height - this.config.padding - 1)) {
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
    let id = row * this.config.cols + col;
    return this.cells.get(id);
  }

  getMirrorCell(cell) {
    let row = Math.floor((cell.y - this.config.padding) / this.config.cellHeight);
    let col = Math.floor((cell.x - this.config.padding) / this.config.cellWidth);
    let mirrorAxis = Math.floor(this.config.cols / 2);
    let mirrorCol;
    // mirror axis:
    if (this.config.cols % 2 === 1 && col === mirrorAxis) {
      return null;
    }
    if (this.config.cols % 2 === 1) {
      let distance = col - mirrorAxis;
      mirrorCol = mirrorAxis - distance;
    } else {
      // TODO
    }
    return this.cells.get(row * this.config.cols + mirrorCol);
  }

  removeHighlight(cell) {
    this.drawRect(
      cell.x,
      cell.y,
      this.config.cellWidth,
      this.config.cellHeight,
      cell.isActive ? this.config.color : this.config.backgroundColor
    );
  }

  exportToPng() {
    let dataUri = this.canvas.toDataURL();
    let win = window.open(dataUri, '_blank');
    win.focus();
  }

  resetCanvas() {
    this.drawRect(
      0,
      0,
      this.config.width,
      this.config.height,
      this.config.backgroundColor
    );
    for (let cell of this.cells.values()) {
      cell.isActive = false;
    }
  }

  randomBits(n) {
    let bits = [];
    for (let i = 0; i < n; i++) {
      bits.push(Math.random() < 0.5);
    }
    return bits;
  }

  randomPattern() {
    this.resetCanvas();
    let palette = Object.keys(crayons);
    let i = Math.floor(Math.random() * palette.length);
    let color = `#${crayons[palette[i]]}`;
    // TODO don't hard code number of bits
    let bits = this.randomBits(15);
    // TODO double check that Map is ordered
    for (i = 0; i <= this.cells.size; i++) {
      let cell = this.cells.get(i);
      let col = i % this.config.cols;
      let mirrorAxis = Math.floor(this.config.cols / 2);
      if (col <= mirrorAxis) {
        let bit = bits.shift();
        if (bit) {
          cell.isActive = true;
          this.drawRect(
            cell.x,
            cell.y,
            this.config.cellWidth,
            this.config.cellHeight,
            color
          );
          let mirrorCell = this.getMirrorCell(cell);
          if (mirrorCell) {
            mirrorCell.isActive = true;
            this.drawRect(
              mirrorCell.x,
              mirrorCell.y,
              this.config.cellWidth,
              this.config.cellHeight,
              color
            );
          }
        }
      }
    }
  }

  getRelativeCoords(x, y) {
    let relX = x - this.canvasClientRect.left;
    let relY = y - this.canvasClientRect.top;
    return [relX, relY];
  }

  run() {
    this.canvas = newElement('<canvas width="{w}" height={h}></canvas>', {
      w: this.config.width,
      h: this.config.height
    });

    append(document.querySelector(this.parentSelector), this.canvas);
    this.canvasClientRect = this.canvas.getBoundingClientRect();
    this.ctx = this.canvas.getContext('2d');
    this.resetCanvas();

    this.canvas.addEventListener('mouseup', (e) => {
      let [x, y] = this.getRelativeCoords(e.clientX, e.clientY);
      let cell = this.getCellByCoords(x, y);
      if (cell === null) {
        return;
      }
      this.drawRect(
        cell.x,
        cell.y,
        this.config.cellWidth,
        this.config.cellHeight,
        cell.isActive ? this.config.backgroundColor : this.config.color
      );
      cell.isActive = ! cell.isActive;
      let mirrorCell = this.getMirrorCell(cell);
      if (mirrorCell !== null) {
        this.drawRect(
          mirrorCell.x,
          mirrorCell.y,
          this.config.cellWidth,
          this.config.cellHeight,
          mirrorCell.isActive ? this.config.backgroundColor : this.config.color
        );
        mirrorCell.isActive = ! mirrorCell.isActive;
      }
    });

    this.canvas.addEventListener('mousemove', (e) => {
      let [x, y] = this.getRelativeCoords(e.clientX, e.clientY);
      let cell = this.getCellByCoords(x, y);
      if (cell === null || cell === this.previousCell) {
        return;
      }
      // remove highlight from cell we just exited
      if (this.previousCell !== null) {
        this.removeHighlight(this.previousCell);
        if (this.config.mirror) {
          let previousMirrorCell = this.getMirrorCell(this.previousCell);
          if (previousMirrorCell !== null) {
            this.removeHighlight(previousMirrorCell);
          }
        }
      }

      this.previousCell = cell;
      this.drawRect(
        cell.x,
        cell.y,
        this.config.cellWidth,
        this.config.cellHeight,
        this.config.backgroundColor
      );
      this.drawRect(
        cell.x,
        cell.y,
        this.config.cellWidth,
        this.config.cellHeight,
        this.config.highlightColor
      );
      if (this.config.mirror) {
        let mirrorCell = this.getMirrorCell(cell);
        if (mirrorCell !== null) {
          this.drawRect(
            mirrorCell.x,
            mirrorCell.y,
            this.config.cellWidth,
            this.config.cellHeight,
            this.config.backgroundColor
          );
          this.drawRect(
            mirrorCell.x,
            mirrorCell.y,
            this.config.cellWidth,
            this.config.cellHeight,
            this.config.highlightColor
          );
        }
      }
    });

    this.canvas.addEventListener('mouseleave', (e) => {
      if (this.previousCell !== null) {
        this.removeHighlight(this.previousCell);
        let mirrorPreviousCell = this.getMirrorCell(this.previousCell);
        if (mirrorPreviousCell !== null) {
          this.removeHighlight(mirrorPreviousCell);
        }
      }
      this.previousCell = null;
    });

    document.querySelector('.js-export').addEventListener('click', (e) => {
      this.exportToPng();
    });

    document.querySelector('.js-random').addEventListener('click', (e) => {
      this.randomPattern();
    });

    document.querySelector('.js-reset').addEventListener('click', (e) => {
      this.resetCanvas();
    });

    console.log(this);
  }
}

let config = new Config();
let app = new App(config, '.canvas-container');

domready(() => { app.run() });
