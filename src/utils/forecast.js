import request from "request";

const token = process.env.WEATHERSTACK_ACCESS_TOKEN
const forecast = (lat,lon, callback) =>{
    const url = `https://api.weatherstack.com/current?access_key=&query=${token}`+lat+','+lon+'&units=f'
    
    request({url,json:true},(error,{body}) =>{
        if(error){
            return callback('Unable to connect to location services!',undefined)
        }else if(Object.keys(body).length <= 2){
            return callback('Unable to find location.Try another search',undefined)
        }else{
            const {name:location,lat:latitude,lon:longitude} = body.location
            return callback(undefined,{
                latitude,
                longitude,
                location
            })
        }
    })
            
    
}

export default forecast