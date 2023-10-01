fetch("https://dwijottam-dutta-default-rtdb.firebaseio.com/details/Tracks/.json").then(function(response) {
    return response.json();
  }).then(function(data) {
    document.getElementById("tracks").innerHTML=data;
});

fetch("https://dwijottam-dutta-default-rtdb.firebaseio.com/details/Plays/.json").then(function(response) {
    return response.json();
  }).then(function(data) {
    document.getElementById("plays").innerHTML=data;
});

fetch("https://dwijottam-dutta-default-rtdb.firebaseio.com/details/Likes/.json").then(function(response) {
    return response.json();
  }).then(function(data) {
    document.getElementById("likes").innerHTML=data;
});