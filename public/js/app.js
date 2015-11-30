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
  $("#app-body").on('click', "#sign-up-button", getSignUp);
  $("#app-body").on('click', "#update-account", getProfileAndPostSettings);
  $("#app-body").on('click', "#my-cards", getMyCards);
  $("#app-body").on('click', "#search", searchContacts);

  $("footer").on('click', "#about-link", getAboutScreen);
  $("footer").on('click', "#profile-link", getProfile);
  $("footer").on('click', "#contacts-link", getMyCards);
  $("footer").on('click', "#settings-link", getSettings);
  $("footer").on('click', "#logout-link", postLogout);

  $("header").on('click', "#header-logo", getProfile);
  $("header").on('click', "#add-card", scanCard);

  // // Username link click
  // $('#contacts-screen').on('load', 'td a.linkshowuser', renderContacts);

});

// Utilize for starting user session and getting QR code profile page.
var login = function() {

  var username = $("#username-login").val();
  var password = $("#password-login").val();

  //This ajax call should grab the current session user.
  $.post('/sessions', {username: username, password: password}).done(function () {
    $.get('/current_user', function (data) {
      console.log(data);
      $("#app-body").empty();
      var appBody = $('#app-body');
      var profileScreen = Handlebars.compile($("#profile-template").html());
      appBody.append(profileScreen(data.own_card));
    });
  });
};

var getSignUp = function () {
  $("#app-body").empty();
  var appBody = $('#app-body');
  var settingsScreen = Handlebars.compile($("#settings-template").html());
  appBody.append(settingsScreen);
};

// Utilize for getting sign-up / settings page.
var getSettings = function () {
  //get current user info
  var userInfo = {
    username: $("#username").val(),
    password: $("#password").val(),
    own_card: {
        firstName: $("#firstName").val(),
        lastName: $("#lastName").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
        company: $("#company").val(),
        socialMedia: $("#social-media").val(),
        //VERY VERY VERY MINIMUM THIS WORKS AND WE SHOULD USE IT IF ALL ELSE FAILS - SEE BELOW
        qr_code: ""
        // qr_code: "https://api.qrserver.com/v1/create-qr-code/?data=" + $("#firstName").val() + $("#lastName").val()
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

  $.get('/current_user' , function (data) {
    $("#app-body").empty();
    var appBody = $('#app-body');
    var settingsScreen = Handlebars.compile($("#settings-template").html());
    appBody.append(settingsScreen(data));
  }).done( function () {
    $.ajax({ url        : '/users/update',
          type       : 'POST',
          dataType       : "json",
          contentType: 'application/json; charset=UTF-8',
          data       : JSON.stringify(userInfo),
          success    : function(){ console.log("success");}
        }).done(function(){
          $('#app-body').empty();
              var appBody = $('#app-body');
              var loginScreen = Handlebars.compile($("#login-template").html());
              appBody.append(loginScreen);
        });

    $.post('/companies/', companyInfo);
  });

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
        socialMedia: $("#social-media").val(),
        //VERY VERY VERY MINIMUM THIS WORKS AND WE SHOULD USE IT IF ALL ELSE FAILS - SEE BELOW
        qr_code: ""
        // qr_code: "https://api.qrserver.com/v1/create-qr-code/?data=" + $("#firstName").val() + $("#lastName").val()
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
      }).done(function(){
        $('#app-body').empty();
            var appBody = $('#app-body');
            var loginScreen = Handlebars.compile($("#login-template").html());
            appBody.append(loginScreen);
      });

  $.post('/companies/', companyInfo);

  // $.get('/current_user').done(function (data) {
  //   $("#app-body").empty();
  //   var appBody = $('#app-body');
  //   var profileScreen = Handlebars.compile($("#profile-template").html());
  //   appBody.append(profileScreen(data.own_card));
  // });
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
  $("#app-body").empty();
  var searchBar = Handlebars.compile($('#search-bar-template').html());
  $('#app-body').append(searchBar);
  $.get('/current_user/contacts', function (data) {
    data.forEach(function (contact) {
      var appBody = $('#app-body');
      var myCardsScreen = Handlebars.compile($("#contacts-template").html());
      appBody.append(myCardsScreen(contact));
    });
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
  console.log("the click worked...");
  $("#app-body").empty();
  var appBody = $('#app-body');
  var scanScreen = Handlebars.compile($("#scan-card-template").html());
  appBody.append(scanScreen);
  $.get('/upload', function (data) {
    formSubmit();
    });
  // app.post('/upload', uploader.middleware('imagefile'), home.upload, home.errors);
};

//this is supposed to submit the form without redirecting to the API, but is not working, so I enabled in-form submission in the HTML with the attribute: onchange="this.form.submit();"
var formSubmit = function(e){
  console.log(e);
  e.preventDefault(); //This will prevent the default click action.
  $.ajax({
      type: "POST",
      url: "/upload",
      success: function() {
          console.log('Form Successfully Submitted');
      },  
      error: function() {
          res.send('There was an error submitting the form');
      }   
  }); 
  return false; // Returning false will stop page from reloading.
  renderCard();
}   

//AUGH not working because formSubmit() is not working.  Would flesh out and refine if I could get formSubmit functional.
  var renderCard = function(data){
    console.log(data);
    res.send(data);
    var $card = $('div').addClass('card');
    appBody = $('#app-body');
    appBody.append($card)

    // var $container = $('#solo-pokemon');
    // var html = renderTemplate_showOne(data);
    // $('#solo-pokemon').html('').show().append(html);
    // $('#search-field').val('');
  };
    // capture the jq destination/container
    //feed the template some html
    //go to the container we want, clear it out, show if it's hiding, then append the html.
    //clear the form



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
