# jason

[![Build Status](https://travis-ci.org/mycomosi/jason.svg?branch=master)](https://travis-ci.org/mycomosi/jason)

A simple javascript library to dynamically load json properties files


Usage examples

```javascript
let jsons = new jason(fetch);
jsons.loadJsons([
    {path : 'json/theme.json', id : 'theme'},
    {path : 'json/lang.json', id : 'i18n'}
],
()=>{
    console.log(jsons.getProperty('theme', 'GridHoverColor','defaultValue1'));
    console.log(jsons.getProperty('i18n', 'i18n_apex','defaultValue2'));
});

// loading with no array
jsons.loadJsons(
    {path : 'json/lang.json', id : 'i18n2'}
,
()=>{
    console.log(jsons.getProperty('i18n2', 'i18n_apex','defaultValue3'));
    console.log(jsons.getProperty('theme', 'GridHoverColor','defaultValue4'));
});

// loading with only path
jsons.loadJsons('json/lang.json',        
()=>{
    console.log(jsons.getProperty('lang', 'i18n_apex','defaultValue4'));
    console.log(jsons.getProperty('theme', 'GridHoverColor','defaultValue5'));
});
```
