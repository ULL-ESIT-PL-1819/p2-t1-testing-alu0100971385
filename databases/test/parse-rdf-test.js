'use strict';
const parseRDF = require('../lib/parse-rdf.js');

const fs = require('fs');
const expect = require('chai').expect;
const rdf = fs.readFileSync('test/pg132.rdf');
describe('parseRDF',() => {
    it('should be a function', () => {
        expect(parseRDF).to.be.a('function');
    })
    
    it('should parse RDF content', () => {
        const book = parseRDF(rdf);
        
        expect(book).to.be.an('object');
        
        expect(book).to.have.a.property('id',132);
        
        expect(book).to.have.a.property('title','The Art of War');
        
        expect(book).to.have.a.property('authors')
        .that.is.an('array').with.lengthOf(2);
        
        expect(book).to.have.a.property('subjects')
        .that.is.an('array').with.lengthOf(2)
        .and.contains('Military art and science -- Early works to 1800')
        .and.contains('War -- Early works to 1800');
        
        
    })
    
    it ('exercises from the book', () => {
        
        const book = parseRDF(rdf)
        expect(book).to.have.a.property('lcc')
        .that.is.a('string').with.lengthOf.at.least(1)
        .and.match(/^[^IOWXY]\w*$/);
        
        expect(book).to.have.a.property('sources')
        .that.is.an('array').with.lengthOf.at.least(10);
        
        
    });
});

