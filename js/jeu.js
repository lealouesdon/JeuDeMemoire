var jeu;
var fichiers = [];
//copie pour l'utilisateur
var fichiers2 = [];
//pour qu'il n'y est pas d'image identique
var done = [];
var clock;
var etape;  //1 = 10 sec debut; 2 = 1min de memo; 3 = 10 sec ; 4 = 3min jeu
var index; //tete de lecture
//fonction de départ
$(document).ready(function(){
    getJeu();
    start();
});

//start
function start() {
  $('.overlay').hide();
  $("#text").text(jeu);
  $('#sortable').hide();
  $('#corr').hide();
  etape = 1;
  index = 0;
  // Instantiate a counter
      clock = new FlipClock($('.clock'), 10, {
        clockFace: 'MinuteCounter',
        autoStart: true,
        countdown: true,
        callbacks:{
              stop: function() {stop();}
          }
      });
}

//replay
function replay() {
  fichiers=[];
  fichiers2=[];
  done=[];
  points = 0;
  start();
}

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

function afficheIndexMix(){
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

    var parent = $("#sortable");
    var divs = parent.children();
    while (divs.length) {
        parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }
  }
}

//sauvegarde
function sauvegarde() {
  var row = [];
  var parent = $("#sortable");
  var imgs = parent.children();
  var i = 0;
  while (i<imgs.length) {
    var str = imgs[i].getElementsByTagName("img")[0].getAttribute("src");
    var res = str.substring(11, 13);
    //console.log(res);
    row.push(res);
    i++;
  }
  fichiers2.push(row);
}

//skip button
function corr() {
  clock.stop();
}

//click event
$('html').click(function(event){
   if(etape==2){
      addImages();
      index +=1;
      afficheIndex();
   }else if(etape==4){
     //sauvegarde
     sauvegarde();
     index +=1;
     afficheIndexMix();
     //console.log(fichiers2);
   }
});

function addImages(){
  var row = [];
  var n;
  var i = 0;
  var z = "0";
  if(done.length+3<100){
    done = [];
  }
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
    console.log(fichiers.length);
}

//entre étape
function stop() {
  if(etape==1){
    $('#sortable').show();
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
    //console.log(etape);
  }else if (etape==2) {
    $('#sortable').hide();
    clock = new FlipClock($('.clock'), 10, {
      clockFace: 'MinuteCounter',
      autoStart: true,
      countdown: true,
      callbacks:{
            stop: function() {stop();}
        }
    });
    etape = 3;
    //console.log(etape);
  }else if (etape == 3){
    $('#sortable').show();
    $('#corr').show();
    clock = new FlipClock($('.clock'), 180, {
      clockFace: 'MinuteCounter',
      autoStart: true,
      countdown: true,
      callbacks:{
            stop: function() {stop();}
        }
    });
    //
    var el = document.getElementById('sortable');
    var sortable = Sortable.create(el);
    //console.log(sortable.toArray());
    index = 0;
    afficheIndexMix();
    etape = 4;
  }else{
    $('#sortable').hide();
    verifier();
    var str1 = "Points :";
    var str2 = "/";
    var str = str1.concat(points,str2,fichiers.length.toString());
    $("#text").text(str);
    $('.overlay').show();
    etape=5;
  }
}

//dernière étape
var points = 0;
function verifier() {
  var i = 0;
  var row1;
  var row2;
  while(i<fichiers2.length){
    row1 = fichiers[i];
    row2 = fichiers2[i];
    if(row1[0]==row2[0]&&row1[1]==row2[1]&&row1[2]==row2[2]){
      points+=1;
    }
    i++;
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
