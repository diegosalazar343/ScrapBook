//Business Logic for Scrapbook
function ScrapBook() {
  this.places = {};
  this.currentId = 0;
}

ScrapBook.prototype.addPlace = function(place) {
  place.id = this.assignId();
  this.places[place.id] = place;
}

ScrapBook.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
}

ScrapBook.prototype.findPlace = function(id) {
  if(this.places[id] != undefined) {
    return this.places[id];
  }
  return false;
}

ScrapBook.prototype.deletePlace = function (id) {
  if (this.places[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
}
//Business Logic for Places we've been
function Place (city, state) {
  this.city = city;
  this.state = state;
}

Place.prototype.fullPlace = function() {
  return this.city + " " + this.state;
}

//User Interface
let scrapBook = new ScrapBook();

function displayPlaceDetails(scrapBookToDisplay) {
  let placesList = $("ul#places");
  let htmlForPlaceInfo = "";
  Object.keys(scrapBookToDisplay.places).forEach(function(key) {
    const place = scrapBookToDisplay.findPlace(key);
    htmlForPlaceInfo += "<li id=" + place.id + ">" + place.city + " " + place.state + " " + "</li>";
  });
  placesList.html(htmlForPlaceInfo);
};

$(document).ready(function() {
  $("form#new-places").submit(function(event) {
    event.preventDefault();
    const inputtedCity = $("input#new-city").val();
    const inputtedState = $("input#new-state").val();

    let newPlace = new Place(inputtedCity, inputtedState);
    scrapBook.addPlace(newPlace);
    displayPlaceDetails(scrapBook);
  });
});