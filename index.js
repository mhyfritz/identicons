'use strict';

let domready = require('domready');
let append = require('insert/append');
let newElement = require('new-element');
let please = require('pleasejs');
let md5 = require('md5');

let styles = require('./style.scss');

function hexToRgb(hex) {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  return { r, g, b };
}

function hexToRgba(hex, alpha) {
  let { r, g, b } = hexToRgb(hex);
  return { r, g, b, a: alpha };
}

function hexToRgbaString(hex, alpha) {
  let { r, g, b, a } = hexToRgba(hex, alpha);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function generateColor(seed=null) {
  let color = please.make_color({ seed })[0];
  return color;
}

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
    this.defaultColor = '#1e90ff';
    this.color = this.defaultColor;
    this.highlightAlpha = 0.2;
    this.highlightColor = hexToRgbaString(this.color, this.highlightAlpha);
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

  drawByBits(bits) {
    for (let i = 0; i <= this.cells.size; i++) {
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
            this.config.color
          );
          let mirrorCell = this.getMirrorCell(cell);
          if (mirrorCell) {
            mirrorCell.isActive = true;
            this.drawRect(
              mirrorCell.x,
              mirrorCell.y,
              this.config.cellWidth,
              this.config.cellHeight,
              this.config.color
            );
          }
        }
      }
    }
  }

  randomPattern() {
    this.resetCanvas();
    // TODO don't hard code number of bits
    let bits = this.randomBits(15);
    this.drawByBits(bits);
  }

  // TODO more generic method for grids other than mirrored 5 x 5
  digest(string) {
    this.resetCanvas();
    let hash = md5(string);
    // use first two chars of hash as offset into cells
    let offset = parseInt(hash.substring(0, 2), 16) % 15;
    // use entire hash as seed for color
    this.config.color = generateColor(hash);
    this.config.highlightColor = hexToRgbaString(this.config.color,
      this.config.highlightAlpha);
    let inputContainer = document.querySelector('.js-input-container');
    let input = document.querySelector('.js-color-input');
    inputContainer.style.backgroundColor = this.config.color;
    input.value = this.config.color;
    let bits = [];
    // use char pairs 3-32 to set cells on/off
    for (let i = 2; i < 32; i += 2) {
      let substring = hash.substring(i, i + 2);
      bits.push(parseInt(substring, 16) % 2 === 0);
    }
    // reorder bits based on offset
    bits = [...bits.slice(bits.length - offset, bits.length),
      ...bits.slice(0, bits.length - offset)];
    this.drawByBits(bits);
  }

  getRelativeCoords(x, y) {
    let relX = x - this.canvasClientRect.left;
    let relY = y - this.canvasClientRect.top;
    return [relX, relY];
  }

  run() {
    let inputContainer = document.querySelector('.js-input-container');
    let input = document.querySelector('.js-color-input');

    inputContainer.style.backgroundColor = this.config.color;
    input.value = this.config.color;

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

    document.querySelector('.js-random-pattern').addEventListener('click', (e) => {
      document.querySelector('.js-digest-input').value = '';
      this.randomPattern();
    });

    document.querySelector('.js-random').addEventListener('click', (e) => {
      let inputContainer = document.querySelector('.js-input-container');
      let input = document.querySelector('.js-color-input');

      this.config.color = generateColor();
      this.config.highlightColor = hexToRgbaString(this.config.color,
        this.config.highlightAlpha);
      inputContainer.style.backgroundColor = this.config.color;
      input.value = this.config.color;
      this.randomPattern();
    });

    document.querySelector('.js-random-color').addEventListener('click', (e) => {
      let color = generateColor();
      this.config.color = color;
      this.config.highlightColor = hexToRgbaString(this.config.color,
        this.config.highlightAlpha);
      let inputContainer = document.querySelector('.js-input-container');
      let input = document.querySelector('.js-color-input');
      inputContainer.style.backgroundColor = this.config.color;
      input.value = this.config.color;
      for (let cell of this.cells.values()) {
        if (cell.isActive) {
          this.drawRect(
            cell.x,
            cell.y,
            this.config.cellWidth,
            this.config.cellHeight,
            this.config.color
          );
        }
      }
    });

    document.querySelector('.js-reset').addEventListener('click', (e) => {
      document.querySelector('.js-digest-input').value = '';
      this.config.color = this.config.defaultColor;
      this.config.highlightColor = hexToRgbaString(this.config.color,
        this.config.highlightAlpha);
      let inputContainer = document.querySelector('.js-input-container');
      let input = document.querySelector('.js-color-input');
      inputContainer.style.backgroundColor = this.config.color;
      input.value = this.config.color;
      this.resetCanvas();
    });

    document.querySelector('.js-digest').addEventListener('click', (e) => {
      let input = document.querySelector('.js-digest-input').value.trim();
      if (input) {
        this.digest(input);
      }
    });

    document.querySelector('.js-digest-input').addEventListener('keypress', (e) => {
      if (e.keyCode === 13) {
        let input = document.querySelector('.js-digest-input').value.trim();
        if (input) {
          this.digest(input);
        }
      }
    });

    document.querySelector('.js-color-input').addEventListener('change', (e) => {
      let newColor = e.target.value;
      let inputContainer = document.querySelector('.js-input-container');

      inputContainer.style.backgroundColor = newColor;
      this.config.color = newColor;
      this.config.highlightColor = hexToRgbaString(this.config.color,
        this.config.highlightAlpha);

      for (let cell of this.cells.values()) {
        if (cell.isActive) {
          this.drawRect(
            cell.x,
            cell.y,
            this.config.cellWidth,
            this.config.cellHeight,
            this.config.color
          );
        }
      }
    });
    //console.log(this);
  }
}

let config = new Config();
let app = new App(config, '.canvas-container');

domready(() => { app.run() });
