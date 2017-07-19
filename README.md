# Aeson (father of [Jason](https://en.wikipedia.org/wiki/Jason))

[![Build Status](https://travis-ci.org/mycomosi/aeson.svg?branch=master)](https://travis-ci.org/mycomosi/aeson)
[![Coverage Status](https://coveralls.io/repos/github/mycomosi/aeson/badge.svg?branch=master)](https://coveralls.io/github/mycomosi/aeson?branch=master)

A simple javascript library to dynamically load json properties files


Usage examples

```javascript
let jsons = new aeson(fetch);

// loading with only path
jsons.loadJsons('/test/resources/json/lang.json',
()=>{
    console.log(jsons.getProperty('lang', 'i18n_apex','blabla'));
});

// loading with array of paths
jsons.loadJsons(['/test/resources/json/lang2.json','/test/resources/json/theme.json'],
()=>{
    console.log(jsons.getProperty('lang2', 'i18n_apex','blabla'));
    console.log(jsons.getProperty('theme', 'GridHoverColor','red'));
});

// loading with object
jsons.loadJsons(
    {path : '/test/resources/json/lang.json', id : 'i18n'}
,
()=>{
    console.log(jsons.getProperty('i18n', 'i18n_apex','blabla'));
});

// loading with array of objects
let jsons = new aeson(fetch);
jsons.loadJsons([
    {path : '/test/resources/json/theme.json', id : 'id1'},
    {path : '/test/resources/json/lang.json', id : 'id2'}
],
()=>{
    console.log(jsons.getProperty('id1', 'GridHoverColor','red'));
    console.log(jsons.getProperty('id2', 'i18n_apex','blabla'));
});
```
