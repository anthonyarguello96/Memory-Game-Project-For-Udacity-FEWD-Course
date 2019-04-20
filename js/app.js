/*
 * Create a list that holds all of your cards
 */
let cardsArray =['fa-diamond', 'fa-diamond',
                'fa-paper-plane-o','fa-paper-plane-o',
                'fa-anchor','fa-anchor',
                'fa-bolt','fa-bolt',
                'fa-cube','fa-cube',
                'fa-leaf','fa-leaf',
                'fa-bicycle','fa-bicycle',
                'fa-bomb','fa-bomb'];


function createCard(anyCard){
  return `<li class="card"><i class="fa ${anyCard}"></i></li>`;
}

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


function createDeckOfCards (){
  let deck= document.querySelector('.deck');
  let cardHTML= shuffle(cardsArray).map(function(cardFromArray){
  return createCard(cardFromArray)
  });
  deck.innerHTML = cardHTML.join('');
}

createDeckOfCards();


//Global scope variables
const movesHTML= document.querySelector('.moves');
let cards= document.querySelectorAll('.card');
let openCards=[];
let movesCount=0;

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// function to keep a count
function count(){
  movesCount+=1;
  movesHTML.innerHTML = movesCount;
}


//Event listener, an d inside it checking for match, with will triger either to flip the cards or apply
//to be display as match.

 for(let card of cards){
   card.addEventListener('click', function(e){

     if(openCards.length<2){
       //card.classList.add('open', 'show');
       card.className= 'card open show';
       openCards.push(card);
       this.style.pointerEvents="none";
       console.log(openCards);
     }

     if(openCards.length===2 && openCards[0].firstElementChild.className===openCards[1].firstElementChild.className){
  //calling count() function to add a number to count
       count();
 //calling checkCount() to fire hideStars() function
       checkCount();
       openCards[0].className= 'card open match';
       openCards[1].className= 'card open match';
       openCards=[];
     }else if(openCards.length===2 && openCards[0].firstElementChild.className!==openCards[1].firstElementChild.className){
         card.classList.add('.no-click');
//calling count() function to add a number to count
               count();
 //calling checkCount() to fire hideStars() function
               checkCount();
        let deck= document.querySelector('.deck');
        deck.style.pointerEvents="none";
         setTimeout(function hide( ){
         openCards[0].className= 'card';
         openCards[1].className= 'card';
         openCards[0].style.pointerEvents="auto";
         openCards[1].style.pointerEvents="auto";
         openCards=[];
         deck.style.pointerEvents="auto";


     }, 2000);

     }
   });
 }

   //Restart Buttom
   const restart= document.querySelector('.restart');
   restart.addEventListener('click', function(e){
     for(let card of cards){
       card.className= 'card';
       card.style.pointerEvents= "auto";
       movesCount=0;
       movesHTML.innerHTML= '0';
       for(let star of starsHTML){
        star.classList.remove('hide');
        }
     }
   });

   //hide stars (does not work)
   function checkCount(){
     if(movesCount ===3 || movesCount ===6 || movesCount===9){
       hideStars();
     }
   }

    const starsHTML= document.querySelectorAll('.stars li');
    function hideStars(){
        for(let star of starsHTML){
         if(star.className!== 'hide'){
         star.classList.add('hide');
         break;
         }
       }
      }


       //starsHTML.innerHTML= '<li><i class="fa fa-star"></i></li>, <li><i class="fa fa-star"></i></li>';
