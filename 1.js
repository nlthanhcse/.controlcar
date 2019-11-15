window.addEventListener("DOMContentLoaded", function(){
	//left
	var x = document.querySelector(".button_row:nth-child(2) button:first-child");
	console.log(x);
	//right
	var y = document.querySelector(".button_row:nth-child(2) button:last-child");
	console.log(y);
	//up
	var z = document.querySelector(".button_row:nth-child(1) button");
	console.log(z);
	//down
	var w = document.querySelector(".button_row:nth-child(3) button");
	console.log(w);
	//speed
	var speed = 0;
	//max speed
	var maxSpeed = 50;
	//the interval that is added each clicking
	var interval = 10;

	//The block code that handle the key is pressed
	window.onkeydown = checkKey;
	function checkKey(event, choice) {
		console.log(event.keyCode);
        switch (event.keyCode) {
           	case 37: //Left arrow key
              	break;
          	case 38: //Up arrow key
           	  	//Up arrow means speed up
           		if (speed < maxSpeed){
           	 	 	speed += interval;
           	  		changeSpeedBar(speed);
            	}
          	 	//
            	break;
           case 39: //Right arrow key                
             	break;
           case 40: //Down arrow key
           	  	//Up arrow means low down
              	if (speed > 0){
           	 	 	speed -= interval;
           	  		changeSpeedBar(speed);
            	}
              	//               
              	break;
        }
    };
	//

	//The block code that handle the button is click thround the mouse
	//left
	x.addEventListener("click", function(){
	});
	//right
	y.addEventListener("click", function(){
	});
	//up
	z.addEventListener("click", function(){
		//Up arrow clicked
        if (speed < maxSpeed){
          	speed += interval;
           	changeSpeedBar(speed);
        }
        //
	});
	//down
	w.addEventListener("click", function(){
		//Up arrow clicked
        if (speed > 0){
          	speed -= interval;
           	changeSpeedBar(speed);
        }
        //
	});
	//

	//The function that helps to display the current speed
	function changeSpeedBar(speed){
		document.querySelector(".speed_bar .color").style.width = (speed / 5) * 10 + "%";
	}
	//

	//bypass
	var iframe = document.getElementsByTagName('iframe')[0];
	var url = iframe.src;
	var getData = function (data) {
		if (data && data.query && data.query.results && data.query.results.resources && data.query.results.resources.content && data.query.results.resources.status == 200) 
			loadHTML(data.query.results.resources.content);
		else if (data && data.error && data.error.description) loadHTML(data.error.description);
		else loadHTML('Error: Cannot load ' + url);
	};
	var loadURL = function (src) {
		url = src;
		var script = document.createElement('script');
		script.src = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20data.headers%20where%20url%3D%22' + encodeURIComponent(url) +'%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=getData';
		document.body.appendChild(script);
	};
	var loadHTML = function (html) {
		iframe.src = 'about:blank';
		iframe.contentWindow.document.open();
		iframe.contentWindow.document.write(html.replace(/<head>/i, '<head><base href="' + url + '"><scr' + 'ipt>document.addEventListener("click", function(e) { if(e.target && e.target.nodeName == "A") { e.preventDefault(); parent.loadURL(e.target.href); } });</scr' + 'ipt>'));
		iframe.contentWindow.document.close();
	} 
	loadURL(iframe.src);
	//
});