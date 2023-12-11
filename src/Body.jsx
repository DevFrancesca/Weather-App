import { useEffect, useState } from 'react'
import './Body.css'
import scatteredClouds from './assets/images/scattered_cloud.jpg'
import rain from './assets/images/rain.jpg'
import FC from './assets/images/few_clouds.jpg'
import sunny from './assets/images/sunny.jpg'
import scatt from './assets/images/scatt.jpg'
import CS from './assets/images/clear_sky.jpg'
import OC from './assets/images/overcast_sky.jpg'
import LR from './assets/images/light_rain.jpg'

const Body = () =>{
    const [location, setLocation] = useState()
    const [apiResponse, setApiResponse] = useState({})
    const apiKey = "f9f8d5bc211f69c8d3683d8de9038e97"
    const handleLocationChange =(e) =>{
        setLocation(JSON.parse(e.target.value));
        // console.log(location)
        // submit()
        
    }

    const submit =() =>{
        if(location !== undefined) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}`)
            .then(res=>res.json())
            .then(json=> setApiResponse(json))
        }
    }

    useEffect(()=> {
        submit()
    }, [location])

    const today = new Date();
    const formattedDate = today.toDateString();

    return (
        <div className='bodyWrap' style={{backgroundImage:  
            apiResponse?.weather &&
            (apiResponse?.weather[0].description === 'scattered clouds'
                ? `linear-gradient(rgba(0, 0, 0, 0.595), rgba(0, 0, 0, 0.595)), url(${scatteredClouds})`
                : apiResponse?.weather[0].description === 'few clouds'
                ? `linear-gradient(rgba(0, 0, 0, 0.595), rgba(0, 0, 0, 0.595)), url(${FC})`
                : apiResponse?.weather[0].description === 'broken clouds'
                ? `linear-gradient(rgba(0, 0, 0, 0.595), rgba(0, 0, 0, 0.595)), url(${scatt})`
                : apiResponse?.weather[0].description === 'clear sky'
                ? `linear-gradient(rgba(0, 0, 0, 0.595), rgba(0, 0, 0, 0.595)), url(${CS})`
                : apiResponse?.weather[0].description === 'rain'
                ? `linear-gradient(rgba(0, 0, 0, 0.595), rgba(0, 0, 0, 0.595)), url(${rain})`
                : apiResponse?.weather[0].description === 'sunny'
                ? `linear-gradient(rgba(0, 0, 0, 0.595), rgba(0, 0, 0, 0.595)), url(${sunny})`
                : apiResponse?.weather[0].description === 'overcast clouds'
                ? `linear-gradient(rgba(0, 0, 0, 0.595), rgba(0, 0, 0, 0.595)), url(${OC})`
                : apiResponse?.weather[0].description === 'light rain'
                ? `linear-gradient(rgba(0, 0, 0, 0.595), rgba(0, 0, 0, 0.595)), url(${LR})`
                : ''),
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                }}>
            <div className="top">
                <div className="topLeft">
                    <h1>
                    {
                        apiResponse?.main?.temp ? (
                            <span>
                                {parseFloat((apiResponse?.main?.temp - 273.15).toFixed(12))}
                                &deg;C
                            </span>
                        ) : (
                            "No temp info"
                        )
                    }
                        
                    </h1>
                    <p>{apiResponse?.weather ? apiResponse?.weather[0].description : "No weather info"}</p>
                    <div className="date">
                        <p>{formattedDate}</p>
                    </div>
                </div>
                <div className="topRight">
                <select onChange={handleLocationChange}>
                    <option value="">Select State</option>
                    <option value='{"lat": "6.5227", "lon":"3.62185"}'>Lagos</option>
                    <option value='{"lat": "9.0765", "lon":"7.3986"}'>Abuja</option>
                    <option value='{"lat": "6.6342", "lon":"5.9304"}'>Edo</option>
                    <option value='{"lat": "9.2182", "lon":"9.5179"}'>Plateau</option>
                    <option value='{"lat": "7.7337", "lon":"6.6906"}'>Kogi</option>
                    <option value='{"lat": "5.7040", "lon":"5.9339"}'>Delta</option>
                    <option value='{"lat": "8.1574", "lon":"3.61475"}'>Oyo</option>
                    <option value='{"lat": "6.2209", "lon":"6.9370"}'>anambra </option>
                    <option value='{"lat": "4.8396", "lon":"6.9112"}'>Rivers</option>
                    <option value='{"lat": "5.57207", "lon":"7.0588"}'>Imo</option>
                </select>
                </div>
            </div>

            <div className="middle"></div>
            <div className="down">
             {
                apiResponse?.weather &&
                <div className="one">
                    <h3>{formattedDate}</h3>
                    <p>
                    {
                        apiResponse?.main?.temp ? (
                            <span>
                                {parseFloat((apiResponse?.main?.temp - 273.15).toFixed(12))}
                                &deg;C
                            </span>
                        ) : (
                            "No temp info"
                        )
                    }
                    </p>
                </div>
             }
          
            </div>
        </div>
    )
}
export default Body