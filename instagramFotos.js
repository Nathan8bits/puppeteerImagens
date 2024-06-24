const puppeteer = require('puppeteer');

(async () => {
  // Inicia o navegador
  const browser = await puppeteer.launch();
  // Abre uma nova página
  const page = await browser.newPage();
  // Navega até a URL desejada
  await page.goto('https://www.instagram.com');
  delay(10000)
  // Tira uma captura de tela
  await page.screenshot({ path: 'example.png' });
  // Fecha o navegador
  await browser.close();
})();



function delay(time) {
    //milisegundos
    return new Promise(function (resolve) {
      setTimeout(resolve, time)
    })
  }
