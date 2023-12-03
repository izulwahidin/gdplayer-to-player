<script>
    import { onMount } from 'svelte';
    import Plyr from 'plyr';
    import 'plyr/dist/plyr.css';
    export let data

    let player;

    onMount(() => {
        player = new Plyr('#player', {
            controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', '', 'settings', 'fullscreen'],
            settings: ['quality', 'speed'],
        });
    });
</script>


<video id="player" controls crossorigin playsinline data-poster={data.poster}>
    {#each data.sources.filter(item => ['360p', '480p', '720p', '1080p'].includes(item.label)) as source}
        <source type={source.type} src={source.file} size={source.label.replace('p','')}/>
    {/each}
    <track kind="captions" label="Français" srclang="fr" src={true}>
</video>
  
<style>
    video {
        width: 100vw;
        height: 100vh;
    }
</style>