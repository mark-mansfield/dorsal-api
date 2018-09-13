
// beacuse i want to add a back button functionality hook to each drill down point.
const navObject = {
    locationsView : function (zone) {
        locations.getLocationsData(zone)
    },
    zoneView : function () {
        zones.getZonesData()
    },

}
const setUp = () => {
    const sharkData = localStorage.getItem('shark-data')
    if (sharkData) {
        countries.getCountriesData(sharkData[0].country)
    } else {
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
    }

    const hamburgerButton = document.querySelector('.toggle-button');
    hamburgerButton.addEventListener('click' , showMobilNav );

    const welcomeMessage = document.querySelector('.main__welcome-message')
    const appContent = document.querySelector('.main__content')

    appContent.classList.remove('hide-element')
    welcomeMessage.classList.add('hide-element')



    const appName = document.querySelector('.app-name')
    appName.textContent = config.appName
}


const showMobilNav = () => {
    const sidebar = document.querySelector('.sidebar')
    const mobileNav = document.querySelector('.mobile-nav');
    const backdrop = document.querySelector('.click-area');
    backdrop.addEventListener('click' ,   () => {
        mobileNav.classList.remove('show-element');
        backdrop.classList.remove('show-element');
    });
    sidebar.classList.add('hide-element')
    mobileNav.classList.add('show-element');
    backdrop.classList.add('show-element');
}

const hideMobileNav = () => {
    const mobileNav = document.querySelector('.mobile-nav');
    const backdrop = document.querySelector('.click-area');
    mobileNav.classList.add('hide-element');
    backdrop.classList.add('hide-element');
}
const startButton = document.querySelector('.start')

startButton.addEventListener('click' , setUp);

