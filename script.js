document.addEventListener("DOMContentLoaded", function() {

    const songs = [
        {

            title: "Sparks",
            artist: "Coldplay",
            src: "Sparks(MP3_160K).mp3",
            albumArt: "art_parachutes.jpg",
            lyrics: `Did I drive you away?
I know what you'll say
You say, "Oh, sing one we know"
But I promise you this
I'll always look out for you
Yeah, that's what I'll do
I say, "Ohh"
I say, "Ohh"
My heart is yours
It's you that I hold on to
Yeah, that's what I do
And I know, I was wrong
But I won't let you down
Oh, yeah, yeah, yeah, I will, yes, I will
I said, "Ohh"
I cry, "Ohh"
Yeah, I saw sparks
Yeah, I saw sparks
And I saw sparks
Yeah, I saw sparks
Sing it out`
        },                
        {
            title: "Bubble Gum",
            artist: "clerio",
            src: "Bubblegum(MP3_160K).mp3",
            albumArt: "bubblegum.jpeg",
            lyrics: `sorry I didn\'t kiss you\n But it\'s obvious I wanted to\nBubble gum down my throat and it\'s a curse\n But my luck couldn\'t get any worse\n\'Cause I swallowed the bubble gum\n Oh, and these seven years will be pretty dumb\n Pink flowers grow from my skin\n Pepto Bismol veins and I grin\n You look so nice in your shirt\n It's sad because it just hurts\n I'd do anything for you\n But would you do that for me, too?\n 'Cause I swallowed the bubble gum\nOh, and these seven years will be pretty dumb\nOh, pink flowers grow from my skin\nOh, Pepto Bismol veins and I grin\nOh\n Oh`
        }
    ];

    let currentSongIndex = 0;
    let isPlaying = false;
    let isLooping = false;

    const player = document.querySelector(".player");
    const songTitle = document.querySelector(".song-title");
    const artist = document.querySelector(".artist");
    const albumArt = document.querySelector(".album-art");
    const lyrics = document.querySelector(".lyrics");
    const duration = document.querySelector(".duration");
    const elapsedTime = document.querySelector(".elapsed-time");
    const prevSongButton = document.querySelector(".prev-song");
    const loopSongButton = document.querySelector(".loop-song");
    const nextSongButton = document.querySelector(".next-song");
    const playPauseButton = document.querySelector(".play-pause");
    const audioElement = new Audio();

    function loadSong(song) {
    songTitle.textContent = song.title;
    artist.textContent = song.artist;
    albumArt.src = song.albumArt;
    lyrics.innerHTML = song.lyrics.split('\n').join('<br>'); // Modificación aquí
    audioElement.src = song.src;
    audioElement.addEventListener("loadedmetadata", () => {
        duration.textContent = formatTime(audioElement.duration);
    });

    // Manejar la promesa devuelta por audioElement.play()
    const playPromise = audioElement.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // La reproducción automática comenzó correctamente
            // Realizar acciones necesarias, si las hay
        })
        .catch(error => {
            // La reproducción automática fue prevenida
            // Mostrar la interfaz pausada o realizar otras acciones necesarias
        });
    }
}

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secondsLeft = Math.floor(seconds % 60);
        return `${minutes}:${secondsLeft.toString().padStart(2, "0")}`;
    }

    function updateElapsedTime() {
        elapsedTime.textContent = formatTime(audioElement.currentTime);
    }

    function updateProgressBar() {
        const progressFill = document.querySelector(".progress-fill");

        const progressWidth = (audioElement.currentTime / audioElement.duration) * 100;
        progressFill.style.width = `${progressWidth}%`;
    }

    audioElement.addEventListener("timeupdate", () => {
        updateElapsedTime();
        updateProgressBar();
    });

    playPauseButton.addEventListener("click", () => {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });

    function playSong() {
        isPlaying = true;
        player.classList.add("playing");
        audioElement.play();
        playPauseButton.innerHTML= `<i class=\"fa-solid fa-pause"></i>`
    }

    function pauseSong() {
        isPlaying = false;
        player.classList.remove("playing");
        audioElement.pause();
        playPauseButton.innerHTML = `<i class="fa-solid fa-play"></i>`;
    }

    prevSongButton.addEventListener("click", () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(songs[currentSongIndex]);
        // No reproducir automáticamente al cambiar de canción
        // playSong();
    });

    loopSongButton.addEventListener("click", () => {
        isLooping = !isLooping;
        loopSongButton.textContent = isLooping ? "Loop Off" : "Loop On";
    });

    nextSongButton.addEventListener("click", () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(songs[currentSongIndex]);
        // No reproducir automáticamente al cambiar de canción
        // playSong();
    });

    loadSong(songs[currentSongIndex]);
});
