const lyricsContainer = document.getElementById('lyrics');
const lyrics = lyricsContainer.innerHTML.replace(/█/g, '*').replace(/\./g, '.<br>');
const sentences = Array.from(lyrics.split('<br>')).filter(Boolean);

lyricsContainer.innerHTML = lyrics;

const buttonDeobfs = document.getElementById('deobfs')

buttonDeobfs.style.backgroundImage = 'url(./assets/play-solid.svg)'

function speak() {
    buttonDeobfs.style.backgroundImage = 'url(./assets/play-solid.svg)'
    if(speechSynthesis.speaking) {
        speechSynthesis.cancel()
    } else {
        getNoise()
    } 

}

function getNoise()
{
    let currentIndex = 0;

    function updateText(index) {
        const parts = lyrics.split('<br>').filter(Boolean);
        const updatedText = parts.map((part, i) => {
            if (i < index) {
                return `<span class="read">${part}</span><br>`;
            } else if (i === index) {
                return `<span class="highlight">${part}</span><br>`;
            } else {
                return part + '<br>';
            }
        }).join('');
        lyricsContainer.innerHTML = updatedText;
    }

    sentences.forEach(function(elRead, index) {
        let currentUtterance = new SpeechSynthesisUtterance(elRead.trim());
        currentUtterance.onstart = function() {
            updateText(index);
        };
        speechSynthesis.speak(currentUtterance);
    });

    buttonDeobfs.style.backgroundImage = 'url(./assets/pause-solid.svg)'
}