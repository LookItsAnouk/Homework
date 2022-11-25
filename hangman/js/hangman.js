
   

    let answer = "winner";
    let errorCount = 0;
    let guesses = [];
    let maxWrong = 6;
    let guessStatus =null;

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
    
    makeButtons();
    
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
        document.getElementById('hangman').src = './images/gallows' + errorCount + '.jpg';
    }

    function ifWin(){
        if(guessStatus === answer){
            alert("You won!")
        }
    }

    function ifLose(){
        if(errorCount === maxWrong){
            alert("You Lost, Try Again!")
        }
    }

    function guess(){
        guessStatus = answer.split('').map(letter =>(guesses.indexOf(letter) >= 0? letter : " _ ")).join('');
        document.getElementById('guess').innerHTML = guessStatus;
    }

    guess();



    

 //<div id ="gameArea">
// <div id="hangman">
// <h1>Hangman</h1>
// </div>
// <div id="alphabet">

// </div>
// <div id="guess" >
// <p>Guess a Letter:</p>

// </div>
// <div id="buttons">

// </div>