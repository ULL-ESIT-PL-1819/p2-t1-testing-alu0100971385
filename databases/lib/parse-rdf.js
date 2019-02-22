'use strict';
const cheerio = require('cheerio');

module.exports = rdf => {
    
    const $ = cheerio.load(rdf);
    const book = {};
    
    book.id = +$('pgterms\\:ebook').attr('rdf:about').replace('ebooks/','');
    
    book.title = $('dcterms\\:title').text();
    
    /*book.authors = $('pgterms\\:agent pgterms\\:name')
    .toArray().map(elem => $(elem).text());*/
    
    book.authors = $('pgterms\\:agent').toArray().map((elem) => {
        let value = {};
        value.name = $(elem).find("pgterms\\:name").text();
        value.webpages = $(elem).find("pgterms\\:webpage").toArray().map((elem) => {
            let value = $(elem).attr("rdf:resource");
            return value;
        });
        
        
        return value;
    });
    
    book.subjects = $('[rdf\\:resource$="/LCSH"]')
    .parent().find('rdf\\:value')
    .toArray().map(elem => $(elem).text());
    
    book.lcc = $('[rdf\\:resource$="/LCC"]').parent().find('rdf\\:value').text();
    
    book.sources =  $("pgterms\\:file").toArray().map((elem) => {
        let value = {};
        value.link = $(elem).attr("rdf:about"); //podemos acceder directamente
        value.type = $(elem).find("rdf\\:Description").find("rdf\\:value").text(); //tenemos que hacer un find
        return value;
    });
    
    return book;
};
