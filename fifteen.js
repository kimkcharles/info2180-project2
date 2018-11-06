$(document).ready(function(){
//Extra Feature: Random background image is chosen by the game on startup and the player can change the background image
	var pieces = Array.from($("#puzzlearea").children());

	var count=0;
	var x=0; //Left
	var y=0; //Right
	
	
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
			allspaces.push([i*100, j*100]);
			counta+=1;
		};
	};
	
	
	
	

	function tileLocation(tile){
		let left=tile.style.left;
		let top=tile.style.top;
		return [parseInt(`${left}`),parseInt(`${top}`)];
	}

	function findBlankSpace() {
		let emptyTile=[];
		let free_spaces=allspaces.slice();
		let occupied;
		occupiedLocations = pieces.map(function(tile){
			return tileLocation(tile);
		})
		

		free_spaces.forEach(function(location){
			occupied=false;
			for(i=0; i<occupiedLocations.length; i++){
				
				if(occupiedLocations[i][0]===location[0] && occupiedLocations[i][1]===location[1]){
					occupied=true;
					break;
				}else{
					occupied=false;
				}
			}
			if (!occupied) {
				emptyTile=location;
			}
			//*/

		})
		return emptyTile;
	}

	

	function movablePiece(piece){
		let tile=tileLocation(piece);
		let blank=findBlankSpace();
		if(tile[0] === blank[0] && tile[1] === blank[1] + 100){
			return true;
		}
		if(tile[0] === blank[0] && tile[1] === blank[1] - 100){
			return true;
		}
		if(tile[1]   === blank[1] && tile[0] === blank[0] - 100){
			return true;
		}
		if(tile[1]   === blank[1] && tile[0] === blank[0] + 100){
			return true;
		}
		return false;
	}

	
		
	$(".explanation").click(function(){
		let whyy=findBlankSpace();
		alert(`blank space is ${whyy} and piece 3 is left ${pieces[2].style.left} and top ${pieces[2].style.top}`);
		pieces.forEach(function(e){			
			let move=movablePiece(e);
			console.log(`${tileLocation(e)} is movable: ${move}`);
		})
	});

	function moveInBlankSpace(tile){
		let blankLocation = findBlankSpace();
		let pieceLocation = findBlankSpace();

		changeTileLocation(tile, pieceLocation[0],pieceLocation[1]);
	}


	function changeTileLocation(tile, left, top){
		tile.style.left = `${left}px`;
		tile.style.top  = `${top}px`;
	}

	//To move a puzzle piece that has a blank space next to it
	$(".puzzlepiece").click(function(){
		if(movablePiece(this)){
			moveInBlankSpace(this);
		}
	});

	//Highlights if it can be moved
	$(".puzzlepiece").hover(function(){
		if(movablePiece(this)){
			$(this).toggleClass("movablepiece");
		};
		}
	);

	function shuffle(){
		let count=0;
		while(count < 200){
			let neighbours = pieces.filter(function(tile){
			return movablePiece(tile);
		});
			let randomNeighbour = neighbours[Math.floor(Math.random() * (neighbours.length))]
			moveInBlankSpace(randomNeighbour);
			count++;
		}
	}
	
	
	$("#shufflebutton").click(function(){
		shuffle()
	});
	
	function changeBackground(img){
		pieces.forEach(function(tile){
			tile.style.backgroundImage = "url('" +  img.name + "')";
		})
	}
	

	var backgrounds_box= $("<div></div>");
	var instructions=$("<div></div>").text("Select the image that you wish to use.");
	var background_options= $("<div></div>").addClass("rows");
	var background1= $("<img></img>").addClass("bg").attr({"src":"background.jpg" });

	var background2= $("<img></img>").addClass("bg").attr({"src":"bb2.jpg" });
	var background3= $("<img></img>").addClass("bg").attr({"src":"bb3.jpg" });
	var background4= $("<img></img>").addClass("bg").attr({"src":"bb4.jpg" });
	var background5= $("<img></img>").addClass("bg").attr({"src":"bb5.jpg" });
	var background6= $("<img></img>").addClass("bg").attr({"src":"bb6.jpg" });
	var background7= $("<img></img>").addClass("bg").attr({"src":"bb7.jpg" });
	var background8= $("<img></img>").addClass("bg").attr({"src":"bb8.jpg" });
	
	let puzzl=$("#puzzlearea"); 
	backgrounds_box.insertAfter(puzzl);
	backgrounds_box.append(instructions);
	backgrounds_box.append(background_options);
	background_options.append(background1, background2, background3, background4, background5, background6, background7, background8);
	
	
	$(".bg").css({
		"border":"2px solid coral",
		"width":"96px",
		"height":"96px"

	})
	
	background_options.css({
		"display": "grid",
		"grid-template-columns": "repeat(4, 100px)",
		"grid-template-rows": "repeat(2, 100px)"
	})

	 backgrounds_box.css({
	 	"margin-top": "10px"
	 })

	instructions.css({
		"background-color": "#9370DB",
		"width": "398px",
		"font-size" : "1.25em",
		"text-align": "center",
		"color": "white",
		"border": "1.5px solid #9370DB"
	});
	
	
	var b_options=Array.from(background_options.children());
	
	function selectImage(im){
		pieces.forEach(function(puzzlepiece){
			puzzlepiece.style.backgroundImage = "url('" +  im.src + "')";
		})
	}

	function randomImg(){
		let len=b_options.length;
		let ri = Math.floor(Math.random()*len);
		console.log(b_options[ri].src);
		selectImage(b_options[ri]);
		
	}

	randomImg();

	

	b_options.forEach(function(im){
		$(im).click(function(){
			selectImage(im);
		});
	});
	
})


