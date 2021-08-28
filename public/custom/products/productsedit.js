$(document).ready(function() {
	var url_id= getParameterByName('id');
	if (url_id== null || url_id==""){
		$("#category").prepend("<option value='' selected='selected'>Please Select</option>");
		$("#currency").prepend("<option value='' selected='selected'>Please Select</option>");
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
});

function RemoveSelect(id, val) {
	var first = $("#"+ id +" option:first").val();
	if(first==""){
		if(val!="" && val!=null){
			$("#" + id).find("option").eq(0).remove();
		} 
	}
}

function CheckImages() {
    //var x = document.getElementById("facultyResume");
	var x = $('#images')[0];;
    var msg = "";    
    if ('files' in x) {
        if (x.files.length == 0) {
            msg = "Select one or more images.";
        }
		else if (x.files.length > 10) {
            msg = "Only 10 files allowed";
        }
        else {
            for (var i = 0; i < x.files.length; i++) {
                var err = 0;
                var txt = "";
                var file = x.files[i];
                if ('name' in file) {
                    txt = "<strong>" + file.name + ":</strong>";
                    if (CheckExtension(file.name) == 1) {
                        err = 1;
                        txt += " Invalid file extension,Only jpg, jpeg, png, gif files allowed.";
                    }
                }                
                if ('size' in file) {
                    // if (file.size < 50) {
                    //     err = 1;
                    //     txt += "invalid file";
                    // }
                    if (file.size > 4194304) {
                        err = 1;
                        txt += " File size must be less then 4MB";
                    }
                }
                if (err == 1) {
                    msg += txt + "<br />";
                }
            }
        }      
    }
	return msg;
    // if (msg != null && msg != "") {
    //     $("#errMsg").html(msg);
    //     return false;
    // }
    // else {
    //     return true;
    // }    
}
function CheckExtension(pic) {
    var allowedFiles = [".jpg", ".jpeg", ".png", ".gif"];
    var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
    if (!regex.test(pic.toLowerCase())) {
        return 1;
    }
    else {
        return 0;
    }
}

function Validate() {
	var url_id= getParameterByName('id');
	var chk=0;
	$(".help-inline").hide().text("");
	$(".control-group").removeClass("error");
	
	var dataid = $("#dataid").val();
	var name = $("#name").val();
	var category = $("#category").val();
	var price = $("#price").val();
	var currency = $("#currency").val();
	var discount = $("#discount").val();
	var overview = $("#overview").val();
	var detail = $("#detail").val();
	var quantity = $("#quantity").val();
	//var images = $("#images").val();
	var status = $("#status").val();
	
	if (name == "") {
		$("#dvname").addClass("error");
		$("#dvname .help-inline").show().text("Please enter name");
		chk = 1;
	}
	if (category == "") {
		$("#dvcategory").addClass("error");
		$("#dvcategory .help-inline").show().text("Please select category");
		chk = 1;
	}
	if (price == "") {
		$("#dvprice").addClass("error");
		$("#dvprice dvtype .help-inline").show().text("Please enter price");
		chk = 1;
	}
	if (currency == "") {
		$("#dvcurrency").addClass("error");
		$("#dvcurrency dvtype .help-inline").show().text("Please select currency");
		chk = 1;
	}
	if (discount == "") {
		$("#dvdiscount").addClass("error");
		$("#dvdiscount .help-inline").show().text("Please enter discount");
		chk = 1;
	}
	if (overview == "") {
		$("#dvoverview").addClass("error");
		$("#dvoverview .help-inline").show().text("Please enter overview");
		chk = 1;
	}
	if (detail == "") {
		$("#dvdetail").addClass("error");
		$("#dvdetail .help-inline").show().text("Please enter detail");
		chk = 1;
	}
	if (quantity == "") {
		$("#dvquantity").addClass("error");
		$("#dvquantity .help-inline").show().text("Please enter quantity");
		chk = 1;
	}
	if(dataid==null || dataid==""){
		var imgmsg = CheckImages();
		if (imgmsg!="" && imgmsg!=null) {
			$("#dvimages").addClass("error");
			$("#dvimages .help-inline").show().html(imgmsg);
			chk = 1;
		}
	}
	// if (images == "") {
	// 	$("#dvimages").addClass("error");
	// 	$("#dvimages .help-inline").show().text("Please enter images");
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