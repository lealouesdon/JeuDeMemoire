var jeu;
var fichiers = [];
var done = [];
//fonction de départ
$(document).ready(function(){
    getJeu();
    $("#text").text(jeu);
    //initialisationArray();
    addImages();
    console.log(fichiers);
});

//recuperation du jeu lancé
function getJeu() {
  jeu = getCookie("jeu");
}

function addImages(){
  var row = [];
  var n;
  var i = 0;
  var z = "0";
  while (i<3) {
    n = Math.floor((Math.random() * 100));
    if(n<10){
      n = z.concat(n.toString());
    }else{
      n = n.toString();
    }
    if(!done.includes(n)){
      i++;
      done.push(n);
      row.push(n);
    }
  }
  fichiers.push(row);
}

function initialisationArray() {
  var i;
  var z = "0";
  for (i = 0; i < 100; i++) {
    if(i<10){
      fichiers[i] = z.concat(i.toString());
    }else{
      fichiers[i] = i.toString();
    }
  }
}
//pour récuperer un élement d'une cookie
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
