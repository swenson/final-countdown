var jsonData;

var update = function() {
  var now = moment();
  $('#current-time').text(now.format('MMMM Do YYYY, h:mm:ss a'));

  $('#events').empty();
  for (var i in jsonData) {
    var event = jsonData[i];
    var div = $('<div class="row event"/>');
    var starts = moment(event.start_time, "YYYY-MM-DD h:mm:ss a");
    if (event.timezone == "") {
      event.timezone = "America/Los_Angeles";
    }
    starts = starts.tz(event.timezone);
    var diff = now.diff(starts);
    var years = now.diff(starts, 'years');
    starts = starts.add(years, "years");
    var months = now.diff(starts, 'months');
    starts = starts.add(months, "months");
    var days = now.diff(starts, 'days');
    starts = starts.add(days, "days");
    var hours = now.diff(starts, 'hours');
    starts = starts.add(hours, "hours");
    var minutes = now.diff(starts, 'minutes');
    starts = starts.add(minutes, "minutes");
    var seconds = now.diff(starts, 'seconds');

    var diff = years + " years";
    diff += ", " + months + " months";
    diff += ", " + days + " days";
    diff += ", " + hours + " hours";
    diff += ", " + minutes + " minutes";
    diff += ", " + seconds + " seconds";

    var row = $('<div class="row"></div>');
    row.append($('<div class="col-xs-6 name"><h3>' + event.name + '</h3></div></div>'));
    row.append($('<div class="col-xs-6 time"><h3>' + diff + '</h3></div>'));
    div.append(row);

    row = $('<div class="row"/>');
    div.append($('<div class="col-xs-6 description"><h4>' + event.description + '</h4></div>'));
    div.append(row);

    row = $('<div class="row"/>');
    div.append($('<div class="col-xs-6 location"><h4>' + event.location + '</h4></div>'));
    div.append(row);

    row = $('<div class="row"/>');
    div.append($('<div class="col-xs-6 start_time"><h4>' + event.start_time + ' ' + event.timezone + '</h4></div>'));
    div.append(row);

    if (event.coc) {
      row = $('<div class="row"/>');
      div.append($('<div class="col-xs-6 coc"><h4><a href="' + event.coc + '">Code of conduct</a></h4></div>'));
      div.append(row);
    }

    $('#events').append(div);
  }
  setTimeout(update, 1000);
}

$(document).ready(function() {
  jsonData = [
    {
      "name": "OSCON",
      "description": "O'Reilly Open Source Convention",
      "location": "Portland, OR USA",
      "start_time": "2015-05-18 12:00:00 AM",
      "coc": "http://www.oreilly.com/conferences/code-of-conduct.html",
      "timezone": ""
    },
    {
      "name": "US PyCon",
      "description": "Python programming conference",
      "location": "Portland, OR USA",
      "start_time": "2015-05-28 12:00:00 AM",
      "coc": "https://us.pycon.org/2016/about/code-of-conduct/",
      "timezone": ""
    }
  ];
  //$.getJSON("data.json", function(data) {
    //jsonData = data;
    update();
  //});
});
