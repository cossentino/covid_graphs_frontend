


class State {

  static sortStates() {
    const myStates = [...State.all]
    myStates.sort((a,b) => {
      return a.name.localeCompare(b.name)
    })
    return myStates
  }

  static displayStatesView() {
    document.querySelector('#app-container').innerHTML = ""
    this.sortStates().forEach(s => s.renderStateCard())
  }


  constructor(stateObj) {
    this.id = stateObj.id
    this.name = stateObj.attributes.name
    this.total_cases = stateObj.attributes.total_cases
    this.population = stateObj.attributes.population
    this.case_rate = stateObj.attributes.case_rate
    this.counties = stateObj.attributes.counties
    State.all.push(this)
  }


  renderStateCard() {
    const div1 = document.createElement('div')
    div1.style = "width:400px; float:left"
    div1.innerHTML = this.stateCardHTML()
    document.querySelector("#app-container").appendChild(div1)
  }


  stateCardHTML() {
    return `
      <div class="col s3 m3" style="width:300px">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">${this.name}</span>
            <p>Total Cases: ${this.total_cases}</p>
            <p>Population: ${this.population}</p>
            <p>Cases as Percent of Population: ${this.case_rate}%</p>
          </div>
          <div class="card-action">
            <button class="show-state-detail btn" value=${this.id}>County Breakdown!</button>
          </div>
        </div>
      </div>`;
  }

}


State.all = []