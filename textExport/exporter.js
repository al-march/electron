const cheerio = require('cheerio');

class Exporter {

  init(html_text) {
    const $ = cheerio.load(html_text);
    let strings = []
    let output = {};
    let node_index = 0;
    // перевод текста
    // рекурсивный поиск текста
    check_children($("html")[0]);
    function check_children(root) {
      $(root.children).each(function () {
        if ($(this)[0].type == "text") {
          if (["script", "style"].indexOf($(this)[0].parent.name) != -1) {
            return;
          }
          let text = $(this).text();
          let real_text = text.match(/\S+(.|\n)+\S+/);

          real_text ? real_text = real_text[0] : real_text = "";

          if (real_text) {
            node_index++;
            const wrap = $(
              `<span data-translate="${node_index}"></span>`
            );
            $(this).replaceWith(wrap);
            // { index: номер_дата_атрибута, string: строка_с_текстом },
            output = { index: node_index, string: real_text.replace(/[\s\t ]{2,}/g, ' ') }
            strings.push(output)
          }
        } else {
          check_children($(this)[0]);
        }
      });
    };
    // перевод плейсхолдеров
    try {
      $('[placeholder]').each(function () {
        let placeholderName = $(this).attr('placeholder');
        node_index++;
        $(this).attr('data-placeholder', node_index)
        $(this).attr('data-placeholder-translate', placeholderName)
        output = { index: node_index, string: placeholderName }
        strings.push(output)
      })
    } catch (error) {
      console.log('Один или более placeholder не корректен!');
    }
    // description
    let description = $('[name="description"]');
    if (description.attr('content')) {
      node_index++
      description.attr('data-description-index', node_index);
      description.attr('data-description', description.attr('content'));
      output = { index: node_index, string: description.attr('content') };
      strings.push(output)
    } else {
      console.log('description не существует');
    }
    let html = $.html().toString()
    // console.log(html);
    let result = {
      html: html,
      strings: strings
    }
    return result;
  }
}

module.exports = Exporter;