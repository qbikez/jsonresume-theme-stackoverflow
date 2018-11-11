export {}; //https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files
import * as Handlebars from "handlebars";

Handlebars.registerHelper('keywordClass', (plaintext: string) => {
    if (plaintext.startsWith("_")) return "secondary";
    if (plaintext.startsWith("*") && plaintext.endsWith("*")) return "strong";
  });
  

Handlebars.registerHelper('keywordMarkup', (plaintext: string) => {
  if (plaintext.startsWith("_")) plaintext = plaintext.substring(1)
  if (plaintext.startsWith("*") && plaintext.endsWith("*")) plaintext = plaintext.substring(1, plaintext.length-1)
  return new Handlebars.SafeString(plaintext);
});
