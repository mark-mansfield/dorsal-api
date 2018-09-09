
// sample get request to the public api

const config = {
    apiUrl : 'http://api.dorsalwatch.com/public',
    publicKey : 'ab61cd9427bea80f22e641c04c312195',
    contentType : 'application/json'

}



// list of countries
const countries = {
    country: "",
    renderCountriesList : function (responseTxt)  {

        const data = this.response.responseData
        const targetContainer = document.querySelector(".sidebar")


        data.forEach( (item) => {
            let div = document.createElement('div')
            div.setAttribute('id' , item.name)
            div.setAttribute('class' , 'button')
            div.setAttribute('value' , item.name)
            div.textContent = item.name
            div.addEventListener('click' , (e) => {
                console.log(item.name)
            })
            targetContainer.appendChild(div)
        })

        // // console.log(this.response.responseData)
    },
    getCountriesData : function (country)  {
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
        const data = this.response.responseData
        // console.log('States By Country:::::::')
        data.forEach( (item) => {
            // console.log(item)
        })
        // console.log(this.response.responseData)
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
    zone: "",
    renderZonesList : function (responseTxt)  {
        const data = this.response.responseData
        // console.log(data)
        // console.log('Surfing Zones:::::::')
        data.forEach( (item) => {
            // console.log(item)
        })
    },
    getZonesData : function (value)  {
        this.zone = value
        const http = new XMLHttpRequest();

        http.open("GET", config.apiUrl + '/surfspot/zone/Australia/' + this.zone + '/' + config.publicKey);
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


//   var url = config.apiUrl + '/surfspot/zone/' + country + '/' + state + '/' + config.publicKey;
countries.getCountriesData()

// use the country name as an input for now
states.getStatesData('Australia')
zones.getZonesData('NSW')
locations.getLocationsData('Sydney')
