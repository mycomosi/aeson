'use strict';
// Using Node global to avoid repeating the require everywhere, only for tests
// this is not a good practice for application code
global.chai = require('chai');
global.sinon = require('sinon');

global.chai.should();
global.expect = global.chai.expect;
global.assert = global.chai.assert;
