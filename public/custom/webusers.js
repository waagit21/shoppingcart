var lmt=0;
var ttl=0;
var crt=0;
$(document).ready(function() {
	var ld= getParameterByName('ld');
	if (ld!= null && ld=="all" ){
		$("#loadall").hide();
		$("#loadshow").hide();
		$("#searchpanel").hide();
	}
	else{
		lmt = parseInt(($('#lmt').val() != "") ? $('#lmt').val() : 0);
		ttl = parseInt(($('#ttl').val() != "") ? $('#ttl').val() : 0);
		crt = lmt;
		if(ttl<crt) {
			crt=ttl;
			$('#loadmore').hide();
		}
		if ( ttl == 0 ){
			$("#loadshow").hide();
		}
		$('#current').html(crt);
		$('#total').html(ttl);		
	}		
	$('#startingDate').datepicker({
		format: 'yyyy/mm/dd',
		inline: true,
		firstDay: 1,
		showOtherMonths: true,
		dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	}).datepicker("setDate", addDays(new Date(), -3));
	$('#endingDate').datepicker({
		format: 'yyyy/mm/dd',
		inline: true,
		firstDay: 1,
		showOtherMonths: true,
		dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	}).datepicker("setDate", new Date());
});
//var oTable = $('#webusers').dataTable( {"sPaginationType": "full_numbers"} );
var oTable = $('#webusers').dataTable({
	"sPaginationType": "full_numbers",
	"iDisplayLength": 50,
    "aLengthMenu": [[50, 100, 250, 500, -1], [50, 100, 250, 500, "All"]]
});
jQuery('#webusers_wrapper .dataTables_filter input').addClass("m-wrap medium"); // modify table search input
jQuery('#webusers_wrapper .dataTables_length select').addClass("m-wrap xsmall"); // modify table per page dropdown
oTable.fnSetColumnVis( 0, false, false );

var pg = 1;
var srh = 0;
function GetMore() {
	if(srh==0){
		GetMoreData();
	}
	else{
		GetMoreSearch();
	}
}
function GetSearch() {
	oTable.fnClearTable();
	pg=0;
	srh=1;
	crt=0;
	ttl=0;
	GetMoreSearch();
}
function GetMoreData() {
	pg=pg+1;
	$.ajax({
		type: "GET",
		async: false,
		dataType:"json",
		url: "api/getwebusers/"+pg,
		headers: {
			'authorization': usrtkn,
		},
		success: function(data) {
			SuccessHandler(data);							
		},
		error: function (request, status, error) {
			console.log("error");
			console.log(request);
			console.log(status);
			console.log(error);
		}
	});
}
function GetMoreSearch() {	
	pg = pg+ 1;
	$.ajax({
		type: "POST",
		async: false,
		dataType:"json",
		url: "api/srhwebusers/"+pg,
		data: JSON.stringify( { "startingDate": $('#startingDate').val(), "endingDate": $('#endingDate').val(), "status": $('#status').val() } ),
		contentType: 'application/json',
		headers: {
			'authorization': usrtkn,
		},
		success: function(data) {
			SuccessHandler(data);				
		},
		error: function (request, status, error) {
			console.log("error");
			console.log(request);
			console.log(status);
			console.log(error);
		}
	});
}

function SuccessHandler(data) {
	var oSettings = oTable.fnSettings();
	var crntpg = Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength );
	console.log(data.data);
	// oTable.rows.add(data.data).draw( false );
	var j =0;
	$.each(data.data.docs, function (i, obj) {
		var rowIndex =  oTable.fnAddData( [
			parseInt(crt) + parseInt(i),
			data.data.docs[i].name,
			'<a href="mailto:' + data.data.docs[i].email + '">' + data.data.docs[i].email + '</a>',
			data.data.docs[i].creation_date,
			data.data.docs[i].status == 0 ? '<a href="" class="suspend" data-toggle="tooltip" title="Approved"><span class="label label-success"><i class="fa fa-check" aria-hidden="true"></i></span></a>' : '<a href="" class="resume" data-toggle="tooltip" title="Suspended"><span class="label label-warning"><i class="fa fa-pause" aria-hidden="true"></i></span></a>',
			'<a href="webusersview?id=' + data.data.docs[i].webid + '" class="btn mini blue" title="View"><i class="icon-share"></i></a> &nbsp; <a href="courses?web=' + data.data.docs[i].webid + '" class="btn mini red-stripe" title="Courses"><i class="fa fa-graduation-cap" aria-hidden="true"></i></a>',
		] );
		var row = oTable.fnGetNodes(rowIndex);
		$(row).attr('data-uid', data.data.docs[i].webid);
		//$(row).addClass("editable");
		//$('td:eq(0)', row).addClass("hidden-320");
		$('td:eq(1),td:eq(2)', row).addClass("hidden-480");
		j++;				
	});		
	crt = parseInt(crt) + parseInt(j);
	ttl = parseInt(data.data.totalDocs);
	$('#current').html(crt);
	$('#total').html(ttl);
	oTable.fnPageChange(crntpg);
	//oTable.fnPageChange('next');
	//oTable.ajax.reload(null, false);
	if(crt==ttl){
		$('#loadmore').hide();
	}
	else {
		$('#loadmore').show();
	}
}

