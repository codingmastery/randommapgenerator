<script>
    // The respresentation could be achieved potentially with SVGS.
    export let size;
</script>

    
<rect class="room" width={`${size}px`} height={`${size}px`}>
</rect>
<slot/>
    

<style>
    .room {
        fill: royalblue;
        transform: translate3d(5px, 5px ,0)
    }
</style>

