$(document).ready(function(){

	pieces = $.makeArray($("#puzzlearea").children());


	for (i=0;i<pieces.length;i++){
		pieces[i].classList.add("puzzlepiece");
	}
	
	//Set pieces and the background image 
	for (i=0;i<4;i++){
		pieces[i].style.top                = "0px";
		pieces[i].style.left               = `${100*i}px`;
		pieces[i].style.backgroundPosition = `${-100*i}px 0px`;
	}
	for (i=4;i<8;i++){
		pieces[i].style.top                = "100px";
		pieces[i].style.left               = `${100*(i-4)}px`;
		pieces[i].style.backgroundPosition = ` ${-100*(i-4)}px -100px`
	}
	for (i=8;i<12;i++){
		pieces[i].style.top                = "200px";
		pieces[i].style.left               = `${100*(i-8)}px`;
		pieces[i].style.backgroundPosition = `${-100*(i-8)}px -200px`
	}
	for (i=12;i<15;i++){
		pieces[i].style.top                = "300px";
		pieces[i].style.left               = `${100*(i-12)}px`;
		pieces[i].style.backgroundPosition = `${-100*(i-12)}px -300px`
	}
	
})