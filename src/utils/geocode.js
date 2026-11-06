import request from "request";

const token =  process.env.MAPBOX_ACCESS_TOKEN;
const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q='+encodeURIComponent(address)+`&access_token=${token}`
    
    request({url,json:true},(error,{body}) =>{
        if(error){
            callback('Unable to connect to location services!',undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location.Try another search',undefined)
        }else{
            const {longitude,latitude} = body.features[0].properties.coordinates
            const {full_address} = body.features[0].properties
            callback(undefined,{
                longitude,
                latitude,
                location:  full_address
            })
        }
    })
            
    
}

export {
  geocode
}