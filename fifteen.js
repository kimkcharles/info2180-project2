$(document).ready(function(){

	var pieces = $("#puzzlearea").children();

	var count=0;
	var x=0; //Left
	var y=0; //Right
	
	/*function setbkgrd(tile){
		let xb=parseInt(tile.style.left);
		let yb=parseInt(tile.style.top);
		tile.style.backgroundPosition = `-${xb}px -${yb}px`;
	}*/
	
	for (var i=0; i<pieces.length; i++){
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
	var counta=0;
	for(i=0;i<4;i++){
		for(let j=0;j<4;j++){
			allspaces.push([i*100, j*100, counta]);
			counta+=1;
		};
	};
	
	
	
	function shuffle(){
		let free_spaces=allspaces.slice();
		//let usedtile=[];
		let ftile;
		function shuff(e){
			
			let c=free_spaces.length;
			let ind=Math.floor(Math.random() * Math.floor(c));
			ftile=free_spaces[ind];
			
			//Assign the piece a free tile
			let xs= ftile[0];
			let ys= ftile[1];
			//let ind= ftile[2];
			e.style.left= `${xs}px`;
			e.style.top= `${ys}px`;
			
			free_spaces.splice(ind,1);
			
		}
		for (var i=0; i<pieces.length; i++){
			let p=pieces[i];
			shuff(p);
		};
		
	}
	
	//$("#shufflebutton").click(shuffle());
	
	//document.getElementById("shufflebutton").onclick =shuffle();

})


