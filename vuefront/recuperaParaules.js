//es pot importar i exportar els components
Vue.component('RecuperaParaules', {
 
  resultats: [],
  methods: {
    cercar: function() {
      axios
        .get(`172.20.17.148:3000/recuperarParaules`)
        .then(response => {
          this.resultats = response.data;
        });
    }
  },
  template: `
      <div>
      <button click= v-on:click="cercar" >iniciar</button>
      <ul>
        <li v-for="resultat in resultats.results">
          {{resultat.name}} {{resultat.model}}
        </li>
      </ul>
      </div>
      `
});

var app = new Vue({
  el: '#app',
  data: {
    cadenaCerca: '',
    resultats: []
  },


  methods: {
    cercar: function() {
      axios
        .get(`http://172.20.17.148:3000/recuperarParaules`)
        .then(response => {
          this.resultats = response.data;
        });
    }
  },
  template: `
      <div>
      <button v-on:click="cercar">iniciar</button>
      <ul>
        <li v-for="resultat in resultats.results">
          {{resultat.name}} {{resultat.model}}
        </li>
      </ul>
      </div>
      `
});