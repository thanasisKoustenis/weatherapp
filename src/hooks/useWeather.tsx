import { useEffect, useState } from "react"
import { weatherType, linkProperties } from "../types-interfaces"

export function useWeather(apiParameters: linkProperties) {

    const [weather, setWeather] = useState<weatherType>()



    const getWeatherFromApi = async () => {
        const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=7000cd0d3d2c419b99463816221806&q=${apiParameters.cityOrLatLon}&days=${apiParameters.days}&aqi=${apiParameters.aqi}&alerts=${apiParameters.alerts}`)
        const data = res.json()
        return data
    }

    useEffect(() => {
        const getWeather = async () => {

            try {
                // e.preventDefault()

                if (!apiParameters.cityOrLatLon) {
                    alert("Enter a valid city!")
                    return
                }

                const data: weatherType = await getWeatherFromApi()
                // const data2: forecastType = await getForecastFromApi(apiParameters)

                if (data.location.name === null) {
                    alert("Enter a valid city!")
                    return
                }


                setWeather(data)
                // setForecast(data2)

                apiParameters = {
                    cityOrLatLon: "",
                    days: 3,
                    aqi: "no",
                    alerts: "no"
                }


                // navigate("/city")

            } catch {
                alert("Enter a valid city!")
                apiParameters = {
                    cityOrLatLon: "",
                    days: 3,
                    aqi: "no",
                    alerts: "no"
                }
            }
        }

        getWeather()

    }, [apiParameters])


    return [weather, setWeather]
}