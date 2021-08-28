function ChangeStatus(uid, st) {
	$.ajax({
		url: (st==0) ? 'api/webblk/' + uid : 'api/webrsm/' + uid,
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
		var setdt = unixlocalDateTime(dt);
		$('#crtdate').text(setdt);
	}
	var dt2 = $('#upddate').text();
	if(dt2!="" && dt2!=null){
		var setdt = localDateTime(dt);
		$('#upddate').text(setdt);
	}
});

// function localDateTime(dt) {
// 	var strdate = new Date(dt);
//     if (strdate != null && strdate != "") {
//         //var ldate = convertUTCDateToLocalDate(strdate);
//         var fdate = formatDateTime(strdate);
//         return fdate;
//     }
//     else {
//         return strdate;
//     }
// }


// function convertUTCDateToLocalDate(date) {
//     var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

//     var offset = date.getTimezoneOffset() / 60;
//     var hours = date.getHours();

//     newDate.setHours(hours - offset);

//     return newDate;
// }

// function formatDateTime(date) {
// 	console.log(date);
	
//     //var theMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//     var theMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//     var year = date.getFullYear(),
//         //month = date.getMonth() + 1, // months are zero indexed
//         month = theMonths[date.getMonth()];
//     day = date.getDate(),
//     hour = date.getHours(),
//     minute = date.getMinutes(),
//     second = date.getSeconds(),
//     hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
//     minuteFormatted = minute < 10 ? "0" + minute : minute,
//     secondFormatted = second < 10 ? "0" + second : second,
//     morning = hour < 12 ? "AM" : "PM";
//     return day + " " + month + ", " + year + " " + hourFormatted + ":" + minuteFormatted + " " + morning;
//     //return month + "/" + day + "/" + year + " " + hourFormatted + ":" + minuteFormatted + morning;
// }