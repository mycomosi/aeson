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
            other : '#ffffff'
        };

        global.window = {}; //for fetch

        fakeFetchter = function(path){
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
        // When
        let gridColor = aeson.getProperty(id, 'grid.color', 'red');
        let gridBackColor = aeson.getProperty(id, 'grid.row.backgroundColor', 'red');
        let other = aeson.getProperty(id, 'other', 'red');
        let notDef = aeson.getProperty(id, 'notDef', 'red');
        let other2 = aeson.getProperty(id, 'other');

        // Then
        expect(gridColor).to.equal('black');
        expect(gridBackColor).to.equal('yellow');
        expect(other).to.equal('#ffffff');
        expect(notDef).to.equal('red');

        expect(other2).to.equal('#ffffff');
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




    it('should throw error if the id for which we search a property is not set in the map ', function () {
        // Given
        let aeson = new Aeson(fakeFetchter);
        aeson.loadJsons('theme.json', null);

        // When
        expect(aeson.getProperty.bind(aeson, 'x', 'notDef')).to.throw('No json load with following id x and no defaultValue');

        // Then
    });

    it('should throw error the key does not exist and no default value is given', function () {
        // Given
        let aeson = new Aeson(fakeFetchter);
        aeson.loadJsons('theme.json', null);

        // When
        expect(aeson.getProperty.bind(aeson, 'theme', 'notDef')).to.throw('Property was not found and no defaultValue');

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
        expect(aeson.getProperty.bind(aeson, 'x', 'other')).to.throw('No json load with following id x and no defaultValue');

        // Then
    });

    it('should load the json on another url', function () {
        // Given
        let fetch = sinon.spy(fakeFetchter);
        let aeson = new Aeson(fetch);
        let path = 'json/theme.json';
        // When
        aeson.loadJsons(path, null);

        // Then
        sinon.assert.calledWith(fetch, path);
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
