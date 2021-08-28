function ChangeStatus(uid, st) {
	$.ajax({
		url: (st==0) ? 'api/admblk/' + uid : 'api/admrsm/' + uid,
		type:"GET",
		dataType:"json",
		headers: {
			'authorization': usrtkn,
		},
		success: function (result,status,xhr) {
			if (result != null && result.success==true && result.data>0) {
				if(st==0) {
					$('#userstatus').html("<a onclick='ChangeStatus(\""+uid+"\",1)'><span class='label label-warning'><i class='fa fa-pause' aria-hidden='true'></i> Suspended</span></a>");
					$('#suc_msg').parents().removeClass('hide');
					$('#suc_msg').text("Blocked Successfully");
				}
				else if(st==1) {
					$('#userstatus').html("<a onclick='ChangeStatus(\""+uid+"\",0)'><span class='label label-success'><i class='fa fa-check' aria-hidden='true'></i> Approved</span></a>");
					$('#suc_msg').parents().removeClass('hide');
					$('#suc_msg').text("Resumed Successfully");
				}
			}
			else {
				if(st==0) {
					$('#err_msg').parents().removeClass('hide');
					$('#err_msg').text("User Not Blocked");
				}
				else if(st==1) {
					$('#err_msg').parents().removeClass('hide');
					$('#err_msg').text("User Not Resumed");
				}
			}
			return false;
		},
		error: function (request, status, error) {
			$('#err_msg').parents().removeClass('hide');
			$('#err_msg').text("Error, User Status Not Changed");
			console.log("error");
			console.log(request);
			console.log(status);
			console.log(error);
		}
	});
	return false;
}

$(document).ready(function(){
	var dt = $('#crtdate').text();
	if(dt!="" && dt!=null){
		var setdt = localDateTime(dt);
		$('#crtdate').text(setdt);
	}
	var dt2 = $('#upddate').text();
	if(dt2!="" && dt2!=null){
		var setdt = localDateTime(dt2);
		$('#upddate').text(setdt);
	}
});

