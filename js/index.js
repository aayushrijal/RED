var temp1;
$(function(){
if(localStorage.getItem("userID")!=undefined){
	window.location.href="main.html";
}
$("#loginButton").click(function(){
$.ajax({
        url: "login.php",
	dataType: 'json',
        type: 'POST',
	data:{user_name:$("#username").val(),user_password:$("#password").val()},
        success: function (getid) {
			localStorage.setItem("userID",getid);
			window.location.href="main.html";	
	},
	error:function(){
		$("#password").val('');
		$("#password").attr({placeholder:"invalid password"});			
	}
       });
});
$("#signRED").click(function(){
		var uname=$("#signUser").val();
		var upass=$("#signPass").val();
		var umail=$("#signEmail").val();
		if(uname==""||upass==""||umail==""){
			alert("Please fillup your desired username, password and/or email ID");	
			return false;	
		}
		var atpos = umail.indexOf("@");
    		var dotpos = umail.lastIndexOf(".");
    		if (atpos< 1 || dotpos<atpos+2 || dotpos+2>=umail.length) {
       			 alert("Not a valid e-mail address");
        		return false;
    		}
		$.ajax({
        		url: "sign_up.php",
			dataType: 'json',
        		type: 'POST',
			data:{user_name:uname,user_password:upass,user_email:umail},
        		complete:function(response){
						if(response!=undefined)
						alert("Congratulations "+uname+" ! you are now signed up! login to continue");
			}/*,
			error:function(){
					uname.val='';
					upass.val='';
					umail.val='';
					alert("The username has already been taken");			
			}*/
      		 });
	});
});
