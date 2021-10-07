var ALL_TILES = [
	'jacob.jpg',
	'andre.png',
	'Dash_Looking_Dashing.png',
	'kalgari.png',
	'Lord_Irobsses.png',
	'snoopy.png',
	'scooby.jpg',
	'trump.jpg',
	'spiderman.jpg',
	'simba.jpg',
	'pelosi.jpg',
	'lincoln.jpg',
	'liberty.jpg',
	'judgejudy.jpg',
	'doubtfire.jpg',
	'danerys.jpg',
	'biden.jpg',
	'thatcher.jpg',
	'benfranklin.jpg',
	'bezos.jpg',
	'bond.jpg',
	'daffy.jpg',
	'david.jpg',
	'einstein.jpg',
	'frodo.jpg',
	'gates.jpg',
	'lennon.jpg',
	'mickey.jpg',
	'monalisa.jpg',
	'musk.jpg',
	'obama.jpg',
	'rabbit.jpg'
];

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

var flipCard = function() {
	if (!document.querySelector(".main").classList.contains('locked')) {
	    this.parentElement.classList.toggle('flipped');
	    //have you flipped 2?
	    var flipped = document.querySelectorAll(".cCard.flipped");
	    if (flipped.length == 2) {
	    	document.querySelector(".main").classList.add('locked');
	    	setTimeout(function(){
	    		if (flipped[0].querySelector(".side.front").style['background-image'] == flipped[1].querySelector(".side.front").style['background-image']) {
	    			flipped.forEach((card) => {
						card.innerHTML = '';
					});
	    		} 
    			flipped.forEach((card) => {
					card.classList.remove('flipped');
				});
	    		document.querySelector(".main").classList.remove('locked');
	    		if (!document.querySelectorAll(".side.front").length) {
	    			document.querySelector(".main").classList.add('solved');
	    		}
			},1000);
	    }
	}
};

function reset(gridSize) {
	document.querySelector(".main").classList.remove('solved');
	var gridHTML = '';
	for (let r=0; r<gridSize; r++) {
		gridHTML += '<div class="cCardRow">';
		for (let c=0; c<gridSize; c++) {
			gridHTML += '<div class="cCard"><div class="side back"></div><div class="side front"></div></div>';
		}
		gridHTML += '</div>'
	}
	document.querySelector('.main').innerHTML = gridHTML;


	var cardFronts = document.querySelectorAll(".side.front");
	var tiles = ALL_TILES.slice(0,cardFronts.length/2);
	tiles = tiles.concat(tiles); //make 2 of each
	tiles = shuffle(tiles);
	cardFronts.forEach((side,i) => {
		side.style['background-image'] = 'url("img/cardfronts/'+tiles[i]+'")';
	});

	var cardBacks = document.querySelectorAll(".side.back");
	for (var i = 0; i < cardBacks.length; i++) {
	    cardBacks[i].addEventListener('click', flipCard, false);
	}
}

document.querySelector('#btn_reset').addEventListener('click', function(){ reset(document.querySelector('#select_size').value); }, false);
reset(4);