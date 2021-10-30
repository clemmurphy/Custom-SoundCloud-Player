Amplitude.init({
  "bindings": {
    37: 'prev',
    39: 'next',
    32: 'play_pause'
  },
  "songs": [
    {
      // "artist": "Ancient Astronauts",
      "url": "https://soundcloud.com/darkerthanwax-radio/darker-than-wax-fm-232",
      //"cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg"
    }
  ],
  soundcloud_client: 'htuiRd1JP11Ww0X72T1C3g',
  soundcloud_use_art: true,
  callbacks: {
    loadedmetadata: function(){
      var metaData = Amplitude.getActiveSongMetadata();
      document.getElementById("trackName").innerHTML = metaData.soundcloud_data.title;
      let imgUrl = document.getElementById("cover-art").src;
      let result = imgUrl.replace("large", "t500x500");
      document.getElementById("cover-art").src = result;
    }
  },
});


window.onkeydown = function(e) {
  return !(e.keyCode == 32);
}; //space bar play pause.
/*
  Handles a click on the song played progress bar.
*/
document.getElementById('song-played-progress').addEventListener('click', function( e ){
  var offset = this.getBoundingClientRect();
  var x = e.pageX - offset.left;

  Amplitude.setSongPlayedPercentage( ( parseFloat( x ) / parseFloat( this.offsetWidth) ) * 100 );
});

