<script>
    export let size;
</script>

<g>
<rect class='walls' width={`${size}px`} height={`${size}px`}></rect>
<slot></slot>
</g>

