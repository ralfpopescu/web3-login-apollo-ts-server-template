"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var debug = function (message, metadata) {
    console.log(message, JSON.stringify(metadata));
};
var error = function (message, metadata, e) {
    console.log(message);
    console.log(JSON.stringify(metadata));
    console.log(e);
};
exports.logger = { debug: debug, error: error };
