$(document).ready(function(){

	var pieces = Array.from($("#puzzlearea").children());

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
			allspaces.push([i*100, j*100]);
			counta+=1;
		};
	};
	
	
	
	

	function tileLocation(tile){
		let left=tile.style.left;
		let top=tile.style.top;
		return [parseInt(`${left}`),parseInt(`${top}`)];
	}


	//console.log(parseInt(`${pieces[1].style.left}`));
	/*
	pieces.forEach(function(e){
		console.log(tileLocation(e));
	})
	//*/

	function findBlankSpace() {
		let emptyTile=[];
		let free_spaces=allspaces.slice();
		let occupied;
		occupiedLocations = pieces.map(function(tile){
			return tileLocation(tile);
		})
		//console.log(`occupied are`);
		//console.log(occupiedLocations);
		//console.log(`matching`);
		//console.log(free_spaces);
		free_spaces.forEach(function(location){
			//console.log(location);
			/*
    		if(!(containsElement(occupiedLocations,location))){
    			emptyTile = location;
    		}
			*/
			///*
			
			occupied=false;
			for(i=0; i<occupiedLocations.length; i++){
				
				if(occupiedLocations[i][0]===location[0] && occupiedLocations[i][1]===location[1]){
					//free_spaces.splice(i,1)
					//let pp=`${occupiedLocations[i]} is equal to ${location} `;
					///console.log(pp);
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

	//let whyy=findBlankSpace();
	//console.log(whyy);

	//console.log(findBlankSpace());
	/*
	$(".explanation").click(function(){
		let whyy=findBlankSpace();
		console.log(whyy);
		alert(`${whyy} and piece 3 is left ${pieces[2].style.left} and top ${pieces[2].style.top}`);
		
	});
	//*/




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
		//console.log(whyy);
		alert(`blank space is ${whyy} and piece 3 is left ${pieces[2].style.left} and top ${pieces[2].style.top}`);
		pieces.forEach(function(e){
			//console.log(tileLocation(e));
			let move=movablePiece(e);
			console.log(`${tileLocation(e)} is movable: ${move}`);
		})
	});

	function moveInBlankSpace(tile){
		let blankLocation = findBlankSpace();
		//let pieceLocation = tileLocation(tile);	
		//Swap location of empty tile and moving tile
		//temp = emptyTileLocation;
		//emptyTileLocation = pieceLocation;
		//pieceLocation = temp;
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
	
	//document.getElementById("shufflebutton").addEventListener("click",shuffle());
	
	function changeBackground(img){
		pieces.forEach(function(tile){
			tile.style.backgroundImage = "url('" +  img.name + "')";
		})
	}
	//$('<div/>',{
	//	'class': 'test',

	//});
	d = document.createElement('div');
	$(d).addClass("cdc")
    	.html("chiv")
    	.appendTo($("#overall"))

    kk = document.createElement('div');
	$(kk).addClass("dc")
    	.html("noo")
    	.appendTo($("#overall"))

    hilight_css = {"border-bottom-color":"red", 
               "background-color":"coral"
           		};
	$(".cdc").css(hilight_css);
	ilight_css = {"border-bottom-color":"red", 
               "background-color":"coral"
           		};
	$(".dc").css(ilight_css);

	var backgrounds_box= $("<div></div>");
	var instructions=$("<div></div>").text("Select the image that you wish to use.");
	var background_options= $("<div></div>").addClass("rows");
	var background_options_r1= $("<div></div>").addClass("r1");
	var background_options_r1= $("<div></div>").addClass("r2");
	var background1= $("<img></img>").addClass("bg").attr({"src":"background.jpg", "width":"80px", "height":"80px"});
	var background2= $("<img></img>").addClass("bg").attr({"src":"bb2.jpg", "width":"80px", "height":"80px"});
	var background3= $("<img></img>").addClass("bg").attr({"src":"bb3.jpg", "width":"80px", "height":"80px"});
	var background4= $("<img></img>").addClass("bg").attr({"src":"bb4.jpg", "width":"80px", "height":"80px"});
	//$("#overall").append(backgrounds_box);
	//backgrounds_box.insertBefore($(#shufflebutton));
	let puzzl=$("#puzzlearea"); 
	backgrounds_box.insertAfter(puzzl);
	backgrounds_box.append(instructions);
	backgrounds_box.append(background_options);
	background_options.append(background1, background2, background3, background4);
	
	///*
	
	
	$(background_options).css({
		"display": "grid",
		"grid-template-columns": "80px 80px",
		"grid-template-rows": "80px 80px"
		//"grid-gap": "2px"
	})

	instructions.css({
		"background-color": "#9370DB",
		"width": "400px",
		"font-size" : "1.25em",
		"text-align": "center",
		"color": "white",
		"border": "1.5px solid #9370DB"
	});
	//*/

	var txt2 = $("<p></p>").text("Text.");   
	txt2.appendTo($("#overall"));
	//$("#puzzlearea").css({"float":"left"});
    //$("p").css("color", "red");
    //var pij=$("#puzzlearea")
    //pij.css.({"border-color": "red"});
    //d.css.("float", "right");
   // $("#shufflebutton").css.("clear","both");

	
	//var txt2 = $("<p></p>").text("Text."); 
	
})


