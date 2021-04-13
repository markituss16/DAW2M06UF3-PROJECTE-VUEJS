const express = require('express');
const app = express();
var bodyParser = require('body-parser');

var paraules = [
    'pilota',
    'cavall',
    'taula',
    'ordinador',
    'ratoli',
    'finestra',
    'cadira'
];

app.get("/recuperarParaules")