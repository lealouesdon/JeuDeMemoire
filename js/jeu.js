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
    afficheLast();
});

//recuperation du jeu lancé
function getJeu() {
  jeu = getCookie("jeu");
}

function afficheLast(){
  var str1 = '../sources/'
  var str3 = '.jpg'
  var row = fichiers[fichiers.length - 1];
  var strf = str1.concat(row[0],str3);
  $("#i1").attr("src",strf);
  strf = str1.concat(row[1],str3);
  $("#i2").attr("src",strf);
  strf = str1.concat(row[2],str3);
  $("#i3").attr("src",strf);
}

document.addEventListener("keydown", function keyDown() {
  addImages();
  console.log(fichiers);
  afficheLast();
});


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
