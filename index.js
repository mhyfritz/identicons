'use strict';

require('./style.css');
var domready = require('domready');

let backgroundColor = '#f0f0f0';

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
    let x = event.clientX;
    let y = event.clientY;
    let row = Math.floor(y / cellHeight);
    let col = Math.floor(x / cellWidth);
    let cell = row * 5 + col;

    console.log(x, y, cell, row, col, row * cellWidth, col * cellHeight);

    ctx.fillStyle = 'DodgerBlue';
    ctx.fillRect(col * cellHeight, row * cellWidth, cellWidth, cellHeight);
  });
});
