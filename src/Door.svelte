<script>
    export let location;
    export let size;
    let styles = "transform: translate3d(0,0,0)";
    switch (location) {
        case "north":
            styles = `transform: translate3d(calc(${size/2}px - ${(size/5) - (size/10)}px),0,0)`;
            break;
        case "south":
            styles = `transform: translate3d(calc(${size/2}px - ${(size/5)-(size/10)}px), calc(${size}px - 5px),0)`;
            break;
        case "west":
            styles = `transform: translate3d(5px, calc(${size/2}px - ${(size/5) - (size/10)}px),0) rotate(90deg)`;
            break;
        case "east":
            styles = `transform: translate3d(${size}px, calc(${size/2}px - ${(size/5)-(size/10)}px),0) rotate(90deg);`;
            break;
        default: break;
    }
</script>

<rect 
    class={`door ${location}`} 
    width={`${size/5}px`}
    height={`5px`}
    style={styles}
/>

<style>
    .door {
        fill: silver;
    }
</style>