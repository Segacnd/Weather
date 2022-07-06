const weather = {
    apiKey: "a94f3ac6b21a2aa79327008a0c924e5d",
    fetchWether: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
        .then((response) => {
            if (!response.ok) {
                alert("No weather found.");
                throw new Error("No weather found.");
            } return response.json();
        })
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function (data) {
       
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(temp)
        document.querySelector('.city').innerText = "Weather in " + name;
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('.description').innerText = description;
        document.querySelector('.temp').querySelector('h1').innerText = temp + " ℃";
        document.querySelector('.humidity').innerText = "Humidity" + humidity + "%";
        document.querySelector('.wind').innerText = "Wind Speed:" + speed + "km/h";
        

        fetch(`https://source.unsplash.com/1600x900/?${name}`)
        .then(res => {
            document.body.style.backgroundImage = `url(${res.url})`;
        })
    
    },

    search: function () {
        this.fetchWether(document.querySelector('.search-bar').value);
      },
}

document.querySelector('.search button').addEventListener('click', function () {
    weather.search();
    clearValue();
});

document.querySelector('.search-bar').addEventListener('keyup', function (e) {
    if (e.key == 'Enter') {
        weather.search()
        clearValue()
    }
})

function clearValue () {
    document.querySelector(".search-bar").value = "";
}

weather.fetchWether('Minsk');