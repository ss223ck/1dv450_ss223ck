"use strict"

var Authentication = {
    init: function(){
        var listHolder = document.getElementById("navigation-list");
        if(document.getElementById("authenticateNavigation") !== null)
        {
            document.getElementById("authenticateNavigation").remove();
        }
        if(localStorage["api_key"] === ""){
            listHolder.innerHTML = listHolder.innerHTML + '<li id="authenticateNavigation"><a href="#/log_in">Logga in</a></li>';
        }else{
            listHolder.innerHTML = listHolder.innerHTML + '<li id="authenticateNavigation"><a href="#/log_out">Logga ut</a></li>';
        }
    },
    ChangeNavigationbar: function(){
        var listHolder = document.getElementById("navigation-list");
        if(localStorage["api_key"] === ""){
            listHolder.innerHTML = listHolder.innerHTML + '<li><a href="#/log_in">Logga in</a></li>';
        }else{
            listHolder.innerHTML = listHolder.innerHTML + '<li><a href="#/log_out">Logga ut</a></li>';
        }
    }
}
window.onload = Authentication.init;