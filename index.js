

let btn = document.getElementById("button")
let mapFrame = document.getElementById("gmap_canvas")
let container = document.getElementById("container")

btn.addEventListener("click", function () {
    let inputValue = document.getElementById("search-input").value
     weatherShowData(inputValue)
     upadateMap(inputValue)
    forecast(inputValue)

})
let weatherData = async (url) => {
    let res = await fetch(url)
    let data = await res.json()
    return data;
}

let upadateMap = (location) => {
    let mapUrl = `https://maps.google.com/maps?q=${location}&z=13&ie=UTF8&iwloc=&output=embed`
    mapFrame.src = mapUrl
}
let weatherShowData = async (inputValue) => {

    function convertTime(seconds) {
        let date = new Date(seconds * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let second = "0" + date.getSeconds();


        return hours + ":" + minutes.substr(-2) + ":" + second.substr(-2)
    }

    container.innerHTML = ""
    let weather = await weatherData(`https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=d987341e784ca6e6d024de4988ba476f&units=metric`)

    let div = document.createElement("div")

    let h1 = document.createElement("h1")
    h1.innerHTML = weather.city.name

    let p1 = document.createElement("p")
    p1.innerHTML = `<img class="icon" src="https://img.icons8.com/?size=50&id=G2qFum1HEdTS&format=gif"> Min.Temp : ${weather.list[1].main.temp_min}`

    let p2 = document.createElement("p")
    p2.innerHTML = `<img class="icon" src="https://img.icons8.com/?size=50&id=nwMYgWBB2XeX&format=gif"> Max.Temp : ${weather.list[1].main.temp_max}`

    let p3 = document.createElement("p")
    p3.innerHTML = `<img class="icon" src="https://img.icons8.com/?size=48&id=pLiaaoa41R9n&format=png"> Wind : ${weather.list[1].wind.speed}`

    let p4 = document.createElement("p")
    p4.innerHTML = `<img class="icon" src="https://img.icons8.com/?size=64&id=46427&format=png"> Clouds :${weather.list[1].clouds.all}`

    let p5 = document.createElement("p")
    p5.innerHTML = `<img class="icon" src="https://img.icons8.com/?size=48&id=eB996llrCC83&format=png"> Sunrise : ${convertTime(weather.city.sunrise)} AM`

    let p6 = document.createElement("p")
    p6.innerHTML = `<img class="icon" src="https://img.icons8.com/?size=48&id=15368&format=png"> Sunset : ${convertTime(weather.city.sunset)} PM`

    div.append(h1, p1, p2, p3, p4, p5, p6)
    container.append(div)

}


let forecastcontainer = document.getElementById("forecast-container")

let forecast = async (inputValue) => {
    let res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=d987341e784ca6e6d024de4988ba476f&units=metric`)
    let data = await res.json()

    forecastcontainer.innerHTML = ""
    for (let i = 0; i < data.list.length; i += 8) {


        let div1 = document.createElement("div")
        div1.style.border = "1px solid white"
        div1.style.width = "242px"
        div1.style.height = "220px"
        div1.style.textAlign = "center"
        div1.style.backgroundColor = "white"
        div1.style.borderRadius = "10px"
       
        div1.style.boxShadow = " (0 0 10px rgba(0, 0, 0,0.1);"

        let p1 = document.createElement("p")
        p1.innerHTML = `${timestamp(data.list[i].dt * 1000)}`

        let img = document.createElement("img")
        img.src = `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`

        let p2 = document.createElement("p")
        p2.innerHTML = `${(data.list[i].main.temp_min)}`

        let p3 = document.createElement("p")
        p3.innerHTML = `${(data.list[i].main.temp_min)}`
        div1.append(p1, img, p2, p3)
        forecastcontainer.append(div1)
    }

}

function timestamp(value) {

    let date = new Date(value)
    let dayOfweek = date.toLocaleString('en', { weekday: 'long' });
    return (dayOfweek)
}
