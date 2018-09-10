
// sample get request to the public api

const config = {
    apiUrl : 'http://api.dorsalwatch.com/public',
    publicKey : 'ab61cd9427bea80f22e641c04c312195',
    contentType : 'application/json',
    appName : 'SHARK DATA 1.0'

}


// list of countries
const countries = {
    country: "",
    renderCountriesList : function ()  {
        const data = this.response.responseData
        const targetContainer = document.querySelector(".sidebar")
        data.forEach( (item) => {
            let div = document.createElement('div')
            div.setAttribute('id' , item.name)
            div.setAttribute('class' , 'button hvr-ripple-out')
            div.setAttribute('value' , item.name)
            div.textContent = item.name
            div.addEventListener('click' , (e) => {
                countries.setCountry(item.name)
                states.getStatesData(item.name)
            })
            targetContainer.appendChild(div)
        })
    },
    setCountry : function (country) {
        const sharkData = JSON.parse(localStorage.getItem('shark-data'))
        sharkData[0].country = country
        localStorage.setItem('shark-data' , JSON.stringify(sharkData))
    },
    getCountriesData : function ()  {
        const http = new XMLHttpRequest();
        http.open("GET", config.apiUrl + '/countries');
        http.responseType = "json"
        http.addEventListener("load", this.renderCountriesList);
        // http.addEventListener("progress", updateProgress)
        // http.addEventListener("error", transferFailed)
        // http.addEventListener("abort", transferCancelled)
        http.send()
    }

}


//  list of states
const states = {

    renderStatesList : function (responseTxt)  {

        // console.log('States By Country:::::::')
        const data = this.response.responseData
        const targetContainer = document.querySelector(".main__content-panel-list-data")
        const currentData =  document.querySelector(".live-data")

        if (currentData) {
            targetContainer.removeChild(currentData)
        }

        const liveData = document.createElement('div')
        liveData.setAttribute('class', 'live-data')
        targetContainer.appendChild(liveData)

        const title = document.querySelector(".main__content-panel-title")
        const sharkData = JSON.parse(localStorage.getItem('shark-data'))

        title.textContent = "Reporting states in " + sharkData[0].country
        targetContainer.appendChild(title)
        data.forEach( (item) => {
            let div = document.createElement('div')
            div.setAttribute('id' , item.name)
            div.setAttribute('class' , 'button hvr-ripple-out')
            div.setAttribute('value' , item.name)
            div.textContent = item.name
            div.addEventListener('click' , (e) => {
                states.setState(item.name)
                zones.getZonesData(item.name)
            })
            liveData.appendChild(div)
            targetContainer.appendChild(liveData)
        })
        // console.log(this.response.responseData)
    },
    setState : function (state) {
        const sharkData = JSON.parse(localStorage.getItem('shark-data'))
        sharkData[0].state = state
        localStorage.setItem('shark-data' , JSON.stringify(sharkData))
    },
    getStatesData : function (country)  {
        const http = new XMLHttpRequest();
        http.open("GET", config.apiUrl + '/' + country +  '/states');
        http.responseType = "json"
        http.addEventListener("load", this.renderStatesList);
        // http.addEventListener("progress", updateProgress)
        // http.addEventListener("error", transferFailed)
        // http.addEventListener("abort", transferCancelled)
        http.send()

    }

}

// list of surf zones
const zones = {

    renderZonesList : function (responseTxt)  {

        const data = this.response.responseData
        const targetContainer = document.querySelector(".main__content-panel-list-data")
        const currentData =  document.querySelector(".live-data")

        if (currentData) {
            targetContainer.removeChild(currentData)
        }

        const liveData = document.createElement('div')
        liveData.setAttribute('class', 'live-data')
        targetContainer.appendChild(liveData)

        const title = document.querySelector(".main__content-panel-title")
        const sharkData = JSON.parse(localStorage.getItem('shark-data'))

        title.textContent = "Reporting Zones in " + sharkData[0].state
        targetContainer.appendChild(title)
        data.forEach( (item) => {
            let div = document.createElement('div')
            div.setAttribute('id' , item)
            div.setAttribute('class' , 'button hvr-ripple-out')
            div.setAttribute('value' , item)
            div.textContent = item
            div.addEventListener('click' , (e) => {
                zones.setZone(item)
                locations.getLocationsData(item)
            })
            liveData.appendChild(div)
            targetContainer.appendChild(liveData)
        })
    },
    setZone : function (zone){
        const sharkData = JSON.parse(localStorage.getItem('shark-data'))
        sharkData[0].zone = zone
        localStorage.setItem('shark-data' , JSON.stringify(sharkData))
    },
    getZonesData : function (value)  {

        const sharkData = JSON.parse(localStorage.getItem('shark-data'))

        let country =  sharkData[0].country
        const state = sharkData[0].state
        const http = new XMLHttpRequest();
        http.open("GET", config.apiUrl + '/surfspot/zone/' + country + '/' + state + '/' + config.publicKey);
        http.responseType = "json"
        http.addEventListener("load", this.renderZonesList);
        // http.addEventListener("progress", updateProgress)
        // http.addEventListener("error", transferFailed)
        // http.addEventListener("abort", transferCancelled)
        http.send()

    }

}

