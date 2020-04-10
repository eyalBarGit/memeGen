'use strict'
var gCanvas = document.querySelector('#my-canvas');;
var gCtx = gCanvas.getContext('2d');
var gSelectedImg;



var gImgs = [
    { id: 1, url: 'imgs/meme-imgs_(square)/1.jpg', kewords: ['happy'] },
    { id: 2, url: 'imgs/meme-imgs_(square)/2.jpg', kewords: ['happy'] },
    { id: 3, url: 'imgs/meme-imgs_(square)/3.jpg', kewords: ['happy'] },
    { id: 4, url: 'imgs/meme-imgs_(square)/4.jpg', kewords: ['happy'] },
    { id: 5, url: 'imgs/meme-imgs_(square)/5.jpg', kewords: ['happy'] },
    { id: 6, url: 'imgs/meme-imgs_(square)/6.jpg', kewords: ['happy'] },
    { id: 7, url: 'imgs/meme-imgs_(square)/7.jpg', kewords: ['happy'] },
    { id: 8, url: 'imgs/meme-imgs_(square)/8.jpg', kewords: ['happy'] },
    { id: 9, url: 'imgs/meme-imgs_(square)/9.jpg', kewords: ['happy'] },
    { id: 10, url: 'imgs/meme-imgs_(square)/10.jpg', kewords: ['happy'] },
    { id: 11, url: 'imgs/meme-imgs_(square)/11.jpg', kewords: ['happy'] },
    { id: 12, url: 'imgs/meme-imgs_(square)/12.jpg', kewords: ['happy'] },
    { id: 13, url: 'imgs/meme-imgs_(square)/13.jpg', kewords: ['happy'] },
    { id: 14, url: 'imgs/meme-imgs_(square)/14.jpg', kewords: ['happy'] },
    { id: 15, url: 'imgs/meme-imgs_(square)/15.jpg', kewords: ['happy'] },
    { id: 16, url: 'imgs/meme-imgs_(square)/16.jpg', kewords: ['happy'] },
    { id: 17, url: 'imgs/meme-imgs_(square)/17.jpg', kewords: ['happy'] },
    { id: 18, url: 'imgs/meme-imgs_(square)/18.jpg', kewords: ['happy'] }

];

var gKeywords = { 'happy': 12, 'funcky puk': 1 }

var gMeme = {
    selectedImg: 1,
    selectedLineIdx: 0,
    Lines: [
        {
            posX:gCanvas.width/2,
            posY:gCanvas.height - 410,
            txt: 'I never eat Falafel',
            size: 50,
            align: 'left',
            fontColor: 'red',
            stroke: 'white'
        },
 
    ]
}


function increaseSelectedLineIdx() {
    gMeme.selectedLineIdx++
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

function getgMemeLines(key) {
    return gMeme.Lines[gMeme.selectedLineIdx][key]
}

function getgMemeLinesCount() {
    return gMeme.Lines
}

function setgSelectedImg(id) {
    gSelectedImg = getItemById(id)
}

function getSelectedImg() {
    return gSelectedImg
}


// function resizeCanvas() {
//     var elContainer = document.querySelector('.main-try');
//     gCanvas.width = elContainer.offsetWidth;
//     gCanvas.height = elContainer.offsetHeight;
// }

// window.addEventListener('resize', function(){
//     resizeCanvas()
//     renderCanvas();
// }, true)

function getgCanvas(){
    return gCanvas
}
function getgCtx(){
    return gCtx;
}




