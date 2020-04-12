'use strict'

function initPage() {
    renderImgs();
    initCanvas();
    // dragLines()
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


function renderImgs() {
    let strHtml = '';
    gImgs.map(img => {
        strHtml += `<img id="${img.id}" class="square-photo transition scale-up" src="${img.url}" onclick="onSelectImg(this.id)" >`
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
    console.log('gMeme.Lines: ', gMeme.Lines)
}

function renderCanvas() {
    drawImg();
    setTimeout(() => {
        drawText()
    },0)

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
        let x = currLine.posX
        let y = currLine.posY

        // DRAW BACK-GROUND FOR TEXT
        ctx.beginPath()
        ctx.fillStyle = currLine.bgColor
        ctx.fillRect(x-=x, y - currLine.size, getCanvasWidth(), currLine.size + 15);
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
    strHtml += '<div class = "saved-memes flex wrap space-around">';
    savedMemes.forEach((meme) => {
        strHtml += `<img class =""style="width:200px; height:200px"src="${meme.url}"></img></div>`
    })
    document.querySelector('.saved').innerHTML = strHtml

}


function toggleMenu() {
    document.body.classList.toggle('open-menu');
}


// function dragLines() {
//     var canvas = getgCanvas();
//     var lines = getgMemeLines()
//     var dragok = false;
//     var BB = canvas.getBoundingClientRect();
//     var offsetX = BB.left;
//     var offsetY = BB.top;
//     var startX;
//     var startY;
//     //     var WIDTH = getCanvasWidth;
//     // var HEIGHT = getCanvasHeight;
//     // handle mousedown events
//     function myDown(e) {

//         // tell the browser we're handling this mouse event
//         e.preventDefault();
//         e.stopPropagation();

//         // get the current mouse position
//         var mx = parseInt(e.clientX - offsetX);
//         var my = parseInt(e.clientY - offsetY);

//         // test each rect to see if mouse is inside
//         dragok = false;
//         for (var i = 0; i < lines.length; i++) {
//             var r = lines[i];
//             if (mx > r.x && mx < r.x + r.width && my > r.y && my < r.y + r.height) {
//                 // if yes, set that rects isDragging=true
//                 dragok = true;
//                 r.isDragging = true;
//             }
//         }
//         // save the current mouse position
//         startX = mx;
//         startY = my;
//     }


//     // handle mouseup events
//     function myUp(e) {
//         // tell the browser we're handling this mouse event
//         e.preventDefault();
//         e.stopPropagation();

//         // clear all the dragging flags
//         dragok = false;
//         for (var i = 0; i < lines.length; i++) {
//             lines[i].isDragging = false;
//         }
//     }


//     // handle mouse moves
//     function myMove(e) {
//         // if we're dragging anything...
//         if (dragok) {

//             // tell the browser we're handling this mouse event
//             e.preventDefault();
//             e.stopPropagation();

//             // get the current mouse position
//             var mx = parseInt(e.clientX - offsetX);
//             var my = parseInt(e.clientY - offsetY);

//             // calculate the distance the mouse has moved
//             // since the last mousemove
//             var dx = mx - startX;
//             var dy = my - startY;

//             // move each rect that isDragging 
//             // by the distance the mouse has moved
//             // since the last mousemove
//             for (var i = 0; i < lines.length; i++) {
//                 var r = lines[i];
//                 if (r.isDragging) {
//                     r.x += dx;
//                     r.y += dy;
//                 }
//             }

//             // redraw the scene with the new rect positions
//            renderCanvas()

//             // reset the starting mouse position for the next mousemove
//             startX = mx;
//             startY = my;

//         }
//     }

//     // listen for mouse events
//     canvas.onmousedown = myDown;
//     canvas.onmouseup = myUp;
//     canvas.onmousemove = myMove;




// }