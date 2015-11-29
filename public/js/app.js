$(function () {
  // Displays the login template on startup.
  var appLaunch = function () {
    var appBody = $('#app-body');
    var loginScreen = Handlebars.compile($("#login-template").html());
    var profileScreen = Handlebars.compile($("#profile-template").html());
    appBody.prepend(loginScreen);
    // if (loggedIn() === true) {
      // appBody.prepend(profileTemplate);
    // } else {
    // }
  };

  appLaunch();

  // Below are the event listeners within the document ready function.
  $("#app-body").on('click', "#login-button", login);
  $("#app-body").on('click', "#sign-up-button", getSettings);
  $("#app-body").on('click', "#update-account", getProfileAndPostSettings);
  $("#app-body").on('click', "#my-cards", getMyCards);
  $("#app-body").on('click', "#search", searchContacts);

  $("footer").on('click', "#about-link", getAboutScreen);
  $("footer").on('click', "#profile-link", getProfile);
  $("footer").on('click', "#contacts-link", getMyCards);
  $("footer").on('click', "#settings-link", getSettings);
  $("footer").on('click', "#logout-link", postLogout);

  $("header").on('click', "#header-logo", getProfile);
  //$("header").on('click', "#add-card", newCard);

  // // Username link click
  // $('#contacts-screen').on('load', 'td a.linkshowuser', renderContacts);

});

// Utilize for starting user session and getting QR code profile page.
var login = function() {

  var username = $("#username-login").val();
  var password = $("#password-login").val();

  //This ajax call should grab the current session user.
  $.post('/sessions', {username: username, password: password}).done(function (data) {
    $("#app-body").empty();
    var appBody = $('#app-body');
    var profileScreen = Handlebars.compile($("#profile-template").html());
    appBody.append(profileScreen(data.own_card));
  });
};

// Utilize for getting sign-up / settings page.
var getSettings = function () {
  $("#app-body").empty();
  var appBody = $('#app-body');
  var settingsScreen = Handlebars.compile($("#settings-template").html());
  appBody.append(settingsScreen);
};

// Utilize for getting profile pages and posting settings form / registration form information.
var getProfileAndPostSettings = function() {

  var userInfo = {
    username: $("#username").val(),
    password: $("#password").val(),
    own_card: {
        firstName: $("#firstName").val(),
        lastName: $("#lastName").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
        company: $("#company").val(),
        socialMedia: $("#social-media").val()
    }
  };

  var companyInfo = {
    name: $("#company").val(),
    address: $("#company-address").val(),
    logo: $("#company-logo-url").val(),
    website: $("#company-website-url").val(),
    phone: $("#company-phone").val(),
    email: $("#company-email").val()
  };

  //Posts new user and company info to respective collections
  $.ajax({ url        : '/users',
        type       : 'POST',
        dataType       : "json",
        contentType: 'application/json; charset=UTF-8',
        data       : JSON.stringify(userInfo),
        success    : function(){ console.log("success");}
      });

  $.post('/companies/', companyInfo);

  $.get('/current_user').done(function (data) {
    $("#app-body").empty();
    var appBody = $('#app-body');
    var profileScreen = Handlebars.compile($("#profile-template").html());
    appBody.append(profileScreen(data.own_card));
  });
};

// Utilize to get about page.
var getAboutScreen = function () {
  $("#app-body").empty();
  var appBody = $('#app-body');
  var aboutScreen = Handlebars.compile($("#about-template").html());
  appBody.append(aboutScreen);
};

// Utilize for getting my cards page.
var getMyCards = function() {
  //used Shahrivar as a placeholder. in reality, this needs to grab current session user's contacts
  $.get('/current_user/contacts', function (data) {
    $("#app-body").empty();
    var appBody = $('#app-body');
    var myCardsScreen = Handlebars.compile($("#contacts-template").html());
    appBody.append(myCardsScreen(data));
  });
};

var getProfile = function() {
  $.get('/current_user').done(function (data) {
    $("#app-body").empty();
    var appBody = $('#app-body');
    var profileScreen = Handlebars.compile($("#profile-template").html());
    appBody.append(profileScreen(data.own_card));
  });
};

var scanCard = function() {
  $("#app-body").empty();
  var plus = $("#add-card");
  var appBody = $('#app-body');
  var scanScreen = Handlebars.compile($("#scan-card-template").html());
  // app.get('/upload', home.index);
  // app.post('/upload', uploader.middleware('imagefile'), home.upload, home.errors);
  appBody.append(scanScreen);

  // $("#app-body").empty();
  // var appBody = $('#app-body');
  // var scanScreen = Handlebars.compile($("#scan-card-template").html());
  // // var scanCard = $('<input>').attr('type="file" capture="camera" accept="image/*" id="cameraInput" name="New Contact"')
  // appBody.append(scanScreen);

};

var postLogout = function() {
    $.ajax({url: '/sessions', method: 'DELETE'}).done(function() {
        $("#app-body").empty();
        var appBody = $('#app-body');
        var loginScreen = Handlebars.compile($("#login-template").html());
        appBody.prepend(loginScreen);
    });
};

// Utilize for getting search field info and performing search.
var searchContacts = function () {
  var name = $("#find-name").val();
  $.get('/current_user/contacts').done(function (data) {
    $("#app-body").empty();
    var appBody = $('#app-body');
    var myCardsScreen = Handlebars.compile($("#contacts-template").html());
    appBody.append(myCardsScreen(data));
  });
};
