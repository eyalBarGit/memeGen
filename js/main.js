'use strict'



var gCanvas;
var gCtx;
var gBackgroundImg;
function initPage() {
    renderImgs();
    initCanvas();
}


function getSection(navItem) {
    if (navItem.innerText === 'MEMES' || navItem.innerText === 'GALLERY') {
        toggleVisibility()
    }
}


function renderImgs() {
    var strHtml = '';
    gImgs.map(img => {
        strHtml += `<img id="${img.id}" class="square-photo transition" src="${img.url}" onclick="drawImg(this.id)" >`
    })
    document.querySelector('.imgs').innerHTML = strHtml

}



function initCanvas() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d')

    
}
function createNewLine(){

    var input = new CanvasInput({
        canvas: document.getElementById('my-canvas')
      });
      return input
}


function drawImg(imgId) {
    toggleVisibility()
    var img = new Image();
    var item = getItemById(+imgId);
    img.src = item.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    }

}


function toggleVisibility() {
    document.querySelector('.meme-container').classList.toggle('hidden')
    document.querySelector('.gallery-container').classList.toggle('hidden')
}