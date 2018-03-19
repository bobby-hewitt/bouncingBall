var nameInput = document.getElementById('nameInput')

nameInput.onkeydown = function(e){
	if(e.keyCode == 13){
		window.localStorage.name = nameInput.value
		window.location.assign('./index.html')
	}
}