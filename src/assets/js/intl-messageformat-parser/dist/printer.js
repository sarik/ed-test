"use strict";
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
function printAST(ast) {
    var printedNodes = ast.map(function (el) {
        if (types_1.isLiteralElement(el)) {
            return printLiteralElement(el);
        }
        if (types_1.isArgumentElement(el)) {
            return printArgumentElement(el);
        }
        if (types_1.isDateElement(el) || types_1.isTimeElement(el) || types_1.isNumberElement(el)) {
            return printSimpleFormatElement(el);
        }
        if (types_1.isPluralElement(el)) {
            return printPluralElement(el);
        }
        if (types_1.isSelectElement(el)) {
            return printSelectElement(el);
        }
    });
    return printedNodes.join('');
}
exports.printAST = printAST;
function printEscapedMessage(message) {
    return message.replace(/([{}](?:.*[{}])?)/su, "'$1'");
}
function printLiteralElement(_a) {
    var value = _a.value;
    return printEscapedMessage(value);
}
function printArgumentElement(_a) {
    var value = _a.value;
    return "{" + value + "}";
}
function printSimpleFormatElement(el) {
    return "{" + el.value + ", " + types_1.TYPE[el.type] + (el.style ? ", " + printArgumentStyle(el.style) : '') + "}";
}
function printNumberSkeletonToken(token) {
    var stem = token.stem, options = token.options;
    return options.length === 0
        ? stem
        : "" + stem + options.map(function (o) { return "/" + o; }).join('');
}
function printArgumentStyle(style) {
    if (typeof style === 'string') {
        return printEscapedMessage(style);
    }
    else if (style.type === 1 /* date */) {
        return "::" + printEscapedMessage(style.pattern);
    }
    else {
        return "::" + style.tokens.map(printNumberSkeletonToken).join(' ');
    }
}
function printSelectElement(el) {
    var msg = [
        el.value,
        'select',
        Object.keys(el.options)
            .map(function (id) { return id + "{" + printAST(el.options[id].value) + "}"; })
            .join(' ')
    ].join(',');
    return "{" + msg + "}";
}
function printPluralElement(el) {
    var type = el.pluralType === 'cardinal' ? 'plural' : 'selectordinal';
    var msg = [
        el.value,
        type,
        [
            el.offset ? "offset:" + el.offset : ''
        ].concat(Object.keys(el.options).map(function (id) { return id + "{" + printAST(el.options[id].value) + "}"; })).filter(Boolean)
            .join(' ')
    ].join(',');
    return "{" + msg + "}";
}
