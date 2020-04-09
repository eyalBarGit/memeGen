'use strict'



var gCanvas;
var gCtx;
var gBackgroundImg;
var gSelectedImg;

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
        strHtml += `<img id="${img.id}" class="square-photo transition" src="${img.url}" onclick="getSelectedImgID(this.id)" >`
    })
    document.querySelector('.imgs').innerHTML = strHtml

}




function initCanvas() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d')
}


function createNewLine() {
    var txtLine = document.querySelector('.text-line')
    // txtLine.innerHTML = gMeme.Lines[0].txt;
    console.log(gMeme.Lines)
    // document.querySelector('.input-text').innerHTML = `<input type="text"></input>`

}




function toggleVisibility() {
    document.querySelector('.meme-container').classList.toggle('hidden')
    document.querySelector('.gallery-container').classList.toggle('hidden')
}


function getSelectedImgID(id) {
    gMeme.selectedImg = +id;
    gSelectedImg = gMeme.selectedImg

    drawImg(gSelectedImg)
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




function drawText(text, x, y) {
    console.log('drawing')
    gCtx.lineWidth = '2'
    gCtx.strokeStyle = 'red'
    gCtx.fillStyle = 'red'
    gCtx.font = '40px Ariel'
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y);
}


