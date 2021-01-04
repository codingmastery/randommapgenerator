<script>
	//export let ;
	/* 
		We need:
		- Tile or symbolic Room 
		- Doors/Exits that belong to that room
		- Starting point
		- End point/Transition or Exit
	*/

	import Room from './Room.svelte';
	import Door from './Door.svelte';
	let size = 200;
</script>

<main>
	<h1>Random Map Generator!</h1>

	<Room size={size}>
		<Door size={size} location="north"/>
		<Door size={size} location=east/>
		<Door size={size} location="south"/>
		<Door size={size} location="west"/>
	</Room>

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