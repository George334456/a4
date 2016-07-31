/**
 * Code based off George's admin.js file
 */

function getUsers(){
    $.ajax({
        url: "/user/listUsers",
        type:"GET",
        dataType:"json"
    }).done(function(data){
        console.log(data);
        var $paragraph = $("<p/>",{
            text:"Scroll through the list of active car enthusiasts and follow them!"
        });
        $("#usersList").html($paragraph);
        //loop through all the users, then create an element for all of them.
        var userArray = [];
        for(var i =0 ; i < data.length; i++){
            if ((data[i].isadmin === 0) && (data[i].isadmin === 0)) {
                var user = new User(data[i].name, data[i].email);
                userArray.push(user);
            }
        }
        //append each one to a list and append to the main body.
        $list = $("<span class=\"badge\" >");
        for (var i = 0; i < userArray.length; i++){
            $item = $("<li/>",{
                html:userArray[i].name + "<p> >" + "<button class=\"btn btn-success\" type=\"button\" id=\""+userArray[i].email+"\" onclick='addUser(\""+userArray[i].email+"\")'>Follow User"
                                    + "<button class=\"btn btn-primary\" type=\"button\" id=\""+userArray[i].email+"\" onclick='viewProfile(\""+userArray[i].email+"\")'>View Profile"
            });
            $list.append($item);
        }
        $("#usersList").append($list);




    });
}

$(document).ready(function(){
    getUsers();
    
});

function getEmailFromCurrentURL() {
    var parser = document.createElement('a');
    parser.href = window.location.href;
    return parser.pathname.split('/')[2];
}

function addUser(email){

    // Step 1: get the email of the person whom we want to follow
    var leaderEmail = email;

    var input = {
        email: email
    };

    $.ajax({
        type: "post",
        url: "/addFollower",
        "Content-Type": 'application/json',
        dataType: 'json',
        data: input,
        success: function (json) {
            $('span#err-message').remove();
            $('<span>', {id:"err-message", text: json.error}).appendTo('.modal-body');
            window.location.reload();
        },

        done: function(json){
            console.log(json);
            getUsers();

        }  
    });

};

function viewProfile(email) {
  var win = window.open("/user/" + email, '_blank');
  win.focus();
}

