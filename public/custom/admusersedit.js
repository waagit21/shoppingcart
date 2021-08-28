$(document).ready(function() {
	var url_id= getParameterByName('id');
	if (url_id== null || url_id==""){
		$("#admtype").prepend("<option value='' selected='selected'>Please Select</option>");
		$("#status").prepend("<option value='' selected='selected'>Please Select</option>");
	}

	// $("#type").change(function () {	
	// 	RemoveSelect("type", this.value) 	      
	// });
	// $("#status").change(function () {	
	// 	RemoveSelect("status", this.value) 	      
    // });
});


$(document).on('blur','.vlditm', function(){
	//$(this).parent().closest('[id]').attr('id')
	//$(this).parent().parent().attr('id');
	var id= $(this).attr('id');
	if($("#"+id).val() != "") {
		$("#dv"+id+" .help-inline").hide().text("");
		$("#dv"+id).removeClass("error");
	}
	if(id=="email")	{
		if($("#"+id).val() != "") {
			if (ValidEmail($("#"+id).val())) {
				$("#dvemail").addClass("error");
				$("#dvemail .help-inline").show().text("Invalid email.");
			}
		}
	}
});



function RemoveSelect(id, val) {
	var first = $("#"+ id +" option:first").val();
	if(first==""){
		if(val!="" && val!=null){
			$("#" + id).find("option").eq(0).remove();
		} 
	}
}

function Validate() {
	var url_id= getParameterByName('id');
	var chk=0;
	$(".help-inline").hide().text("");
	$(".control-group").removeClass("error");
	
	var admtype = $("#admtype").val();
	var username = $("#username").val();
	var password = $("#password").val();
	var name = $("#name").val();
	var email = $("#email").val();
	var phone = $("#phone").val();
	var status = $("#status").val();
	
	if (admtype == "") {
		$("#dvadmtype").addClass("error");
		$("#dvadmtype .help-inline").show().text("Please select category");
		chk = 1;
	}
	if (username == "") {
		$("#dvusername").addClass("error");
		$("#dvusername .help-inline").show().text("Please enter username");
		chk = 1;
	}
	if (url_id== null || url_id==""){
		if (password == "") {
			$("#dvpassword").addClass("error");
			$("#dvpassword .help-inline").show().text("Please enter password");
			chk = 1;
		}
	}
	if (name == "") {
		$("#dvname").addClass("error");
		$("#dvname .help-inline").show().text("Please enter name");
		chk = 1;
	}
	else if (ValidText(name,0,55)) {
		$("#dvname").addClass("error");
		$("#dvname .help-inline").show().text("50 Characters allowed");
		chk = 1;
	}
	if (ValidEmail(email)) {
		$("#dvemail").addClass("error");
		$("#dvemail .help-inline").show().text("Invalid email");
		chk = 1;
	}
	// if (phone == "") {
	// 	$("#dvphone").addClass("error");
	// 	$("#dvphone .help-inline").show().text("Please enter phone.");
	// 	chk = 1;
	// }
	if (status == "") {
		$("#dvstatus").addClass("error");
		$("#dvstatus .help-inline").show().text("Please select status");
		chk = 1;
	}

	if (chk==1) {
		return false;
	}
	else {
		return true;
	}
}