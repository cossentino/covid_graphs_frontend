class Form {
  
 displayNewDataForm() {
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
      <div class="row">
        <button type="submit" id="add-data-submit" class="btn btn-primary">Submit</button>
        <button class="btn btn-primary return-to-home">Home</button>
      </div>
      </form>`
    document.querySelector('#add-state-data-form').addEventListener('submit', e => submitHandler(e))
    document.querySelector('.return-to-home').addEventListener('click', () => State.displayStatesView())
  }
  
 createStateSelectOptions() {
    const stateOptions = []
    const states = State.sortStates()
    for ( state of states ) {
      stateOptions.push(
        `<option value='${state.id}'>${state.name}<option>`
      )
    }
    return stateOptions.join("\n")
  }
  
  
 submitHandler(e) {
    e.preventDefault()
    const state_id = parseInt(document.querySelector('#state-select').value)
    const cases = document.querySelector('#case-input').value
    const date = document.querySelector('#date-input').value
    postFetchWrapper(state_id, cases, date)
  }
  
  
 postFetchWrapper(state_id, cases, date) {
    const myState = State.all.find(el => el.id == state_id )
    const bodyData1 = { state_id: myState.id, cases: cases, date: date }
    const bodyData2 = { id: myState.id, total_cases: parseInt(myState.total_cases) + parseInt(cases) }
    addDataDay(myState, bodyData1)
    updateTotalCases(myState, bodyData2)
  }
  
 addDataDay(state, body) {
  fetch(`http://localhost:3000/api/v1/states/${state.id}/state_days`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  })
    .then(resp => resp.json())
    .then(() => {
      state.state_days.push(body)
    })
  }
  
 updateTotalCases(state, body) {
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
  
}