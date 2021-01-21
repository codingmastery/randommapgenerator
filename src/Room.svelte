
<script>
    export let size;
    export let data;

    import Walls from './Walls.svelte';
    import RoomSpace from './RoomSpace.svelte';
    import Door from './Door.svelte';
    const {doors, pos: coordinates, type} = data;
    const directions = (doors.includes(' '))? doors.split(' '): doors;

  
</script>

<Walls size={size} coordinates={coordinates}>
    <RoomSpace className={type} size={size-10}>
        {#each directions as direction, i }
            <Door size={size} location={direction} />
        {/each}
    </RoomSpace>
</Walls>