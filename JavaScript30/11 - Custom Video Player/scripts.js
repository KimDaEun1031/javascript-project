const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const skipBtns = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');

function play(ev) {
    if (video.paused) {
        video.play()    
        toggle.textContent = '❚❚'
    } else {
        video.pause();
        toggle.textContent = '►'
    }
}

function scrub(ev) {
  let scrubTime = (ev.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function updateTime() {
    let persent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = persent + "%";
}

function skip(ev) {
    let target = ev.target;
    video.currentTime += parseFloat(target.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}


video.addEventListener('click', play);
toggle.addEventListener('click', play);
document.addEventListener('keydown', play)

progress.addEventListener('click', scrub);
video.addEventListener('timeupdate', updateTime);

skipBtns.forEach(btn => btn.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));