import { Imatges } from "../class/user.js";

var inicial = Vue.component("Inicial",{
      data: function(){
        return {
          show: true,
          imatge:null ,
			    Imatge:Imatges
        }
      },
      methods:{
        checkForm: function () {
          if (this.imatge) {
            this.Imatge=new Imatges(this.imatge);
            return true;
          }
          return false;
        },
    },
      template:`
        <div class="container">
        <img  style="margin-top: 40px; margin-left:340px" class="animated bounce infinite img-fluid" src="../assets/images/sopaLletres.png" width="400">
        <h1 style="margin-top: 20px; text-align: center; color:white">SOPA DE LLETRES</h1>
        <p style="margin-top: 40px; text-align: center; color:white"><strong>Sergio Aliaga i Marc Palma</strong></p>

        <p>
          <label for="imatge">POSA LA DIRRECCIO D'UNA IMATGE</label>
          <input id="imatge" v-on:keyup.enter="actualizarLista" v-model="imatge" type="text" name="imatge">
		    </p>
		    <p>
			    <input type="submit" v-on:click="checkForm" value="Enviar">
		    </p>
        <img v-bind:src="''+this.Imatge.imagen" width="200" height="90"/> 
        </div>
      `
});

export{inicial}