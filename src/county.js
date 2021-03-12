

class County {

  static sortCounties() {
    const myCounties = [...County.all]
    myCounties.sort((a,b) => {
      return a.name.localeCompare(b.name)
    })
    return myCounties
  }

  static displayCountiesView() {
    document.querySelector('#app-container').innerHTML = ""
    this.sortCounties().forEach(c => c.renderCountyCard())
  }

  constructor(countyObj) {
    const attrs = countyObj.attributes
    this.id = countyObj.id
    this.name = attrs.name
    this.total_cases = attrs.total_cases
    this.population = attrs.population
    this.case_rate = attrs.case_rate
    County.all.push(this)
  }

  renderCountyCard() {
    const div1 = document.createElement('div')
    div1.style = "width:400px; float:left"
    div1.innerHTML = this.countyCardHTML()
    document.querySelector("#app-container").appendChild(div1)
  }


  countyCardHTML() {
    return `
      <div class="col s3 m3" style="width:300px">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">${countyObj.attributes.name}</span>
            <p>Total Cases: ${countyObj.attributes.total_cases}</p>
            <p>Population: ${countyObj.attributes.population}</p>
            <p>Cases as Percent of Population: ${countyObj.attributes.case_rate}%</p>
          </div>
        </div>
      </div>`;
  }

}


// Note that County.all is not a reference to all counties, but typically contains all counties for one state
County.all = []