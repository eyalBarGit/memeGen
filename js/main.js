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
    var strHtml = '';
    gImgs.map(img => {
        strHtml += `<img id="${img.id}" class="square-photo transition" src="${img.url}" onclick="onSelectImg(this.id)" >`
    })
    document.querySelector('.imgs').innerHTML = strHtml

}


function initCanvas() {
    getgCanvas();
    getgCtx();
    resetSelecteLineIdx()
    // resizeCanvas()
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
    
    var input = getInputValue();
    var lastLine = gMeme.Lines[gMeme.Lines.length - 1]

    gMeme.Lines.push({
        posX: (getCanvasWidth() / 2),
        posY: (gMeme.Lines.length) ? (lastLine.posY + 80) : getCanvasHeight() - 410,
        txt: (gMeme.Lines.length) ? input.value : input.value,
        size: 50,
        align: 'center',
        fontColor: 'red',
        stroke: 'white'
    })

    console.log('gMeme.Lines: ', gMeme.Lines)
    console.log('gMeme.selectedLineIdx: ', gMeme.selectedLineIdx)
    renderCanvas();
}



function drawText() {
    var lines = getgMemeLines();
    var lastLine = lines[gMeme.Lines.length -1]
    // console.log('lastLine: ',lastLine)
    for (let i = 0; i < lines.length; i++) {
        const currLine = lines[i];
        var text = currLine.txt;
        var ctx = getgCtx();
        var x = currLine.posX
        var y = currLine.posY

        // DRAW BACK-GROUND FOR TEXT
        ctx.beginPath()
        ctx.fillStyle = 'RGBA(126,122,136,0.53)'
        ctx.fillRect(x - 255, y - currLine.size + 8, getCanvasWidth(), currLine.size);
  
        ctx.moveTo(0, y)
        ctx.lineTo(x + 100, y + 100)
        ctx.closePath();
        
        ctx.beginPath()
        ctx.strokeStyle = 'blue';

        ctx.stroke();
        // DRAW TEXT
        ctx.beginPath()
        ctx.font = `${currLine.size}px Impact`;
        ctx.lineWidth = '2'
        ctx.strokeStyle = currLine.stroke
        ctx.fillStyle = currLine.fontColor
        ctx.textAlign = currLine.align;
        ctx.fillText(text, x, y);
        ctx.strokeText(text, x, y);
        ctx.closePath();
       
    }
 
}



function drawImg() {
    var canvas = getgCanvas()
    var img = new Image();
    img.src = getSelectedImg().url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}



function onSetFontColor(elColor) {
    var fontColor = elColor.value
    setLines('fontColor', fontColor)
    renderCanvas()
}
function onSetStrokeColor(elColor) {
    var strokeColor = elColor.value
    setLines('stroke', strokeColor)
    renderCanvas()
}


function clearCanvas() {
    var canvas = getgCanvas()
    var ctx = getgCtx();
    ctx.clearRect(0, 0, canvas.width, canvas.height)

}



function onLineUp() {
    if (gMeme.selectedLineIdx < 1) return
    decreaseSelectedLineIdx()
    var ctx = getgCtx();

    console.log('gMeme.selectedLineIdx: ', gMeme.selectedLineIdx)
}

function onLineDown() {
    if (gMeme.selectedLineIdx > gMeme.Lines.length - 2) return
    increaseSelectedLineIdx()
    console.log('gMeme.selectedLineIdx: ', gMeme.selectedLineIdx)
}

function onIncreaseFontSize() {
    var size = gMeme.Lines[gMeme.selectedLineIdx].size
    setLines('size', size + 4)
    console.log('size: ', size)
    renderCanvas()
}


function onDecreaseFontSize() {
    var size = gMeme.Lines[gMeme.selectedLineIdx].size
    setLines('size', size -= 4)
    console.log('size: ', size)
    renderCanvas()
}

function onDeleteLine() {
    if (gMeme.selectedLineIdx < 0) return
    var idx = getFromMeme('selectedLineIdx')
    gMeme.Lines.splice(idx, 1)
    decreaseSelectedLineIdx();
    renderCanvas()
}


function onLeftAlign() {
    setLines('align', 'left')
    setLines('side',10)
    // gMeme.Lines['side'] = 0
    renderCanvas()
}
function onRightAlign() {
    setLines('align', 'right')
    setLines('side', 490)
    // gMeme.Lines['side'] = 500
    renderCanvas()
}
function onCenterAlign() {
    setLines('align', 'center')
    // gMeme.Lines['side'] = 250
    setLines('side', 250)
    renderCanvas()
}




function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}





function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }

    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
    .then(function (res) {
        return res.text()
    })
    .then(onSuccess)
    .catch(function (err) {
        console.error(err)
    })
}

