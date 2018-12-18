"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Handlebars = require("handlebars");
Handlebars.registerHelper('paragraphSplit', (plaintext) => {
    const lines = plaintext instanceof Array ? plaintext.map(l => l.split(/\r\n|\r|\n/g)).reduce((flat, toFlatten) => flat.concat(toFlatten), []) : plaintext.split(/\r\n|\r|\n/g);
    const output = lines.filter(line => line).reduce((a, b) => `${a}<p>${b}</p>`, '');
    return new Handlebars.SafeString(output);
});
Handlebars.registerHelper('safeString', (plaintext) => {
    return new Handlebars.SafeString(plaintext.trim());
});
