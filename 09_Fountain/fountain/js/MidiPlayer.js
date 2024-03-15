import { Midi } from "@tonejs/midi";
import EventEmitter from "@onemorestudio/eventemitterjs";

export default class MidiPlayer extends EventEmitter {
  constructor(url) {
    super();
    this.url = url;
    this.loadMidi();
  }

  async loadMidi() {
    // console.log("Loading MIDI...");
    this.midi = await Midi.fromUrl(this.url);
    // console.log(this.midi);
    this.emit("loaded", [this.midi]);
  }
}
