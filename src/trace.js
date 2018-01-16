

const random = (possibilities) =>
  Math.floor(Math.random() * possibilities);

const trace = (canvas) => {
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext('2d');

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      ctx.fillStyle = `rgb(${random(256)},${random(256)},${random(256)})`;
      ctx.fillRect(i, j, 1, 1);
    }
  }
}

export default trace;
