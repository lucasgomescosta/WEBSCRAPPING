const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false  });
  const page = await browser.newPage();
  await page.goto('https://instagram.com/rocketseat_oficial');

  const imgList = await page.evaluate(() => {
    //toda essa função será executada no browser

    //vamos pegar todas as imagens que estão na parte de ports
    const nodeList = document.querySelectorAll('article img')

    // transformar o NodeList em array
    const imgArray = [...nodeList]
    // transformar os nodes (elementos html) em obetos JS
    const imglist = imgArray.map( ({src}) => ({
      src
    }))

    console.log(imglist)
    // colocar para fora da função
    return imglist;
  });

  //escrever os dados em um arquivo local
  fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
    if(err) throw new Error('something went wrong')

    console.log("well done"); 
  })

  await browser.close();
})();