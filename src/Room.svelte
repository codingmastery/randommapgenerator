
<script>
    export let size;
    export let data;
    export let className;

    import Walls from './Walls.svelte';
    import RoomSpace from './RoomSpace.svelte';
    import Door from './Door.svelte';
    const doors = data.access;
    const coordinates = data.pos;    
    const directions = (doors.includes(' '))? doors.split(' '): [doors];
</script>

<Walls size={size} coordinates={coordinates}>
    <RoomSpace className={className} size={size-10}>
        {#each directions as direction, i }
            <Door size={size} location={direction} />
        {/each}
    </RoomSpace>
</Walls>