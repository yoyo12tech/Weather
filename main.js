///STEPS ILL TAKE to achieve my goal relying on the principle (THINK TWICE, CODE ONCE):
//Step 1: get all APIS and thier keys if exist ready (DONE ✓)
//Step 2: get all the elements that i will edit in the future (DONE ✓)
//step 3: first create a function that gets user IP using api route u have (DONE ✓)
//step 4: the ip obtained is then fed to another function that will give us location.(we are more intrested in city so this is what well take from it) (DONE ✓)
//step 5: if any error occurs just make the city choosen Cairo (DONE ✓)
//step 6: then use the city obtained and feed it to the weather api route(DONE ✓)
//step 7: extract relevant info you want then feed it t0 a helper function(DONE ✓)
//step 8:this helper function taken the info extracted and uses the dom (elemnts from step 2) and give them thier new value(DONE ✓)
//step 9: TTTTTTTTTTTTTHHHHHHHHHHHHHHHHHHHHHEEEEEEEEEEEEEEEEEEEENNNNNNNNNNNNNN↓↓↓↓
//step 10: When the user enters a letter ill use the onKeyUp to call the function that sends the weather api request(DONE ✓)
//step 11: When the user presses FIND button i shall also call the weather api function(DONE ✓)
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const getIPBaseUrl ="https://api64.ipify.org?format=json";
const geoLocationBaseUrl = "http://ip-api.com/json/"
const WEATHER_API_KEY = "c37c242f0f1d479bbcf190839250807";
const weatherBaseUrl = "https://api.weatherapi.com/v1/";

const cb = document.getElementById("cb")

const cDay = document.querySelector(".day");
const cDate = document.querySelector(".date");
const cCity = document.querySelector(".city");
const cFlag = document.querySelector(".flag");

const cTemprature = document.querySelector(".temprature")
const cIcon = document.querySelector(".cicon");
const cDescription= document.querySelector(".description");
const stats = document.querySelector(".stats")

const fc1Day = document.getElementById("fc1-day");
const fc1Icon = document.getElementById("fc1-icon");
const fc1MaxTemp = document.getElementById("fc1-max-temp");
const fc1MinTemp = document.getElementById("fc1-min-temp");
const fc1Description = document.getElementById("fc1-description");

const fc2Day = document.getElementById("fc2-day");
const fc2Icon = document.getElementById("fc2-icon");
const fc2MaxTemp = document.getElementById("fc2-max-temp");
const fc2MinTemp = document.getElementById("fc2-min-temp");
const fc2Description = document.getElementById("fc2-description");

let startingCity = "";
let ip="";

async function getIp(){
    try{
        let data = await fetch(getIPBaseUrl);
        data = await data.json();
        ({ ip } = data); //just wanted to try desrtuctering LOL
        // console.log(data.ip)
        console.log("Success");
        return ip;
    }
    catch(error){
        console.log(error.message);
        console.log("Error")
    }
    finally{
        console.log("getIp() Function completed execution");
    }
}

async function getLocation(){ //INSPIRED BY KHABIB ☝🏻
    try{
        ip = await getIp();
        data = await fetch(`${geoLocationBaseUrl}${ip}`);
        data = await data.json();
        console.log("Success");
        return (data.regionName);

    }
    catch(error){
        console.log(error.message);
        console.log("Error");
    }
    finally{
        console.log("getLocation() Function completed execution");
    }

}
async function foundCity() {
    const result = await getLocation();
    startingCity = result ? result : "Cairo";
    console.log(startingCity);
    console.log("foundCity() Function completed execution");
    return startingCity;
}



// This is the DATE object i will use to help me
// let now = new Date();
// console.log(now) ;
// console.log(now.getFullYear()); // e.g. 2025
// console.log(now.getMonth());    // 0-11 (0 = Jan)
// console.log(now.getDate());     // 1-31
// console.log(now.getDay());      // 0-6 (0 = Sunday)
// console.log(now.getHours());    // 0-23
// console.log(now.getMinutes());  // 0-59
// console.log(now.getSeconds());
// console.log(now.getMilliseconds());
// console.log(now.toDateString());    // "Thu Jul 10 2025"


const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday"];
const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

let now = new Date();

if(now.getHours()>10 && now.getHours()<18){
    cb.checked=false;
}else{
    cb.checked=true;
}

