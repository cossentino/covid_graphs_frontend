const statesEndpoint = "http://localhost:3000/api/v1/states"
console.log("test test")


document.addEventListener("DOMContentLoaded", () => {
  getStates()
})






// Functions to display a state on the homepage
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
  div1.innerHTML = displayStateCard(stateObj)
  document.querySelector("#app-container").appendChild(div1)
}


function displayStateCard(stateObj) {
  const card =
  ` <div class="col s12 m6">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
        <span class="card-title">${stateObj.attributes.name}</span>
        <p>I am a very simple card. I am good at containing small bits of information.
        I am convenient because I require little markup to use effectively.</p>
      </div>
      <div class="card-action">
        <p>County Breakdown!</p>
      </div>
    </div>
  </div>`;
return card
}