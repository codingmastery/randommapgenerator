<script>
	import RoomSpace from './RoomSpace.svelte';
	import Room from './Room.svelte';
	import Walls from './Walls.svelte';
	import Door from './Door.svelte';
	import Block from './Block.svelte';
	
	export let size;
	export let backgroundColor;


	
const ROWS = 5;
const COLUMNS = 5;
// Percentage of amount of walls 
const THRESHOLD_WALLS = 0.3;
const WAYS = 4;

const oldDungeonMap = [
    ["e"],          ["w","s"],   -1, -1,
    -1, ["n", "e", "s"], ["w", "s"], -1,
    -1,  ["n", "e"], ["n", "w", "s"], -1,
    -1,   -1,   ["n", "e"], ["w"]
];




const generateCoordinates = () => {
	const posY = Math.floor(Math.random() * ROWS);
	const posX = Math.floor(Math.random() * COLUMNS);
	return {
		x: posX,
		y: posY
	};
};
const generateDoors = () => {
	const howMany = Math.floor(Math.random() * WAYS);
	
	let doors = [];
	let remaining = howMany;
	while(remaining>0) {
		const whichDoor = Math.floor(Math.random() * WAYS);
		let door = "";
		switch(whichDoor) {
			case 0: door = 'n'; break; 
			case 1: door = 'e'; break;
			case 2: door = 's'; break;
			case 3: door = 'w'; break;
			default: break;
		}
		if (!doors.includes(door)) {
			doors.push(door);
			remaining--;
		}
	}

	return doors;
}

const createRandomDungeon = () => {
	const dungeonMap = [];
	for(let i = 0; i < ROWS*COLUMNS; i++) {
		dungeonMap[i] = -1;
	}

	// We need:
	// avoid exist the bound of the array of the dungeonMap



	// Getting starting and end Points. 
	let startingCoordinates = generateCoordinates();
	let startingIndex = startingCoordinates.y*ROWS+startingCoordinates.x;
	let endingIndex = startingIndex;
	let endingCoordinates = {};
	while(startingIndex===endingIndex) {
		endingCoordinates = generateCoordinates();
		endingIndex = endingCoordinates.y*ROWS+endingCoordinates.x;
	}
	// 

	for (let i = COLUMNS*ROWS; i> 0; i--) {
		let coordinates = generateCoordinates();
		let index = coordinates.y*ROWS+coordinates.x;	
		while(dungeonMap[index]!=-1) {
			coordinates = generateCoordinates();	
			index = coordinates.y*ROWS+coordinates.x;
		}
		dungeonMap[index] = generateDoors();

		// recalculate positions
		/*
			Walls
			Directions  4 ways => up, down, left, right
			right: dungeonMap[posIndex + 1]
			left: dungeonMap[posIndex - 1]
			up: dungeonMap [posIndex-COLUMNS]
			down: dungeonMap [posIndex+COLUMNS]
			
			// x === 0; never left;
			// x === COLUMNS-1 never right
			// y === 0; never up; 
			// y === ROWS-1 never down;
		*/
	}

	while (dungeonMap[startingIndex] === -1) {
		startingIndex = startingCoordinates.y*ROWS+startingCoordinates.x;
	}
	
	while (dungeonMap[endingIndex] === -1) {
		endingIndex = endingCoordinates.y*ROWS+endingCoordinates.x;
	}
	
	dungeonMap[startingIndex].type = 'start';
	dungeonMap[endingIndex].type = 'end';
	return dungeonMap;
}

const newDungeonMap = createRandomDungeon();

let row = 0;
let data = newDungeonMap.map((room, index) => {
    if (room.length>0) {
        let roomObject  = {
			access: "",
			pos: {},
			type: "",
		}; 

		room.map(access=>{
            let location = "";
            switch(access) {
                case "n": location = "north"; break;
                case "s": location = "south"; break;
                case "w": location = "west"; break;
                case "e": location = "east"; break;
                default: break;
            }
			roomObject.access = (roomObject.access!='')?`${roomObject.access} ${location}`:`${location}`;
		
            roomObject.pos.x = index%COLUMNS;   
			roomObject.pos.y = (index - (index%COLUMNS)) / COLUMNS;
			
		}); 
		roomObject.type = (!!room.type)?room.type:'normal';
		return roomObject;
    } else {
		
		return  {
				x: index%COLUMNS,   
				y: (index - (index%COLUMNS)) / COLUMNS
			};
	}
});
console.log(data)

</script>

<main>
	<h1>Random Map Generator!</h1>
	<svg style={`background-color: ${backgroundColor}`} width={size*COLUMNS - 5*(COLUMNS-1)} height={size*ROWS - 5*(ROWS-1)}>
		{#each data as room}
			{#if room.hasOwnProperty('access')}
				<Room size={size} className={room.type} data={room}/>
			{/if}
		{/each}

	</svg>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 2em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	
</style>