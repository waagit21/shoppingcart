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
var oTable = $('#orders').DataTable( {"sPaginationType": "full_numbers"} );
//var oTable = $('#orders').DataTable();
// var oTable =$('#orders').dataTable({
// 	"sPaginationType": "full_numbers"
// 	})
//   .columnFilter({sPlaceHolder: "head:before",
// 	aoColumns: [{type: "text" },{type: "text" },{type: "text" },{type: "text" },{type: "text" },{type: "text" }]
//   });
jQuery('#orders_wrapper .dataTables_filter input').addClass("m-wrap medium"); // modify table search input
jQuery('#orders_wrapper .dataTables_length select').addClass("m-wrap xsmall"); // modify table per page dropdown
//oTable.fnSort( [ [0,'desc']] );
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
		url: "api/getorders/"+pg,
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
		url: "api/srhorders/"+pg,
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
			data.data.docs[i].order_number,
			data.data.docs[i].user_name,
			data.data.docs[i].currency + " " + data.data.docs[i].amount,
			localDateTime(data.data.docs[i].creation_date),
			data.data.docs[i].status == 0 ? '<a href="" class="suspend" data-toggle="tooltip" title="Approved"><span class="label label-success"><i class="fa fa-check" aria-hidden="true"></i></span></a>' : '<a href="" class="resume" data-toggle="tooltip" title="Suspended"><span class="label label-warning"><i class="fa fa-pause" aria-hidden="true"></i></span></a>',
			'<a href="ordersview?id=' + data.data.docs[i]._id + '" class="btn mini blue" title="View Order"><i class="icon-share"></i></a> &nbsp; <a href="webusersview?id=' + data.data.docs[i].webid + '" class="btn mini red-stripe" title="View User"><i class="fa fa-user" aria-hidden="true"></i></a>',
		] );
		var row = oTable.fnGetNodes(rowIndex);
		$(row).attr('data-uid', data.data.docs[i]._id);
		//$(row).addClass("editable");
		$('td:eq(1),td:eq(2),td:eq(3)', row).addClass("hidden-480");
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

