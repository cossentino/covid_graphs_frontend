const statesEndpoint = "http://localhost:3000/api/v1/states"
const countiesEndpoint = "http://localhost:3000/api/v1/counties"


document.addEventListener("DOMContentLoaded", () => {
  getStates()
})

// Functions to display a state on the homepage
function getStates() {
  fetch(statesEndpoint)
    .then( resp => resp.json() )
    .then( json => displayStatesView(json) )
    .then( () => addLinkToCountyButtons() )
}
function displayStatesView(statesJson) {
  document.querySelector('#app-container').innerHTML = ""
  sortJSONObjArrayByName(statesJson)
  statesJson.data.forEach(s => displayStateCard(s))
  return statesJson
}
function displayStateCard(stateObj) {
  div1 = document.createElement('div')
  // div1.className = "container col s3"
  div1.style = "width:400px; float:left"
  div1.innerHTML = stateCardHTML(stateObj)
  document.querySelector("#app-container").appendChild(div1)
}
function stateCardHTML(stateObj) {
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

function addLinkToCountyButtons() {
  const detailLinks = document.querySelectorAll('.show-state-detail')
  for (i of detailLinks ) {
    i.addEventListener('click', e => {
      getCountiesByState(e)
    })
  }
}
function getCountiesByState(e) {
  fetch(`http://localhost:3000/api/v1/states/${e.target.value}/counties`)
    .then( resp => resp.json() )
    .then( json => displayCountyView(json) )
}
function displayCountyView(json) {
  document.querySelector('#app-container').innerHTML = ""
  sortJSONObjArrayByName(json)
  json.data.forEach( countyObj => {
    displayCountyCard(countyObj)
  })
}
function displayCountyCard(countyObj) {
  div1 = document.createElement('div')
  // div1.className = "container col s3"
  div1.style = "width:400px; float:left"
  div1.innerHTML = countyCardHTML(countyObj)
  document.querySelector("#app-container").appendChild(div1)
}
function countyCardHTML(countyObj) {
  const card =
    `<div class="col s3 m3" style="width:300px">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">${countyObj.attributes.name}</span>
          <p>Total Cases: ${countyObj.attributes.total_cases}</p>
          <p>Population: ${countyObj.attributes.population}</p>
        </div>
      </div>
    </div>`;
return card
}


// Sort JSON obj by name

function sortJSONObjArrayByName(json) {
  json.data.sort((a,b) => {
    return a.attributes.name.localeCompare(b.attributes.name)
  })
}
