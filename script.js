//set up game variables
let firstCard = null
let secondCard = null
let freezeBoard = false;
let count = 0;
let score = 0;

//run the game set up function
setupGame()

function countUp(count) {
    var div_by = 100,
        speed = Math.round(count / div_by),
        $display = document.querySelectorAll('.count')[0],
        run_count = 1,
        int_speed = 24;

    console.log($display.value)

    var int = setInterval(function () {
        if (run_count < div_by) {

            $display.innerHTML = (speed * run_count);
            run_count++;
        } else if (parseInt($display.innerHTM) < count) {
            var curr_count = parseInt($display.innerHTM) + 1;
            $display.innerHTM = curr_count
        } else {
            clearInterval(int);
        }
    }, int_speed);
}



function randomizeBoard() {

    //setup the board Array
    let board = shuffle(['bash', 'cpp', 'css', 'go', 'html', 'java', 'js', 'python', 'bash', 'cpp', 'css', 'go', 'html', 'java', 'js', 'python'])

    //assign card data its corresponding randomize value
    document.querySelectorAll('.memory-card').forEach((card, i) => {
        card.dataset.value = board[i]
    })
}

function setupGame() {

    //set up each card with on click listener and default image
    document.querySelectorAll('.memory-card').forEach(card => {

        //add on click listener to each card
        card.addEventListener('click', flippedCard)

        //set class name to memory-card default
        card.className = "memory-card default";
    });

    //shuffle the data elements
    randomizeBoard()
    countUp(score);
}

function isGameWon(count) {
    if (count === 8) {
        alert('you won')
        return true
    }

    return false
}


function checkForMatch() {

    //if first card matches second card
    if (firstCard.dataset.value === secondCard.dataset.value) {

        //make it no longer clickable 
        firstCard.removeEventListener('click', flippedCard)
        secondCard.removeEventListener('click', flippedCard)

        //add count by 1
        count++

        //add score 
        score += 1000
        countUp(score);

        //if it doesnt match
    } else {

        //reset the css back to default image
        firstCard.className = "memory-card default";
        secondCard.className = "memory-card default";
        firstCard.addEventListener('click', flippedCard)
        secondCard.addEventListener('click', flippedCard)

        //reduce score

        score -= 200
        countUp(score);
    }

    //check if the game is over

    if (isGameWon(count)) {

        //reset game variables
        firstCard = null
        secondCard = null
        freezeBoard = false;
        count = 0;
        score = 0;

        //reset game
        setupGame()
    }

    //reset values for next round
    firstCard = null
    secondCard = null
    freezeBoard = false;
}

function flippedCard() {

    if (freezeBoard) return

    console.log(this, this.dataset.value)


    if (firstCard === null && secondCard === null) {
        firstCard = this
        this.classList.add(this.dataset.value);
        this.classList.remove('default');
        this.removeEventListener('click', flippedCard)
        return
    }
    if (firstCard !== null && secondCard === null) {
        // if (this === firstCard) return

        secondCard = this
        freezeBoard = true;
        this.classList.add(this.dataset.value);
        this.classList.remove('default');
        this.removeEventListener('click', flippedCard)
    }

    if (firstCard !== null && secondCard !== null) {
        setTimeout(checkForMatch, 750)
    }

}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
