let http = require("http");
let fs = require("fs");
let path = require("path");
let mime = require("mime")

http.createServer((request, response) => {
    // response.setHeader("Content-Type", "text/html; charset=utf-8");
    if(request.method === "GET") {
        switch(request.url) {
            case "/":
                readFile("/index.html", response)
            break;
            case "/contacto":
                readFile("/contact.html", response)
            break;
            case "/nosotros":
                readFile("/about.html", response)
            break;
            case "/proyectos":
                readFile("/projects.html", response)
            break;
            case "/registro":
                readFile("/registro.html", response)
            break;
            case "/favicon.ico":
                readFile("/favicon.ico", response)
            break;
            default:
                readFile(request.url, response)
            break;
        }
    }else if(request.method === "POST"){
        switch(request.url) {
            case "/users":
                addUser(request, response);
            break;
            default:
                readFile(request.url, response)
            break;
        }
    }
}).listen(80);

const readFile = (url, response) => {
    let urlF = __dirname + url
    fs.readFile (urlF, (error, content) => {
        if(!error){
            // setContentType(path.extname(urlF), response)
            //mime.getType -> Regresa el mime type dependiendo de la ruta
            //styles.css -> text/css
            //index.html -> text/html
            response.setHeader("Content-Type", mime.getType(urlF))
            response.end(content);
        }else{
            response.writeHead(404);
            response.end("<h1>Error 404</h1>");
        }
    });
}

const addUser = (request, response)=>{
    let data = '';
        //Cuando se estan escribiendo los datos
        request.on('data', chunk => {
            data += chunk;
        });
        //Cuando se terminen de procesar los datos
        request.on('end', () => {
            let datos = data.toString();
            console.log("Fin de Stream");
            //writeFile
            //1er argumento -> La ruta del archivo en el que queremos escribir
            //Se creará el erchivo si no existe en la ruta especificada
            //2do argumento -> El contenido que queremos escribir
            //3er argumento -> funcion de callback que nos notificará en caso que exista un error 
            //al escribir el archivo
            let user = {
                name: datos.split("&")[0].split("=")[1],
                lastname: datos.split("&")[1].split("=")[1],
                email: datos.split("&")[2].split("=")[1],
                password: datos.split("&")[3].split("=")[1]
            }
            fs.writeFile("db_usuarios.txt", JSON.stringify(user), (error)=>{
                if(error){
                    console.log(error);
                }else{
                    response.setHeader("Location", "/");
                    response.statusCode = 302;
                    response.end();
                }
            });
        });
        request.on('error',error =>{
            console.log(error);
        });
}