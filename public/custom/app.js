$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});

function ValidText(text,mini,maxi) {
	if (text != '' && text != null) {
		var strlen = text.length;
		if (strlen < mini || strlen > maxi) {
			return true;
		}
		else {
			return false;
		}
	}
	else {
		return true;
	}
}

function ValidEmail(email) {
	if (email != '' && email != null) {
		var filter = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;
        if (filter.test(email)) {
            return false;
        }
        else {
            return true;
        }
	}
	else {
		return false;
	}
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function isInt(value) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}

function unixlocalDateTime(udt) {
	var strdate = new Date(udt * 1000);
    if (strdate != null && strdate != "") {
        var fdate = fullformatDateTime(strdate);
        return fdate;
    }
    else {
        return strdate;
    }
}
function localDateTime(dt) {
	var strdate = new Date(dt);
    if (strdate != null && strdate != "") {
        //var ldate = convertUTCDateToLocalDate(strdate);
        var fdate = formatDateTime(strdate);
        return fdate;
    }
    else {
        return strdate;
    }
}

function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
}

function formatDateTime(date) {	
    //var theMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var theMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = date.getFullYear(),
        //month = date.getMonth() + 1, // months are zero indexed
        month = theMonths[date.getMonth()];
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds(),
    hours = hour % 12 || 12, // hour returned in 24 hour format
    hourFormatted = hours < 10 ? "0" + hours : hours,
    minuteFormatted = minute < 10 ? "0" + minute : minute,
    secondFormatted = second < 10 ? "0" + second : second,
    morning = hour < 12 ? "AM" : "PM";
    return day + " " + month + ", " + year + " " + hourFormatted + ":" + minuteFormatted + ":" + secondFormatted + " " + morning;
    //return month + "/" + day + "/" + year + " " + hourFormatted + ":" + minuteFormatted + morning;
}
function fullformatDateTime(date) {	
    //var theMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var theMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = date.getFullYear(),
        //month = date.getMonth() + 1, // months are zero indexed
        month = theMonths[date.getMonth()];
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds(),
    hours = hour % 12 || 12, // hour returned in 24 hour format
    hourFormatted = hours < 10 ? "0" + hours : hours,
    minuteFormatted = minute < 10 ? "0" + minute : minute,
    secondFormatted = second < 10 ? "0" + second : second,
    morning = hour < 12 ? "AM" : "PM";
    return day + " " + month + ", " + year + " " + hourFormatted + ":" + minuteFormatted + ":" + secondFormatted + " " + morning;
    //return month + "/" + day + "/" + year + " " + hourFormatted + ":" + minuteFormatted + morning;
}
function formatDate(strdate) {
	var date = new Date(strdate);
    var year = date.getFullYear(),
    month = "0"+date.getMonth();
    day = "0"+date.getDate();    
    return year + "/" + month + "/" + day;
}

function addDays(theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
}