const cheerio = require('cheerio');

class imgExporter {

  
  init(html_text) {
    const $ = cheerio.load(html_text);

    // поиск картинок
    
    let imges = $('img');
    let src = [];

    imges.each(function(i, img) {
      console.log($(this).attr('src'));
      console.log(i);
      
      src.push($(this).attr('src'))
    })

    let result = src
    return result;
  }
}

module.exports = imgExporter;