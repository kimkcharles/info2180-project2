$(document).ready(function(){

	var pieces = $("#puzzlearea").children();

	var count=0;
	var x=0; //Left
	var y=0; //Right
	
	
	for (var i=0; i<pieces.length-1; i++){
		//Adding "puzzlepiece" class to the tiles
		pieces[i].classList.add("puzzlepiece");
		//Positioning the tiles correctly
		pieces[i].style.left= `${x}px`;
		pieces[i].style.top= `${y}px`;
		//Positioning the background image with respect to each tile
		pieces[i].style.backgroundPosition = `-${x}px -${y}px`;
		x+=100;
		count+=1;
		if(count%4==0){
			y+=100;
			x=0;
		};
		
	};
	
	//All spaces that can be occupied in the puzzle
	var allspaces=[];
	for(i=0;i<4;i++){
		for(j=0;j<4;j++){
			allspaces.push([i*100,j*100]);
		};
	};
	
	function shuffle(){
		let free_spaces=allspaces.slice();
		pieces.forEach(function(e){
			this.style.left= `${x}px`;
			this.style.top= `${y}px`;
			this.style.backgroundPosition = `-${x}px -${y}px`;
			
		}
		);
	}
	

})