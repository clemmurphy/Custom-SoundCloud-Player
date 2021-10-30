window.addEventListener('DOMContentLoaded', () => {

  // Change this URL variable in webflow
  const url = 'https://soundcloud.com/officialbyrontheaquarius/chop-crew-pt1'
  const iframeHtml = `<iframe id="player-iframe" width="100%" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=${url}&amp;show_artwork=true&download=false&color=#000000&show_playcount=false" style="display: none;"></iframe>`

  const artistName = document.getElementById('artist-name')
  const trackName = document.getElementById('track-name')

  const iframeWrapper = document.getElementById('iframe-wrapper')
  iframeWrapper.innerHTML = iframeHtml
  const playerArtwork = document.getElementById('player-artwork')
  const playPauseButton = document.getElementById('play-pause')
  const artistLink = document.getElementById('artist-link')
  const iframeWidget = SC.Widget('player-iframe')

  playPauseButton.addEventListener('click', () => {
    if (playPauseButton.dataset.playing === '1') {
      iframeWidget.pause()
      playPauseButton.dataset.playing = '0'
      playPauseButton.classList.add('paused')
      playPauseButton.classList.remove('playing')
    } else {
      iframeWidget.play()
      playPauseButton.dataset.playing = '1'
      playPauseButton.classList.add('playing')
      playPauseButton.classList.remove('paused')
    }
  })

  const getTrackData = () => {
    fetch(`https://soundcloud.com/oembed?format=json&url=${url}`)
      .then(
        function(response){
          const res = response.json()
          res.then((data) => {
            playerArtwork.src = data.thumbnail_url
            artistName.innerText = data.author_name
            trackName.innerText = data.title.split(' by ')[0]
            artistLink.href = data.author_url
          })
        }
      )
  }

  getTrackData()

})

