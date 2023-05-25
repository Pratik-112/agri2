
// const app = document.querySelector(`#weather-app`);
const temp = document.querySelector(`.temp`);
const dateOutput = document.getElementById(`date`);
const timeOutput =  document.querySelector(`.time`);
const conditionOutput = document.getElementById(`condition`);
const nameOutput = document.getElementById(`cit_name`);
const icon = document.querySelector(`.icon`)
const cloudOutput = document.querySelector(`#cloud`)
const humidityOutput = document.querySelector(`#humidity`)
const windOutput = document.querySelector(`#wind`)
const form = document.getElementById(`locationInput`);
const search = document.querySelector(`.search`)
const btn = document.querySelector(`.submit`)
const cities = document.getElementsByClassName(`city`)
// let cities=licity.innerText

// default citu when page loads up
let cityInput = "India";

console.log("Cities Cities",cities )
for (let i=0;i<cities.length;i++){
    console.log("Cities Cities",  cities[i] )
    cities[i].addEventListener(`click` , (e) => {
        
        cityInput = e.target.innerHTML;
        console.log("cityInput cityInput",  cityInput )
        fetchWeatherData(cityInput);
        // app.style.opacity = 0;
    });
}
// cities.forEach((city) => {
//     console.log("Cities Cities",city )
//     city.addEventListener(`click` , (e) => {
        
//         cityInput = e.target.innerHTML;
//         fetchWeatherData();
//         app.style.opacity = 0;
//     });
// })

form.addEventListener(`submit` , (e) => {
    e.preventDefault();
    let cityInput = document.getElementById("searchloc").value;
console.log("Inside the addEventListener loc ",cityInput)
fetchWeatherData(cityInput);
document.getElementById("searchloc").value="";
// app?.style.opacity = "0";
    
//     // search.value = "";

    // if(search.ariaValueMax.length ==0){
    //     alert(`Please type in a city name`);
    // }
    // else{
        // console.log("e.target.value e.target.value",loc)
        // if(e.target.value==undefined){
        //     alert ("please Enter Location to search")
        // }
        // else{

        //     cityInput = e.target.value;
    
        //     fetchWeatherData(cityInput);
    
        //     // search.value = "";
    
        //     app.style.opacity = "0";
        // }

    // }

});

let  dayofTheweek=(dateqwe)=>{
    console.log("day,month,year day,month,year",dateqwe)
    
    const d = new Date(`${dateqwe}`);
    let dayorder = d.getDay();
    console.log("day,month,year day,month,year",dayorder)
        const weekday = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
            
        ];
    // console.log("new Date(`${day}/${month}/${year}`).getDay()"
    // , weekday [new Date(`${day}/${month}/${year}`).getDay()]
    // ,new Date())
        return weekday [dayorder];
    };

function fetchWeatherData(cityInput){
    console.log("Function Fetch Weather ",cityInput)
    fetch(`http://api.weatherapi.com/v1/current.json?key=07f43cdb7c74467e8d5170734232105&q=${cityInput}`)
    
    
    .then(response => response.json())
    .then(data => {
        
        console.log(data);
        
        
        temp.innerHTML = data?.current?.temp_c + "&#176;";
        conditionOutput.innerHTML = data?.current?.condition?.text;
        
        nameOutput.innerHTML = `${data.location.name}`;
    

        const date = data.location.localtime;
        const y = parseInt(date.substr(0,4));
        const m = parseInt(date.substr(5,2));
        const d = parseInt(date.substr(8,2));
        const time = date.substr(11);
     
console.log("d,m,y d,m,y",d,m,y,time)
let datadate=dayofTheweek(date)
console.log("d,m,y d,m,y datadate datadate",d,m,y,datadate)
dateOutput.innerHTML = `${datadate} ${d},${m} ${y}`;
        timeOutput.innerHTML = time;
        // dateOutput.innerText=`${date}`;


        const iconID = data.current.condition.icon.substr(
            "//cdn.weatherapi.com/weather/64x64/".length);
        
console.log("iconID iconID iconID",iconID)
        icon.src = "./icons/" + iconID;

        cloudOutput.innerHTML = data.current.cloud + "%";
        humidityOutput.innerHTML = data.current.humidity + "%";
        windOutput.innerHTML = data.current.wind_kph + "km/h";

        let timeOfDay = "day";

        const code = data.current.condition.code ;

        if(!data.current.is_day){
            timeOfDay = "night";
        }

        if(code == 1000){
            // app.style.backgroundImage = ` url(images/${timeOfDay}/clear.jpg ) `;

            btn.style.background = "#e5ba92";

            if(timeOfDay == "night"){

                btn.style.background = "#181e27";
            }
        }

        else if(
                code == 1003 ||
            code == 1006 ||
            code == 1009 ||
            code == 1030 ||
             code == 1069 ||
             code == 1087 ||
             code == 1135 ||
            code == 1273 ||
            code == 1276 ||
            code == 1279 ||
            code == 1282
        )
        {
            app.style.backgroundImage = ` url(images/${timeOfDay}/cloudy.jpg) `;
            btn.style.background = "#fa6d1b" ;

            if(timeOfDay == "night"){

                btn.style.background = "#181e27";
            }
            else if (
                code == 1063 ||
                code == 1069 ||
                code == 1072 ||
                code == 1150 ||
                code == 1153 ||
                code == 1180 ||
                code == 1183 ||
                code == 1186 ||
                code == 1189 ||
                code == 1192 ||
                code == 1195 ||
                code == 1204 ||
                code == 1207 ||
                code == 1240 ||
                code == 1243 ||
                code == 1246 ||
                code == 1249 ||
                code == 1252

            ){
                app.style.backgroundImage = ` url (images/${timeOfDay}/rainy.jpg)`;
                btn.style.background = "#647d75";

                if(timeOfDay == "night"){
                    btn.style.background = "#325c80";

                }

            }
            else {
                app.style.backgroundImage = ` url (images/${timeOfDay}/snowy.jpg) ` ;
                 btn.style.background = "#4d72aa";
                 if(timeOfDay == "night"){
                    btn.style.background = "#1b1b1b";

                }
            }
            
            app.style.opacity = "1";  // fade
        }

        })

    .catch((error) => {
        console.log(`city not found , please try again`,error);
        // app.style.opacity = "1";
    });

}

fetchWeatherData(cityInput);


app.style.opacity = "1"; //fade





