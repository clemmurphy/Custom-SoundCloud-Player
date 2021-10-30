window.addEventListener('DOMContentLoaded', () => {

  const urlInput = document.getElementById('url-input')
  let url = 'https://soundcloud.com/officialbyrontheaquarius/chop-crew-pt1'

  const artistName = document.getElementById('artist-name')
  const trackName = document.getElementById('track-name')

  const iframeWidget = SC.Widget('player-iframe')
  const playerArtwork = document.getElementById('player-artwork')
  const playPauseButton = document.getElementById('play-pause')
  const scLink = document.getElementById('sc-link')

  playPauseButton.addEventListener('click', () => {
    if (playPauseButton.dataset.playing === '1') {
      iframeWidget.pause()
      playPauseButton.dataset.playing = '0'
      playPauseButton.innerText = 'Play'
      playPauseButton.classList.remove('pause-button')
      playPauseButton.classList.add('play-button')
    } else {
      iframeWidget.play()
      playPauseButton.dataset.playing = '1'
      playPauseButton.innerText = 'Pause'
      playPauseButton.classList.remove('play-button')
      playPauseButton.classList.add('pause-button')
    }
    console.log('Play button clicked')
  })

  const getTrackData = () => {
    fetch(`https://soundcloud.com/oembed?format=json&url=${url}`)
      .then(
        function(response){
          const res = response.json()
          res.then((data) => {
            console.log(data)
            playerArtwork.src = data.thumbnail_url
            artistName.innerText = data.author_name
            trackName.innerText = data.title
            scLink.addEventListener('click', () => {
              window.open(
                data.author_url,
                '_blank'
              )
            })
          })
        }
      )
  }

  getTrackData()

  urlInput.addEventListener('input', () => {
    url = urlInput.value
    getTrackData()
  })

})

