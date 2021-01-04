<script>
    // The respresentation could be achieved potentially with SVGS.
    export let size;
</script>

<svg width={`${size}px`} height={`${size}px`}>
    <rect class="room" width={`${size}px`} height={`${size}px`}>
    </rect>
    <slot/>
</svg>

<style>
    .room {
        fill: royalblue;
        stroke-width: 10px;
        stroke: #3c3c3c;
    }
</style>

