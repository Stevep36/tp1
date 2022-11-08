const fs = require ('fs');

class Contenedor {

    constructor (nombre){
        this.nombreArchivo = nombre;
    }
        
    async save(producto) {
        try {
            let id;
            let data = await fs.promises.readFile(this.nombreArchivo,'utf-8');
            let productos = JSON.parse(data);
            if (productos.length>0)
                id= productos[productos.length-1].id + 1;
            else
                id=1;

            let newProduct = {
                title : producto.title,
                price : producto.price,
                thumbnail : producto.thumbnail,
                id : id
            }
            productos.push(newProduct);
            
               
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos,null,'\t'));
            return console.log(id)
        }
        catch (err){
            return console.log(err)
            
        }
    
    }
    
    async getById(id){
        try {
            let productos;
            let cantProd;
            await fs.promises.readFile(this.nombreArchivo,'utf-8')
            .then(contenido => { 
                productos=JSON.parse(contenido);
                cantProd = productos.length;            
            })
            const obj = productos.find(prod => id === prod.id);
            if (obj === undefined)
                return console.log("null");
            else
                return console.log(obj);
    
        }
        catch (err){
            return console.log(err)
            
        }
    }
    
    async getAll (){
        try {
            let productos;
            await fs.promises.readFile(this.nombreArchivo,'utf-8')
            .then(contenido => { 
                productos=JSON.parse(contenido);
                console.log(productos);
            })
        }
        catch(err){
            return console.log(err)
            
        }
    }
    
    async deleteById (id){
        try {
            let productos;
            await fs.promises.readFile(this.nombreArchivo,'utf-8')
            .then(contenido => { 
                productos=JSON.parse(contenido);
            })
            productos = productos.filter(prod => id != prod.id);
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos,null,2));
            return console.log("Se elimino el producto con ID solicitado")
        }
        catch(err){
            return console.log(err)
            
        }
    
    }
    
    async deleteAll (){
        try{
            await fs.promises.writeFile(this.nombreArchivo, "[]");
            return console.log("se elimino todos los objetos");
    
        }
        catch(err){
            return console.log(err)
        }
    
    }

}

let archivo = new Contenedor('./productos.txt');

const prod1 = {
    title: 'libro',
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
}

const prod2 = {
    title: 'Escuadra',
    price: 12.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
}

const prod3 = {
    title: 'regla',
    price: 3.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
}

archivo.deleteAll();
archivo.save(prod1);
archivo.getById(3);
archivo.getAll();
archivo.save(prod2);
archivo.save(prod3);
archivo.getAll();
archivo.getById(2);
archivo.deleteById(1);
