const statesEndpoint = "http://localhost:3000/api/v1/states"
const countiesEndpoint = "http://localhost:3000/api/v1/counties"
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
          <p class="show-state-detail">County Breakdown!</p>
        </div>
      </div>
    </div>`;
return card
}


// Display detail view of county-by-county breakdown

function getCounties() {
  fetch(statesEndpoint)
    .then( resp => resp.json() )
    .then( json => displayStates(json) )
}

 const detailLinks = document.querySelectorAll('.show-state-detail')

for (i of detailLinks ) {
  i.addEventListener('click', () => showCountyView)
}

function showCountyView() {
  const stateName = e.target.parentElement.previousElementSibling.querySelector('.card-title').innerHTML