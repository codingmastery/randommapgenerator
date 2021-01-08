<script>
    export let size;
    export let coordinates;
    let x = coordinates.x*(size);
    let y = coordinates.y*(size);

</script>

<g style={`transform: translate3d(${x}px ,${y}px, 0)`}>
    <rect class='block' width={`${size-5}px`} height={`${size-5}px`}></rect>
</g>

<style>
    .block {
        fill: #333;
    }
</style>
