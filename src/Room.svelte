
<script>
    export let doors;
    export let size;
    import Walls from './Walls.svelte';
    import RoomSpace from './RoomSpace.svelte';
    import Door from './Door.svelte';

    let directions = doors.split(' ');
</script>

<Walls size={size}>
    <RoomSpace size={size-10}>
        {#each directions as direction, i }
            <Door size={size} location={direction} />
        {/each}
    </RoomSpace>
</Walls>