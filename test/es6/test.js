/* eslint-env node, mocha */
/* global expect sinon*/
import Aeson from '../../src/aeson';

describe('Aeson', function () {
    'use strict';

    let theme, fakeFetchter;

    before(function () {
        theme = {
            grid : {
                color : 'black',
                row : {
                    backgroundColor : 'yellow'
                }
            },
            other : '#ffffff',
            empty : ''
        };

        global.window = {}; //for fetch

        fakeFetchter = function(){
            return {
                then : function(fn){
                    let response = {
                        json: function(){
                            return theme;
                        }
                    };

                    let out = fn.call(this, response);
                    return {
                        then : function(f2){
                            f2.call(this, out);
                        }
                    };
                }
            };
        };
    });

    beforeEach(function () {

    });

    afterEach(function () {

    });

    let checkValues = function(aeson, id){
        // WHEN
        let isNotDefFound = aeson.isPropertySet(id, 'notDef');
        let isEmptyFound = aeson.isPropertySet(id, 'empty');

        // basic test
        let other = aeson.getProperty(id, 'other', 'red');
        // one level depth
        let gridColor = aeson.getProperty(id, 'grid.color', 'red');
        // two levels depth
        let gridBackColor = aeson.getProperty(id, 'grid.row.backgroundColor', 'red');
        //Node defined in theme
        let notDef = aeson.getProperty(id, 'notDef', 'red');
        // Not passing default value to existing prop
        let other2 = aeson.getProperty(id, 'other');
        // Empty valus is a correct value
        let empty = aeson.getProperty(id, 'empty', 'notEmpty');


        // THEN
        expect(isNotDefFound).to.equal(false);
        expect(isEmptyFound).to.equal(true);

        expect(other).to.equal('#ffffff');
        expect(gridColor).to.equal('black');
        expect(gridBackColor).to.equal('yellow');

        expect(notDef).to.equal('red');
        expect(other2).to.equal('#ffffff');
        expect(empty).to.equal('');
    };

    it('should return the right json values when passing only path', function () {
        // Given
        let aeson = new Aeson(fakeFetchter);
        aeson.loadJsons('theme.json', null);

        checkValues(aeson, 'theme');
    });


    it('should return the right json values when passing only one object with no id', function () {
        // Given
        let aeson = new Aeson(fakeFetchter);
        aeson.loadJsons({path:'theme.json'}, null);

        checkValues(aeson, 'theme');
    });

    it('should return the right json values when passing only one object', function () {
        // Given
        let aeson = new Aeson(fakeFetchter);
        aeson.loadJsons({path:'theme.json', id:'other'}, null);

        checkValues(aeson, 'other');
    });

    it('should return the right json values when passing an array object', function () {
        // Given
        let aeson = new Aeson(fakeFetchter);
        aeson.loadJsons([{path:'theme.json', id:'id1'}, {path:'theme.json', id:'id2'}], null);

        checkValues(aeson, 'id1');
        checkValues(aeson, 'id2');
    });

    it('should return the right json values when passing an array of strings', function () {
        // Given
        let aeson = new Aeson(fakeFetchter);
        aeson.loadJsons(['theme.json', 'lang.json'], null);

        checkValues(aeson, 'theme');
        checkValues(aeson, 'lang');
    });


    it('should throw error if the id for which we search a property is not set in the map when testing existence', function () {
        // Given
        let aeson = new Aeson(fakeFetchter);
        aeson.loadJsons('theme.json', null);

        // When
        expect(aeson.isPropertySet.bind(aeson, 'x')).to.throw('No json loaded with following id x');

        // Then
    });

    it('should throw error if the id for which we search a property is not set in the map when getting the value', function () {
        // Given
        let aeson = new Aeson(fakeFetchter);
        aeson.loadJsons('theme.json', null);

        // When
        expect(aeson.getProperty.bind(aeson, 'x', 'notDef')).to.throw('No json loaded with following id x and no defaultValue was provided');

        // Then
    });

    it('should throw error if the key does not exist and no default value is given', function () {
        // Given
        let aeson = new Aeson(fakeFetchter);
        aeson.loadJsons('theme.json', null);

        // When
        expect(aeson.getProperty.bind(aeson, 'theme', 'notDef')).to.throw('Property notDef was not found in json theme and no defaultValue was provided');

        // Then
    });

    it('should return default value is no json was loaded', function () {
        // Given
        let fetch = function(){
        };

        let aeson = new Aeson(fetch);

        // When
        expect(aeson.getProperty('x', 'other', '#ffffff')).to.equal('#ffffff');

        // Then

    });

    it('should throw error if no json was loaded', function () {
        // Given
        let fetch = function(){
        };

        let aeson = new Aeson(fetch);

        // When
        expect(aeson.getProperty.bind(aeson,  'x', 'other')).to.throw('No json loaded with following id x and no defaultValue was provided');

        // Then
    });

    it('should load the json on another url with no cache param', function () {
        // Given
        let fetch = sinon.spy(fakeFetchter);
        let aeson = new Aeson(fetch);
        let path = 'json/theme.json';
        // When
        aeson.loadJsons(path, null);

        // Then
        sinon.assert.calledWith(fetch, sinon.match.string.and(sinon.match(new RegExp(path.replace('/','\\/').replace('.','\\.') + '\\?nc=\\d+'))));
    });

    it('should load the json on another url with no cache param', function () {
        // Given
        let fetch = sinon.spy(fakeFetchter);
        let aeson = new Aeson(fetch);
        let path = 'json/theme.json?param=1';
        // When
        aeson.loadJsons(path, null);

        // Then
        sinon.assert.calledWith(fetch, sinon.match.string.and(sinon.match(new RegExp(path.replace('/','\\/').replace('.','\\.').replace('?','\\?') + '&nc=\\d+'))));
    });


    it('should call the callback once loaded', function () {
        // Given
        let cb = sinon.spy();
        let aeson = new Aeson();

        // When
        aeson._onJsonLoaded(cb);

        // Then
        sinon.assert.calledWith(cb);
    });

});
