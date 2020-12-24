class DrawingBoard {
  static brushSize = '2px';
  static currentColor = 'black';

  constructor() {
    this.swatches = document.querySelector('.swatchContainer');
    this.canvas = document.querySelector('#canvas');
    this.attachListeners();
  }

  attachListeners() {
    this.swatchListener();
    this.canvasListeners();
    this.brushSizeListener();
    this.resetListener();
    this.hexSubmitListener();
  }

  resetListener() {
    document.querySelector('.reset').onclick = () => {
      this.canvas.innerHTML = '';

    }
  }

  hexSubmitListener() {
    document.getElementById('customColor').addEventListener('submit', event => {
      event.preventDefault();
      let hexValue = new FormData(event.target).get('hexCode');

      if (/^[0-9a-f]{3}$/.test(hexValue)) {
        DrawingBoard.currentColor = '#' + hexValue;
        document.getElementById('currentHexColor').innerText = '#' + hexValue;
        document.querySelector('.swatchContainer .selected').classList.remove('selected');
      } else {
        document.getElementById('currentHexColor').innerText = 'Invalid Hex Code'; 
      }
    });
  }

  swatchListener() {
    this.swatches.onclick =  event => { 
      let colorSwatch = event.target;

      if (!colorSwatch.classList.contains('swatches')) {
        DrawingBoard.currentColor = colorSwatch.classList[0];
        this.swapSelected(colorSwatch);
        document.getElementById('currentHexColor').innerText = ''; 
      }
    };
  }

  brushSizeListener() {
    [...document.getElementsByClassName('brushContainer')].forEach(brushSize => {
      brushSize.onclick = event => {
        let brush = event.currentTarget;

        DrawingBoard.brushSize = brush.dataset.px;
        this.swapSelected(brush);
      };
    });
  }

  swapSelected(tool) {
    let currentlySelectedTool = tool.parentNode.querySelector('.selected');

    if (currentlySelectedTool) {
      currentlySelectedTool.classList.toggle('selected');
    }

    tool.classList.toggle('selected');
  }

  canvasListeners() {
    this.canvas.onmousedown = event => {
      this.canvas.onmousemove = event => {
        let x = event.pageX;
        let y = event.pageY;
        this.drawPixel(x, y);
      };
    };

    this.canvas.onmouseleave = event => {
      this.canvas.onmousemove = undefined;
    };

    this.canvas.onmouseup = event => {
      this.canvas.onmousemove = undefined;
    };
  }

  drawPixel(x, y) {
    new Pixel(x, y, DrawingBoard.currentColor).draw(this.canvas);
  }
}

class Pixel {
  constructor(x, y) {
    this.element = document.createElement('div');
    this.element.classList.add('pixel');
    this.element.style.background = DrawingBoard.currentColor;
    this.element.style.top = String(y) + 'px';
    this.element.style.left = String(x) + 'px';
    this.element.style.height = DrawingBoard.brushSize;
    this.element.style.width = DrawingBoard.brushSize;
  }

  draw(canvas) {
    canvas.append(this.element);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new DrawingBoard();
});

