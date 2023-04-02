const {writeFile,readFile} = require('fs/promises');
const path =require('path');

const pathToProductsJson = path.resolve(__dirname,'..','..','data','products.json');

exports.getProducts = async ()=>{
    const productJson = await readFile(pathToProductsJson);
    const products = JSON.parse(productJson);
    return products
}

exports.saveToJson = async (products)=>{

   const data = JSON.stringify(products)

   await writeFile(pathToProductsJson,data)
}