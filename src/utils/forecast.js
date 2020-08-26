const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=b2d6adf4709e78842e4068b10351f5ee&query='+latitude+','+longitude+'&units=f'
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Unable to Connect with weather service',undefined)
        } else if(body.error){
            callback('Unable to find location. Search with another text',undefined)
        }
        else{
            callback(undefined,body.current.weather_descriptions[0]+' Currently It is '+body.current.temperature+' degrees out. There is a '+body.current.precip+' % chance of rain')
        }
})
}
module.exports=forecast