// var pg = 1;
// function GetMore(lmt,ttl) {
// 	var limit = $('#limit').html();
// 	pg=pg+1;
// 	$.ajax({
// 		type: "GET",
// 		async: false,
// 		dataType:"json", // <-- I use plain text cause the reals rows have got a lot of input select and this way is more simple than others
// 		url: "api/getwebusers/"+pg,
// 		headers: {
// 			'authorization': usrtkn,
// 		},
// 		success: function(data) {
// 			var oSettings = oTable.fnSettings();
// 			var crntpg = Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength );
// 			console.log(data.data);
// 			// oTable.rows.add(data.data).draw( false );
// 			var j =0;
// 			$.each(data.data.docs, function (i, obj) {
// 				var rowIndex =  oTable.fnAddData( [
// 					parseInt(limit) + parseInt(i),
// 					data.data.docs[i].name,
// 					'<a href="mailto:' + data.data.docs[i].email + '">' + data.data.docs[i].email + '</a>',
// 					data.data.docs[i].creation_date,
// 					data.data.docs[i].status == 0 ? '<a href="" class="suspend" data-toggle="tooltip" title="Approved"><span class="label label-success"><i class="fa fa-check" aria-hidden="true"></i></span></a>' : '<a href="" class="resume" data-toggle="tooltip" title="Suspended"><span class="label label-warning"><i class="fa fa-pause" aria-hidden="true"></i></span></a>',
// 					'<a href="webusersview?id=' + data.data.docs[i].webid + '" class="btn mini blue" title="View"><i class="icon-share"></i></a> &nbsp; <a href="courses?web=' + data.data.docs[i].webid + '" class="btn mini red-stripe" title="Courses"><i class="fa fa-graduation-cap" aria-hidden="true"></i></a>',
// 				] );
// 				var row = oTable.fnGetNodes(rowIndex);
// 				$(row).attr('data-uid', data.data.docs[i]._id);
// 				//$(row).addClass("editable");
// 				$('td:eq(1),td:eq(2),td:eq(3)', row).addClass("hidden-480");
// 				j++;				
// 			});	
			
// 			limit = parseInt(limit) + parseInt(j);
// 			$('#limit').html(limit);
// 			oTable.fnPageChange(crntpg);
// 			//oTable.fnPageChange('next');
// 			//oTable.ajax.reload(null, false);
// 			if(limit==ttl){
// 				$('#loadmore').hide();
// 			}	
							
// 		}
// 	});
// }

//var oTable = $('#webusers').dataTable({
	//"bSort" : false,
//});

$('#webusers a.suspend').live('click', function (e) {
	e.preventDefault();
	if (confirm("Are you sure to block this user?") == false) {
		return;
	}
	var $link = $(this);
	var uid = $(this).closest('tr').attr('data-uid');
	$.ajax({
		url:'api/webblk/' + uid,
		type:"GET",
		dataType:"json",
		headers: {
			'authorization': usrtkn,
		},
		success: function (result,status,xhr) {
			if (result != null && result.success==true && result.data>0) {
				$link.html("<span class='label label-warning'><i class='fa fa-pause' aria-hidden='true'></i></span>");
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
$('#webusers a.resume').live('click', function (e) {
	e.preventDefault();
	if (confirm("Are you sure to resume this user?") == false) {
		return;
	}
	var $link = $(this);
	var uid = $(this).closest('tr').attr('data-uid');
	$.ajax({
		url:'api/webrsm/' + uid,
		type:"GET",
		dataType:"json",
		headers: {
			'authorization': usrtkn,
		},
		success: function (result,status,xhr) {
			if (result != null && result.success==true && result.data>0) {
				$link.html("<span class='label label-success'><i class='fa fa-check' aria-hidden='true'></i></span>");
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