"use strict";
var fs = require('fs');
var path = require('path');
var requireDir = require('require-dir');
var Handlebars = require('handlebars');
var HBS_HELPERS = './theme/hbs-helpers';
function render(resume) {
    var css = fs.readFileSync(__dirname + "/style.css", 'utf-8');
    var tpl = fs.readFileSync(__dirname + "/resume.hbs", 'utf-8');
    var partialsDir = path.join(__dirname, 'theme/partials');
    var filenames = fs.readdirSync(partialsDir);
    filenames.forEach(function (filename) {
        var matches = /^([^.]+).hbs$/.exec(filename);
        if (!matches)
            return;
        var name = matches[1];
        var filepath = path.join(partialsDir, filename);
        var template = fs.readFileSync(filepath, 'utf8');
        Handlebars.registerPartial(name, template);
    });
    var expertLevel = ["expert", "master"];
    return Handlebars.compile(tpl)({
        css: css,
        resume: resume,
        ext: {
            skills: {
                expert: resume.skills.filter(function (v) { return v.level && expertLevel.indexOf(v.level.toLowerCase()) >= 0; }),
                other: resume.skills.filter(function (v) { return !v.level || expertLevel.indexOf(v.level.toLowerCase()) < 0; }),
            }
        }
    });
}
/* HANDLEBARS HELPERS */
requireDir(HBS_HELPERS, { recurse: true });
module.exports = { render: render };
