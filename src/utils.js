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
	const posY = generateARandomNumberUpTo(bounds.y);
	const posX = generateARandomNumberUpTo(bounds.x);
	const coordinates = {x: posX, y:posY};
	return coordinates;
};

const getBoundaries = (dungeonMap, direction, coordinates, bounds) => {
	let currentRow = coordinates.y;
	let currentColumn = coordinates.x;
	let possibleDirections =  {
		north: true,
		east: true,
		south: true,
		west:true,
	};

	let up = {x: coordinates.x, y:coordinates.y-1};
	let down = {x:coordinates.x, y:coordinates.y+1}; 
	let left = {x: coordinates.x-1, y:coordinates.y};
	let right = {x: coordinates.x+1, y: coordinates.y};
	
	if (currentColumn === 0 && direction === 'west') {
		possibleDirections.west = false;
	} 
	if (currentColumn === bounds.x-1 && direction === 'east') {
		possibleDirections.east = false;
	} 
	if (currentRow === 0 && direction === 'north') {
		possibleDirections.north = false;
	}
	if (currentRow === bounds.y-1 && direction === 'south') {
		possibleDirections.south = false;
	}

	if (currentColumn<=bounds.x-1 && (direction == 'west' && dungeonMap[calculateIndex(left, bounds)].doors.indexOf('east') === -1)) {
		possibleDirections.west = false;
	}
	if (currentColumn>=1 && (direction == 'east' && dungeonMap[calculateIndex(right, bounds)].doors.indexOf('west') === -1)) {
		possibleDirections.east = false;
	}
	if (currentRow>=1 && (direction == 'north' && dungeonMap[calculateIndex(up, bounds)].doors.indexOf('south') === -1)) {
		possibleDirections.north = false;
	}
	if (currentRow<=bounds.y-1 && (direction == 'south' && dungeonMap[calculateIndex(down, bounds)].doors.indexOf('north') === -1)) {
		possibleDirections.south = false;
	}

	console.log(`getBoundaries - end - possibleDirections: `, possibleDirections);
	return possibleDirections;

}



 const generateRoom = (dungeonMap, coordinates, nWays, bounds) => {	
	const howMany = generateARandomNumberUpTo(nWays);
	
	let room = {doors: [], pos: {x: coordinates.x, y: coordinates.y}, type: 'normal'};

	let remaining = howMany;
	
	while(remaining>0) {
		let door = "";			
		let dirs = {};

		do {
	
			let	whichDoor = generateARandomNumberUpTo(nWays);
			switch(whichDoor) {
				case 0: door = 'north'; break; 
				case 1: door = 'east'; break;
				case 2: door = 'south'; break;
				case 3: door = 'west'; break;
				default: break;
			}
	
			dirs = getBoundaries(dungeonMap,door, coordinates, bounds);	
		} while(dirs[door] == false);
	
		remaining--;

		if (!room.doors.includes(door) && door != "") {
			room.doors.push(door);
		}
	}

	if (room.doors.length===0) {
		room.type='';
	}
	return room;
}



 const getNonEmptyCell = (dungeonMap) => {    
	
	let coordinates = null;
	let index = null;
	let nDoors = null;
	console.log(`getNonEmptyCell - start`); 
	do {
		coordinates = generateCoordinates({x:COLUMNS, y: ROWS});
		index = calculateIndex(coordinates, {x:COLUMNS, y: ROWS});
		nDoors = dungeonMap[index].doors.length;
		console.log(`Getting number of doors available in the room (nDoors): `, nDoors);
	} while (!nDoors);
	console.log(`getNonEmptyCell - end - index: `, index);
	return index;
}

const createRandomDungeon = (bounds, nWays) => {

	const dungeonMap = [];
	for(let i = 0; i < bounds.x*bounds.y; i++) {
		dungeonMap[i] = -1;
	}

	for (let i = 0; i < bounds.x*bounds.y; i++) {
		let coordinates = generateCoordinates(bounds);
		let index = calculateIndex(coordinates, bounds);
		
		while(dungeonMap[index]!=-1) {
			coordinates = generateCoordinates(bounds);	
			index = calculateIndex(coordinates, bounds);
		}
		dungeonMap[index] = generateRoom(dungeonMap, coordinates, nWays, bounds);
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