let express = require("express");
let fs = require("fs");
let path = require("path");
let app = express();

//Middlewares
//accede a css que esta en la carpeta public 
app.use(express.static("public"));
//procesa los datos que son enviados a traves del formulario 
//Va a colocar los datos que se transformaron sobre request.body
app.use(express.urlencoded({extended: false})); 

app.get("/", (request, response)=> {
    response.sendFile(path.join(__dirname, "index.html"));
 });

app.get("/contacto", (request, response)=> {
    response.sendFile(path.join(__dirname, "contact.html"));
 });
app.get("/nosotros", (request, response)=> {
    response.sendFile(path.join(__dirname, "about.html"));
 });
app.get("/contacto", (request, response)=> {
    response.sendFile(path.join(__dirname, "contact.html"));
 });

app.get("/registro", (request, response)=> {
    response.sendFile(path.join(__dirname, "registro.html"));
 }); 

app.post("/usuarios", ( request, response) => {
    fs.writeFile("db_usuarios.txt", JSON.stringify(request.body), (error)=>{
        if(error){
            console.log(error);
        }
        //Después que se escribe el archivo txt redirecciona a la ruta que deseemos.
        response.redirect("/");
    });
});
app.use( (request, response)=> {
    response.sendFile(path.join(__dirname, "404.html"));
 });

app.listen(8080, () => {
    console.log("Servidor 8080")
});

