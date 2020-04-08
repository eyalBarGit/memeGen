'use strict'

function getSection(navItem){
    if(navItem.innerText === 'Memes'){
        document.querySelector('.meme-container').classList.toggle('hidden')
    }
}