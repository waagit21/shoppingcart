function Validate() {
	var chk=0;
	$(".help-inline").hide().text("");
	$(".control-group").removeClass("error");
	
	var username = $("#username").val();
	var password = $("#password").val();
	
	if (username == "") {
		$("#dvusername").addClass("error");
		$("#dvusername .help-inline").show().text("Please enter username");
		chk = 1;
	}
	if (password == "") {
		$("#dvpassword").addClass("error");
		$("#dvpassword .help-inline").show().text("Please enter password");
		chk = 1;
	}

	if (chk==1) {
		return false;
	}
	else {
		return true;
	}
}