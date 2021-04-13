//es pot importar i exportar els components
const RecuperaParaules=Vue.component('RecuperaParaules', {
  props: {
    cadenaCerca: '',
    resultats: []
  },
  methods: {
    cercar: function() {
      axios
        .get(`http://localhost:3000/recuperarParaules`)
        .then(response => {
          this.resultats = response.data;
          emmagatzematge.desar('llistaparaules',JSON.stringify(this.resultats));
        });
    }
  },
  template: `
      <div>
      <button v-on:click="cercar">iniciar</button>
      <ul>
        <li v-for="resultat in resultats">
          {{resultat}}
        </li>
      </ul>
      </div>
      `
});

var app = new Vue({
  el: '#app',
  components:{
    'RecuperaParaules':RecuperaParaules,
  },
  template: `
        <RecuperaParaules/>
      `
});

