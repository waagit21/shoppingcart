function formatDateTime(dt) {
	var date = new Date(dt);
    //var theMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var theMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = date.getFullYear(),
        //month = date.getMonth() + 1, // months are zero indexed
        month = theMonths[date.getMonth()];
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds(),
    hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
    minuteFormatted = minute < 10 ? "0" + minute : minute,
    secondFormatted = second < 10 ? "0" + second : second,
    morning = hour < 12 ? "AM" : "PM";
    return day + " " + month + ", " + year + " " + hourFormatted + ":" + minuteFormatted + " " + morning;
    //return month + "/" + day + "/" + year + " " + hourFormatted + ":" + minuteFormatted + morning;
}

function formatDate(date) {
    var theMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = date.getFullYear(),
        month = theMonths[date.getMonth()],
        day = date.getDate();
    return day + " " + month + ", " + year;
}

function formatNumDate(dt) {
    var date = new Date(dt);
    var year = date.getFullYear(),
        month = date.getMonth()+1,
        day = date.getDate();
    var setmonth = month < 10 ? "0" + month : month;
    var setday = day < 10 ? "0" + day : day;    
    return year + "/" + setmonth + "/" + setday;
}

function getRandom(min=1000, max=9999) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }

module.exports={
    formatDateTime:formatDateTime,
    formatDate:formatDate,
    formatNumDate:formatNumDate,
    getRandom:getRandom,
}

// module.exports = {
//     formatDateTime: function(dt) {
//         var date = new Date(dt);
//         //var theMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//         var theMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//         var year = date.getFullYear(),
//             //month = date.getMonth() + 1, // months are zero indexed
//             month = theMonths[date.getMonth()];
//         day = date.getDate(),
//         hour = date.getHours(),
//         minute = date.getMinutes(),
//         second = date.getSeconds(),
//         hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
//         minuteFormatted = minute < 10 ? "0" + minute : minute,
//         secondFormatted = second < 10 ? "0" + second : second,
//         morning = hour < 12 ? "AM" : "PM";
//         return day + " " + month + ", " + year + " " + hourFormatted + ":" + minuteFormatted + " " + morning;
//         //return month + "/" + day + "/" + year + " " + hourFormatted + ":" + minuteFormatted + morning;
//     },
//     formatDate: function(dt) {
//         var date = new Date(dt);
//         var theMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//         var year = date.getFullYear(),
//             month = theMonths[date.getMonth()];
//         day = date.getDate();
//         return day + " " + month + ", " + year;
//     }
// };
