function green(){
    document.documentElement.style.setProperty('--main-color', '#91D18B');
}
function orange(){
    document.documentElement.style.setProperty('--main-color', '#FF7F3F');
}
function red(){
    document.documentElement.style.setProperty('--main-color', '#9C0F48');
}
function blue(){
    document.documentElement.style.setProperty('--main-color', '#A2D2FF');
}
function pleach(){
    document.documentElement.style.setProperty('--main-color', '#e97d7d');
}
function black(){
    document.documentElement.style.setProperty('--main-color', '#474747');
}

function Theme_Compatibility(x) {
    if (x.matches) { // If media query matches
      document.getElementsByClassName("theme")[0].style.display="none";
    } else {
        document.getElementsByClassName("theme")[0].style.display="flex";
    }
  }
  
  var x = window.matchMedia("(max-width: 800px)")
  Theme_Compatibility(x) // Call listener function at run time
  x.addListener(Theme_Compatibility) // Attach listener function on state changes