$('#orders a.delete').live('click', function (e) {
	e.preventDefault();
	if (confirm("Are you sure to delete this?") == false) {
		return;
	}
	var nRow = $(this).parents('tr')[0];
	var delid = $(this).closest('tr').attr('data-uid');
	$.ajax({
		url:'api/orddel/' + delid,
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
					$('#err_msg').text("Course cannot be deleted");
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
$('#orders a.suspend').live('click', function (e) {
	e.preventDefault();
	if (confirm("Are you sure to block this user?") == false) {
		return;
	}
	var $link = $(this);
	var uid = $(this).closest('tr').attr('data-uid');
	$.ajax({
		url:'api/ordblk/' + uid,
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
$('#orders a.resume').live('click', function (e) {
	e.preventDefault();
	if (confirm("Are you sure to resume this user?") == false) {
		return;
	}
	var $link = $(this);
	var uid = $(this).closest('tr').attr('data-uid');
	$.ajax({
		url:'api/ordrsm/' + uid,
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

// $(document).ready(function(){
// 	var category_id = 0 ;
// 	$("#category").change(function(){
// 		var idx = arr_category.map(function(o) { return o.id; }).indexOf(this.value);
// 		category_id = arr_category[idx]['category_id'];
// 		$("#category_id").val(category_id);
// 		if(category_id==1) {
// 			$("#dgedsp").hide();
// 			$("#crsdsp").show();
// 			$("#istdsp").show();
// 		}
// 		else if(category_id==2) {
// 			$("#crsdsp").hide();
// 			$("#istdsp").hide();
// 			$("#dgedsp").show();
// 		}
// 		else {
// 			$("#dgedsp").hide();
// 			$("#istdsp").show();
// 			$("#crsdsp").show();
// 		}
// 	});
// 	var crs = getParameterByName('crs');
// 	if(crs!=null && crs!="" && isInt(crs)) {
// 		var idx = arr_category.map(function(o) { return o.id; }).indexOf($("#category").val());
// 		category_id = arr_category[idx]['category_id'];
// 		$("#category_id").val(category_id);
// 		if(category_id==1) {
// 			$("#dgedsp").hide();
// 			$("#crsdsp").show();
// 			$("#istdsp").show();
// 		}
// 		else if(category_id==2) {
// 			$("#crsdsp").hide();
// 			$("#istdsp").hide();
// 			$("#dgedsp").show();
// 		}
// 		else {
// 			$("#dgedsp").hide();
// 			$("#istdsp").show();
// 			$("#crsdsp").show();
// 		}
// 	}
// 	$('#start').datepicker({
// 		format: 'yyyy/mm/dd',
// 		inline: true,
// 		firstDay: 1,
// 		showOtherMonths: true,
// 		dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
// 	});
// 	$('#last').datepicker({
// 		format: 'yyyy/mm/dd',
// 		inline: true,
// 		firstDay: 1,
// 		showOtherMonths: true,
// 		dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
// 	});

// 	$(".usrchng").live("blur", function(){
// 		var id = $(this).attr('id');
// 		$("#dv"+id).removeClass("error");
// 		$("#dv"+id+" .help-inline").hide().text("");
// 	});
// 	$(".modechng").live("blur", function(){
// 		$("#dvmode").removeClass("error");
// 		$("#dvmode .help-inline").hide().text("");
// 	});
// });

// function ValidateCourse(){	

// 	var chk=0;
// 	var category_id = $("#category_id").val();
// 	$(".help-inline").hide().text("");
// 	$(".control-group").removeClass("error");
	
// 	var category = $("#category").val();
// 	var name = $("#name").val();
// 	var overview = $("#overview").val();
// 	var content = $("#content").val();
// 	var teacher = $("#teacher").val();
// 	//var mode = $("#mode").val();
// 	var faculty = $("#faculty").val();
// 	var total = $("#total").val();
// 	var online = $("#online").val();
// 	var info = $("#info").val();
// 	var subject = $("#subject").val();
// 	var country = $("#country").val();
// 	var language = $("#language").val();
// 	var order = $("#order").val();
// 	var order_web = $("#order_web").val();
// 	var medium = $("#medium").val();
// 	var medium_web = $("#medium_web").val();
// 	var instructor = $('input[name="instructor"]:checked').val();
// 	var duration = $("#duration").val();
// 	var duration_for = $("#duration_for").val();
// 	var hours = $("#hours").val();
// 	var cost = $("#cost").val();
// 	var currency = $("#currency").val();
// 	var break_down = $("#break_down").val();
// 	var aid = $('input[name="aid"]:checked').val();
// 	var aid_detail = $("#aid_detail").val();
// 	var start = $("#start").val();
// 	var last = $("#last").val();
	
// 	if (category == "") {
// 		//$("#err_category").text("Please select category.");
// 		$("#dvcategory").addClass("error");
// 		$("#dvcategory .help-inline").show().text("Please select category.");
// 		chk = 1;
// 	}
// 	if (name == "") {
// 		$("#dvname").addClass("error");
// 		$("#dvname .help-inline").show().text("Please enter name.");
// 		chk = 1;
// 	}
// 	else if (ValidText(name,0,255)) {
// 		$("#dvname").addClass("error");
// 		$("#dvname .help-inline").show().text("250 Characters allowed.");
// 		chk = 1;
// 	}
// 	if (overview == "") {
// 		$("#dvoverview").addClass("error");
// 		$("#dvoverview .help-inline").show().text("Please enter overview.");
// 		chk = 1;
// 	}
// 	if(category_id == 1) {
// 		if (content == "") {
// 			$("#dvcontent").addClass("error");
// 			$("#dvcontent .help-inline").show().text("Please enter content.");
// 			chk = 1;
// 		}
// 		if (teacher == "") {
// 			$("#dvteacher").addClass("error");
// 			$("#dvteacher .help-inline").show().text("Please enter teacher detail.");
// 			chk = 1;
// 		}
// 		var mode = $('input:checkbox').is(':checked');
// 		if (mode == false) {
// 			$("#dvmode").addClass("error");
// 			$("#dvmode .help-inline").show().text("Please enter mode.");
// 			chk = 1;
// 		}
// 		if (instructor == undefined) {
// 			$("#dvinstructor").addClass("error");
// 			$("#dvinstructor .help-inline").show().text("Please enter instructor.");
// 			chk = 1;
// 		}
// 	}
// 	if(category_id == 2) {
// 		if (faculty == "") {
// 			$("#dvfaculty").addClass("error");
// 			$("#dvfaculty .help-inline").show().text("Please enter faculty.");
// 			chk = 1;
// 		}
// 		if (total == "") {
// 			$("#dvtotal").addClass("error");
// 			$("#dvtotal .help-inline").show().text("Please enter total.");
// 			chk = 1;
// 		}
// 		else if (total < 0) {
// 			$("#dvtotal").addClass("error");
// 			$("#dvtotal .help-inline").show().text("Invalid value.");
// 			chk = 1;
// 		}
// 		if (online == "") {
// 			$("#dvonline").addClass("error");
// 			$("#dvonline .help-inline").show().text("Please enter online courses.");
// 			chk = 1;
// 		}
// 		if (online < 0) {
// 			$("#dvonline").addClass("error");
// 			$("#dvonline .help-inline").show().text("Invalid value.");
// 			chk = 1;
// 		}
// 		if (online > total) {
// 			$("#dvonline").addClass("error");
// 			$("#dvonline .help-inline").show().text("Online cannnot be greater then total.");
// 			chk = 1;
// 		}
// 	}
// 	if (info == "") {
// 		$("#dvinfo").addClass("error");
// 		$("#dvinfo .help-inline").show().text("Please enter course info.");
// 		chk = 1;
// 	}
// 	if (subject == "") {
// 		$("#dvsubject").addClass("error");
// 		$("#dvsubject .help-inline").show().text("Please enter subject.");
// 		chk = 1;
// 	}
// 	if (country == "") {
// 		$("#dvcountry").addClass("error");
// 		$("#dvcountry .help-inline").show().text("Please enter country.");
// 		chk = 1;
// 	}
// 	if (language == "") {
// 		$("#dvlanguage").addClass("error");
// 		$("#dvlanguage .help-inline").show().text("Please enter language.");
// 		chk = 1;
// 	}
// 	if (order == "") {
// 		$("#dvorder").addClass("error");
// 		$("#dvorder .help-inline").show().text("Please enter order.");
// 		chk = 1;
// 	}
// 	else if (ValidText(order,0,255)) {
// 		$("#dvorder").addClass("error");
// 		$("#dvorder .help-inline").show().text("250 Characters allowed.");
// 		chk = 1;
// 	}
// 	if (order_web == "") {
// 		$("#dvorder_web").addClass("error");
// 		$("#dvorder_web .help-inline").show().text("Please enter order web.");
// 		chk = 1;
// 	}
// 	else if (ValidText(order_web,0,500)) {
// 		$("#dvorder_web").addClass("error");
// 		$("#dvorder_web .help-inline").show().text("500 Characters allowed.");
// 		chk = 1;
// 	}
// 	if (medium == "") {
// 		$("#dvmedium").addClass("error");
// 		$("#dvmedium .help-inline").show().text("Please enter medium.");
// 		chk = 1;
// 	}
// 	else if (ValidText(medium,0,255)) {
// 		$("#dvmedium").addClass("error");
// 		$("#dvmedium .help-inline").show().text("250 Characters allowed.");
// 		chk = 1;
// 	}
// 	if (medium_web == "") {
// 		$("#dvmedium_web").addClass("error");
// 		$("#dvmedium_web .help-inline").show().text("Please enter medium web.");
// 		chk = 1;
// 	}
// 	else if (ValidText(medium_web,0,500)) {
// 		$("#dvmedium_web").addClass("error");
// 		$("#dvmedium_web .help-inline").show().text("500 Characters allowed.");
// 		chk = 1;
// 	}
// 	if (duration == "") {
// 		$("#dvduration").addClass("error");
// 		$("#dvduration .help-inline").show().text("Please enter duration.");
// 		chk = 1;
// 	}
// 	else if (duration < 0) {
// 		$("#dvduration").addClass("error");
// 		$("#dvduration .help-inline").show().text("Invalid value.");
// 		chk = 1;
// 	}
// 	if (duration_for == "") {
// 		$("#dvduration_for").addClass("error");
// 		$("#dvduration_for .help-inline").show().text("Please enter duration for.");
// 		chk = 1;
// 	}
// 	if (hours == "") {
// 		$("#dvhours").addClass("error");
// 		$("#dvhours .help-inline").show().text("Please enter hours.");
// 		chk = 1;
// 	}
// 	else if (hours < 0) {
// 		$("#dvhours").addClass("error");
// 		$("#dvhours .help-inline").show().text("Invalid value.");
// 		chk = 1;
// 	}
// 	if (cost == "") {
// 		$("#dvcost").addClass("error");
// 		$("#dvcost .help-inline").show().text("Please enter cost.");
// 		chk = 1;
// 	}
// 	else if (cost < 0) {
// 		$("#dvcost").addClass("error");
// 		$("#dvcost .help-inline").show().text("Invalid value.");
// 		chk = 1;
// 	}
// 	if (currency == "") {
// 		$("#dvcurrency").addClass("error");
// 		$("#dvcurrency .help-inline").show().text("Please enter currency.");
// 		chk = 1;
// 	}
// 	if (break_down == "") {
// 		$("#dvbreak_down").addClass("error");
// 		$("#dvbreak_down .help-inline").show().text("Please enter break down.");
// 		chk = 1;
// 	}
// 	//if ($('input[name="aid"]:checked').length == 0) {
// 	if (aid == undefined) {
// 		$("#dvaid").addClass("error");
// 		$("#dvaid .help-inline").show().text("Please select aid.");
// 		chk = 1;
//     }
// 	else if (aid == "Yes") {
// 		if (aid_detail == "") {
// 			$("#dvaid_detail").addClass("error");
// 			$("#dvaid_detail .help-inline").show().text("Please enter aid detail.");
// 			chk = 1;
// 		}
// 		else if (ValidText(aid_detail,0,500)) {
// 			$("#dvaid_detail").addClass("error");
// 			$("#dvaid_detail .help-inline").show().text("500 Characters allowed.");
// 			chk = 1;
// 		}
// 	}	
// 	if (start == "") {
// 		$("#dvstart").addClass("error");
// 		$("#dvstart .help-inline").show().text("Please select start date.");
// 		chk = 1;
// 	}
// 	if (last == "") {
// 		$("#dvlast").addClass("error");
// 		$("#dvlast .help-inline").show().text("Please select last date.");
// 		chk = 1;
// 	}

// 	if (chk==1) {
// 		return false;
// 	}
// 	else {
// 		return true;
// 	}
// }

// function ValidText(text,mini,maxi) {
// 	if (text != '' && text != null) {
// 		var strlen = text.length;
// 		if (strlen < mini || strlen > maxi) {
// 			return true;
// 		}
// 		else {
// 			return false;
// 		}
// 	}
// 	else {
// 		return true;
// 	}
// }

// function getParameterByName(name, url) {
//     if (!url) url = window.location.href;
//     name = name.replace(/[\[\]]/g, "\\$&");
//     var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
//         results = regex.exec(url);
//     if (!results) return null;
//     if (!results[2]) return '';
//     return decodeURIComponent(results[2].replace(/\+/g, " "));
// }
// function isInt(value) {
//   return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
// }