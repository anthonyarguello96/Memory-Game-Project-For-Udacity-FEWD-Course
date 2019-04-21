//Creating a list that holds all of myu cards
let cardsArray =['fa-diamond', 'fa-diamond',
                'fa-paper-plane-o','fa-paper-plane-o',
                'fa-anchor','fa-anchor',
                'fa-bolt','fa-bolt',
                'fa-cube','fa-cube',
                'fa-leaf','fa-leaf',
                'fa-bicycle','fa-bicycle',
                'fa-bomb','fa-bomb'];

//concatenating the card HTML through template literal
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

//generating the deck of cards
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
let matchedCards=[];

//Setting up the timer


 let seconds= 0;
 let minutes= 0;
 let displaySeconds=0;
 let displayMinutes=0;
 let interval = null;
//This variable is used to define the status of the stopWatch.
// It is use also as a condition to triger the start() function (starts timer)
 let status="stopped";


 // stopwatch function
     function stopWatch(){
       seconds++;
       if(seconds/60===1){
         seconds=0;
         minutes++;
       }

   //This block of code will add a leadig zero while second or minutes are
   //less than 10.

     if(seconds<10){
       displaySeconds="0"+seconds.toString();
     }else{
       displaySeconds=seconds;
     }
     if(minutes<10){
       displayMinutes="0"+minutes.toString();
     }else{
       displayMinutes=minutes;
     }
  //display the time after adding the leading zero
   document.getElementById("display_timer").innerHTML = displayMinutes+":"+displaySeconds;

     }

  //this function starts the timer
     function start(){
       if(status=== "stopped"){
         interval=window.setInterval(stopWatch, 1000);
         status="started";
       }
     }

  //this  function stops the timer
     function stop(){
       window.clearInterval(interval);
       status="stopped";

     }
 //this  function resets the timer
     function resetStopWatch(){
       window.clearInterval(interval);
       seconds=0;
       minutes=0;
       document.getElementById('display_timer').innerHTML="00:00";
     }


// function to keep a count of the mnoves
function count(){
  movesCount+=1;
  movesHTML.innerHTML = movesCount;
}


//Event listener, which through a "for of loop" will be checking for matches.
//Once found the mathcing cards, the style changes will be apply.
 for(let card of cards){
   card.addEventListener('click', function(e){
//calling the timer starter function
     start();
     if(openCards.length<2){
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
       matchedCards.push(openCards[0]);
       matchedCards.push(openCards[1]);
       console.log(matchedCards.length);
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

   //Restart Buttom for the score panel

   function restartButton(){
     for(let card of cards){
       card.className= 'card';
       card.style.pointerEvents= "auto";
        //createDeckOfCards();
     }

     for(let star of starsHTML){
      star.classList.remove('hide');
      }
     movesCount=0;
     movesHTML.innerHTML= '0';
      resetStopWatch();
   }

   const restart= document.querySelector('.restart');
   restart.addEventListener('click', function(e){
     restartButton();
   });
let starCount=3;
   //hide stars
   function checkCount(){
     if(movesCount ===15 || movesCount ===20 || movesCount===25){
       hideStars();
       starCount-=1;
     }
   }

   //Crating the function which will be hiden the stars.
    const starsHTML= document.querySelectorAll('.stars li');
    function hideStars(){
        for(let star of starsHTML){
         if(star.className!== 'hide'){
         star.classList.add('hide');
         break;
         }
       }
      }

//creatig modal
    function passingModalStats(){
      const modalTime = document.querySelector('.modal_time');
      const timer = document.getElementById("display_timer").innerHTML
      const modalMoves = document.querySelector('.modal_moves');
      const modalStars = document.querySelector('.modal_stars');

      modalTime.innerHTML= `Your Time = ${timer}`;
      modalMoves.innerHTML =`Used Moves = ${movesCount}`;
      modalStars.innerHTML =`Stars left = ${starCount}`;
    }

//function to display modal once the game is over
    function displayModal(){
      for(card of cards){
        card.className='card hide match';
      }
      const modalBackground= document.querySelector('.mondalBackground');
      modalBackground.classList.remove('hide');
    }

    let deck= document.querySelector('.deck');
    deck.addEventListener('click',function(){
      if(matchedCards.length===16){
        passingModalStats();
        displayModal();
        stop();
      }
    });

//setting up modal replay button...(this one actually resets the timer)
    document.querySelector('.replayButton').addEventListener('click', function(){
      restartButton();
      const modalBackground= document.querySelector('.mondalBackground');
      modalBackground.classList.add('hide');
      matchedCards=[];
      starCount=3;
    });
