const express = require('express')
const {writeFile,readFile} = require('fs/promises')
const path = require('path')
const pug = require('pug')
const helpers = require('../public/javascripts/helpers')
const {v4} = require('uuid')
const validator = require('express-joi-validation').createValidator()
const validation = require('../public/javascripts/validation')

const pathToViews = path.resolve(__dirname,'..','views')




const router = express.Router()


router.get('/update-form/:id',async(req,res)=>{
    const id  = req.params.id;
    const products= await helpers.getProducts();
    const product = products.find(el=>el.id==id);
    const updateProductLayout = path.resolve(pathToViews,'UpdateProduct.pug')
    const template = pug.compileFile(updateProductLayout);
    const renderedTemplate = template({product:product});
    res.send(renderedTemplate);

})

router.get('/new-form',async(req,res)=>{
    const homeLayoutPath = path.resolve(pathToViews,'NewProduct.pug')
    const template = pug.compileFile(homeLayoutPath);
    const products = await helpers.getProducts();

    const renderedTemplate = template({products:products});
    res.send(renderedTemplate);
})


router.put('/:id',validator.body(validation.updateBody),async (req,res)=>{
    const id  = req.params.id;
    const updatedProduct =req.body
    const products= await helpers.getProducts();
    const updatedProducts = products.map(el=>{
        if(el.id==id){
            return updatedProduct
        }
        return el;
    })
    await helpers.saveToJson(updatedProducts);
    res.status(200).send(updatedProduct);

})

router.delete('/:id',async(req,res)=>{
    const id  = req.params.id;
    console.log(id);
    const products= await helpers.getProducts();
    const updatedProducts = products.filter(el=>el.id!==id)
    await helpers.saveToJson(updatedProducts);
    res.status(204).send('successfully deleted')

})


router.get('/', async (req,res)=>{
    const homeLayoutPath = path.resolve(pathToViews,'stock.pug')
    const template = pug.compileFile(homeLayoutPath);
    const products = await helpers.getProducts();

    const renderedTemplate = template({products:products});
    res.send(renderedTemplate);
})

router.post('/',validator.body(validation.createBody), async (req,res)=>{
   const productBody = req.body
   const product = {id:v4(),...productBody}
   const products= await helpers.getProducts();
   products.push(product);
   await helpers.saveToJson(products);
   res.status(201).redirect('/products')
})



module.exports = router