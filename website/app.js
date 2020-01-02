/* Global Variables */
const API_KEY = "df2e24f4de6201ae412fdb10e85a777b";
const URL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const city = "http://api.openweathermap.org/data/2.5/weather?q=";
// date format
let date = new Date();
let month = date.getUTCMonth() + 1; //months from 1-12
let day = date.getUTCDate();
let year = date.getUTCFullYear();

newDate = month + "/" + day + "/" + year;

const zip = document.getElementById("zip");
const feeling = document.getElementById("feelings");

// results Variables
let todayDate = document.getElementById("date");
let temps = document.getElementById("temp");
let content = document.getElementById("content");
let btn = document.getElementById("generate");
let entryHolder = document.getElementById("entryHolder");
let selectid = document.getElementById("selectid");

// When search by zip code
const zipCode = () => {
  weatherDataBYZip(`${URL}${zip.value}&appid=${API_KEY}`).then(data => {
    postData("/add", {
      date: newDate,
      temperature: data.main.temp,
      feeling: feeling.value
    });
    displayData();
  });
};
// when search by city name
const cistName = () => {
  weatherDataBYCity(`${city}${zip.value}&appid=${API_KEY}`).then(data => {
    postData("/add", {
      date: newDate,
      temperature: data.main.temp,
      feeling: feeling.value
    });
    displayData();
  });
};

// addEventListener

btn.addEventListener("click", () => {
  if (selectid.value == "val1") {
    zip.placeholder = "Search by zipcode...";
    zipCode();
  } else if (selectid.value == "val2") {
    zip.placeholder = "Search By City Name...";
    cistName();
  }
});

// checking if there error when search by city
const weatherDataBYZip = async (url = "") => {
  const weather = await fetch(url);
  try {
    if (weather.status == 200) {
      const data = await weather.json();
      return data;
    } else {
      throw new Error("no response");
    }
  } catch (err) {
    content.innerHTML = "invalid zipcode";
    return false;
  }
};

// checking if there error when search by zip
const weatherDataBYCity = async (url = "") => {
  const weather = await fetch(url);
  try {
    if (weather.status == 200) {
      const data = await weather.json();
      return data;
    } else {
      throw new Error("no response");
    }
  } catch (err) {
    content.innerHTML = "invalid city";
    return false;
  }
};

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
};

// function to display data
const displayData = async () => {
  const request = await fetch("/all");
  try {
    const gettingData = await request.json();

    const fahrenheit = Math.floor(
      ((gettingData.dataPost.temp - 273) * 9) / 5 + 32
    );
    todayDate.innerHTML = `<em>Date:</em>${gettingData.dataPost.date}`;
    temps.innerHTML = `<em>Temperature:</em>${fahrenheit}°F`;
    content.innerHTML = `<em>Feelings:</em>${gettingData.dataPost.feeling} `;
    entryHolder.classList.add("select");
  } catch (error) {
    t;
    console.log("error", error);
  }
};
