/**
 * para executar: ctrl + F5
 * ao criar o arquivo html que receberá as imagens
 * baixe o lite-server no terminal: npx lite-server
 * 
 * Esse arquivo contém:
 *    navegação pelo DOM
 *    converçao de tipos nodelist -> array, array -> json
 *    filtragemde informações
 *    escreverinformcações em arquivo json usando a biblioteca fs
 * 
 */

const puppeteer = require('puppeteer');
const fs = require('fs');


(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: true});
    const page = await browser.newPage();

    // Navigate the page to a URL.
    const url = "https://www.tudocelular.com/mercado/noticias/n222678/plantao-tc-samsung-galaxys24fe-iphone17fino-mais.html";
    await page.goto(url);

    const imgList = await page.evaluate( () => {
        //toda essa funcao será executada no browser
        //pegando as imagens da pagina
        const nodeList = document.querySelectorAll('section#notice_content > div.content > a.fancybox > img[data-src]');

        //transformar o nodeList em array
        const imgArray = [...nodeList];

        /*
        //transformar os nodes (elementos html) em objetos JS
        const imgList = imgArray.map(({src}) => ({
            src
        }))
        */
       //desestruturação dos atibutos do obj. O atributo dataset tem um atibuto src
        const imgList =  imgArray.map(({dataset}) => dataset.src);
        
        //colocar pra fora da função
        return imgList;
      });
      
      console.log('imgList')
      console.log(imgList);

    //escrever os dados em um arquivo local
    fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
      if (err) throw new Error("something went wrong");

      console.log("well done!");
    })
      
    // Set screen size.
    //await page.setViewport({width: 1080, height: 2024});
    //await delay(5000)
    //await page.screenshot({path: 'example.png'});
   // await browser.close();
})();

function delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time)
    })
  }
