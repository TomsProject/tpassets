/* Copyright Toms Project 2020
@autor Toms Project
@date 2020.5.7
*/

//M3u8 player function
function playM3u8(url){
  if(Hls.isSupported()) {
      //support
      var video = document.getElementById('tplayer');
      video.volume = 1.0;
      var hls = new Hls();
      var m3u8Url = decodeURIComponent(url)
      hls.loadSource(m3u8Url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED,function() {
        video.play();
      });
    }
    else
    {
        //not support, alert() or swalert()
        
    }
}

function onPlayerErrorEvent(errorEvent) {
  // Extract the shaka.util.Error object from the event.
  onPlayerError(event.detail);
}

function onPlayerError(error) {
  // Handle player error
  console.error('Error code', error.code, 'object', error);
}

function onUIErrorEvent(errorEvent) {
  // Extract the shaka.util.Error object from the event.
  onPlayerError(event.detail);
}

function initFailed(errorEvent) {
  // Handle the failure to load; errorEvent.detail.reasonCode has a
  // shaka.ui.FailReasonCode describing why.
  console.error('Unable to load the UI library!');
}



async function playMPD(url){
  const video = document.getElementById('video');
  const ui = video['ui'];
  const controls = ui.getControls();
  const player = controls.getPlayer();

  // Attach player and ui to the window to make it easy to access in the JS console.
  window.player = player;
  window.ui = ui;

  // Listen for error events.
  player.addEventListener('error', onPlayerErrorEvent);
  controls.addEventListener('error', onUIErrorEvent);

  // Try to load a manifest.
  // This is an asynchronous process.
  try {
    await player.load(url);
    // This runs if the asynchronous load is successful.
    console.log('The video has now been loaded!');
  } catch (error) {
    onPlayerError(error);
  }
}
