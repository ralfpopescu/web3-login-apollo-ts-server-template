"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNonce = void 0;
var generateNonce = function (length) {
    var result = [];
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i += 1) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    var nonce = result.join("");
    return nonce;
};
exports.generateNonce = generateNonce;