function updateAllDates(){
    try{
        cDay.innerHTML=`${days[now.getDay()]}`;
        cDate.innerHTML=`${now.getDate()} / ${months[now.getMonth()]}`;
        fc1Day.innerHTML=`${days[now.getDay() +1]}`;
        fc2Day.innerHTML=`${days[now.getDay() +2]}`;

    }
    catch(error){
        console.log(error.message);
        console.log("Error");

    }
}

updateAllDates();

async function getCountryFlag(country) {
  const url = `https://rest-countries10.p.rapidapi.com/country/${country}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'rest-countries10.p.rapidapi.com',
      'x-rapidapi-key': 'bae5bc8e21msh4ca8ec5b26f1b90p175286jsnc0ad810aae41'
    }
  };

  try {
    const response = await fetch(url, options);
    console.log(response);
    const data = await response.json();  // ← THIS is what you're missing
    console.log(data);  // <-- This will show the real structure
    console.log(data[0].flag.officialflag.svg)
    return (data[0].flag.officialflag.svg);


  } catch (error) {
    console.error("Error fetching flag:", error.message);
    return null;
  }
}


function maxMinTempratures(secondDay,thirdDay){
    let maxD2 = 0; let minD2 = 1000000000;
    let maxD3 = 0; let minD3 = 1000000000;
    for(let i =0;i<24;i++){
        if(secondDay.hour[i].temp_c>maxD2){
            maxD2=secondDay.hour[i].temp_c;
        }
        if(secondDay.hour[i].temp_c<minD2){
            minD2=secondDay.hour[i].temp_c;
        }
        if(thirdDay.hour[i].temp_c>maxD3){
            maxD3=thirdDay.hour[i].temp_c;
        }
        if(thirdDay.hour[i].temp_c<minD3){
            minD3=thirdDay.hour[i].temp_c;
        }
    }
    return {
        "maxD2":maxD2,
        "minD2":minD2,
        "maxD3":maxD3,
        "minD3":minD3,
    }
}

async function getWeather(city){
    let data = await fetch(`${weatherBaseUrl}forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=3`);
    data = await data.json();
    const {
        location:{
            name,
            country
        },
        current:{ 
            temp_c,
            humidity,
            wind_kph,
            wind_dir,
            condition:{
                text,
                icon,
            }

        },
        forecast:{
           forecastday,
        }
    
    } = data;


    flagSrc= await getCountryFlag(country);
    console.log(flagSrc)

    const secondDay = forecastday[1];
    const thirdDay = forecastday[2];

    let {maxD2,minD2,maxD3,minD3} = maxMinTempratures(secondDay,thirdDay);

    let d2Temp_c = maxD2;
    let d3Temp_c = maxD3;

    let d2Des = secondDay.hour[15].condition.text; //choosed 15 which is 3PM. It is a good middle point for the daily weather
    let d3Des = thirdDay.hour[15].condition.text;

    let d2Icon = secondDay.hour[15].condition.icon;
    let d3Icon = thirdDay.hour[15].condition.icon;

    let d2SecTemp_c = minD2;
    let d3SecTemp_c = minD3;


    cCity.innerHTML=name;
    cFlag.setAttribute("src",flagSrc);
    cTemprature.innerHTML=temp_c +"°C";
    cDescription.innerText=text;
    cIcon.setAttribute("src","https:" +icon);

    stats.innerHTML=`
    <ul>
        <li>
            <i class="fa-solid fa-water" style="margin-right: 4px;" ></i>
            <span class="humidity">${humidity+"%"}</span>
        </li>
        <li>
             <i class="fa-solid fa-wind" style="margin-right: 4px;"></i>
             <span class="wind-speed">${wind_kph+"km/h"}</span>
         </li>
         <li>
              <i class="fa-solid fa-compass" style="margin-right: 4px;"></i> 
               <span class="direction">${wind_dir}</span>
          </li>                                     

    </ul>`
    


    fc1Icon.setAttribute("src","https:" +d2Icon);;
    fc1MaxTemp.innerHTML=d2Temp_c+"°C";
    fc1MinTemp.innerHTML=d2SecTemp_c+"°C";
    fc1Description.innerHTML=d2Des;


    fc2Icon.setAttribute("src","https:" + d3Icon);;
    fc2MaxTemp.innerHTML=d3Temp_c+"°C";
    fc2MinTemp.innerHTML=d3SecTemp_c+"°C";
    fc2Description.innerHTML=d3Des;
    
}

async function displayDefault() {
    startingCity = await foundCity()
    getWeather(startingCity);
}

displayDefault()























