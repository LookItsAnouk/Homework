
   
    let errorCount = 0;
    let guesses = [];
    let maxWrong = 6;
    let guessStatus =null;
    let words = ['bucket', 'yellow', 'potato', 'cactus', 'octopus', 'branch', 'forest', 'sunshine', 'lemon']
    let answer = '';

    function makeButtons(){
        const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

        let buttons = alphabet.map(letter =>
            `<button type="button"
            id='` + letter + `'
            onClick="doGuess('` + letter + `')"
            >
            `+ letter + `
            </button>`
            ).join('');
        document.getElementById('letters').innerHTML = buttons;

    }
    
    document.addEventListener('keydown', (event)=>{
        doGuess(event.key)
    })
   
    
    
    function setAnswer(){
        answer = words[Math.floor(Math.random() * words.length)]
    }
  

    function doGuess(selectedLetter){
        guesses.indexOf(selectedLetter) === -1 ? guesses.push(selectedLetter) : null;
        document.getElementById(selectedLetter).setAttribute('disabled', true);
        
        if(answer.indexOf(selectedLetter) >= 0) {
            guess();
            ifWin();
        }
        else if(answer.indexOf(selectedLetter) === -1) {
            errorCount++;
            updateHangman();
            ifLose();
        }
    }

    function updateHangman(){
        if(errorCount<=6){
        document.getElementById('hangman').src = './images/gallows' + errorCount + '.jpg';}
    }

    function ifWin(){
        if(guessStatus === answer){
            
            const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/7009");
            audio.play();
            setTimeout(function() {alert("You won!"); },500);
            setTimeout(function() {reset(); },1000);
        }
    }

    function ifLose(){
        if(errorCount === maxWrong){
            const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/7031");
            audio.play();
            setTimeout(function() {alert("You Lost, Try Again!"); },500);
            setTimeout(function() {reset(); },1000);
            }
            
        }
    

    function guess(){
        guessStatus = answer.split('').map(letter =>(guesses.indexOf(letter) >= 0? letter : " _ ")).join('');
        document.getElementById('guess').innerHTML = guessStatus;
    }

    makeButtons();
    setAnswer();
    guess();

    function reset(){
        errorCount = 0;
        guesses = [];
        guessStatus = null;
        guess();
        updateHangman();
        makeButtons();
        setAnswer();
    }
