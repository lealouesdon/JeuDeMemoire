var jeu;
var fichiers = [];
//copie pour l'utilisateur
var fichiers2 = [];
//pour qu'il n'y est pas d'image identique
var done = [];
var etape;  //1 = 10 sec debut; 2 = 1min de memo; 3 = 10 sec ; 4 = 3min jeu
var index; //tete de lecture
var sortable;
screen.orientation.lock('landscape');

//clock
var bar;

//fonction de départ
$(document).ready(function(){
  var el = document.getElementById('sortable');

  sortable = Sortable.create(el);
  var state = sortable.option("disabled"); // get

	sortable.option("disabled", true); // set
    getJeu();
    start();
});

//start
function start() {
  $('.overlay').hide();
  $('.overTime').show();
  $("#text").text(jeu);
  $('#sortable').hide();
  $('.divCorr').hide();
  etape = 1;
  index = 0;

      bar = new ProgressBar.Circle(container, {
        color: '#FFFFFF',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 8,
        trailWidth: 0,
        duration: 10000,
        text: {
          autoStyleContainer: false
        },
        from: { color: '#247273', width: 8 },
        to: { color: '#247273', width: 8 },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);

          var value = Math.round(circle.value() * 10 % 100);
          if (value === 10) {
            etape1();
          } else {
            circle.setText(value);
          }

        }
      });
      bar.text.style.fontSize = '10vh';

      bar.animate(1.0);  // Number from 0.0 to 1.0




}

//replay
function replay() {
  var state = sortable.option("disabled"); // get

	sortable.option("disabled", true); // set
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
var passe = false;
function afficheIndexMix(){
  if(!passe){
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
    passe=true;
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
    row.push(res);
    i++;
  }
  fichiers2.push(row);
}

//skip button
function corr() {
  etape4();
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
   }
});

function addImages(){
  var row = [];
  var n;
  var i = 0;
  var z = "0";
  if(done.length+3>100){
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
}

function etape1() {
  $('#sortable').show();
  $('#container').html("");
  etape = 2;
  bar = new ProgressBar.Circle('#clock', {
    color: '#FFFFFF',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 8,
    trailWidth: 0,
    duration: 60000,
    text: {
      autoStyleContainer: false
    },
    from: { color: '#247273', width: 8 },
    to: { color: '#247273', width: 8 },
    // Set default step function for all animate calls
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);

      var value = Math.round(circle.value() * 60 % 100);
      if (value === 60) {
        etape2();
      } else {
        circle.setText(value);
      }

    }
  });
  bar.text.style.fontSize = '2rem';

  bar.animate(1.0);  // Number from 0.0 to 1.0
  addImages();
  afficheIndex();
  $('.overTime').hide();
}

function etape2() {
  $('#sortable').hide();
  $('.overTime').show();
  $('#clock').html("");
  bar = new ProgressBar.Circle('#container', {
    color: '#FFFFFF',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 8,
    trailWidth: 0,
    duration: 10000,
    text: {
      autoStyleContainer: false
    },
    from: { color: '#247273', width: 8 },
    to: { color: '#247273', width: 8 },
    // Set default step function for all animate calls
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);

      var value = Math.round(circle.value() * 10 % 100);
      if (value === 10) {
        etape3();
      } else {
        circle.setText(value);
      }

    }
  });
  bar.text.style.fontSize = '2rem';

  bar.animate(1.0);  // Number from 0.0 to 1.0
  etape = 3;
}


function etape3() {
  $('#sortable').show();
  $('#corr').show();
  $('.overTime').hide();
  $('#clock').html("");
  $('#titre').html("Restitution");
  $('#titre').css('padding-left', '2vw');
  var state = sortable.option("disabled"); // get
  sortable.option("disabled", false); // set
  bar = new ProgressBar.Circle('#clock', {
    color: '#FFFFFF',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 8,
    trailWidth: 0,
    duration: 180000,
    text: {
      autoStyleContainer: false
    },
    from: { color: '#247273', width: 8 },
    to: { color: '#247273', width: 8 },
    // Set default step function for all animate calls
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);

      var value = Math.round(circle.value() * 180 % 100);
      if (value === 180) {
        etape4();
      } else {
        circle.setText(value);
      }

    }
  });
  bar.text.style.fontSize = '2rem';

  bar.animate(1.0);  // Number from 0.0 to 1.0
  index = 0;
  afficheIndexMix();
  etape = 4;
}

function etape4() {
  $('#sortable').hide();
  $('.overTime').hide();
  $('#clock').html("");
  $('#container').html("");
  passe = false;
  verifier();
  var str1 = "Points : ";
  var str2 = "/";
  var str = str1.concat(points,str2,fichiers.length.toString());
  $("#text").text(str);
  $('.overlay').show();
  etape=5;
}
//dernière étape
var points = 0;
function verifier() {
  var i = 0;
  var row1;
  var row2;
  while(i<fichiers2.length&&i<fichiers.length){
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
