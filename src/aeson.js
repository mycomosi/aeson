/** (c) 2017 Objective Systems Integrators, Inc. (MYCOM OSI) All Rights Reserved.
*
*   A simple javascript library to dynamically load json properties files
*
*/

export default class Aeson {

    constructor(fetch){
        // Possibly in the future pass another way of making backend calls than fetch
        // Response needs to support .json() method though ...
        // Easier for tests
        this._fetch = fetch;
        this._list = [];
        this._map = new Map();
    }

    /**
    * Callback function called when theme has been loaded
    *
    * @callback OnJsonLoadedCb
    */

    /**
    * JsonSpecs options
    *
    * @typedef {Object} JsonSpecs
    * @property {string} path - the path of the json file relative to the index page.
    * @property {string} [id] - The identifier that serves as key to retrieve corresponding properties, if not specified will use the name of the file without extension.
    *
    */

    /**
    * Loads json objects from backend.
    * @param {JsonSpecs[]} specs - An array of json specifications.
    * @param {OnJsonLoadedCb} [callback] - Callback function called when theme has been loaded.
    */
    loadJsons(jsonsSpecs, callback) {
        let specs = this._transformParams(jsonsSpecs);

        for (let spec of specs) {
            this._fetchAndAssignInMap(spec);
        }

        Promise.all(this._list)
        .then(() =>{
            this._onJsonLoaded(callback);
        })
        .then(() =>{
            this._list = [];
        });
    }

    _onJsonLoaded(callback){
        if (typeof callback === 'function'){
            callback();
        }
    }

    _extractId(spec){
        if (!spec.id){
            let i = spec.path.lastIndexOf('/');
            let id = spec.path.substring(i+1).replace('.json','');
            //console.log('spec.id = ' + id);
            return id;
        } else {
            return spec.id;
        }
    }

    _noCache(url){
        let d = Date.now();
        let sep = '?';

        if (url.indexOf('?')!== -1) {
            sep = '&';
        }
        return `${url}${sep}nc=${d}`;
    }

    _fetchAndAssignInMap(spec){
        this._list.push(
            this._fetch.call(window, this._noCache(spec.path))
            .then((response) => {
                return response.json();
            })
            .then( (j) => {
                this._map.set(this._extractId(spec), j);
            })
        );
    }

    _transformParams(params){
        //if passing only one spec convert it into array for easier syntas
        if (params.constructor !== Array && typeof params === 'object')
        {
            return [params];
        }
        //just passing a path
        else if (typeof params === 'string'){
            return [this._paramFromString(params)];
        }
        else {
            return this._transformArray(params);
        }
    }

    _paramFromString(paramAsString){
        return {path:paramAsString};
    }

    _transformArray(params){
        let out = [];
        for (let p of params) {
            if (typeof p === 'string'){
                out.push(this._paramFromString(p));
            }
            else {
                out.push(p);
            }
        }
        return out;
    }

    /**
    * Returns the property value for the given id and key
    * @param {string} id - the id of the json.
    * @param {string} key - the key of the property to return.
    * @param {string} [defaultValue] - a default value in case the key was not set inside the theme.
    */
    getProperty(id, key, defaultValue) {
        if (this._map.has(id)){
            let t = key.trim().split(".");

            let properties = this._map.get(id);
            //console.log('properties = ' + JSON.stringify(properties));

            let x = t[0];
            //console.log('key = ' + JSON.stringify(key));

            let value = properties[x] || defaultValue;
            //console.log('value = ' + JSON.stringify(value));

            if (!value){
                throw new Error('Property was not found and no defaultValue');
            }

            t.splice(1).forEach((k) => {
                value = value[k];
                //console.log('value = ' + value);
            });

            return value;
        }
        else if (defaultValue){
            return defaultValue;
        }
        else {
            throw new Error(`No json load with following id ${id} and no defaultValue`);
        }
    }
}
