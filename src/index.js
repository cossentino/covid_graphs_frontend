const statesEndpoint = "http://localhost:3000/api/v1/states"
const countiesEndpoint = "http://localhost:3000/api/v1/counties"


document.addEventListener("DOMContentLoaded", () => {
  getStates()
    .then(() => addStateCardButtonEvents())
  document.querySelector('#add-data-button').addEventListener("click", () => displayNewDataForm())
  document.querySelector('.brand-logo').addEventListener("click", () => State.displayStatesView())
})

// Display states view

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

function addStateCardButtonEvents() {
  const detailLinks = document.querySelectorAll('.show-state-detail')
  const graphLinks = document.querySelectorAll('.show-graph')
  for (i of detailLinks ) {
    i.addEventListener('click', e => {
      getCountiesByState(e)
    })
  }
  for (i of graphLinks) {
    i.addEventListener('click', e => {
      getStateGraph(e)
    })
  }
}

// Display counties by state

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

// Graph view

function getStateGraph(e) {
  const myState = State.all.find(el => el.id == e.target.value)
  myState.displayGraphView()
}


// New cases form

function displayNewDataForm() {
  const myDiv = document.querySelector('#app-container')
  myDiv.innerHTML = `
  <form id="add-state-data-form">
    <div class="form-group">
    <label for="state-select"><p class="#">State</p></label>
      <select id="state-select" style="display:inline-block">
        ${createStateSelectOptions()}
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
    <button type="submit" id="add-data-submit" class="btn btn-primary">Submit</button>
    </form>
    <button class="btn btn-primary return-to-home">Home</button>`
  document.querySelector('#add-state-data-form').addEventListener('submit', e => submitHandler(e))
  document.querySelector('.return-to-home').addEventListener('click', () => State.displayStatesView())
}

function createStateSelectOptions() {
  const stateOptions = []
  const states = State.sortStates()
  for ( state of states ) {
    stateOptions.push(
      `<option value='${state.id}'>${state.name}<option>`
    )
  }
  return stateOptions.join("\n")
}


function submitHandler(e) {
  e.preventDefault()
  const state_id = parseInt(document.querySelector('#state-select').value)
  const cases = document.querySelector('#case-input').value
  const date = document.querySelector('#date-input').value
  postFetchWrapper(state_id, cases, date)
}


function postFetchWrapper(state_id, cases, date) {
  const myState = State.all.find(el => el.id == state_id )
  const bodyData1 = { state_id: myState.id, cases: cases, date: date }
  const bodyData2 = { id: myState.id, total_cases: parseInt(myState.total_cases) + parseInt(cases) }
  addDataDay(myState, bodyData1)
  updateTotalCases(myState, bodyData2)
}

function addDataDay(state, body) {
fetch(`http://localhost:3000/api/v1/states/${state.id}/state_days`, {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify(body)
})
  .then(resp => resp.json())
}

function updateTotalCases(state, body) {
  fetch(`http://localhost:3000/api/v1/states/${state.id}`, {
    method: "PATCH", 
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  })
  .then(resp => resp.json())
  .then(() => {
    state.total_cases += parseInt(document.querySelector('#case-input').value)
    state.displayOneState()
  })
}

