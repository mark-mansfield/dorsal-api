
// sample get request to the public api

const config = {
    apiUrl : 'http://api.dorsalwatch.com/public',
    publicKey : 'ab61cd9427bea80f22e641c04c312195',
    contentType : 'application/json',
    appName : 'SHARK DATA 1.0'

}


// list of countries
const countries = {

    renderCountriesList : function ()  {

        const data = this.response.responseData
        const targetContainer = document.querySelector('.sidebar')
        const mobileNavContainer = document.querySelector('.mobile-nav')

        const mobileNavList = document.createElement('ul')
        const mobileNavTitle = document.createElement('h1')

        mobileNavTitle.setAttribute('class' , '')
        mobileNavTitle.textContent = "Countries"
        mobileNavContainer.appendChild(mobileNavTitle)

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

            let mobileNavListItem = document.createElement('li')
            mobileNavListItem.setAttribute('class' , 'mobile-nav__items hvr-ripple-out')
            mobileNavListItem.setAttribute('value' , item.name)
            mobileNavListItem.textContent = item.name
            mobileNavListItem.addEventListener('click' , (e) => {
                countries.setCountry(item.name)
                states.getStatesData(item.name)
                const mobileNav = document.querySelector('.mobile-nav');
                const backdrop = document.querySelector('.click-area');
                mobileNav.classList.remove('show-element');
                backdrop.classList.remove('show-element');

            })

            mobileNavList.appendChild(mobileNavListItem)
            mobileNavContainer.appendChild(mobileNavList)
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

        // because the country data already exists
        const sharkData = JSON.parse(localStorage.getItem('shark-data'))

        // console.log('States By Country:::::::')
        const data = this.response.responseData
        const targetContainer = document.querySelector('.main__content-panel')
        const currentData =  document.querySelector('.live-data')

        // because we are refreshing data in place
        if (currentData) {
            targetContainer.removeChild(currentData)
            targetContainer.setAttribute('class' , 'main__content-panel' )
        }

        const liveData = document.createElement('div')
        liveData.setAttribute('class', 'live-data')
        targetContainer.appendChild(liveData)

        const title = document.createElement('h1')
        title.setAttribute('class', 'title')
        title.textContent = 'Reporting states in ' + sharkData[0].country
        liveData.appendChild(title)
        data.forEach( (item) => {
            let div = document.createElement('div')
            div.setAttribute('id' , item.name)
            div.setAttribute('class' , 'button orange hvr-ripple-out')
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

        const sharkData = JSON.parse(localStorage.getItem('shark-data'))
        const data = this.response.responseData
        const targetContainer = document.querySelector(".main__content-panel")
        const currentData =  document.querySelector(".live-data")

        if (currentData) {
            targetContainer.removeChild(currentData)
        }

        const liveData = document.createElement('div')
        liveData.setAttribute('class', 'live-data')

        const title = document.createElement('h1')
        title.setAttribute('class', 'title')
        title.textContent = "Reporting Zones in " + sharkData[0].state

        liveData.appendChild(title)
        targetContainer.appendChild(liveData)

        data.forEach( (item) => {
            let div = document.createElement('div')
            div.setAttribute('id' , item)
            div.setAttribute('class' , 'button blue hvr-ripple-out')
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

        const sharkData = JSON.parse(localStorage.getItem('shark-data'))
        const data = this.response.responseData
        const targetContainer = document.querySelector(".main__content-panel")
        const currentData =  document.querySelector(".live-data")

        if (currentData) {
            targetContainer.removeChild(currentData)
        }

        const liveData = document.createElement('div')
        liveData.setAttribute('class', 'live-data')

        const title = document.createElement('h1')
        title.setAttribute('class', 'title')
        title.textContent = "Reporting zones  " + sharkData[0].zone + ' / '+ sharkData[0].state

        liveData.appendChild(title)
        targetContainer.appendChild(liveData)

        data.forEach( (item) => {
            let div = document.createElement('div')
            div.setAttribute('id' , item)
            div.setAttribute('class' , 'button green hvr-ripple-out')
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

        const sharkData = JSON.parse(localStorage.getItem('shark-data'))
        const data = this.response.responseData
        const targetContainer = document.querySelector(".main__content-panel")
        const currentData =  document.querySelector(".live-data")
        targetContainer.setAttribute('class', 'main__content-panel background-box')
        if (currentData) {
            targetContainer.removeChild(currentData)
        }

        const liveData = document.createElement('div')
        liveData.setAttribute('class', 'live-data')

        const backButton = document.createElement('button')
        backButton.setAttribute('class' ,'button green')

        backButton.addEventListener('click' , () => {

            // functionality hook
            navObject.locationsView(sharkData[0].zone)
        })


        const title = document.createElement('h1')
        title.setAttribute('class', 'title')

        title.textContent = "Reports for " + sharkData[0].location + ' / '+ sharkData[0].country
        liveData.appendChild(title)
        liveData.appendChild(backButton)
        targetContainer.appendChild(liveData)

        // const report = {
        //     formattedReportTime : '',
        //     comment : '',
        //     sharkLength : '',
        //     typeOfEncounter : '',
        //     typeOfShark : '',
        // }

        data.forEach( (item) => {
            console.log(item)
            let reportContainer = document.createElement('div')
            reportContainer.setAttribute('class' , 'report-container')

            let timeDate = document.createElement('div')
            timeDate.setAttribute('class' , 'report-data-link')
            timeDate.textContent = item.formattedReportTime

            let comment = document.createElement('div')
            comment.setAttribute('class', 'report-info')
            comment.textContent = "Report : " + item.comment

            let sharkType = document.createElement('div')
            sharkType.setAttribute('class' , 'report-info')
            sharkType.textContent = ' Shark Type : ' + item.sharkType

            let sharkLength = document.createElement('div')
            sharkLength.setAttribute('class','report-info')
            sharkLength.textContent = "Shark length : " + item.sharkLength

            reportContainer.setAttribute('id' , item.formattedReportTime)


            reportContainer.appendChild(timeDate)
            reportContainer.appendChild(comment)
            reportContainer.appendChild(sharkType)
            reportContainer.appendChild(sharkLength)
            // el.textContent = item.formattedReportTime + " : " + item.typeOfShark + " : " + item.sharkLength



            // el.addEventListener('click' , (e) => {
            //     console.log(item)
            // })

            liveData.appendChild(reportContainer)
            targetContainer.appendChild(liveData)
        })
    },

}





// use the country name as an input for now
// states.getStatesData('Australia')
// zones.getZonesData('NSW')
// locations.getLocationsData('Sydney')
