
function jouer(nb) {
  var str1 = "jeu=";

    var str3 = " ;domain=;path=/";
    var res = str1.concat(nb, str3);
  document.cookie = res;
}
