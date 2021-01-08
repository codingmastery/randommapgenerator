<script>
    // The respresentation could be achieved potentially with SVGS.
    export let size;
    export let className;
</script>

    
<rect class={`room ${className}`} width={`${size}px`} height={`${size}px`}>
</rect>
<slot/>
    

<style>
    .room {
        fill: royalblue;
        transform: translate3d(5px, 5px ,0)
    }
    .room.start {
        fill: green;
    }
    .room.end {
        fill: red;
    }
</style>

