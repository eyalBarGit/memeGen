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
    setTimeout(()=>{
        drawText()
    },0)
  
}

function onType () {
//   var input =  getInputValue();
//     setLines('txt',input);
    // renderCanvas();
}

function getInputValue(){
    return document.querySelector('.txt-input').value

    
}
// make x & y locations and make the added lines frome those coords

function drawText() {
    var lines = getgMemeLinesCount();
    for (let i = 0; i < lines.length; i++) {
        // debugger
        // debugger
        var text = lines[i].txt;
        var ctx = getgCtx();
        var x =  lines[i].posX
        var y =  lines[i].posY
        
        ctx.font =`${lines[i].size}px Impact`;
        ctx.lineWidth = '2'
        ctx.strokeStyle = lines[i].stroke
        ctx.fillStyle = lines[i].fontColor
        ctx.textAlign = 'center';
        ctx.fillText(text, x, y);
        ctx.strokeText(text, x, y);
        
        // var text = getgMemeLines('txt')
        // var ctx = getgCtx();
        // var x =  getgMemeLines('posX')
        // var y =  getgMemeLines('poxY')
        
        // ctx.font =`${getgMemeLines('size')}px Impact`;
        // ctx.lineWidth = '2'
        // ctx.strokeStyle = getgMemeLines('stroke')
        // ctx.fillStyle = getgMemeLines('fontColor')
        // ctx.textAlign = 'center';
        // ctx.fillText(text, x, y);
        // ctx.strokeText(text, x, y);
        
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



function onSetFontColor(elColor){
    var fontColor = elColor.value
    // setLines('fontColor',fontColor)
    renderCanvas()
}
function onSetStrokeColor(elColor){
    var strokeColor = elColor.value
    setLines('stroke',strokeColor)
    renderCanvas()
}


function clearCanvas() {
    var canvas = getgCanvas()
    var ctx = getgCtx();
    ctx.clearRect(0, 0, canvas.width, canvas.height)

}

function onAddLine(){
    increaseSelectedLineIdx()
    var input = getInputValue()
    var lastLine = gMeme.Lines[gMeme.Lines.length-1]
    gMeme.Lines.push({
        posX:gCanvas.width/2,
        posY:lastLine.posY + 60,
        txt: input,
        size: 50,
        align: 'left',
        fontColor: 'red',
        stroke: 'white'
    })
    
    console.log('gMeme.Lines: ',gMeme.Lines)
    console.log('gMeme.selectedLineIdx: ',gMeme.selectedLineIdx)
    renderCanvas();
}



// function increaseFontSize(){
//     var idx = getFromMeme('selectedLineIdx') 
//   var size = getgMemeLines('size')
//   size +=2
//   console.log('size',size)
//   renderCanvas()
// }





