// Ajax calls and database info displaying still need to be added.


$(function () {
  // Displays the login screen on startup.
  var appLaunch = function () {
    var appBody = $('#app-body');
    var homeScreen = Handlebars.compile($("#home-screen").html());
    appBody.prepend(homeScreen);
  };

  appLaunch();

  // Below are the event listeners within the document ready function.

  $("#app-body").on('click', "#login-button", startSessionAndGetProfile);
  $("#app-body").on('click', "#sign-up-button", getSettings);
  $("#app-body").on('click', "#update-account", getProfileAndPostSettings);
  $("#app-body").on('click', "#my-cards", getMyCards);

  // $("#app-body").on('click', "#search", searchContacts);

  $("footer").on('click', "#about-link", getAboutScreen);
  $("footer").on('click', "#profile-link", getProfile);
  $("footer").on('click', "#contacts-link", getMyCards);
  $("footer").on('click', "#settings-link", getSettings);
});

// Utilize for starting user session and getting QR code profile page.
var startSessionAndGetProfile = function() {
  // console.log("login-button is working");
  // var username = $("#username-login").val();
  // var password = $("#password-login").val();
  // console.log(username, password);
 //  $.ajax({
 //   url: '/users/',
 //   method: 'GET',
 //   dataType: 'json'
 // }).done(function (someuser) {
 //   console.log(someuser);
 // });
  $("#app-body").empty();
  var appBody = $('#app-body');
  var profileScreen = Handlebars.compile($("#profile-screen").html());
  appBody.append(profileScreen);
};

// Utilize for getting sign-up / settings page.
var getSettings = function () {
  // console.log("sign up button is working");
  // var username = $("#username-login").val();
  // var password = $("#password-login").val();
  // console.log(username, password);
  $("#app-body").empty();
  var appBody = $('#app-body');
  var settingsScreen = Handlebars.compile($("#settings-screen").html());
  appBody.append(settingsScreen);
};

// Utilize for getting profile pages and posting settings form / registration form information.
var getProfileAndPostSettings = function() {
  //create an object , make it dry
  var firstName = $("#firstName").val();
  var lastName = $("#lastName").val();
  var password = $("#password").val();
  var username = $("#username").val();
  var phone = $("#phone").val();
  var email = $("#email").val();
  var company = $("#company").val();
  var companyAddress = $("#company-address").val();
  var companyLogo = $("#company-logo-url").val();
  var socialMedia = $("#social-media").val();
  // console.log(username + password + name + phone + email + company + companyAddress + companyLogo + socialMedia);
  $.post('/users/', {
    username: username,
    password: password,
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    company: company,
    socialMedia: socialMedia
  }).done(function () {
    console.log("hi, i worked a post whoo oohosdfoa;kdf"+username+password);
  });
  $("#app-body").empty();
  var appBody = $('#app-body');
  var profileScreen = Handlebars.compile($("#profile-screen").html());
  appBody.append(profileScreen);
};

// Utilize to get about page.
var getAboutScreen = function () {
  $("#app-body").empty();
  var appBody = $('#app-body');
  var aboutScreen = Handlebars.compile($("#about-screen").html());
  appBody.append(aboutScreen);
};

// Utilize for getting my cards page.
var getMyCards = function() {
  $("#app-body").empty();
  var appBody = $('#app-body');
  var myCardsScreen = Handlebars.compile($("#contacts-screen").html());
  appBody.append(myCardsScreen);
};

var getProfile = function() {
  $("#app-body").empty();
  var appBody = $('#app-body');
  var profileScreen = Handlebars.compile($("#profile-screen").html());
  appBody.append(profileScreen);
};

// Utilize for getting search field info and performing search.

// var searchContacts = function () {
//   var name = $("#find-name").val()
//   console.log(name);
// }
