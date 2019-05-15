export default (vol, freq, duration) => {
  const audio= new AudioContext();
  const v= audio.createOscillator();
  const u= audio.createGain()
  v.connect(u);
  v.frequency.value=freq;
  v.type="square";
  u.connect(audio.destination);
  u.gain.value=vol*0.01;
  v.start(audio.currentTime);
  v.stop(audio.currentTime+duration*0.001);
}
