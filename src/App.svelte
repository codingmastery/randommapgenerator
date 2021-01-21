<script>
	import {ROWS, COLUMNS, WAYS} from './config';
	import RoomSpace from './RoomSpace.svelte';
	import Room from './Room.svelte';
	import Walls from './Walls.svelte';
	import Door from './Door.svelte';
	import Block from './Block.svelte';
	
	export let size;
	export let backgroundColor;


const newDungeonMap = createRandomDungeon();

</script>

<main>
	<h1>Random Map Generator!</h1>
	<svg style={`background-color: ${backgroundColor}`} width={size*COLUMNS - 5*(COLUMNS-1)} height={size*ROWS - 5*(ROWS-1)}>
		{#each newDungeonMap as room}
			{#if room.doors.length>0}
				<Room size={size} data={room}/>
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