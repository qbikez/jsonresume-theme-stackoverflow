import * as Handlebars from "handlebars";

const fs = require('fs');
const path = require('path');
const requireDir = require('require-dir');

const HBS_HELPERS = './theme/hbs-helpers';

function render(resume : any) {
  const css = fs.readFileSync(`${__dirname}/style.css`, 'utf-8');
  const tpl = fs.readFileSync(`${__dirname}/resume.hbs`, 'utf-8');
  const partialsDir = path.join(__dirname, 'theme/partials');
  const filenames = fs.readdirSync(partialsDir);

  filenames.forEach((filename : string) => {
    const matches = /^([^.]+).hbs$/.exec(filename);
    if (!matches) return;
    const name = matches[1];
    const filepath = path.join(partialsDir, filename);
    const template = fs.readFileSync(filepath, 'utf8');

    Handlebars.registerPartial(name, template);
  });

  var expertLevel = ["expert","master"];
  return Handlebars.compile(tpl)({
    css,
    resume,
    ext: {
        skills: {
            expert: (resume.skills as Array<any>).filter(function (v) { return v.level && expertLevel.indexOf(v.level.toLowerCase()) >= 0; }),
            other: (resume.skills as Array<any>).filter(function (v) { return !v.level || expertLevel.indexOf(v.level.toLowerCase()) < 0; }),
        }
    }
  });
}

/* HANDLEBARS HELPERS */
requireDir(HBS_HELPERS, { recurse: true });

module.exports = { render };
