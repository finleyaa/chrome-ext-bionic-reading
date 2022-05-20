const disableForPage = () => {
  localStorage.setItem('bionicReading.disabled', true)
}

const enableForPage = () => {
  localStorage.removeItem('bionicReading.disabled')
}

const toggleState = () => {
  console.log('toggle')
  if (currentState) {
    enableForPage()
  } else {
    disableForPage()
  }
  currentState = !currentState
  updateButton()
}

const updateButton = () => {
  if (currentState === false) {
    document.getElementById('disable').innerText = 'Disable for this page'
  } else {
    document.getElementById('disable').innerText = 'Enable for this page'
  }
}

const button = document.getElementById('disable')
button.addEventListener('click', toggleState)
let currentState
chrome.storage.sync.get("disabled", ({ disabled }) => {
  currentState = disabled.includes(location.href)
  updateButton()
})
console.log(currentState)
updateButton()