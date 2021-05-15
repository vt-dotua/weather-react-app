export let weatherIcon = {
    d:{
        Clear  : "wi-day-sunny",
        Cloudy : "wi-day-cloudy",
        Drizzle: "wi-day-sprinkle",
        Rain   : "wi-day-rain",
        Snow   : "wi-day-snow",
        Thunderstorm : "wi-day-thunderstorm",
        Dust    : "wi-dust",
        Tornado : "wi-tornado",
        Fog     : "wi-day-fog",
        Ash     : "wi-volcano",
        Smoke   : "wi-smoke",
        Sand    : "wi-sandstorm",
        Squall  : "wi-strong-wind"
    },
    
    n:{
        Clear  : "wi-night-clear",
        Cloudy : "wi-night-alt-cloudy",
        Rain   : "wi-day-rain",
        Drizzle: "wi-night-alt-sprinkle",
        Snow   : "wi-night-alt-snow",
        Thunderstorm : "wi-night-thunderstorm",
        Dust    : "wi-dust",
        Tornado : "wi-tornado",
        Fog     : "wi-night-fog",
        Ash     : "wi-volcano",
        Smoke   : "wi-smoke",
        Sand    : "wi-sandstorm",
        Squall  : "wi-strong-wind"
    },

    getWeatherIcon(icon, iconId){
        let weatherDic = icon.includes('n') ? this.n : this.d;
        let iconIntId = Number(iconId); 

        if(iconIntId >= 200 && iconIntId <= 232) 
            return weatherDic.Thunderstorm;

        if(iconIntId >= 300 && iconIntId <= 321)
            return weatherDic.Drizzle;
        
        if(iconIntId >= 500 && iconIntId <= 531)
            return weatherDic.Rain;
        
        if(iconIntId >= 600 && iconIntId <= 622)
            return weatherDic.Snow;
        
        if(iconIntId >= 711 && iconIntId <= 721)
            return weatherDic.Smoke;
        
        if(iconIntId === 701 || iconIntId === 741)
            return weatherDic.Fog;
        
        if(iconIntId === 751)
            return weatherDic.Sand;
        
        if(iconIntId === 761)
            return weatherDic.Dust;
        
        if(iconIntId === 762)
            return weatherDic.Ash;

        if(iconIntId === 771)
            return weatherDic.Squall;

        if(iconIntId === 781)
            return weatherDic.Tornado;
        
        if(iconIntId === 800)
            return weatherDic.Clear;
        
        if(iconIntId >= 801 && iconIntId <= 804)
            return weatherDic.Cloudy;
        return "wi-na"
    }
};