<script>
    export let location;
    export let size;
    let styles = "";
    switch(location) {
        case "north": 
            styles = "transform: translate3d(calc(50% - 5px),0,0)";
            break;
        case "south": 
            styles = "transform: translate3d(calc(50% - 5px), calc(100% - 5px),0)";
            break;
        case "west": 
            styles = "transform: translate3d(calc(0% - 5px), calc(50% - 5px),0)";
            break;
        case "east": 
            styles = "transform: translate3d(calc(100% - 5px), calc(50% - 5px),0)";
            break;
        default : break;
    }
</script>
// Need to fix this next! 
<rect 
    class={`door ${location}`} 
    width={`${size/5}px`} 
    height={`5px`}
    style={styles}
/>

<style>
    .door {
        fill: silver;
        stroke-width: 5px;
        stroke: silver;
    }

</style>