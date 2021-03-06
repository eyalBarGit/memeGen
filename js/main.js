'use strict'

function initPage() {
    renderImgs(gImgs);
    initCanvas();
 
}

function getSection(navItem) {
    if (navItem.innerText === 'MEMES') {
        document.querySelector('.meme-container').classList.add('hidden')
        document.querySelector('.gallery-container').classList.add('hidden')
        document.querySelector('.saved-meme-container').classList.remove('hidden')
        renderSavedMemes()
    }

    else if (navItem.innerText === 'GALLERY') {
        document.querySelector('.meme-container').classList.add('hidden')
        document.querySelector('.gallery-container').classList.remove('hidden')
        document.querySelector('.saved-meme-container').classList.add('hidden')
    }

}

function renderImgs(imgs) {

    let strHtml = '';
    imgs.map(img => {
        strHtml += `<img id="${img.id}" class="transition scale-up border-radius shadow" src="${img.url}" onclick="onSelectImg(this.id)" >`
    })
    document.querySelector('.imgs').innerHTML = strHtml

}

function initCanvas() {
    getgCanvas();
    getgCtx();
    resetSelecteLineIdx()
}

function toggleVisibility() {
    document.querySelector('.meme-container').classList.toggle('hidden')
    document.querySelector('.gallery-container').classList.toggle('hidden')
}

function onSelectImg(id) {
    setMeme('selectedImg', +id)
    setgSelectedImg(+id)
    toggleVisibility()
    clearInput();
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
    var input = getInputValue();
    var memeLines = getFromMeme('Lines')

    memeLines.push({
        posX: (getCanvasWidth()),
        posY: setLinesPosition(),
        txt: input.value,
        size: 50,
        font: 'Impact',
        align: 'center',
        side: 250,
        fontColor: 'black',
        stroke: 'white',
        bgColor: 'rgb(255, 0, 0,0.53)',
        isDragging: true
    })

    setLines('bgColor', 'rgb(255, 0, 0,0.53)')
    setPrevLines('bgColor', 'RGBA(0,0,0,0.0)')
    renderCanvas();
}



function drawText() {
    var lines = getgMemeLines();
    for (let i = 0; i < lines.length; i++) {
        const currLine = lines[i];
        let side = currLine.side
        let text = currLine.txt;
        let ctx = getgCtx();
        let x = (gCanvas.offsetWidth >= '500px') ? currLine.posX: (gCanvas.offsetWidth * 200)
        let y = currLine.posY

        // DRAW BACK-GROUND FOR TEXT
        ctx.beginPath()
        ctx.fillStyle = currLine.bgColor
        ctx.fillRect(x -= x, y - currLine.size, getCanvasWidth(), currLine.size + 15);
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
    setNextLines('bgColor', 'RGBA(0,0,0,0.0)')
    setLines('bgColor', 'rgb(255, 0, 0,0.53)')
    renderCanvas()
}



function onSelectLineDown() {
    let lines = getFromMeme('Lines');
    let lineIdx = getFromMeme('selectedLineIdx');
    if (lineIdx > lines.length - 2) return
    increaseSelectedLineIdx()
    setLines('bgColor', 'rgb(255, 0, 0,0.53)')
    setPrevLines('bgColor', 'RGBA(0,0,0,0.0)')
    renderCanvas()
}

function onMoveLineDown() {
    let linesPosition = getgMemeLinesKey('posY');
    setLines('posY', linesPosition + 15)
    renderCanvas();

}

function onMoveLineUp() {
    let linesPosition = getgMemeLinesKey('posY');
    setLines('posY', linesPosition - 15)
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
    renderCanvas()
}

function onDeleteLine() {
    let idx = getFromMeme('selectedLineIdx')
    if (idx < 0) return

    getFromMeme('Lines').splice(idx, 1)
    decreaseSelectedLineIdx();

    if (idx > 0) {
        setLines('bgColor', 'rgb(255, 0, 0,0.53)')
    }
    renderCanvas()
}


function onLeftAlign() {
    let input = getInputValue();
    input.style.direction = 'ltr';
    setLines('align', 'left')
    setLines('side', 0)
    renderCanvas()
}
function onRightAlign() {
    let input = getInputValue();
    input.style.direction = 'rtl';
    setLines('align', 'right')
    setLines('side', 490)
    renderCanvas()
}
function onCenterAlign() {
    let input = getInputValue();
    input.style.direction = 'center';
    setLines('align', 'center')
    setLines('side', getCanvasWidth() / 2)
    renderCanvas()
}

function getFont(elFont) {
    setLines('font', elFont)
    renderCanvas();
}

function onSaveMeme() {
    clearTextBg()
    setTimeout(function () {
        const dataURL = gCanvas.toDataURL();
        var savedMeme = {
            id: gSelectedImg.id,
            url: dataURL
        }
        gMemes.push(savedMeme)
        saveToStorage(KEY, gMemes);
    }, 1)
}

function renderSavedMemes() {
    let savedMemes = loadFromStorage(KEY)
    let strHtml = '';
    strHtml += '<div class = "saved-memes flex space-around">';
    savedMemes.forEach((meme) => {
        strHtml += `<img class ="border-radius shadow"style="width:200px; height:200px"src="${meme.url}"></img></div>`
    })
    document.querySelector('.saved').innerHTML = strHtml

}

function toggleMenu() {
    document.body.classList.toggle('open-menu');
}

function filterImgs(el) {
    let imgs = getImgs();
    var inputValue = el.value
    var filteredImgs = imgs.filter(function (img) {
        return img.keywords.includes(inputValue)
    })
    if (!inputValue) filteredImgs = gImgs
    renderImgs(filteredImgs)

}


function openAboutModal(){
    document.querySelector('.modal').classList.toggle('hidden')
}