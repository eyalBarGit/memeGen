'use strict'

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
    let strHtml = '';
    gImgs.map(img => {
        strHtml += `<img id="${img.id}" class="square-photo transition" src="${img.url}" onclick="onSelectImg(this.id)" >`
    })
    document.querySelector('.imgs').innerHTML = strHtml

}


function initCanvas() {
    getgCanvas();
    getgCtx();
    resizeCanvas()
    resetSelecteLineIdx()
    console.log('start length: ', gMeme.Lines.length)
}


function toggleVisibility() {
    document.querySelector('.meme-container').classList.toggle('hidden')
    document.querySelector('.gallery-container').classList.toggle('hidden')
}



function onSelectImg(id) {
    setMeme('selectedImg', +id)
    setgSelectedImg(+id)
    toggleVisibility()
    drawImg();
    renderCanvas()
}


function renderCanvas() {
    drawImg();
    setTimeout(() => {
        drawText()
    }, 0)

}

function onType() {
    var input = getInputValue();
    setLines('txt', input.value);
    renderCanvas();
}

function getInputValue() {
    return document.querySelector('.txt-input')
}


function onAddLine() {
    clearInput();
    increaseSelectedLineIdx();
    var getLines = getgMemeLines();
    var input = getInputValue();
    var memeLines = getFromMeme('Lines')
    // var lastLine = getLines[gMeme.Lines.length - 1]
    memeLines.push({
        posX: (getCanvasWidth() / 2),
        posY: setLinesPosition(),
        txt: input.value,
        size: 50,
        font: 'Impact',
        align: 'center',
        side: 250,
        fontColor: 'black',
        stroke: 'white',
        bgColor: 'RGBA(126,122,136,0.53)'
    })

    setLines('bgColor', 'rgb(255, 0, 0,0.53)')
    setPrevLines('bgColor', 'RGBA(126,122,136,0.53)')
    console.log('gMeme.Lines: ', gMeme.Lines)
    console.log('gMeme.selectedLineIdx: ', gMeme.selectedLineIdx)
    console.log('gMeme.Lines.length: ', gMeme.Lines.length)

    renderCanvas();
}



function drawText() {
    var lines = getgMemeLines();
    // var lastLine = lines[gMeme.Lines.length - 1]
    for (let i = 0; i < lines.length; i++) {
        const currLine = lines[i];
        let side = currLine.side
        let text = currLine.txt;
        let ctx = getgCtx();
        let x = currLine.posX
        let y = currLine.posY

        // DRAW BACK-GROUND FOR TEXT
        ctx.beginPath()
        ctx.fillStyle = currLine.bgColor
        ctx.fillRect(x - 255, y - currLine.size, getCanvasWidth(), currLine.size + 15);
        ctx.moveTo(0, y)
        ctx.lineTo(x + 100, y + 100)
        ctx.closePath();

        // DRAW TEXT
        ctx.beginPath()
        ctx.font = `${currLine.size}px ${currLine.font}`;
        ctx.lineWidth = '2'
        ctx.strokeStyle = currLine.stroke
        ctx.fillStyle = currLine.fontColor
        ctx.textAlign = currLine.align;
        ctx.fillText(text, side, y);
        ctx.strokeText(text, side, y);
        ctx.closePath();

    }

}


function drawImg() {
    let canvas = getgCanvas()
    let img = new Image();
    img.src = getSelectedImg().url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}



function onSetFontColor(elColor) {
    let fontColor = elColor.value
    setLines('fontColor', fontColor)
    renderCanvas()
}
function onSetStrokeColor(elColor) {
    let strokeColor = elColor.value
    setLines('stroke', strokeColor)
    renderCanvas()
}


function onSelectLineUp() {
    let lineIdx = getFromMeme('selectedLineIdx');
    if (lineIdx < 1) return
    decreaseSelectedLineIdx()
    setNextLines('bgColor', 'RGBA(126,122,136,0.53)')
    setLines('bgColor', 'rgb(255, 0, 0,0.53)')
    renderCanvas()
    console.log('gMeme.selectedLineIdx: ', gMeme.selectedLineIdx)
}

function onSelectLineDown() {
    let lines = getFromMeme('Lines');
    let lineIdx = getFromMeme('selectedLineIdx');
    if (lineIdx > lines.length - 2) return
    increaseSelectedLineIdx()
    setLines('bgColor', 'rgb(255, 0, 0,0.53)')
    setPrevLines('bgColor', 'RGBA(126,122,136,0.53)')
    renderCanvas()
    console.log('gMeme.selectedLineIdx: ', gMeme.selectedLineIdx)
}



function onMoveLineDown(){
   let linesPosition = getgMemeLinesKey('posY');
   console.log('posY: ',linesPosition)
    setLines('posY', linesPosition +15)
    renderCanvas();

}


function onMoveLineUp(){
   let linesPosition =  getgMemeLinesKey('posY');
   console.log('posY: ',linesPosition)
    setLines('posY', linesPosition -15)
    renderCanvas();

}







function onIncreaseFontSize() {
    let size = getgMemeLinesKey('size')
    setLines('size', size + 4)
    renderCanvas()
}


function onDecreaseFontSize() {
    let size = getgMemeLinesKey('size')
    setLines('size', size -= 4)
    console.log('size: ', size)
    renderCanvas()
}

function onDeleteLine() {
    let idx = getFromMeme('selectedLineIdx')
    if (idx < 0) return

    getFromMeme('Lines').splice(idx, 1)
    decreaseSelectedLineIdx();
    console.log('selectedLineIdx-onDelet: ', gMeme.selectedLineIdx)

    if (idx > 0) {
        setLines('bgColor', 'rgb(255, 0, 0,0.53)')
    }

 

    renderCanvas()
    console.log('Lines.length: ', gMeme.Lines.length)
}


function onLeftAlign() {
    let input = getInputValue();
    input.style.direction = 'ltr';
    setLines('align', 'left')
    setLines('side', 10)
    let lines = getgMemeLines()
    lines['side'] = 0
    renderCanvas()
}
function onRightAlign() {
    let input = getInputValue();
    input.style.direction = 'rtl';
    setLines('align', 'right')
    setLines('side', 490)
    let lines = getgMemeLines()
    lines['side'] = 500
    renderCanvas()
}
function onCenterAlign() {
    let input = getInputValue();
    input.style.direction = 'center';
    setLines('align', 'center')
    setLines('side', 250)
    renderCanvas()
}


function getFont(elFont) {
    setLines('font', elFont)
    renderCanvas();
}

