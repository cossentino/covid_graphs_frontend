const statesEndpoint = "http://localhost:3000/api/v1/states"
console.log("test test")


document.addEventListener("DOMContentLoaded", () => {
  getStates()
  displayStates()
})

function getStates() {
  fetch(statesEndpoint)
    .then( resp => resp.json() )
    .then( json => displayStates(json) )
}

function displayStates(statesJson) {
  statesJson.data.forEach(s => displayState(s))
}

function displayState(stateObj) {
  const div1 = document.createElement('div')
  const ul = document.createElement('ul')
  const li1 = document.createElement('li')
  li1.innerText = stateObj.attributes.name
  ul.appendChild('li1')
  div1.appendChild('ul')
}