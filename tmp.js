let backgroundColor = '#f0f0f0';
let col = 'rgb(30, 144, 255)';
let highlightColor = 'rgba(30, 144, 255, 0.2)';

domready(() => {
  let canvas = document.getElementById('canvas');
  let canvasDims = canvas.getBoundingClientRect();
  let cellWidth = 70;
  let cellHeight = cellWidth;
  let ctx = canvas.getContext('2d');
  let activeCells = new Set();
  let previousCell = null;

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvasDims.width, canvasDims.height);

  canvas.addEventListener('click', (e) => {
    let cell = cellData(e.clientX, e.clientY);

    if (activeCells.has(cell.id)) {
      ctx.fillStyle = backgroundColor;
      activeCells.delete(cell.id);
    } else {
      ctx.fillStyle = col;
      activeCells.add(cell.id);
    }
    ctx.fillRect(cell.rectX, cell.rectY, cellWidth, cellHeight);
  });

  canvas.addEventListener('mousemove', (e) => {
    let cell = cellData(e.clientX, e.clientY);
    if (equal(cell, previousCell)) {
      return;
    }
    if (previousCell !== null) {
      ctx.fillStyle = activeCells.has(previousCell.id) ? col : backgroundColor;
      ctx.fillRect(previousCell.rectX, previousCell.rectY, cellWidth, cellHeight);
    }
    console.log(cell, previousCell);
    previousCell = cell;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(cell.rectX, cell.rectY, cellWidth, cellHeight);
    ctx.fillStyle = highlightColor;
    ctx.fillRect(cell.rectX, cell.rectY, cellWidth, cellHeight);
  });

  canvas.addEventListener('mouseleave', (e) => {
    ctx.fillStyle = activeCells.has(previousCell.id) ? col : backgroundColor;
    ctx.fillRect(previousCell.rectX, previousCell.rectY, cellWidth, cellHeight);
    previousCell = null;
  });

  function cellData(mouseX, mouseY) {
    let rect = canvas.getBoundingClientRect();
    let x = mouseX - rect.left;
    let y = mouseY - rect.top;
    let row = Math.floor(y / cellHeight);
    let col = Math.floor(x / cellWidth);
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
