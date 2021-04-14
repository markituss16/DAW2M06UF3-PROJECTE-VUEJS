const express = require('express');
const app = express();

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Request-Method', '*');
		res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
		res.setHeader('Access-Control-Allow-Headers', '*');
    next();
}
);

var paraules = [
    'pilota',
    'cavall',
    'taula',
    'ordinador',
    'ratoli',
    'finestra',
    'cadira'
];

app.get("/recuperarParaules", (req,res) => {
    
   
    let n=5;
    let shuffleArray = paraules.sort(() => Math.random() - Math.random());
    let randomWords = shuffleArray.slice(0, n);
    res.send(randomWords);
});

app.listen(3000, ()=>console.log('Iniciant el servidor al port 3000 per a començar la partida.'));