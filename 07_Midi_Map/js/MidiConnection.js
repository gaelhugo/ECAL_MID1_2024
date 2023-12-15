class MidiConnection extends EventEmitter {
  constructor() {
    super();
    if (navigator.requestMIDIAccess) {
      navigator
        .requestMIDIAccess({
          sysex: false,
        })
        .then(this.onMIDISuccess.bind(this), this.onMIDIFailure.bind(this));
    } else {
      alert("No MIDI support in your browser.");
    }
  }

  onMIDISuccess(midiAccess) {
    let midi = midiAccess;
    let inputs = midi.inputs.values();
    // loop through all inputs
    for (
      let input = inputs.next();
      input && !input.done;
      input = inputs.next()
    ) {
      // listen for midi messages
      input.value.onmidimessage = this.onMIDIMessage.bind(this);
      // this just lists our inputs in the console
      this.listInputs(input);
    }
    // listen for connect/disconnect message
    midi.onstatechange = this.onStateChange;
  }

  listInputs(e) {
    let input = e.value;
    console.log(
      "Input port : [ type:'" +
        input.type +
        "' id: '" +
        input.id +
        "' manufacturer: '" +
        input.manufacturer +
        "' name: '" +
        input.name +
        "' version: '" +
        input.version +
        "']"
    );
  }

  onMIDIMessage(e) {
    let data = e.data,
      cmd = data[0] >> 4,
      channel = data[0] & 0xf,
      _type = data[0] & 0xf0, // channel agnostic message type. Thanks, Phil Burk.
      note = data[1],
      velocity = data[2];
    let infos = [cmd, channel, _type, note, velocity];
    this.emit("midi", [infos]);
    // this.app.midiControl(infos);
    //console.log(this.cmd,this.channel,this._type,this.note,this.velocity);
  }

  onMIDIFailure(e) {
    console.log(
      "No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " +
        e
    );
  }
}
