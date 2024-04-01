document.addEventListener("DOMContentLoaded", function() {

    const songs = [
        {
            title: "Sparks",
            artist: "Coldplay",
            src: "https://s17.aconvert.com/convert/p3r68-cdx67/m8a5c-vw8zq.mp3",
            albumArt: "https://s4.aconvert.com/convert/p3r68-cdx67/a14dy-rl8dq.jpg",
            lyrics: 'Did I drive you away?\n
I know what you\'ll say\n'
        },
        {
            title: "Bubble Gum",
            artist: "clerio",
            src: "https://s17.aconvert.com/convert/p3r68-cdx67/m335x-jivdf.mp3",
            albumArt: "https://s4.aconvert.com/convert/p3r68-cdx67/afuhe-xdn2o.jpg",
            lyrics: `sorry I didn\'t kiss you\n
But it's obvious I wanted to\n
Bubble gum down my throat and it's a curse\n
But my luck couldn't get any worse\n
'Cause I swallowed the bubble gum\n
Oh, and these seven years will be pretty dumb\n
Pink flowers grow from my skin\n
Pepto Bismol veins and I grin\n
You look so nice in your shirt\n
It's sad because it just hurts\n
I'd do anything for you\n
But would you do that for me, too?\n
'Cause I swallowed the bubble gum\n
Oh, and these seven years will be pretty dumb\n
Oh, pink flowers grow from my skin\n
Oh, Pepto Bismol veins and I grin\n
Oh\n
Oh`
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
        lyrics.textContent = song.lyrics;
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
        playPauseButton.textContent = "Pause";
    }

    function pauseSong() {
        isPlaying = false;
        player.classList.remove("playing");
        audioElement.pause();
        playPauseButton.textContent = "Play";
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

