

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
    const welcomeMessage = document.querySelector('.main__welcome-message')
    const appContent = document.querySelector('.main__content')

    appContent.classList.remove('hide-element')
    welcomeMessage.classList.add('hide-element')


    hamburgerButton.addEventListener('click' , showMobilNav );
    const appName = document.querySelector('.app-name')
    appName.textContent = config.appName
}


const showMobilNav = () => {
    const mobileNav = document.querySelector('.mobile-nav');
    const backdrop = document.querySelector('.click-area');
    backdrop.addEventListener('click' ,   () => {
        mobileNav.classList.remove('show-element');
        backdrop.classList.remove('show-element');
    });

    mobileNav.classList.add('show-element');
    backdrop.classList.add('show-element');
}
const startButton = document.querySelector('.start')

startButton.addEventListener('click' , setUp);

