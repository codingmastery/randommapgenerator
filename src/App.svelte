<script>
	//export let ;
	/* 
		We need:
		- Tile or symbolic RoomSpace 
		- Doors/Exits that belong to that RoomSpace
		- Starting point
		- End point/Transition or Exit
	*/

	import RoomSpace from './RoomSpace.svelte';
	import Room from './Room.svelte';
	import Walls from './Walls.svelte';
	import Door from './Door.svelte';
	let size = 40;
	let styles = "";
	const data = {
		access: "north west east south",
	}
	const generateRoomSpace = (size) => {
		// We will have to fix this next time!! See you all!!
		
		let component = "";
		return component;
	}

	let directions = data.access.split(' ');
</script>

<main>
	<h1>Random Map Generator!</h1>
	<svg width="100%" height="100%">
	<!-- <Walls size={size} class='dx' style={styles}>
		<RoomSpace size={size - 10}>
			<Door size={size} location="east" />
			<Door size={size} location="west" />
		</RoomSpace>
	</Walls> -->
	<Room size={size} doors={"east west"}/>

	<!-- <Walls size={size} class={'da'} style={styles}>
		<RoomSpace size={size - 10}>
			<Door size={size} location="north"/>
			<Door size={size} location="east"/>
			<Door size={size} location="south"/>
			<Door size={size} location="west"/>
		</RoomSpace>
	</Walls> -->
	<Room size={size} doors={"north east west south"}/>

	<!-- <Walls size={size} class='dy' style={styles}>
		<RoomSpace size={size - 10}>
			<Door size={size} location="north"/>
			<Door size={size} location="south"/>
		</RoomSpace>
	</Walls> -->
	<Room size={size} doors={"north south"}/>

	<!-- <Walls size={size} class='de dw dn' style={styles}>
		<RoomSpace size={size - 10}>
			<Door size={size} location="north"/>
			<Door size={size} location="east"/>
			<Door size={size} location="west"/>
		</RoomSpace>
	</Walls> -->
	<Room size={size} doors={"north east west"}/>

	<!-- <Walls size={size} class='de dw ds' style={styles}>
		<RoomSpace size={size - 10}>
			<Door size={size} location="east"/>
			<Door size={size} location="west"/>
			<Door size={size} location="south"/>
		</RoomSpace>
	</Walls> -->
	<Room size={size} doors={"east west south"}/>

	<br/>

	<Room size={size} doors={"north east west south"} />	


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