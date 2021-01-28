//Importamos el módulo http
let http = require("http");
//Módulo que nos sirve para manejar los archivos
let fs = require("fs");
//path es una extención de node.js que nos permite obtener la extención de un archivo
//ejm. console.log(path.extname(__dirname + url));
let path = require("path");
//mime nos sirve para obtener la extencion del archivo que solicitemos
let mime = require("mime")

http.createServer((request, response) => {
    response.setHeader("Content-Type", "text/html; charset=utf-8");
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
        case "/favicon.ico":
            readFile("/favicon.ico", response)
        break;
        default:
            readFile(request.url, response)
        break;
    }
}).listen(80);

const readFile = (url, response) => {
    //__dirname es una variable global y esta definida en Node.js nos da la ruta absoluta
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