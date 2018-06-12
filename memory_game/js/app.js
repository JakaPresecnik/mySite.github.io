
/* Creates a list with icons added from https://fontawesome.com/, and other variables:
      - openCards, for checking pairs in a function,
      - card and cardIndex for easing up function writing,
      - moves variable that gets the number of moves and lets us change them
      - solvedCards for checking if the cards were already paired
      - sec variable used for timer */

var cardList = [
  'fab fa-btc', 'fab fa-btc',
  'fab fa-ethereum', 'fab fa-ethereum',
  'fab fa-html5', 'fab fa-html5',
  'fab fa-css3-alt', 'fab fa-css3-alt',
  'fab fa-js-square', 'fab fa-js-square',
  'fab fa-python', 'fab fa-python',
  'fas fa-coffee', 'fas fa-coffee',
  'fas fa-terminal', 'fas fa-terminal'
];
var openCards = [];
var card;
var solvedCards = [];
var cardIndex;
var moves = $('.moves').text();
var sec = 0;
var stars = 3;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Timer function added from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
function timer() {
  function pad ( val ) { return val > 9 ? val : "0" + val; }
  setInterval( function(){
    $(".seconds").text(pad(++sec%60));
    $(".minutes").text(pad(parseInt(sec/60,10)));
  }, 1000);
}

//  This function adds an animation on re-shuffle
function animateDeck() {
    $('.card').hide().first().show(50, function showNext() {
      $(this).next(".card").show(50, showNext);
    });
}

/*  This function:
    - shuffles the list saving it into another array
    - loops through each card and creates its HTML
    - add each card's HTML to the page  */
function createDeck() {
  newCardList = shuffle(cardList);
  $('.deck i').each(function(index){
    $( this ).addClass(newCardList[index]);
  });
  animateDeck();
}

/*  This function:
    - saves the current card and card index in each own variable
    - checks if the createOpenList function already added the card to openCard list (if statement if a user clicks the same card twice)
      and solvedCards list, if the card is already mached (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes).
    - display the card's symbol,
    - and calls createOpenList function if not */
function openCard() {
  card = $( this )
  cardIndex = card.index('.card');
  if (cardIndex != openCards[0] && !solvedCards.includes(cardIndex)){
    card.addClass('open');
    setTimeout(function(){
      card.addClass('show');
    }, 90);
    createOpenList();
  }
}

/*  This function:
    - adds the card to the openCard list
    - checks if there are already two cards in the openCard list
    - if there are, calls checkOpenCards function
    - noticed a bug and solved it with timeout function, and alert */
function createOpenList() {
  openCards.push(cardIndex);
  if (openCards.length === 2) {
    checkOpenCards();
  } else if (openCards.length > 2) {
    alert('Slow down!');
    setTimeout(function() {
      openCards.push(cardIndex);
    },510);
  }
}

/*  This function:
    - increment moves
    - checks if the two open cards match
    - calls the removingStars function to remove starts
    - if they do:
      - adds the match class to them
      - clears the openCards list
    - if not:
      - calls the closeCards function */
function checkOpenCards() {
    moves++;
    $('.moves').text(moves);
    removingStars();
    if (newCardList[openCards[0]] === newCardList[openCards[1]]){
      $(".card").eq(openCards[0]).removeClass('open');
      $(".card").eq(openCards[1]).removeClass('open');
      $(".card").eq(openCards[0]).addClass('match');
      $(".card").eq(openCards[1]).addClass('match');
      solvedCards.push(openCards[0], openCards[1]);
      openCards = [];
      endGame();
    } else {
      $(".card").eq(openCards[1]).addClass('wrong');
      $(".card").eq(openCards[0]).addClass('wrong');
      closeCards();
    }
}
/*  This function:
    - sets the time the cards stay open
    - removes open and show class of them therefore closes them
    - clears the openCards list */
function closeCards() {
  setTimeout(function(){
    $(".card").eq(openCards[0]).removeClass('open show wrong');
    $(".card").eq(openCards[1]).removeClass('open show wrong');
    openCards = [];
  }, 500);
}

/*  This function:
    - decrements the moves available
    - adds a congratulations screen by removing a hidden class and adding a game_over class
    - is responible for catching all results and displaying them on the screen */
function endGame() {
  if (solvedCards.length === 16) {
    $('.govr').removeClass('hidden');
    $('.govr').addClass('game_over');
    minutes = $('.minutes').text();
    seconds = $('.seconds').text();
    $('.timer_result').text(minutes + ':' + seconds);
    $('.moves_result').text(moves);
    $('.star_ranking').text(stars);
    var win = '<i></i>';
    for(var i = 0; i < stars; i++) {
      win += '<i class="fa fa-star"></i>';
      $('.govr .win').html(win);
    }
  }
}

// This function checks for moves and removes stars acording to moves done
function removingStars() {
  switch(moves) {
    case 15:
      $('.stars li:nth-child(3) i').removeClass('far fa-star');
      $('.stars li:nth-child(3) i').addClass('fa fa-star');
      stars--;
      break;
    case 18:
      $('.stars li:nth-child(2) i').removeClass('far fa-star');
      $('.stars li:nth-child(2) i').addClass('fa fa-star');
      stars--;
      break;
    case 22:
      $('.stars li:nth-child(1) i').removeClass('far fa-star');
      $('.stars li:nth-child(1) i').addClass('fa fa-star');
      stars--;
      break;
    }
}

/*   This function:
      - removes classes
      - re-adds other classes
      - resets moves back to 5
      - resets timer back to 00:00
      - solvedCards to emty list
      - and reshuffles the deck */
function resetGame() {
  cardList.forEach(function(cardClass) {
    $('.card i').removeClass(cardClass);
  })
  $('.card').removeClass( 'match open show' );
  $('.govr').removeClass('game_over');
  $('.govr').addClass('hidden');
  openCards = [];
  moves = 0;
  stars = 3;
  solvedCards = [];
  $('.moves').text(moves);
  $(".seconds").text('00');
  $(".minutes").text('00');
  $('.stars i').removeClass('fa fa-star');
  $('.stars i').addClass('far fa-star');
  sec = 0;
  createDeck();
}

createDeck();
$('.card').click(openCard);
timer();
$('.restart').click(resetGame);
$('.try_again').click(resetGame);
