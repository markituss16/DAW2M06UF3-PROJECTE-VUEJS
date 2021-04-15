import {juego} from './juego.js';

const inici = {template: `
    <home></home>
`};

const game = {template: `
   <p>hola</p>
`}

const finalGame = {template: `
    <finalPartida></finalPartida>
`}

const rutes = {
    '': inici,
    '#/game': game,
    '#/finalGame': finalGame
};


const error = {
    data: function() {
      return {
        url: window.location.hash
      };
    },
    template: `
    <div>
      <p>URL no encaminada : {{url}} </p>
    </div>
    `
  };

var home = new('home', {
    data: function() {
        return {
            rutaActual: window.location.hash,
            rutes: rutes
        };
    },
    methods: {
        navegar: function($event) {
          this.rutaActual = $event.target.hash;
        }
    },
    computed: {
        vistaActual: function() {
          return this.rutes[this.rutaActual] || error;
        }
    },

    template: `
    <div>
      <ul>
        <li>
          <a href="" 
            v-on:click="navegar">
              Principal
          </a>
        </li>
        <li>
          <a href="#/game" 
            v-on:click="navegar">
              Game
          </a>
        </li>
      </ul>
      <div v-bind:is="vistaActual">        
      </div>
    </div>
    `
});

export {home};