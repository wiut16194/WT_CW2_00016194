
const express = require('express')
const pug = require('pug')
const path = require('path')
const fs = require('fs');
const app = express()
const bodyParser = require('body-parser')
const productsRouter = require('./routes/products');

const pathToViews = path.resolve(__dirname,'views')

app.set('view engine','pug')
app.use('/static', express.static('public'))


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");
app.use(express.urlencoded({extended:false}))

app.use('/products',productsRouter);

app.use('/',(req,res,next)=>{
    const homeLayoutPath = path.resolve(pathToViews,'home.pug')
    const template = pug.compileFile(homeLayoutPath);
    const renderedTemplate = template();
    res.send(renderedTemplate);
})


app.listen(8000,err=>{
    if(err)console.log(err)
    console.log('Server is running on port 8000.....')
})