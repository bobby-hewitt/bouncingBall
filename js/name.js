var nameInput = document.getElementById('nameInput')

nameInput.onkeydown = function(e){
	if(e.keyCode == 13){
		console.log('hello')
		window.localStorage.name = nameInput.value
		window.location.assign('./index.html')
	}
}