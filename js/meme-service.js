'use strict'
var gCanvas = document.querySelector('#my-canvas');;
var gCtx = gCanvas.getContext('2d');
var gSelectedImg;
const KEY = 'gMeme'
var gMemes = [];



var gImgs = [
    { id: 1, url: 'imgs/meme-imgs_(square)/1.jpg', keywords: ['trump'] },
    { id: 2, url: 'imgs/meme-imgs_(square)/2.jpg', keywords: ['dog'] },
    { id: 3, url: 'imgs/meme-imgs_(square)/3.jpg', keywords: ['baby'] },
    { id: 4, url: 'imgs/meme-imgs_(square)/4.jpg', keywords: ['cat'] },
    { id: 5, url: 'imgs/meme-imgs_(square)/5.jpg', keywords: ['baby'] },
    { id: 6, url: 'imgs/meme-imgs_(square)/6.jpg', keywords: ['crazy'] },
    { id: 7, url: 'imgs/meme-imgs_(square)/7.jpg', keywords: ['baby'] },
    { id: 8, url: 'imgs/meme-imgs_(square)/8.jpg', keywords: ['crazy'] },
    { id: 9, url: 'imgs/meme-imgs_(square)/9.jpg', keywords: ['baby'] },
    { id: 10, url: 'imgs/meme-imgs_(square)/10.jpg', keywords: ['funny'] },
    { id: 11, url: 'imgs/meme-imgs_(square)/11.jpg', keywords: ['funy'] },
    { id: 12, url: 'imgs/meme-imgs_(square)/12.jpg', keywords: ['movies'] },
    { id: 13, url: 'imgs/meme-imgs_(square)/13.jpg', keywords: ['movies'] },
    { id: 14, url: 'imgs/meme-imgs_(square)/14.jpg', keywords: ['movies'] },
    { id: 15, url: 'imgs/meme-imgs_(square)/15.jpg', keywords: ['movies'] },
    { id: 16, url: 'imgs/meme-imgs_(square)/16.jpg', keywords: ['crazy'] },
    { id: 17, url: 'imgs/meme-imgs_(square)/17.jpg', keywords: ['crazy'] },
    { id: 18, url: 'imgs/meme-imgs_(square)/18.jpg', keywords: ['movies'] }

];

var gKeywords = { 'movies': 5, 'funcky puk': 1 }

var gMeme = {
    selectedImg: 1,
    selectedLineIdx: 0,
    Lines: [
        {
            posX: (gCanvas.offsetWidth >= 500) ? (gCanvas.offsetWidth / 2) : (gCanvas.offsetWidth * 200),
            posY: gCanvas.offsetHeight +60,
            txt: 'Change text',
            size: 50,
            align: 'center',
            font: 'Impact',
            side:250,
            fontColor: 'white',
            stroke: 'black',
            font:'Impact',
            bgColor:'rgb(255, 0, 0,0.53)',
            isDragging:false
            
        },

    ]
}


function getItemById(itemId) {
    var item = gImgs.find(item => {
        if (itemId === item.id) {
            return item
        }
    })
    return item
}


function setMeme(key, value) {
    gMeme[key] = value;
}

function getFromMeme(key) {
    return gMeme[key]
}

function setLines(key, value) {
    gMeme.Lines[gMeme.selectedLineIdx][key] = value

}
function setPrevLines(key, value) {
   if(gMeme.selectedLineIdx === 0) return
    gMeme.Lines[gMeme.selectedLineIdx-1][key] = value
}

function setNextLines(key, value) {
    gMeme.Lines[gMeme.selectedLineIdx+1][key] = value
}

function getgMemeLinesKey(key) {
    return gMeme.Lines[gMeme.selectedLineIdx][key]
}

function getgMemeLines() {
    return gMeme.Lines
}

function getgMemes(){
    return gMeme
}

function setgSelectedImg(id) {
    gSelectedImg = getItemById(id)
}

function getSelectedImg() {
    return gSelectedImg
}

function getCanvasWidth() {
    return gCanvas.offsetWidth
}
function getCanvasHeight() {
    return gCanvas.offsetHeight
}

function getgCanvas() {
    return gCanvas
}
function getgCtx() {
    return gCtx;
}
function clearInput() {
    return getInputValue().value = '';

}


function resetSelecteLineIdx() {
    gMeme.selectedLineIdx = 0;
}


function downloadImg(elLink) {
    clearTextBg()
    let imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent

}

function uploadImg(elForm, ev) {
    clearTextBg()
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
    clearTextBg()
    var formData = new FormData(elForm);
    fetch('https://ca-upload.com/here/upload.php', {
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

function clearCanvas() {
    let canvas = getgCanvas()
    let ctx = getgCtx();
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    console.log()
    renderCanvas();
}


function increaseSelectedLineIdx() {
    gMeme.selectedLineIdx++
}
function decreaseSelectedLineIdx() {
    gMeme.selectedLineIdx--
}

function setLinesPosition() {
    if(gMeme.Lines.length === 0){
        return getCanvasHeight() - 440
    }else if(gMeme.Lines.length === 1){
       return getCanvasHeight() - 30
    }
    else{
        return getCanvasHeight()/2
    }
    }


function clearTextBg(){
    setLines('bgColor', 'rgb(0, 0, 0,0.0)')
    renderCanvas()
    setTimeout(function (){
        
        setLines('bgColor', 'rgb(255, 0, 0,0.53)')
        renderCanvas()
    },0)
}

function getImgs(){
    return gImgs
}


function refresh (){
    location.reload()
}