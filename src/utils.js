const calculateIndex = (coordinates, bounds) => {

    if (coordinates.x < 0 || coordinates.x>bounds.x) {
        throw 'Out of bounds: x';
    } 
    if (coordinates.y<0 || coordinates.y>bounds.y) {
        throw 'Out of bounds: y';
    }

	const index = coordinates.y*bounds.y+coordinates.x; 

	return index;
}

const generateARandomNumberUpTo = max => {
	const randomNumber =  Math.floor(Math.random() * Math.floor(max));
	return randomNumber;
};

const generateCoordinates = (bounds) => {
	console.log(`generateCoordinates - start`);
	const posY = generateARandomNumberUpTo(bounds.y);
	const posX = generateARandomNumberUpTo(bounds.x);
	const coordinates = {x: posX, y:posY};
	return coordinates;
};

const getBoundaries = (dungeonMap, direction, x, y) => {
	console.log(`getBoundaries - start` , x, y);
	let currentRow = y;
	let currentColumn = x;
	let possibleDirections={
		north: true,
		east: true,
		south: true,
		west:true,
	};

	let up = {x, y:y-1};
	let down = {x, y:y+1}; 
	let left = {x: x-1, y};
	let right = {x: x+1, y};
	
	if (currentColumn === 0 && direction === 'west') {
		possibleDirections.west = false;
	} 
	if (currentColumn === COLUMNS-1 && direction === 'east') {
		possibleDirections.east = false;
	} 
	if (currentRow === 0 && direction === 'north') {
		possibleDirections.north = false;
	}
	if (currentRow === ROWS-1 && direction === 'south') {
		possibleDirections.south = false;
	}

	if (currentColumn<=COLUMNS-1 && (direction == 'west' && dungeonMap[calculateIndex(left)].doors.indexOf('east') === -1)) {
		possibleDirection.west = false;
	}
	if (currentColumn>=1 && (direction == 'east' && dungeonMap[calculateIndex(right)].doors.indexOf('west') === -1)) {
		possibleDirection.east = false;
	}
	if (currentRow>=1 && (direction == 'north' && dungeonMap[calculateIndex(up)].doors.indexOf('south') === -1)) {
		possibleDirection.north = false;
	}
	if (currentRow<=ROWS-1 && (direction == 'south' && dungeonMap[calculateIndex(down)].doors.indexOf('north') === -1)) {
		possibleDirection.south = false;
	}




	console.log(`getBoundaries - end - possibleDirections: `, possibleDirections);
	return possibleDirections;

}



 const generateRoom = (dungeonMap, x, y) => {
	console.log(`generateRoom - start`);
	console.log(`Getting doors in the room...`);
	
	const howMany = generateARandomNumberUpTo(WAYS);
	
	let room = {doors: [], pos: {x, y}, type: 'normal'};
	let index = calculateIndex({x,y});
	let remaining = howMany;
	
	while(remaining>0) {
		let door = "";			
		let dirs = {};
		do {
			console.log(`Getting the doors to deal with...`);
	
			let	whichDoor = generateARandomNumberUpTo(WAYS);
			switch(whichDoor) {
				case 0: door = 'north'; break; 
				case 1: door = 'east'; break;
				case 2: door = 'south'; break;
				case 3: door = 'west'; break;
				default: break;
			}
			console.log(`Checking all doors...`);
	
			dirs = getBoundaries(dungeonMap,door, x, y);	
		} while(dirs[door] == false);
		console.log(`Moving to the next door...`);
	
		remaining--;

		if (!room.doors.includes(door) && door != "") {
			room.doors.push(door);
		}
	}

	if (room.doors.length===0) {
		room.type='';
	}
	console.log(`generateRoom - end - room: `, room);
	return room;
}



 const getNonEmptyCell = (dungeonMap) => {    
	
	let coordinates = null;
	let index = null;
	let nDoors = null;
	console.log(`getNonEmptyCell - start`); 
	do {
		coordinates = generateCoordinates();
		index = calculateIndex(coordinates, {x:COLUMNS, y: ROWS});
		nDoors = dungeonMap[index].doors.length;
		console.log(`Getting number of doors available in the room (nDoors): `, nDoors);
	} while (!nDoors);
	console.log(`getNonEmptyCell - end - index: `, index);
	return index;
}

 const createRandomDungeon = () => {
	console.log(`createRandomDungeon - start`);
	const dungeonMap = [];
	for(let i = 0; i < ROWS*COLUMNS; i++) {
		dungeonMap[i] = -1;
	}

	for (let i = COLUMNS*ROWS; i> 0; i--) {
		let coordinates = generateCoordinates();
		let index = calculateIndex(coordinates, {x:COLUMNS, y:ROWS});
		
		while(dungeonMap[index]!=-1) {
			coordinates = generateCoordinates();	
			index = calculateIndex(coordinates, {x:COLUMNS, y:ROWS});
		}
		console.log(`Generating room ${i}...`);
		dungeonMap[index] = generateRoom(dungeonMap,coordinates.x, coordinates.y);
	}
	
	// Getting starting and end Points. 
	// console.log(`Getting start index... (start)`);
	// let startingCoordinates = generateCoordinates();
	// generateRoom(dungeonMap, startingCoordinates.x, startingCoordinates.y);
	// let startingIndex = calculateIndex(startingCoordinates);
	// console.log(`Getting start index...(end)`);
	// let endingIndex =  null;
	// let endingCoordinates = null;
	// do {
	// 	console.log(`Getting end index...(start)`);
	// 	endingCoordinates = generateCoordinates();
	// 	endingIndex = calculateIndex(endingCoordinates);
	// 	if(endingIndex!=startingIndex) {
	// 		generateRoom(dungeonMap, endingCoordinates.x,endingCoordinates.y);
	// 	}
	// } while (endingIndex === startingIndex);
	// console.log(`Getting end index...(end)`);

	// dungeonMap[startingIndex].type = 'start';
	// dungeonMap[endingIndex].type = 'end';

	console.log(`createRandomDungeon - end - dungeonMap: `,dungeonMap);

	return dungeonMap;
}

module.exports = {
    generateCoordinates,
    generateARandomNumberUpTo,
    getBoundaries,
    generateRoom,
    calculateIndex,
    getNonEmptyCell,
    createRandomDungeon,
};