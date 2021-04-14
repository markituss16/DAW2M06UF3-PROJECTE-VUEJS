//Aquet codi es per crear,accedir, i eliminar tot el tema de localstorage
var emmagatzematge = {
    desar: function(tipokey,nom) { 
        localStorage.setItem(tipokey,nom);
    },
    mostrar: function(tipokey) {
            console.log(tipokey);
            console.log(tipokey);
            return localStorage.getItem(tipokey);
    },
    esborrarItem: function(tipokey) {
        console.log(tipokey);
        localStorage.removeItem(tipokey);
    },
    
}


