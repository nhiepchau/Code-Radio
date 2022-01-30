"use strict"

// add mouse click effect
let body = document.querySelector("body")
document.addEventListener("click", function (e) {
    var x = e.clientX
    var y = e.clientY
    let ripple = document.createElement("div")
    ripple.className = "ripple"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.onanimationend = () => {
        body.removeChild(ripple)
    }
    body.appendChild(ripple)
})

// radio
const previous = document.querySelector('.radio #pre_song')
const play = document.querySelector('.radio #play_pause')
const next = document.querySelector('.radio #next_song')
const title = document.querySelector('.radio .song_decs .radio_title')
const recent_volume = document.querySelector('.radio #recent_volume')
const volume_track = document.querySelector('.radio .volume_track')
const slider = document.querySelector('.radio #duration_slider')
const slider_track = document.querySelector('.radio .slider_track')
const track_image = document.querySelector('.radio #song_img')
const artist = document.querySelector('.radio .artist')
const volume_icon = document.querySelector('.radio #volume_icon')

const all_song = [
    {
        name: "Waiting for love",
        path: "assets/mp3/waiting_for_love.mp3",
        img: "assets/img/waiting_for_love.jpg",
        author: "Avicii"
    },
    {
        name: "Love story",
        path: "assets/mp3/love_story.mp3",
        img: "assets/img/love_story.jpg",
        author: "Taylor Swift"
    },
]

let index_no = 0
let playing_song = false
let timer
let is_mute = false

slider.addEventListener('input',() => {
    slider_track.style.width = slider.value+'%'
})

//create a audio Element
let track = document.createElement('audio')


function load_track(index_no) {
    slider.value = 0
    slider_track.style.width = slider.value+'%'
    clearInterval(timer)
    title.innerHTML = all_song[index_no].name
    artist.innerHTML = all_song[index_no].author
	track_image.src = all_song[index_no].img
    track.src = all_song[index_no].path
    track.load()
    timer = setInterval(range_slider, 1000)
}
load_track(0)


function play_song() {
    track.play()
    playing_song = true
    play.innerHTML = '<i class="fas fa-pause-circle"></i>'
}

function pause_song() {
    track.pause()
    playing_song = false
    play.innerHTML = '<i class="fas fa-play-circle"></i>'
}

function play_pause() {
    if(playing_song == false)
        play_song()
    else
        pause_song()
}

function next_song() {
    index_no = (index_no+1)%all_song.length
    load_track(index_no)
    play_song()
}

function previous_song() {
    index_no = (index_no-1+all_song.length)%all_song.length
    load_track(index_no)
    play_song()
}

function volume_change() {
    volume_track.style.width = recent_volume.value+'%'
    if(is_mute) return
    track.volume = recent_volume.value/100
}

function change_duration() {
    if(track.ended) play_song()
    clearInterval(timer)
    track.currentTime = track.duration*(slider.value/100)
    timer = setInterval(range_slider, 1000)
}

function range_slider() {
    let position = 0
    if(!isNaN(track.duration)) {
        position = track.currentTime * (100/track.duration)
        slider.value = position
        slider_track.style.width = slider.value+'%'
    }
    if(track.ended) next_song()
}

function toggle_sound() {
    if(is_mute) {
        is_mute = false
        volume_change()
    } else {
        is_mute = true
        track.volume = 0
    }
    volume_icon.classList.toggle('fa-volume-up')
    volume_icon.classList.toggle('fa-volume-mute')
}

function track_s(element) {
    console.log(element);
    element.style.width = slider.value+'%'
}