// list of surf Spots
const locations = {

    renderLocationsList : function (responseTxt)  {
        const data = this.response.responseData
        const targetContainer = document.querySelector(".main__content-panel-list-data")
        const currentData =  document.querySelector(".live-data")

        if (currentData) {
            targetContainer.removeChild(currentData)
        }

        const liveData = document.createElement('div')
        liveData.setAttribute('class', 'live-data')
        targetContainer.appendChild(liveData)

        const title = document.querySelector(".main__content-panel-title")
        const sharkData = JSON.parse(localStorage.getItem('shark-data'))

        title.textContent = "Reporting zones  " + sharkData[0].zone + ' / '+ sharkData[0].state
        targetContainer.appendChild(title)
        data.forEach( (item) => {
            let div = document.createElement('div')
            div.setAttribute('id' , item)
            div.setAttribute('class' , 'button hvr-ripple-out')
            div.setAttribute('value' , item)
            div.textContent = item
            div.addEventListener('click' , (e) => {
                locations.setLocation(item)
                locations.getLocationReports(item)
            })
            liveData.appendChild(div)
            targetContainer.appendChild(liveData)
        })
    },
    setLocation : function (item) {
        const sharkData = JSON.parse(localStorage.getItem('shark-data'))
        sharkData[0].location = item
        localStorage.setItem('shark-data' , JSON.stringify(sharkData))
    },
    getLocationsData : function (location)  {

        const sharkData = JSON.parse(localStorage.getItem('shark-data'))
        let country =  sharkData[0].country
        const state = sharkData[0].state

        const http = new XMLHttpRequest();
        http.open("GET", config.apiUrl + '/surfspot/location/' + country  + '/' + state + '/' + location + '/' + config.publicKey);
        http.responseType = "json"
        http.addEventListener("load", this.renderLocationsList);
        // http.addEventListener("progress", updateProgress)
        // http.addEventListener("error", transferFailed)
        // http.addEventListener("abort", transferCancelled)
        http.send()

    },
    getLocationReports : function (location)  {

        const sharkData = JSON.parse(localStorage.getItem('shark-data'))
        let country =  sharkData[0].country
        const state = sharkData[0].state

        const http = new XMLHttpRequest();

        // this request takes a body to it
        // apiKey gets sent in the body along with other values

        const request = {};
        request.state = sharkData[0].state
        request.zone = sharkData[0].zone
        request.location = sharkData[0].location
        request.publicKey = config.publicKey;
        request.pageSize = 20; //items return per call
        request.pageIndex = 0; //page index


        http.open("POST", config.apiUrl + '/report/list');
        http.setRequestHeader('content-type', config.contentType)
        http.responseType = "json"
        http.addEventListener("load", this.renderLocationReports);
        // http.addEventListener("progress", updateProgress)
        // http.addEventListener("error", transferFailed)
        // http.addEventListener("abort", transferCancelled)
        http.send(JSON.stringify(request))

    },
    renderLocationReports : function (responseTxt)  {
        const data = this.response.responseData
        const targetContainer = document.querySelector(".main__content-panel-list-data")
        const currentData =  document.querySelector(".live-data")

        if (currentData) {
            targetContainer.removeChild(currentData)
        }

        const liveData = document.createElement('div')
        liveData.setAttribute('class', 'live-data')
        targetContainer.appendChild(liveData)

        const title = document.querySelector(".main__content-panel-title")
        const sharkData = JSON.parse(localStorage.getItem('shark-data'))

        title.textContent = "Reports for " + sharkData[0].location + ' / '+ sharkData[0].country
        targetContainer.appendChild(title)
        data.forEach( (item) => {
            console.log(item)
            let el = document.createElement('button')
            el.setAttribute('id' , item)
            el.setAttribute('class' , 'button hvr-ripple-out')
            el.setAttribute('value' , item)
            el.textContent = item.formattedReportTime
            el.addEventListener('click' , (e) => {
                console.log(item)
            })
            liveData.appendChild(el)
            targetContainer.appendChild(liveData)
        })
    },

}

const setUp = () => {
    localStorage.setItem
    ('shark-data', JSON.stringify
        (
            [
                {
                    'country' : '',
                    'state' : '',
                    'zone' : '',
                    'location' : ''
                }
            ]
        )
    )
    countries.getCountriesData('Australia')
    const appName = document.querySelector('.app-name')
    appName.textContent = config.appName
}
setUp()

// use the country name as an input for now
// states.getStatesData('Australia')
// zones.getZonesData('NSW')
// locations.getLocationsData('Sydney')
