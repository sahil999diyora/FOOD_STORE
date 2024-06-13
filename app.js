const http = require("http")
const fs = require("fs")
const url = require("url")


const server = http.createServer((req, res) => {

    JSON_DATA = JSON.parse(fs.readFileSync("./json/data.json", "utf-8"))

    URL_DATA = url.parse(req.url,true)
    // console.log(URL_DATA);
    URL_ANS = URL_DATA.pathname ;
    // console.log(URL_ANS);

    if (URL_ANS == "/") {
        let data = " "

        for (let i = 0; i < JSON_DATA.length; i++) {

            data = data + fs.readFileSync("./product/data.html", "utf-8")
                .replace("<%%mainImage%%>", JSON_DATA[i].mainImage)
                .replace(/<%%productName%%>/g, JSON_DATA[i].productName)
                .replace("<%%productCode%%>", JSON_DATA[i].productCode)
                .replace("<%%productPrise%%>", JSON_DATA[i].productPrise)
                .replace("<%%IMG1%%>", JSON_DATA[i].images[0])
                .replace("<%%IMG2%%>", JSON_DATA[i].images[1])
                .replace("<%%IMG3%%>", JSON_DATA[i].images[2])
                .replace("<%%IMG4%%>", JSON_DATA[i].images[3])
                .replace("<%%ID%%>",i)
        }

        MAIN_DATA = fs.readFileSync("./product/index.html", "utf-8")
            .replace("<%%ALL_DATA%%>", data)

        res.write(MAIN_DATA)
    }
    else if (URL_ANS == "/product.html") 
    {

        URL_MAIN_DATA =  URL_DATA.query.id ;

        PRODUCT_DATA = fs.readFileSync("./product/product.html", "utf-8")
            .replace("<%%mainImage%%>", JSON_DATA[URL_MAIN_DATA].mainImage)
            .replace(/<%%productName%%>/g, JSON_DATA[URL_MAIN_DATA].productName)
            .replace("<%%productCode%%>", JSON_DATA[URL_MAIN_DATA].productCode)
            .replace("<%%productPrise%%>", JSON_DATA[URL_MAIN_DATA].productPrise)
            .replace("<%%IMG1%%>", JSON_DATA[URL_MAIN_DATA].images[0])
            .replace("<%%IMG2%%>", JSON_DATA[URL_MAIN_DATA].images[1])
            .replace("<%%IMG3%%>", JSON_DATA[URL_MAIN_DATA].images[2])
            .replace("<%%IMG4%%>", JSON_DATA[URL_MAIN_DATA].images[3])
            .replace("<%%B1%%>",JSON_DATA[URL_MAIN_DATA].benifits[0])
            .replace("<%%B2%%>",JSON_DATA[URL_MAIN_DATA].benifits[1])
            .replace("<%%B3%%>",JSON_DATA[URL_MAIN_DATA].benifits[2])
            .replace("<%%B4%%>",JSON_DATA[URL_MAIN_DATA].benifits[3])
            .replace("<%%B5%%>",JSON_DATA[URL_MAIN_DATA].benifits[4])
            .replace("<%%B6%%>",JSON_DATA[URL_MAIN_DATA].benifits[5])
            .replace("<%%B7%%>",JSON_DATA[URL_MAIN_DATA].benifits[6])

        res.write(PRODUCT_DATA);
    }





    res.end()

}).listen(8080)