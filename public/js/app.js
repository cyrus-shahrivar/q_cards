$(function () {
  var appLaunch = function () {
    var appBody = $('#app-body');
    var homeScreen = Handlebars.compile($("#home-screen").html());
    appBody.prepend(homeScreen);
  };

  appLaunch();

  $("#app-body").on('click', "#login-button", startSessionAndGetProfile);

  $("#app-body").on('click', "#sign-up-button", getSettings);

  $("#app-body").on('click', "#update-account", getProfileAndPostSettings);

  // $("#app-body").on('click', "#search", searchContacts);

  $("#app-body").on('click', "span#about-link", getAboutScreen);
});

var startSessionAndGetProfile = function() {
  // console.log("login-button is working");
  // var username = $("#username-login").val();
  // var password = $("#password-login").val();
  // console.log(username, password);
  $("#app-body").empty();
  var appBody = $('#app-body');
  var profileScreen = Handlebars.compile($("#profile-screen").html());
  appBody.append(profileScreen);
};

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

var getProfileAndPostSettings = function() {
  $("#app-body").empty();
  var appBody = $('#app-body');
  var profileScreen = Handlebars.compile($("#profile-screen").html());
  appBody.append(profileScreen);
};

var getAboutScreen = function () {
  $("#app-body").empty();
  var appBody = $('#app-body');
  var aboutScreen = Handlebars.compile($("#about-screen").html());
  appBody.append(aboutScreen);
};



// var searchContacts = function () {
//   var name = $("#find-name").val()
//   console.log(name);
// }

// var postSettings = function () {
//   var username = $("#username").val();
//   var password = $("#password").val();
//   var name = $("#name").val();
//   var phone = $("#phone").val();
//   var email = $("#email").val();
//   var company = $("#company").val();
//   var companyAddress = $("#company-address").val();
//   var companyLogo = $("#company-logo-url").val();
//   var socialMedia = $("#social-media").val();
//   console.log(username + password + name + phone + email + company + companyAddress + companyLogo + socialMedia);
//   $("#app-body").empty();
//   var appBody = $('#app-body');
//   var profileScreen = Handlebars.compile($("#profile-screen").html());
//   appBody.append(profileScreen);
// }
