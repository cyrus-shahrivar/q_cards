$(function () {
  $("#login-button").on('click', startSessionAndGetProfile);
  $("#sign-up-button").on('click', getSettings);
  $("#update-account").on('click', postSeetings);
});

var startSessionAndGetProfile = function(){
  console.log("login-button is working");
  var username = $("#username-login").val();
  var password = $("#password-login").val();
  console.log(username, password);
}

var getSettings = function () {
  console.log("sign up button is working");
  var username = $("#username-login").val();
  var password = $("#password-login").val();
  console.log(username, password);
}

var postSeetings = function () {
  var username = $("#username").val();
  var password = $("#password").val();
  var name = $("#name").val();
  var phone = $("#phone").val();
  var email = $("#email").val();
  var company = $("#company").val();
  var companyAddress = $("#company-address").val();
  var companyLogo = $("#company-logo-url").val();
  var socialMedia = $("#social-media").val();
  console.log(username + password + name + phone + email + company + companyAddress + companyLogo + socialMedia);
}
