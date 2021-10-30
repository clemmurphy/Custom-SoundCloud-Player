window.addEventListener('DOMContentLoaded', () => {

  // Change this URL variable in webflow - this is the track URL to embed
  const url = 'https://soundcloud.com/officialbyrontheaquarius/chop-crew-pt1'

  // iframe embed that will be hidden
  const iframeHtml = `<iframe id="player-iframe" src="https://w.soundcloud.com/player/?url=${url}" style="display: none;"></iframe>`

  // Bringing in the DOM elements
  // Artist and track details
  const artistName = document.getElementById('artist-name')
  const trackName = document.getElementById('track-name')
  const artistLink = document.getElementById('artist-link')
  // iframe to be hidden
  const iframeWrapper = document.getElementById('iframe-wrapper')
  iframeWrapper.innerHTML = iframeHtml
  // Player details
  const playerArtwork = document.getElementById('player-artwork')
  const playPauseButton = document.getElementById('play-pause')
  const progressBar = document.getElementById('progress-bar')
  const progressTimeline = document.getElementById('progress-timeline')
  const durationDisplay = document.getElementById('duration-display')
  const positionTime = document.getElementById('position-time')

  // Mount the SoundCloud widget
  const player = SC.Widget('player-iframe')
  player.bind(SC.Widget.Events.READY, () => {

    // Player progress
    let duration = 0
    let progressPercent = 0
    const getProgressInMs = () => {
      return (progressPercent / 100) * duration
    }

    // Handle clicks to the progress bar to skip to selected place
    progressTimeline.addEventListener('click', (e) => {
      const percentPositionClicked = ((e.offsetX / progressTimeline.offsetWidth) * 100).toFixed(0)
      progressPercent = percentPositionClicked
      player.seekTo(getProgressInMs())
      positionTime.innerText = msToMinutesAndSeconds(getProgressInMs())
      progressBar.style.width = progressPercent + '%'
    })

    // Set default progress width
    progressBar.style.width = progressPercent + '%'

    // Retrieve total duration of the track in ms
    player.getDuration((d) => {
      duration = d
      positionTime.innerText = '0:00'
      durationDisplay.innerText = msToMinutesAndSeconds(duration)
    })

    // Behaviour to update the progress bar while track playing
    const trackPlaying = () => {
      setInterval(() => {
        player.getPosition((position) => {
          progressPercent = (position / duration) * 100
        })
        progressBar.style.width = progressPercent + '%'
        positionTime.innerText = msToMinutesAndSeconds(getProgressInMs())
      }, 100)
    }

    // Run trackPlaying when track plays
    player.bind(SC.Widget.Events.PLAY, () => {
      trackPlaying()
    })
  
    // Stop trackPlaying when track paused
    player.bind(SC.Widget.Events.PAUSE, () => {
      clearInterval(trackPlaying)
    })
  
    // Stop trackPlaying when track ends
    player.bind(SC.Widget.Events.FINISH, () => {
      clearInterval(trackPlaying)
      playToPause()
    })
  })

  // Converts ms duration to human-readable format
  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = ((ms % 60000) / 1000).toFixed(0)
    return (
      seconds === 60 ?
        (minutes + 1) + ':00' :
        minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    )
  }

  // Set up buttons
  playPauseButton.addEventListener('click', () => {
    if (playPauseButton.dataset.playing === '1') {
      playToPause()
    } else {
      pauseToPlay()
    }
  })

  const playToPause = () => {
    player.pause()
    playPauseButton.dataset.playing = '0'
    playPauseButton.classList.add('paused')
    playPauseButton.classList.remove('playing')
  }

  const pauseToPlay = () => {
    player.play()
    playPauseButton.dataset.playing = '1'
    playPauseButton.classList.add('playing')
    playPauseButton.classList.remove('paused')
  }

  // Track info API call and DOM setting
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

