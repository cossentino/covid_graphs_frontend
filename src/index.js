const statesEndpoint = "http://localhost:3000/api/v1/states"
const countiesEndpoint = "http://localhost:3000/api/v1/counties"


document.addEventListener("DOMContentLoaded", () => {
  getStates()
    .then(() => addLinkToCountyButtons())
  document.querySelector('#add-data-button').addEventListener("click", () => displayNewDataForm())
})

// Functions to display a state on the homepage

function getStates() {
  return fetch(statesEndpoint)
    .then( resp => resp.json() )
    .then( json => {
      json.data.forEach(s => {
        let newState = new State(s)
      })
    })
    .then( () => State.displayStatesView() )
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
    .then( json => {
      County.all.length = 0
      json.data.forEach(c => {
        let newCounty = new County(c)
      })
    })
    .then( () => County.displayCountiesView() )
}

function displayCountyView(json) {
  document.querySelector('#app-container').innerHTML = ""
  County.all.length = 0
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
          <p>Cases as Percent of Population: ${countyObj.attributes.case_rate}%</p>
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
  return json
}


// Display Form to add data

function displayNewDataForm() {
  myDiv = document.querySelector('#app-container')
  createStateSelectOptions()
    .then(resp => { 
      myDiv.innerHTML = `
      <form id="add-state-data-form">
        <div class="form-group">
        <label for="state-select"><p class="#">State</p></label>
          <select id="state-select" style="display:inline-block">
            ${resp}
          </select>
        </div>
        <div class="form-group">
          <label for="case-input"><p class="#">Cases</p></label>
          <input type="text" class="form-control" id="case-input">
        </div>
        <div class="form-group">
          <label for="date-input">Date</label>
          <input type="date" class="form-control" id="date-input">
        </div>
        <button class="btn" type="submit" id="add-data-submit" class="btn btn-primary">Submit</button>
    </form>
      `
    })
    .then(() => {
      document.querySelector('#add-state-data-form').addEventListener('submit', e => submitHandler(e))
    })
}

async function createStateSelectOptions() {
  const stateOptions = []
  const states = await( 
    fetch(statesEndpoint)
    .then( resp => resp.json() )
    .then( json => sortJSONObjArrayByName(json))
  )
  for ( state of states.data ) {
    stateOptions.push(
      `<option value='${state.id}'>${state.attributes.name}<option>`
    )
  }
  return stateOptions.join("\n")
}


function submitHandler(e) {
  e.preventDefault()
  const stateID = parseInt(document.querySelector('#state-select').value)
  const caseNumber = document.querySelector('#case-input').value
  const date = document.querySelector('#date-input').value
  postFetch(stateID, caseNumber, date)
}


function postFetch(stateID, caseNumber, date) {
  const endpoint = `http://localhost:3000/api/v1/states/${stateID}/state_days`
  const bodyData = { state_id: stateID, cases: caseNumber, date: date }
  fetch(endpoint, {
    // POST request
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
    .then(resp => resp.json())
    .then(json => console.log(json))
}