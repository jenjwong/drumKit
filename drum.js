// object used to track state of which song is playing
const playing = {};

const playSound = (soundName) => {
  const audioFile = document.getElementById(soundName);
  audioFile.currentTime = 0;
  audioFile.play();
};

const pauseSound = (soundName) => {
  const audioFile = document.getElementById(soundName);
  audioFile.pause();
};

// Takes click or keypress event and finds sound associated with it by going through
// each div looking for a matching letter. When matching letter is found it grabs the
// sound associated with the letter based on the html and then plays the sound. This
// design allows the addition of new sounds by specifying the letter, name of the sound
// and setting an audio tag with an id of the name of the sound.
const press = (event, letter) => {
  letter = letter || event.key.toUpperCase();
  document.querySelectorAll('.letter').forEach((node) => {
    if (letter === node.textContent.trim()) {
      node.parentElement.parentElement.classList.add('playing');
      const soundName = node.nextElementSibling.textContent.trim().toLowerCase();
      playSound(soundName);
    }
  });
};

document.querySelectorAll('.drum-box').forEach((node) => {
  node.addEventListener('click', function(e) {
    press(null, this.firstElementChild.firstElementChild.textContent.trim())
  }, false)
});

// Adds transitionend listener to remove drum-box animation
document.querySelectorAll('.drum-box').forEach((drum) => {
  drum.addEventListener('transitionend', (event) => {
    drum.classList.remove('playing');
  }, false);
});

// Manages current playing track
document.querySelectorAll('.tracks').forEach((node) => {
  node.addEventListener('click', (event) => {
    const track = event.target.firstElementChild.textContent.trim().toLowerCase();
    Object.keys(playing).forEach((item) => {
      if (item !== track) {
        playing[item] = false;
        let currentTrack = `.${item}`
        document.querySelector(currentTrack).parentElement.classList.remove('trackNow');
        document.querySelector(currentTrack).classList.remove('trackNowText');
        pauseSound(item);
      }
    });
    if (!playing[track]) {
      event.target.classList.add('trackNow');
      event.target.firstElementChild.classList.add('trackNowText');
      playing[track] = true;
      playSound(track);
    } else {
      playing[track] = false;
      event.target.firstElementChild.classList.remove('trackNowText');
      event.target.classList.remove('trackNow');
      pauseSound(track);
    }
  }, false);
});

document.addEventListener('keydown', press, false);
