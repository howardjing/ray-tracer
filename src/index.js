import trace from './trace';

const el = document.querySelector('#app');
const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 450;
el.appendChild(canvas);

trace(canvas);
