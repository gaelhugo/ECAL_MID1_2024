import Piano from "./js/Piano";
import midiNote from "midi-note";
import MidiPlayer from "./js/MidiPlayer";
import Circle from "./js/Circle";

const canvas = document.getElementsByTagName("canvas")[0];
//fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

const monPiano = new Piano();
const allCircles = [];

document.addEventListener("keydown", (event) => {
  const monMidiPlayer = new MidiPlayer("debussy-clair-de-lune.mid");
  monMidiPlayer.addEventListener("loaded", (midi) => {
    console.log("Midi loaded", midi);
    // reste du code fin de la parenthèse
    midi.tracks.forEach((track) => {
      console.log(track.notes);
      track.notes.forEach((note) => {
        console.log(note);
        setTimeout(() => {
          // monPiano.sampler.triggerAttack(midiNote(note.midi));

          const cercle = new Circle(
            -100,
            Math.random() * window.innerHeight,
            10,
            "red",
            ctx,
            midiNote(note.midi),
            monPiano
          );
          allCircles.push(cercle);
        }, note.ticks * 2.5);
      });
    });
  });

  // console.log("key", event.key);
  // const note = midiNote(Math.floor(Math.random() * 126) + 1);
  // monPiano.sampler.triggerAttack(note);
});

// const cercle = new Circle(100, 100, 50, "red", ctx);
// allCircles.push(cercle);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // console.log("draw");

  allCircles.forEach((cercle) => {
    cercle.move();
    cercle.draw();
  });

  // cercle.move();
  // cercle.draw();

  requestAnimationFrame(draw);
}

draw();
