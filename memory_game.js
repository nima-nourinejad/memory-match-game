let size = 7;
let level = 6;
let btn = document.createElement("button");
btn.textContent = "Start Game";
btn.addEventListener('click', start);
document.getElementById('btn_container').appendChild(btn);
function start(){
	let cl = 0;
	let score = 0;
	let started = 0;
	document.getElementById('score_container').innerHTML = '';
	document.getElementById('game_container').innerHTML = '';
	function addPieces(){
		for (let i = 1; i < size + 1; i++){
			for (let j = 1; j < size + 1; j++){
				let piece = document.createElement('button');
				piece.classList.add("piece");
				piece.style.setProperty('grid-row', `${i} / ${i + 1}`);
				piece.style.setProperty('grid-column', `${j} / ${j + 1}`);
				piece.id = `piece_${i}${j}`;
				piece.addEventListener('click', (event)=>{
					if (started){
						if (cl < level){
							let piece = event.currentTarget;
							if (parseInt(piece.getAttribute('active'))){
								piece.style.setProperty('background-color', 'green');
								score++;
								cl++
							}
							else{
								piece.style.setProperty('background-color', 'red');
								cl++;
							}
						}
						if (cl === level){
							let text;
							let color;
							if (score === level){
								text = 'Congratulations! You Won!';
								color = 'rgb(75, 189, 33)';
							}
							else
							{
								let pieces = document.getElementById("game_container").childNodes;
								pieces.forEach((node)=>{
									if (parseInt(node.getAttribute('active')) && node.style.backgroundColor !== 'green')
										node.style.setProperty('background-color', 'blue');
								})
								color= 'rgb(231, 46, 46)';
								text = `Sorry, You Lost!<br>Your Score is ${score} out of ${level}`;
							}
							document.getElementById('score_container').style.setProperty('background-color', color);
							document.getElementById('score_container').innerHTML= text ;
						}
					}
				});
				document.getElementById("game_container").appendChild(piece);
			}
		}
	}
	addPieces();
	let target = [];
	const addValue = (array, value, repeat) => {
		for (let i = repeat; i > 0; i--) array.push(value);
	}
	addValue (target, 1, level);
	addValue (target, 0, Math.pow(size, 2) - level);

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--){
			let j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}
	target = shuffleArray(target);
	pieces = document.getElementById("game_container").childNodes;
	target.forEach((value,index)=>{
			let p = pieces.item(index);
			p.setAttribute('active', value.toString());
			if (value) p.style.setProperty('background-color', 'blue');
		}
	)

	setTimeout(() => {
		pieces.forEach((node)=>node.style.setProperty('background-color', 'grey'));
		started = 1;
	}, 2000);
}
