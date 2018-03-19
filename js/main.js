var config = {
    apiKey: "AIzaSyB1TwRdjnIgt4WsFoYzhJ4I2I0eVfnhnzc",
    authDomain: "game-a869d.firebaseapp.com",
    databaseURL: "https://game-a869d.firebaseio.com",
    projectId: "game-a869d",
    storageBucket: "",
    messagingSenderId: "405345674206"
  };
const FB = firebase.initializeApp(config);
const DB = FB.database()

var container = document.getElementById('container')
var scoreContainer = document.getElementById('score')
var highScoresContainer = document.getElementById('highScoresContainer')

var ballSize = 150
var timeout;
yPos = 300;
xPos = window.innerWidth /2 - ballSize /2;
xSpeed = 0
ySpeed = 0
var yDir = 1;
var xDir = 1;

var obstacleHeight = 150
var obstacleWidth = 50
var startTime = null
var playing = false
var obstacles = [
	{
		elem: null,
		xPos: window.innerWidth
	},
	{
		elem: null,
		xPos: window.innerWidth + window.innerWidth /2
	}
]



setup()

function setup(){
	drawBall()
	for(var i =0; i < obstacles.length ; i++){
		drawObstacle(i)
	}
	run()
	startTime = (new Date).getTime()
}

function run(){
	moveBall()
	moveObstacles()
	updateScore()
	checkCollisions()
	if (playing){
		timeout = window.requestAnimationFrame(run)
	}
}

function updateScore(){
	var now = (new Date).getTime()
	var currentScore = now - startTime
	scoreContainer.innerHTML = Math.floor(currentScore /100)

}

document.onkeydown = function(e){

	console.log(e)
	if (e.keyCode == 37){
		console.log('should set speed')
		xSpeed = -8
	} else if (e.keyCode == 39 ){
		console.log('should set speed')
		xSpeed = 8
	} else if (e.keyCode == 13 && !playing ){
		highScoresContainer.innerHTML = ''
		restart()
	}
}


function drawObstacle(index){
	var obstacle = document.createElement('DIV')
	obstacle.id = 'obstacle' + index
	obstacle.style.position = 'absolute'
	obstacle.style.width =  obstacleWidth + 'px'
	obstacle.style.height = obstacleHeight + 'px' 
	obstacle.style.background = 'red'
	obstacle.style.bottom = 0
	obstacle.style.left = obstacles[index].xPos + 'px'
	container.appendChild(obstacle)
	obstacles[index].elem = document.getElementById('obstacle' + index)
}

function drawBall(){
	var ball = document.createElement('DIV')
	ball.id = 'ball'
	ball.style.position = 'absolute'
	ball.style.width = ballSize + 'px'
	ball.style.height = ballSize + 'px'
	ball.style.borderRadius = ballSize + 'px'
	ball.style.background = 'red'
	container.appendChild(ball)
}

function moveObstacles(){
	
	for (var i = 0; i < obstacles.length; i++){
		var obs = obstacles[i]
		if (obs.xPos < -obstacleWidth){
			obs.xPos = window.innerWidth
		}
		obs.xPos -= 2;
		obs.elem.style.left = obs.xPos + 'px'
	}
}

function moveBall(){
	ySpeed -= 1
	checkY()
	checkX()
	xPos += xDir * xSpeed;
	yPos += yDir * ySpeed;
	ball.style.bottom = yPos + 'px'
	ball.style.left = xPos + 'px'
	
}

function checkY(){
	if (yPos < 0){
		ySpeed = 25
	}
}

function checkX(){
	if (xPos > window.innerWidth - 150){
		death()
	} else if (xPos < 0){
		death()
	}
}




function death(){
	var deathTime = (new Date).getTime()
	var timeAlive = deathTime - startTime
	var score = Math.floor(timeAlive /1000)
	getScores(score)
	// reset all variables and put enemies off the screen



	yPos = 300;
	xPos = window.innerWidth /2 - ballSize /2
	xSpeed = 0
	ySpeed = 0
	obstacles[0].xPos = window.innerWidth
	obstacles[1].xPos = window.innerWidth + window.innerWidth /2
	playing = false
}


function getScores(score){
	DB.ref('/').once('value').then(function(snapshot) {
  		var results = snapshot.val()
  		var highScore = checkHighScore(score, results[window.localStorage.name])
  		if (highScore){
  			results[window.localStorage.name] = score
  		}
 		printScores(results)
	});
}

function printScores(results){

	var resultsContainer = document.createElement('DIV')
	resultsContainer.id = 'resultsContainer'

	var names = Object.keys(results)

	for(var i = 0; i < names.length; i++){
		var resultContainer = document.createElement('DIV')
		resultContainer.innerHTML = '<h6>' + names[i]+ '</h6><p>' + results[names[i]].score + '</p>'
		resultsContainer.appendChild(resultContainer)
	}
	highScoresContainer.appendChild(resultsContainer)
}


function checkHighScore(score, oldScore){
	if (score > oldScore || !oldScore){
		DB.ref('/' + window.localStorage.name).set({
			score: score
		})
		return score
	} else {
		return false
	}
}

function restart(){
	console.log('restarting')
	startTime = (new Date).getTime()
	playing = true
	run()
}

function checkCollisions(){
	for (var i = 0; i < obstacles.length; i++){
		var obs = obstacles[i]
		if (yPos < obstacleHeight -20 && xPos + ballSize > obs.xPos && obs.xPos + obstacleWidth > xPos){
			death()
		}
	}
}