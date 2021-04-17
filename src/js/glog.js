
gapi.load("auth2",function(){

});

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();

  GUser.id = profile.getId();
  GUser.name = profile.getName();
  GUser.avatar = profile.getImageUrl();
  GUser.mail = profile.getEmail();


  $.ajax({
    type: "POST",
    url:'/api/users/log',
    contentType: 'application/json',
    data: JSON.stringify({
      "Name":GUser.name,
      "EMail":GUser.mail,
      "GoogleUID":GUser.id,
      "ImageURL":GUser.avatar,
    }),
    success: function(result){
      if(userMarker)
        userMarker._icon.src = result.Image ;
      UID = result ;
      signIn();
    },
    error : function(resultat, statut, erreur){
      UID = 0 ;
      signOut();
    }
  }) ;
}

function signIn(){
  document.getElementById("signin").style.display = "none" ;
  document.getElementById("signout").style.display = "" ;
  document.getElementById("signout").innerHTML = "<span style='font-size: 13px; line-height: 34px;color: #757575;' class='abcRioButtonContents'>Sign out</span><img src='" + GUser.avatar + "'>"

  document.getElementById("report").style = "" ;
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    document.getElementById("signin").style.display = "" ;
    document.getElementById("signout").style.display = "none" ;
    document.getElementById("signout").innerHTML = "" ;
    document.getElementById("report").style = "opacity:0;pointer-events: none;" ;
  });
  if(userMarker)
    userMarker._icon.src = "/src/img/bobby.png" ;
}
