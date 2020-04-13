'use strict'

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}


// window.addEventListener('resize', function(){
//     console.log(`${window.innerWidth} px`)
//     var canvas = getCanvas();
//     console.log('canvas.height: ',canvas.offsetHeight)
// })

