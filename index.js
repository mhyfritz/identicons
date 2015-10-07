'use strict';

require('./style.css');
var domready = require('domready');

let backgroundColor = '#f0f0f0';
let col = 'rgb(30, 144, 255)';
let colHighlight = 'rgba(30, 144, 255, 0.5)';

domready(() => {
  let canvas = document.getElementById('canvas'); 
  let canvasDims = canvas.getBoundingClientRect();
  let cellWidth = 70;
  let cellHeight = cellWidth;
  let ctx = canvas.getContext('2d');
  let cellStates = {};

  for (let x = 0; x < 25; x ++) {
    cellStates[x] = 'off';
  }

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvasDims.width, canvasDims.height);

  canvas.addEventListener('click', (e) => {
    let cell = cellData(e.clientX, e.clientY);
    let fill;

    if (cellStates[cell.id] === 'on') {
      fill = backgroundColor;
      cellStates[cell.id] = 'off';
    } else {
      fill = col;
      cellStates[cell.id] = 'on';
    }

    ctx.fillStyle = fill;
    ctx.fillRect(cell.rectX, cell.rectY, cellWidth, cellHeight);
  });

  function cellData(mouseX, mouseY) {
    let row = Math.floor(mouseY / cellHeight);
    let col = Math.floor(mouseX / cellWidth);
    let id = row * 5 + col;
    let rectX = col * cellWidth;
    let rectY = row * cellHeight;

    return {
      row: row,
      col: col,
      id: id,
      rectX: rectX,
      rectY: rectY
    };
  }
});
