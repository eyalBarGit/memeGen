'use strict'

var gCanvas = document.querySelector('#my-canvas');;
var gCtx = gCanvas.getContext('2d');

function initPage() {
    var imgs = getImgs()
    renderImgs(imgs);
    console.log('gMeme.Lines.length: ', gMeme.Lines.length);
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
        // gMeme.Lines.splice(gMeme.Lines,1);
        for (let i = 0; i < 1; i++) {
            // debugger
            const line = gMeme.Lines[i];
            gMeme.Lines.splice(line,gMeme.Lines.length-1);
            console.log('line: ', line);
            
        }
        console.log('gMeme.Lines: ', gMeme.Lines);
    }
    resetSelecteLineIdx()
    console.log(' gMeme.Lines.length: ', gMeme.Lines.length);
    console.log(' gMeme.selectedLineIdx: ', gMeme.selectedLineIdx);
    setLines('txt','Change text') 
    setLines('bgColor', 'rgb(255, 0, 0,0.53)')
    
}

function renderImgs(imgs) {
    let strHtml = '';
    imgs.map(img => {
        strHtml += `<img id="${img.id}" class="transition scale-up border-radius shadow" src="${img.url}" onclick="onSelectImg(this.id)" >`
    })
    document.querySelector('.imgs').innerHTML = strHtml
}

function toggleVisibility() {
    document.querySelector('.meme-container').classList.toggle('hidden')
    document.querySelector('.gallery-container').classList.toggle('hidden')
}

function onSelectImg(id) {
    setMeme('selectedImg', +id)
    getImgItem(+id)
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
    pushMeme()
    setLines('bgColor', 'rgb(255, 0, 0,0.53)')
    setPrevLines('bgColor', 'RGBA(0,0,0,0.0)')
    console.log('gMeme.Lines.length: ', gMeme.Lines.length);
    renderCanvas();
}



function drawText() {
    var lines = getMemeLines();
    for (let i = 0; i < lines.length; i++) {
        const currLine = lines[i];
        let side = currLine.side
        let text = currLine.txt;
        let x = currLine.posX;
        let y = currLine.posY;
        let txt = gCtx.measureText(text);
        let txtWidth = txt.width
        let txtHeight = txt.actualBoundingBoxLeft;
        
        // DRAW BACK-GROUND FOR TEXT
        gCtx.beginPath()
        gCtx.fillStyle = currLine.bgColor
        gCtx.fillRect(0, y - currLine.size, getCanvasWidth(), currLine.size + 15);
        gCtx.moveTo(0, y)
        gCtx.lineTo(x + 100, y + 100)
        gCtx.closePath();

        // DRAW TEXT
        gCtx.beginPath()
        gCtx.font = `${currLine.size}px ${currLine.font}`;
        gCtx.lineWidth = '2'
        gCtx.strokeStyle = currLine.stroke
        gCtx.fillStyle = currLine.fontColor
        gCtx.textAlign = currLine.align;
        gCtx.fillText(text, side, y);
        gCtx.strokeText(text, side, y);
        gCtx.closePath();

    }

}


function drawImg() {
    let img = new Image();
    img.src = gMeme.selectedImg.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
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
    let linesPosition = getMemeLinesKey('posY');
    setLines('posY', linesPosition + 15)
    renderCanvas();

}

function onMoveLineUp() {
    let linesPosition = getMemeLinesKey('posY');
    setLines('posY', linesPosition - 15)
    renderCanvas();

}


function onIncreaseFontSize() {
    let size = getMemeLinesKey('size')
    setLines('size', size + 4)
    renderCanvas()
}


function onDecreaseFontSize() {
    let size = getMemeLinesKey('size')
    setLines('size', size - 4)
    renderCanvas()
}
//splice should be on Service
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
    var meme = getMeme();
    var memsToSave = getMemeArr();
    clearTextBg()
    setTimeout(function () {
        const dataURL = gCanvas.toDataURL();
        var savedMeme = {
            id: meme.selectedImg.id,
            url: dataURL
        }

        memsToSave.push(savedMeme)

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
/// change this to service !
function filterImgs(el) {
    let imgs = getImgs();
    var inputValue = el.value
    var filteredImgs = imgs.filter(function (img) {
        return img.keywords.includes(inputValue)
    })
    if (!inputValue) filteredImgs = getImgs();
    renderImgs(filteredImgs)

}


function openAboutModal() {
    document.querySelector('.modal').classList.toggle('hidden')
}

function getCanvas() {
    return gCanvas
}

function getCanvasWidth() {
    return gCanvas.width
}
function getCanvasHeight() {
    return gCanvas.offsetHeight
}

function getgCtx() {
    return gCtx;
}
mouseOver()
function mouseOver() {
    gCanvas.addEventListener('mouseover', function (ev) {
        console.log(ev)
    })
}