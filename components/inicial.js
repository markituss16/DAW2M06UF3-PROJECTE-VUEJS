var inicial = Vue.component("Inicial",{
      data: function(){
        return {
          show: true
        }
      },
      template:`
        <div class="container">
        <img  style="margin-top: 40px; margin-left:340px" class="animated bounce infinite img-fluid" src="../assets/images/sopaLletres.png" width="400">
        <h1 style="margin-top: 20px; text-align: center; color:white">SOPA DE LLETRES</h1>
        <p style="margin-top: 40px; text-align: center; color:white"><strong>Sergio Aliaga i Marc Palma</strong></p>
        </div>       
      `
});

export{inicial}