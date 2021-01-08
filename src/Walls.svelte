<script>
    export let size;
    export let coordinates;
    let x = coordinates.x*(size-5);
    let y = coordinates.y*(size-5);

</script>

<g style={`transform: translate3d(${x}px ,${y}px, 0)`}>
    <rect class='walls' width={`${size}px`} height={`${size}px`}></rect>
    <slot></slot>
</g>

