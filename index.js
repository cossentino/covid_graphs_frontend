const statesEndpoint = "http://localhost:3000/api/v1/states"
const countiesEndpoint = "http://localhost:3000/api/v1/counties"


document.addEventListener("DOMContentLoaded", () => {
  getStates()
})

// Functions to display a state on the homepage
function getStates() {
  fetch(statesEndpoint)
    .then( resp => resp.json() )
    .then( json => displayStates(json) )
    .then( () => addLinkToCountyButtons() )
}

function displayStates(statesJson) {
  statesJson.data.forEach(s => displayState(s))
  return statesJson
}

function displayState(stateObj) {
  div1 = document.createElement('div')
  // div1.className = "container col s3"
  div1.style = "width:400px; float:left"
  div1.innerHTML = displayStateCard(stateObj)
  document.querySelector("#app-container").appendChild(div1)
}


function displayStateCard(stateObj) {
  const card =
    `<div class="col s3 m3" style="width:300px">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">${stateObj.attributes.name}</span>
          <p>Total Cases: ${stateObj.attributes.total_cases}</p>
          <p>Population: ${stateObj.attributes.population}</p>
        </div>
        <div class="card-action">
          <button class="show-state-detail" value=${stateObj.id}>County Breakdown!</button>
        </div>
      </div>
    </div>`;
return card
}


// Display detail view of county-by-county breakdown

function getCountiesByState(e) {
  fetch(`http://localhost:3000/api/v1/states/${e.target.value}/counties`)
    .then( resp => resp.json() )
    .then( json => showCountyView(e, json) )
}


function addLinkToCountyButtons() {
  const detailLinks = document.querySelectorAll('.show-state-detail')
  for (i of detailLinks ) {
    i.addEventListener('click', e => {
      getCountiesByState(e)
    })
  }
}

function showCountyView(e, json) {
  const stateName = e.target.parentElement.previousElementSibling.querySelector('.card-title').innerHTML
  const countiesArray = []
  json.data.forEach( countyObj => {
    displayCountyCard(countyObj)
  })
}

function displayCountyCard(countyObj) {
  const card =
    `<div class="col s3 m3" style="width:300px">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">${stateObj.attributes.name}</span>
          <p>Total Cases: ${stateObj.attributes.total_cases}</p>
          <p>Population: ${stateObj.attributes.population}</p>
        </div>
        <div class="card-action">
          <button class="show-state-detail" value=${stateObj.id}>County Breakdown!</button>
        </div>
      </div>
    </div>`;
return card
}