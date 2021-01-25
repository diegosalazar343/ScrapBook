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
  delete this.places[id];
  return true;
}
//Business Logic for Places we've been
function Place (city, state, month, year, weather, notes) {
  this.city = city;
  this.state = state;
  this.month = month;
  this.year = year;
  this.weather = weather;
  this.notes = notes;
}

Place.prototype.fullPlace = function() {
  return this.city + " " + this.state;
}

Place.prototype.fullDate = function() {
  return this.month + " " + this.year;
}

//User Interface
let scrapBook = new ScrapBook();

function displayPlaceDetails(scrapBookToDisplay) {
  let placesList = $("ul#places");
  let htmlForPlaceInfo = "";
  Object.keys(scrapBookToDisplay.places).forEach(function(key) {
    const place = scrapBookToDisplay.findPlace(key);
    htmlForPlaceInfo += "<li id=" + place.id + ">" + place.city + " " + place.state + " " + place.month + " " + place.year + " " + place.weather + " " + place.notes + " " + "</li>";
  });
  placesList.html(htmlForPlaceInfo);
};

function showPlace(placeId) {
  const place = scrapBook.findPlace(placeId);
  $("#show-place").show();
  $(".city").html(place.city);
  $(".state").html(place.state);
  $(".month").html(place.month);
  $(".year").html(place.year);
  $(".weather").html(place.weather);
  $(".notes").html(place.notes);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + +place.id+ ">Delete</button>");
}

function attachPlaceListeners() {
  $("ul#places").on("click", "li", function() {
    showPlace(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    scrapBook.deletePlace(this.id);
    $("#show-place").hide();
    displayPlaceDetails(scrapBook);
  });
};

$(document).ready(function() {
  attachPlaceListeners();
  $("form#new-places").submit(function(event) {
    event.preventDefault();
    const inputtedCity = $("input#new-city").val();
    const inputtedState = $("input#new-state").val();
    const inputtedMonth = $("input#new-month").val();
    const inputtedYear = $("input#new-year").val();
    const inputtedWeather = $("input#new-weather").val();
    const inputtedNotes = $("input#new-notes").val();

    $("input#new-city").val(" ");
    $("input#new-state").val(" ");
    $("input#new-month").val(" ");
    $("input#new-year").val(" ");
    $("input#new-weather").val(" ");
    $("input#new-notes").val(" ");

    let newPlace = new Place(inputtedCity, inputtedState, inputtedMonth, inputtedYear, inputtedWeather, inputtedNotes);
    scrapBook.addPlace(newPlace);
    displayPlaceDetails(scrapBook);
  });
});
