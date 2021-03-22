
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
    addStateCardButtonEvents()
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
    addStateCardButtonEvents()
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
            <p>Most recent entry: ${this.state_days[this.state_days.length - 1].date}</p>
          </div>
          <div class="card-action">
            <button class="show-state-detail btn" style="width: 100%; margin:auto" value=${this.id}>County Breakdown</button>
          </div>
          <div class="card-action">
          <button class="show-graph btn" style="width: 100%; margin:auto" value=${this.id}>Cases over time</button>
        </div>
        </div>
      </div>`;
  }


  // Graph view


    displayGraphView() {
      document.querySelector('#app-container').innerHTML = ""
      this.createGraph()
    }

    get labels() {
      return this.state_days.map(day => day.date)
    }
  
    get dailyCases() {
      return this.state_days.map(day => day.cases)
    }

    
    createGraph() {
    const canvas = document.createElement('canvas')
    canvas.id = 'myChart'
    var ctx = canvas.getContext('2d')
    var chart = new Chart(ctx, 
      {
        type: 'bar',
        data: {
            labels: [...this.labels],
            datasets: [{
                label: '',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [...this.dailyCases],
            }]
        },
        options: {
          title: {
            display: true,
            text: `Cases of COVID-19 in ${this.name}`,
            fontSize: 24
          }
        }
    })
    document.querySelector('#app-container').appendChild(canvas)
  }

}


State.all = []