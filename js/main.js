

var container = document.getElementById('container')
var scoreContainer = document.getElementById('score')

var timeout;
var yPos = 0;
var xPos = 0;

var yDir = 1;
var xDir = 1;

var xSpeed = 0;
var ySpeed = 25;
var ballSize = 150

var obstacleHeight = 150
var obstacleWidth = 50

var startTime = null

var playing = true

var obstacles = [
	{
		elem: null,
		xPos: 0
	},
	{
		elem: null,
		xPos: window.innerWidth /2
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
		xSpeed -= 2
	} else if (e.keyCode == 39 ){
		xSpeed += 2
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
	console.log('moving obstacles')
	for (var i = 0; i < obstacles.length; i++){
		var obs = obstacles[i]
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

	playing = false
	console.log('death')
	xPos = window.innerWidth /2 - ballSize /2
	xSpeed = 0
}






// function drawObstacle(xPos, i){
// 	var id = 'obstacle' + i
// 	var obstacle = document.createElement('DIV')
// 	obstacle.id = id
// 	obstacle.style.position = 'absolute'
// 	obstacle.style.width =  '50px'
// 	obstacle.style.height = '150px'
// 	obstacle.style.background = 'red'
// 	obstacle.style.bottom = 0
// 	obstacle.style.left = xPos + 'px' 
// 	container.appendChild(obstacle)
// 	obstacles[i].elem = document.getElementById(id)
// }


// function setup(){
// 	drawBall()
// 	for (var i = 0; i < obstacles.length; i++){
// 		drawObstacle(obstacles[i].xPos, i)
// 	}
// 	run()
// }


// function moveObstacles(){
// 	for (var i = 0; i < obstacles.length; i++){
// 		var elem = obstacles[i].elem
// 		obstacles[i].xPos -= 2
// 		elem.style.left = obstacles[i].xPos + 'px'
// 	}
// }

