/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, gamePlaying, lastRoll, input;
var diceDOM = document.querySelector('#dice-1');
var diceDOM1 = document.querySelector('#dice-2');

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
	if(gamePlaying){
		//1.random number
		var dice = Math.floor(Math.random()*6)+1;
		var dice1 = Math.floor(Math.random()*6)+1;
		//2.display the result
	
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice +'.png';

		diceDOM1.style.display = 'block';
		diceDOM1.src = 'dice-' + dice1 +'.png';


		if (dice === 6 && lastRoll === 6) {
			console.log("perdeu");
			roundScore = 0;
			scores[activePlayer] = 0;
			document.querySelector("#current-" + activePlayer).textContent = roundScore;
			document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
			nextPlayer();
		} else{
			lastRoll = dice;
			//3. Update the round score IF the rolled number was NOT a 1
			if (dice !== 1 && dice1 !== 1) {
				//Add score
				roundScore += (dice1 + dice);
				document.querySelector("#current-" + activePlayer).textContent = roundScore;
			}else{ 
				nextPlayer();	
			}
		}
	}

});

document.querySelector('.btn-hold').addEventListener('click', function(){
	if (gamePlaying) {
		//Add CURRENT score to GLOBAL score
		scores[activePlayer] += roundScore;

		// Update the score
		document.querySelector('#score-' + activePlayer).textContent = scores	[activePlayer];

		var input = document.getElementById('maxValue').value;
		var winningScore;

		if(input){
			winningScore = input;
		} else {
			winningScore = 100;
		}

		//Check if player won the game
		if (scores[activePlayer]>=winningScore) {
			document.querySelector("#name-" +activePlayer).textContent = "Winner";
			diceDOM.style.display = "none";
			diceDOM1.style.display = "none";
			document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
			document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			//Next Player
			nextPlayer();
		}
	}
})

function nextPlayer(){
	//next player
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	lastRoll = 0;

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	diceDOM.style.display = 'none';
	diceDOM1.style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init)

function init() {
	scores = [0,0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;
	lastRoll = 0;

	diceDOM.style.display = 'none';
	diceDOM1.style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById("name-0").textContent = "Player 1";
	document.getElementById("name-1").textContent = "Player 2";
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}




















