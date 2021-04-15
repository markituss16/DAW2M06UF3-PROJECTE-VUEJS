import {juego} from './juego.js';
import {inicial} from './inicial.js';

const inici = {template: `
    <inicial></inicial>
`};

const game = {template: `
    <Partida></Partida>
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

var home = Vue.component('home', {
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
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup" v-on:click="navegar">
                    <div class="navbar-nav">
                        <a class="nav-link" href="">Inici</a>
                        <a class="nav-link" href="#/game">Joc</a>
                    </div>
                </div>
            </nav>
        </div>
        <div v-bind:is="vistaActual"></div>
    </div>
    `
});

export {home};