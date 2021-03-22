const statesEndpoint = "http://localhost:3000/api/v1/states"
const countiesEndpoint = "http://localhost:3000/api/v1/counties"


document.addEventListener("DOMContentLoaded", () => {
  getStates()
    .then(() => addStateCardButtonEvents())
  document.querySelector('#add-data-button').addEventListener("click", () => displayNewDataForm())
  document.querySelector('.brand-logo').addEventListener("click", () => State.displayStatesView())
})

// Display states view

function loadScreen() {
  const div1 = document.createElement('div')
  const h2 = document.createElement('h2')
  h2.innerText = 'Loading . . . (this may take about ten seconds)'
  div1.appendChild(h2)
  document.querySelector('#app-container').appendChild(div1)
}

function getStates() {
  loadScreen()
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
  const form = new Form
  myDiv.innerHTML = form.formHTML()
  document.querySelector('#add-state-data-form').addEventListener('submit', e => form.submitHandler(e))
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


