const path=require('path')
const hbs=require('hbs')
const express=require('express')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const app=express()
const publicDirPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)
app.use(express.static(publicDirPath))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Kajal'
    })
 })
 app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'kajal'
 })
})
app.get('/weather',(req,res)=>{
    res.render('weather')
    if(!req.query.address)
    {
        return  res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error)
            {
                return res.send({error})
            }
                res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide an search term'
        })
    }
    console.log(req.query.search)
    res.send(
        {
            products:{}
        }
    )
    })
app.get('/about/*',(req,res)=>{
    res.render('error1',{
        title:'404',
        message:'about article not found',
        name:'kajal'
    })
})
app.get('*',(req,res)=>{
    res.render('error1',{
        title:'404',
        message:'Page not found',
        name:'kajal'
    })
})
app.listen(3000,()=>{
    console.log('server is up on port 3000')
})
