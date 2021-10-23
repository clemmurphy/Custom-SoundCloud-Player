
window.addEventListener('DOMContentLoaded', () => {

  const urlInput = document.getElementById('url-input')
  const getButton = document.getElementById('get-button')
  const bodyContent = document.getElementById('body-content')

  let url = ''
  urlInput.addEventListener('input', () => {
    url = urlInput.value
  })
  
  getButton.addEventListener('click', () => {
    fetch(`https://soundcloud.com/oembed?format=json&url=${url}`)
      .then(
        function(response){
          const res = response.json()
          res.then((data) => {
            console.log(data)
            bodyContent.innerHTML = data.html
          })
        }
      )
  })
})

