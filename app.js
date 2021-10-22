/* mobile */
if (navigator.platform && 'win16|win32|win64|mac|macintel'.indexOf(navigator.platform.toLowerCase()) < 0) alert("The app doesn't support mobile phone");

/* pc */
const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('controls__color');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const save = document.getElementById('jsSave');

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = ctx.fillStyle = '#2c2c2c';
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

/* canvas */
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else if (!filling) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleCanvasClick() {
    if (filling) ctx.fillRect(0, 0, canvas.width, canvas.height);
}
/* canvas */

/* change mode */
function handleModeClick() {
    if (filling) {
        filling = false;
        mode.innerText = 'FILL';
    } else {
        filling = true;
        mode.innerText = 'PAINT';
    }
}
/* change mode */

/* save */
function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = 'download';
    link.click();
}
/* save */

/* canvas */
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mousedown', () => (painting = true));
canvas.addEventListener('mouseup', () => (painting = false));
canvas.addEventListener('mouseleave', () => (painting = false));
canvas.addEventListener('click', handleCanvasClick);
/* canvas */

/* change color */
Array.from(colors).forEach((color) => color.addEventListener('click', (event) => (ctx.strokeStyle = ctx.fillStyle = event.target.style.backgroundColor)));
/* change color */

/* change range */
range.addEventListener('input', (event) => (ctx.lineWidth = event.target.value));
/* change range */

/* change mode */
mode.addEventListener('click', handleModeClick);
/* change mode */

/* save */
save.addEventListener('click', handleSaveClick);
/* save */
