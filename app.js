const quote = document.getElementById("quote");
const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const date = document.getElementById("date");
const year = document.getElementById("year");
const twentyFourHourBtn = document.querySelector(".twenty-four-hour-btn");
let isTwentyFourHourTime = false;

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

// Get a daily quote from API
const API_URL = "https://quotes.rest/qod.json";
const getDailyQuote = () => {
    fetch(API_URL)
    .then(response => {
        return response.json();
    }).then(body => {
        quote.textContent = body.contents.quotes[0].quote;
    }).catch(err => {
        console.log(err);
    });
}
getDailyQuote();

// Get current time
const getTime = () => {
    let current = new Date();
    minutes.textContent = current.getMinutes();

    if (isTwentyFourHourTime) {
        hours.textContent = getHoursForTwentyFourHourTimeFormat(current);
    } else {
        hours.textContent = getHoursForTwelveHourTimeFormat(current);
    }

    if (hours.textContent.length === 1)
        hours.textContent = `0${hours.textContent}`;
    if (minutes.textContent.length === 1)
        minutes.textContent = `0${minutes.textContent}`;
    
    let currentDate = current.getDate();
    let currentMonth = current.getMonth();
    let currentYear = current.getFullYear();

    date.textContent = `${currentDate} ${months[currentMonth]}, ${currentYear}`;
    year.textContent = currentYear;
}

const getHoursForTwentyFourHourTimeFormat = (current) => {
    return current.getHours();
}

const getHoursForTwelveHourTimeFormat = (current) => {
    let currentHours = current.getHours();
    currentHours = currentHours % 12;
    currentHours = currentHours ? currentHours : 12;

    return currentHours;
}

const twentyFourHourTime = (event) => {
    let buttonElement = event.target;
    let buttonElementClasses = [...buttonElement.classList];
    
    if (buttonElementClasses.includes("active")) {
        buttonElement.classList.remove("active");
        buttonElement.classList.add("inactive");
        isTwentyFourHourTime = false;
    } else {
        buttonElement.classList.remove("inactive");
        buttonElement.classList.add("active");
        isTwentyFourHourTime = true;
    }
}

// Event Listener for 24 Hour Time
twentyFourHourBtn.addEventListener("click", twentyFourHourTime);

setInterval(() => {
    getTime();
}, 1000);