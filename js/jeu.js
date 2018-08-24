var jeu;
var fichiers = [];
//pour qu'il n'y est pas d'image identique
var done = [];
var clock;
var etape;  //1 = 10 sec debut; 2 = 1min de memo; 3 = 10 sec ; 4 = 3min jeu
var index = 0; //tete de lecture
//fonction de départ
$(document).ready(function(){
    getJeu();
    $("#text").text(jeu);
    $('.main').hide();
    //initialisationArray();
    //addImages();
    console.log(fichiers);
    //afficheLast();
    etape = 1;
    // Instantiate a counter
				clock = new FlipClock($('.clock'), 10, {
					clockFace: 'MinuteCounter',
					autoStart: true,
					countdown: true,
          callbacks:{
                stop: function() {stop();}
            }
				});

});

//recuperation du jeu lancé
function getJeu() {
  jeu = getCookie("jeu");
}

function afficheIndex(){
    var str1 = '../sources/'
    var str3 = '.jpg'
    if (index<fichiers.length){
      var row = fichiers[index];
      var strf = str1.concat(row[0],str3);
      $("#i1").attr("src",strf);
      strf = str1.concat(row[1],str3);
      $("#i2").attr("src",strf);
      strf = str1.concat(row[2],str3);
      $("#i3").attr("src",strf);
    }


}

/*document.addEventListener("keydown", function keyDown() {
  if(etape==2){
    addImages();
    console.log(fichiers);
    console.log(etape);
    afficheLast();
  }else{
    console.log(fichiers);
    console.log(etape);
  }

});*/

//scroll event

$(window).click(function(event){
   var st = $(this).scrollTop();
   if(etape==2){
      addImages();
      index +=1;
      afficheIndex();
   }

   lastScrollTop = st;
});

function addImages(){
  var row = [];
  var n;
  var i = 0;
  var z = "0";
  if(done.length<100){
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
}
//entre étape
function stop() {
  if(etape==1){
    $('.main').show();
    clock = new FlipClock($('.clock'), 60, {
      clockFace: 'MinuteCounter',
      autoStart: true,
      countdown: true,
      callbacks:{
            stop: function() {stop();}
        }
    });
    etape = 2;
    addImages();
    afficheIndex();
    console.log(etape);
  }else if (etape==2) {
    $('.main').hide();
    clock = new FlipClock($('.clock'), 10, {
      clockFace: 'MinuteCounter',
      autoStart: true,
      countdown: true,
      callbacks:{
            stop: function() {stop();}
        }
    });
    etape = 3;
    console.log(etape);
  }else if (etape == 3){

  }else{

  }

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
