import {home} from './components/home.js';
import {inicial} from './components/inicial.js';
import {wordSearch} from './components/word-search.js';
import {wordList} from './components/wordList.js';
import {wordsArray} from './components/wordsArray.js';
import {endGame} from './components/finalPartida.js';

var app = new Vue({
    el: '#app',
    data: {},
    template: `
        <div>
            <home></home>
        </div>
      `
  });