// Define variables
let nextbtn, playlist_index, randomSong, prevbtn, audio, playbtn, title, poster, artists, mutebtn, seekslider, volumeslider, seeking = false, seekto, curtimetext, durtimetext, playlist_status, dir, playlist, ext, agent, playlist_artist, repeat, random;

// Initialization of array of music, title, poster images, artists

dir = "music/"
playlist = ["Cartoon-On-_-On", "Elektronomia", "Fearless", "Johnning", "Popsicle"]

title = ["Cartoon - On & on", "Elektronomia", "Fearless", "Johnning", "Popsicle"]

artists = ["(ft Daniel Levi)", "Elektronomia Sky High", "Denver", "Mc Flows", "Pirate Hunter"]

poster = ["images/ncs1.jpeg", "images/ncs2.jpg", "images/ncs3.jpg", "images/ncs4.jpg", "images/ncs5.jpg"]

//used to run on every browser
ext = ".mp3"
agent = navigator.userAgent.toLowerCase();
if (agent.indexOf('firefox') != -1 || agent.indexOf('Opera') != -1) {
    ext = ".ogg";
}

//set object references

playbtn = document.getElementById("playpausebtn");
nextbtn = document.getElementById("nextbtn");
prevbtn = document.getElementById("prevbtn");
mutebtn = document.getElementById("mutebtn");
seekslider = document.getElementById("seekslider");
volumeslider = document.getElementById("volumeslider");
curtimetext = document.getElementById("curtimetext");
durtimetext = document.getElementById("durtimeText");
playlist_status = document.getElementById("playlist_status");
playlist_artist = document.getElementById("playlist_artist");
repeat = document.getElementById("repeat");
randomSong = document.getElementById("random")

playlist_index = 0

//Audio Object
audio = new Audio()
audio.src = dir + playlist[0] + ext;
audio.loop = false;

// Song Title and Artist
playlist_status.innerHTML = title[playlist_index];
playlist_artist.innerHTML = artists[playlist_index]


// event handling
playbtn.addEventListener("click", playPause);
nextbtn.addEventListener("click", nextSong);
prevbtn.addEventListener("click", prevSong);
mutebtn.addEventListener("click", mute);
seekslider.addEventListener("mousedown", function (event) {
    seeking = true;
    seek(event);
})
seekslider.addEventListener("mousemove", function (event) {
    seeking = false;
})
seekslider.addEventListener("mouseup", function () {
    seeking = false
})

volumeslider.addEventListener("mousemove", setVolume)

audio.addEventListener("timeupdate", function () { seektimeupdate() })
audio.addEventListener("ended", function () { switchTrack() });
repeat.addEventListener("click", loop)
randomSong.addEventListener("click", randomFn)

// functions
function fetchMusicDetails() {
    $("#playpausebtn img").attr("src", "images/pause-red.png");
    $("#bgImage").attr("src", poster[playlist_index]);
    $("#image").attr("src", poster[playlist_index])

    // title and artist
    playlist_status.innerHTML = title[playlist_index]
    playlist_artist.innerHTML = artists[playlist_index]

    // audio

    audio.src = dir + playlist[playlist_index] + ext;
    audio.play()
}

function playPause() {
    if (audio.paused) {
        audio.play();
        $("#playpausebtn img").attr("src", "images/pause-red.png")
    } else {
        audio.pause();
        $("#playpausebtn img").attr("src", "images/play-red.png")
    }
}

function nextSong() {
    playlist_index++;
    if (playlist_index > playlist.length - 1) {
        playlist_index = 0
    }
    fetchMusicDetails()
}

function prevSong() {
    playlist_index--
    if (playlist_index < 0) {
        playlist_index = playlist.length - 1
    }

    fetchMusicDetails()
}

function mute() {
    if (audio.muted) {
        audio.muted = false;
        $('#mutebtn img').attr("src", "images/speaker.png");
    } else {
        audio.muted = true;
        $('#mutebtn img').attr("src", "images/mute.png")
    }
}

function seek(event) {
    if (audio.duration == 0) {
        null
    } else {
        if (seeking) {
            seekslider.value = event.clientX - seekslider.offsetLeft;
            seekto = audio.duration * (seekslider.value / 100);
            audio.currentTime = seekto
        }
    }
}

function setVolume() {
    audio.volume = volumeslider.value / 100
}

function seektimeupdate() {
    if (audio.duration) {
        let nt = audio.currentTime * (100 / audio.duration);
        seekslider.value = nt;
        var curMins = Math.floor(audio.currentTime / 60)
        var curSecs = Math.floor(audio.currentTime - curMins * 60)
        var durMins = Math.floor(audio.duration / 60)
        var durSecs = Math.floor(audio.duration - durMins * 60);

        if (curSecs < 10) {
            curSecs = "0" + curSecs
        }
        if (durSecs < 10) {
            durSecs = "0" + durSecs
        }
        if (curMins < 10) {
            curMins = "0" + curMins
        }
        if (durMins < 10) {
            durMins = "0" + durMins
        }

        curtimetext.innerHTML = curMins + ":" + curSecs;
        durtimetext.innerHTML = durMins + ":" + durSecs
    } else {
        curtimetext.innerHTML = "00" + ":" + "00"
        durtimetext.innerHTML = "00" + ":" + "00"
    }
}

function switchTrack() {
    if (playlist_index == (playlist.length - 1)) {
        playlist_index = 0
    } else {
        playlist_index++
    }
}

function loop() {
    if (audio.loop) {
        audio.loop = false;
        $("#repeat img").attr("src", "images/rep.png")
    } else {
        audio.loop = true;
        $("#repeat img").attr("src", "images/rep1.png")
    }
}

function getRandomNumber(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return result
}


function randomFn() {
    let randomIndex = getRandomNumber(0, playlist.length - 1)
    playlist_index = randomIndex
    fetchMusicDetails()
}