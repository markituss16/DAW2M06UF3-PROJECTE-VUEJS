const inici = {template: `
    <inici></inici>
`};

const game = {template: `
    <partida></partida>
`}

const finalGame = {template: `
    <finalPartida></finalPartida>
`}

const rutes = {
    '': inici,
    '#/': RecuperaParaules,
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
    <nav class="navbar navbar-dark bg-primary">
        <div class="collapse navbar-collapse" id="navbarNavDropdown" v-on:click="navegar">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="">Inici</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#/game">Joc</a>
                </li>
            </ul>
        </div>
    </nav>
    <div v-bind:is="vistaActual"></div>
    `
});

export {home};