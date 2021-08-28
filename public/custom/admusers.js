var oTable = $('#admusers').dataTable( {"sPaginationType": "full_numbers"} );
jQuery('#admusers_wrapper .dataTables_filter input').addClass("m-wrap medium"); // modify table search input
jQuery('#admusers_wrapper .dataTables_length select').addClass("m-wrap xsmall"); // modify table per page dropdown

$('#admusers a.delete').live('click', function (e) {
	e.preventDefault();
	if (confirm("Are you sure to delete this?") == false) {
		return;
	}
	var nRow = $(this).parents('tr')[0];
	var delid = $(this).closest('tr').attr('data-uid');
	$.ajax({
		url:'api/admdel/' + delid,
		type:"GET",
		dataType:"json",
		headers: {
			'authorization': usrtkn,
		},
		success: function (result,status,xhr) {
			if (result != null && result.success==true && result.data>0) {
				oTable.fnDeleteRow(nRow);
				$('#suc_msg').parents().removeClass('hide');
				$('#suc_msg').text("Removed Successfully");
			}
			else {
				$('#err_msg').parents().removeClass('hide');
				$('#err_msg').text("User Not Removed");
				if(result == "-1"){
					$('#err_msg').text("Admin cannot be deleted");
				}
			}
		},
		error: function (request, status, error) {
			$('#err_msg').parents().removeClass('hide');
			$('#err_msg').text("Error, User Not Removed");
			console.log("error");
			console.log(request);
			console.log(status);
			console.log(error);
		}
	});
});
$('#admusers a.suspend').live('click', function (e) {
	e.preventDefault();
	if (confirm("Are you sure to block this user?") == false) {
		return;
	}
	var $link = $(this);
	var uid = $(this).closest('tr').attr('data-uid');
	$.ajax({
		url:'api/admblk/' + uid,
		type:"GET",
		dataType:"json",
		headers: {
			'authorization': usrtkn,
		},
		success: function (result,status,xhr) {
			if (result != null && result.success==true && result.data>0) {
				$link.html("<span class='label label-warning'><i class='fa fa-pause' aria-hidden='true'></i> </span>");
				$link.closest('a').removeClass('suspend').addClass('resume');
				$('#suc_msg').parents().removeClass('hide');
				$('#suc_msg').text("Blocked Successfully");
			}
			else {
				$('#err_msg').parents().removeClass('hide');
				$('#err_msg').text("User Not Blocked");
			}
		},
		error: function (request, status, error) {
			$('#err_msg').parents().removeClass('hide');
			$('#err_msg').text("Error, User Not Blocked");
			console.log("error");
			console.log(request);
			console.log(status);
			console.log(error);
		}
	});
});
$('#admusers a.resume').live('click', function (e) {
	e.preventDefault();
	if (confirm("Are you sure to resume this user?") == false) {
		return;
	}
	var $link = $(this);
	var uid = $(this).closest('tr').attr('data-uid');
	$.ajax({
		url:'api/admrsm/' + uid,
		type:"GET",
		dataType:"json",
		headers: {
			'authorization': usrtkn,
		},
		success: function (result,status,xhr) {
			if (result != null && result.success==true && result.data>0) {
				$link.html("<span class='label label-success'><i class='fa fa-check' aria-hidden='true'></i> </span>");
				$link.closest('a').removeClass('resume').addClass('suspend');
				$('#suc_msg').parents().removeClass('hide');
				$('#suc_msg').text("Resumed Successfully");
			}
			else {
				$('#err_msg').parents().removeClass('hide');
				$('#err_msg').text("User Not Resumed");
			}
		},
		error: function (request, status, error) {
			$('#err_msg').parents().removeClass('hide');
			$('#err_msg').text("Error, User Not Resumed");
			console.log("error");
			console.log(request);
			console.log(status);
			console.log(error);
		}
	});
});