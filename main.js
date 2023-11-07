const container = document.querySelector(".container");
const width = 128;
const height = 72;
let pixels = [];

var keys = {};

window.addEventListener('keydown', function (event) {
    keys[event.key] = true;
});

window.addEventListener('keyup', function (event) {
    keys[event.key] = false;
});

function createDivWithClass(x, y, color) {
    var div = document.createElement('div');
    div.className = "pixel";
    div.style.position = 'absolute';
    div.style.left = x + 'px';
    div.style.top = y + 'px';
    div.style.backgroundColor = color;
    return div;
}

class Pixel {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.div = createDivWithClass(this.x, this.y, this.color);
        container.appendChild(this.div);
    }
    changeColor(newColor) {
        this.color = newColor;
        this.div.style.backgroundColor = this.color;
    }
}

function access(y, x) {
    return y * height + x;
}


let x = 0, y = 0;
let keyAt = [15, 15];
function mainLoop() {
    if (keys['w']) y = -1;
    if (keys['s']) y = 1;
    if (keys['a']) x = -1;
    if (keys['d']) x = 1;

    keyAt[0] += x;
    keyAt[1] += y;
    x = 0; y = 0;
    pixels[access(keyAt[0], keyAt[1])].changeColor("#00ffff");
}

function main() {

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            pixels.push(new Pixel(i * 10, j * 10, `rgb(${i}, 50, 50)`));
        }
    }
    setInterval(mainLoop, 1000 / 60);
}

main();