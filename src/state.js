
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
    this.total_cases = parseInt(stateObj.attributes.total_cases)
    this.population = stateObj.attributes.population
    this.case_rate = stateObj.attributes.case_rate
    this.counties = stateObj.attributes.counties
    this.state_days = stateObj.attributes.state_days
    State.all.push(this)
  }
  
  displayOneState() {
    document.querySelector('#app-container').innerHTML = ""
    this.renderStateCard()
  }

  renderStateCard() {
    const div1 = document.createElement('div')
    div1.style = "width:400px; float:left"
    div1.innerHTML = this.stateCardHTML()
    document.querySelector("#app-container").appendChild(div1)
  }


  stateCardHTML() {
    return `
      <div class="col s3 m3" style="width:250px">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">${this.name}</span>
            <p>Total Cases: ${this.total_cases}</p>
            <p>Population: ${this.population}</p>
            <p>Cases as % of Population: ${this.case_rate}%</p>
          </div>
          <div class="card-action">
            <button class="show-state-detail btn" value=${this.id}>County Breakdown!</button>
          </div>
          <div class="card-action">
          <button class="show-graph btn" value=${this.id}>See cases over time!</button>
        </div>
        </div>
      </div>`;
  }


  // Graph view


    displayGraphView() {
    const labels = 
    document.querySelector('#app-container').innerHTML = ""
    const canvas = document.createElement('canvas')
    canvas.id = 'myChart'
    var ctx = canvas.getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: [...this.labels],
            datasets: [{
                label: `Cases of COVID-19 in ${this.name}`,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [...this.dailyCases]
            }]
        },
        options: {}
    });
    document.querySelector('#app-container').appendChild(canvas)
  }



  get labels() {
    return this.state_days.map(day => day.date)
  }

  get dailyCases() {
    return this.state_days.map(day => day.cases)
  }

}


State.all = []