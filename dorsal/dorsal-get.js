
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
                states.getStatesData(item.name)
            })
            targetContainer.appendChild(div)
        })
    },
    getCountriesData : function (country)  {
        localStorage.setItem
        ('shark-data', JSON.stringify
            (
                [
                    {
                        'country' : country,
                        'zone' : '',
                        'locations' : []
                    }
                ]
            )
        )
        this.country = country
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

        title.textContent = "Reporting Zones in " + sharkData[0].country
        targetContainer.appendChild(title)
        data.forEach( (item) => {
            let div = document.createElement('div')
            div.setAttribute('id' , item.name)
            div.setAttribute('class' , 'button hvr-ripple-out')
            div.setAttribute('value' , item.name)
            div.textContent = item.name
            div.addEventListener('click' , (e) => {
                zones.getZonesData(item.name)
            })
            liveData.appendChild(div)
            targetContainer.appendChild(liveData)
        })
        // console.log(this.response.responseData)
    },
    getStatesData : function (country)  {
        localStorage.setItem('shark-data' ,JSON.stringify([
            {
                'country' : country,
                'zone' : '',
                'locations' : []
            }]))
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
    zone: "",
    renderZonesList : function (responseTxt)  {
        const data = this.response.responseData
        console.log(data)
        // console.log('Surfing Zones:::::::')
        data.forEach( (item) => {

        })
    },
    getZonesData : function (value)  {

        const sharkData = JSON.parse(localStorage.getItem('shark-data'))
        if (sharkData) {

            this.zone = value
            let country =  sharkData[0].country
            const http = new XMLHttpRequest();
            http.open("GET", config.apiUrl + '/surfspot/zone/' + country + '/' + this.zone + '/' + config.publicKey);
            http.responseType = "json"
            http.addEventListener("load", this.renderZonesList);
            // http.addEventListener("progress", updateProgress)
            // http.addEventListener("error", transferFailed)
            // http.addEventListener("abort", transferCancelled)
            http.send()

        } else {
            console.log('PLease Select a Country')
            return
        }
    }

}

// list of surf Spots
const locations = {

    renderLocationsList : function (responseTxt)  {
        const data = this.response.responseData
        // console.log('Surfing Locations:::::::')
        data.forEach( (item) => {
            // console.log(item)
        })

    },
    getLocationsData : function (location)  {
        const http = new XMLHttpRequest();
        http.open("GET", config.apiUrl + '/surfspot/location/' + 'Australia' + '/' + 'NSW' + '/' + location + '/' + config.publicKey);
        http.responseType = "json"
        http.addEventListener("load", this.renderLocationsList);
        // http.addEventListener("progress", updateProgress)
        // http.addEventListener("error", transferFailed)
        // http.addEventListener("abort", transferCancelled)
        http.send()

    }

}

const setUp = () => {
    localStorage.setItem
    ('shark-data', JSON.stringify
        (
            [
                {
                    'country' : '',
                    'zone' : '',
                    'locations' : []
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
