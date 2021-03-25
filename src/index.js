const statesEndpoint = "http://localhost:3000/api/v1/states"
 

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
    .catch(error => errorHandler(error))
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
    .catch(error => errorHandler(error))
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

// Buttons/functionality used throughout app

function renderHomeButton() {
  const div1 = document.createElement('div')
  const button = document.createElement('button')
  div1.className = "row"
  button.className = "btn btn-primary return-to-home"
  button.innerText = "Return Home"
  button.style.margin = 'auto'
  button.addEventListener('click', () => State.displayStatesView())
  div1.appendChild(button)
  document.querySelector('#app-container').appendChild(div1)
}


function errorHandler(error) {
  alert(error.message)
  document.querySelector('#app-container').innerHTML = "<h2>We're experiencing technical difficulties. Please try again at a later time.</h2>"
}