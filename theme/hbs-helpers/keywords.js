"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Handlebars = require("handlebars");
Handlebars.registerHelper('keywordClass', (plaintext) => {
    if (plaintext.startsWith("_"))
        return "secondary";
    if (plaintext.startsWith("*") && plaintext.endsWith("*"))
        return "strong";
});
Handlebars.registerHelper('keywordMarkup', (plaintext) => {
    if (plaintext.startsWith("_"))
        plaintext = plaintext.substring(1);
    if (plaintext.startsWith("*") && plaintext.endsWith("*"))
        plaintext = plaintext.substring(1, plaintext.length - 1);
    return new Handlebars.SafeString(plaintext);
});
