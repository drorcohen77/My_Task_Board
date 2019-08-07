//window.onload = function() {

var note = {};
var arrynote = [];
var arryhist = [];
var check;
var storage = "";



if (localStorage.arrynote)
    arrynote = JSON.parse(localStorage.arrynote);

if (localStorage.arryhist)
    arryhist = JSON.parse(localStorage.arryhist);

print();

console.log(arrynote);

function createnote() {

    note = {};
    note.text = note1.value;
    note.date = date.value;
    note.time = time1.value;

    validation();
}


function validation() {

    var a = date.value;
    var inputdate = moment(a).format('MM/DD/YYYY');
    var b = new Date;
    var nowdate = moment(b).format('MM/DD/YYYY');
    var inputtime = time1.value;
    var nowtime = new Date();
    var h = nowtime.getHours();

    //creating 2 digits for the hours.
    if (h < 10)
        h = "0" + h;
    console.log(h);

    var m = nowtime.getMinutes();

    //creating 2 digits for the minutes.
    if (m < 10)
        m = "0" + m;
    console.log(m);
    var time = h + ":" + m;
    console.log(time);

    console.log(inputdate, nowdate);
    //checking if there is text,date and time to the note. if not, an alert will apear.
    if (note.text == "") {
        alerts.innerHTML = "There is no text in the note! Please write your task in the text area."
        return;
    } else if (note.date == "") {
        alerts.innerHTML = "There is no date in the note! Date for the note is required!";
        return;
    } else if (inputdate < nowdate) {
        alerts.innerHTML = "You entered an earlier date than today's date! Please enter correct date."
        return;
    } else if (inputdate == nowdate) {
        if (note.time == "") {
            alerts.innerHTML = "There is no time in the note! Time for the note is required!";
            return;
        } else if (inputtime < time) {
            alerts.innerHTML = "You entered uncorrect time! Please enter correct time."
            return;
        } else {
            addnote();
        }
    } else if (note.time == "") {
        alerts.innerHTML = "There is no time in the note! Time for the note is required!";
        return;
    } else {
        addnote();
    }
}


function addnote() {
    //creating array with text,date,time of an objects
    arrynote.push(note);

    window.localStorage.arrynote = JSON.stringify(arrynote);

    alerts.innerHTML = ""; //the alert area

    print();
    clean();
    history();

}


function clean() {

    note1.value = "";
    date.value = "";
    time1.value = "";

}


function print() {
    //printing note on clip board with fade in 
    var str = "";

    for (i = 0; i < arrynote.length; i++) {

        if (i < arrynote.length - 1) {
            str += "<div class='notes'>";
            str += "<div class='remove'>";
            str += "<span class='glyphicon glyphicon-save-file history' onclick='addtohistory(" + i + ")'>History</span>";
            str += "<span class='glyphicon glyphicon-remove-circle deleteicon' onclick='removenote(" + i + ")'></span></div>";
            str += "<div class='insidenote nopadding'><p>" + arrynote[i].text + "</p></div>";
            str += "<div class='datetime'><p><strong>DATE: " + arrynote[i].date + "</strong><br>";
            str += "<strong>TIME:  " + arrynote[i].time + "</strong></p>";
            str += "</div></div>"
        } else {
            str += "<div class='notesfadein'>";
            str += "<div class='remove'>";
            str += "<span class='glyphicon glyphicon-save-file history' onclick='addtohistory(" + i + ")'>History</span>";
            str += "<span class='glyphicon glyphicon-remove-circle deleteicon' onclick='removenote(" + i + ")'></span></div>";
            str += "<div class='insidenote nopadding'><p>" + arrynote[i].text + "</p></div>";
            str += "<div class='datetime'><p><strong>DATE: " + arrynote[i].date + "</strong><br>";
            str += "<strong>TIME:  " + arrynote[i].time + "</strong></p>";
            str += "</div></div>"
        }
    }

    noteserea.innerHTML = str;
    console.log(str);

}

function history() {

    for (i = 0; i < arrynote.length; i++) {

        var b = new Date;
        var nowdate1 = moment(b).format('MM/DD/YYYY');
        var a = arrynote[i].date;
        var notedate = moment(a).format('MM/DD/YYYY');
        console.log(nowdate1, i, notedate);

        if (notedate == nowdate1 || notedate < nowdate1) {

            arryhist.push(arrynote[i]);

            arrynote.splice(i, 1);

            window.localStorage.arryhist = JSON.stringify(arryhist);

            window.localStorage.arrynote = JSON.stringify(arrynote);
        }
    }
}


function removenote(n) {
    //removing the chosen note from the clip board with fade out
    var str1 = "";

    for (i = 0; i < arrynote.length; i++) {
        if (i == n) {
            str1 += "<div class='notesfadeout'>";
            str1 += "<div class='remove'>";
            str1 += "<span class='glyphicon glyphicon-save-file history' onclick='addtohistory(" + i + ")'>History</span>";
            str1 += "<span class='glyphicon glyphicon-remove-circle deleteicon' onclick='removenote(" + i + ")'></span></div>";
            str1 += "<div class='insidenote nopadding'><p>" + arrynote[i].text + "</p></div>";
            str1 += "<div class='datetime'><p><strong>DATE: " + arrynote[i].date + "</strong><br>";
            str1 += "<strong>TIME:  " + arrynote[i].time + "</strong></p>";
            str1 += "</div></div>"
        } else {
            str1 += "<div class='notes'>";
            str1 += "<div class='remove'>";
            str1 += "<span class='glyphicon glyphicon-save-file history' onclick='addtohistory(" + i + ")'>History</span>";
            str1 += "<span class='glyphicon glyphicon-remove-circle deleteicon' onclick='removenote(" + i + ")'></span></div>";
            str1 += "<div class='insidenote nopadding'><p>" + arrynote[i].text + "</p></div>";
            str1 += "<div class='datetime'><p><strong>DATE: " + arrynote[i].date + "</strong><br>";
            str1 += "<strong>TIME:  " + arrynote[i].time + "</strong></p>";
            str1 += "</div></div>"
        }
    }

    noteserea.innerHTML = str1;
    setTimeout(function () {
        splice(n);
    }, 2000);
}


function splice(z) {
    //delete the note from the array and updating the local storage
    arrynote.splice(z, 1);
    window.localStorage.arrynote = JSON.stringify(arrynote);

    str1 = "";

    for (i = 0; i < arrynote.length; i++) {

        str1 += "<div class='notes'>";
        str1 += "<div class='remove'>";
        str1 += "<span class='glyphicon glyphicon-save-file history' onclick='addtohistory(" + i + ")'>History</span>";
        str1 += "<span class='glyphicon glyphicon-remove-circle deleteicon' onclick='removenote(" + i + ")'></span></div>";
        str1 += "<div class='insidenote nopadding'><p>" + arrynote[i].text + "</p></div>";
        str1 += "<div class='datetime'><p><strong>DATE: " + arrynote[i].date + "</strong><br>";
        str1 += "<strong>TIME:  " + arrynote[i].time + "</strong></p>";
        str1 += "</div></div>"
    }

    noteserea.innerHTML = str1;
}

function addtohistory(h) {
    //removing the chosen note from the clip board with fade out
    var addhistory = "";

    for (i = 0; i < arrynote.length; i++) {
        if (i == h) {
            addhistory += "<div class='notesfadeout'>";
            addhistory += "<div class='remove'>";
            addhistory += "<span class='glyphicon glyphicon-save-file history' onclick='addtohistory(" + i + ")'>History</span>";
            addhistory += "<span class='glyphicon glyphicon-remove-circle deleteicon' onclick='removenote(" + i + ")'></span></div>";
            addhistory += "<div class='insidenote nopadding'><p>" + arrynote[i].text + "</p></div>";
            addhistory += "<div class='datetime'><p><strong>DATE: " + arrynote[i].date + "</strong><br>";
            addhistory += "<strong>TIME:  " + arrynote[i].time + "</strong></p>";
            addhistory += "</div></div>"
        } else {
            addhistory += "<div class='notes'>";
            addhistory += "<div class='remove'>";
            addhistory += "<span class='glyphicon glyphicon-save-file history' onclick='addtohistory(" + i + ")'>History</span>";
            addhistory += "<span class='glyphicon glyphicon-remove-circle deleteicon' onclick='removenote(" + i + ")'></span></div>";
            addhistory += "<div class='insidenote nopadding'><p>" + arrynote[i].text + "</p></div>";
            addhistory += "<div class='datetime'><p><strong>DATE: " + arrynote[i].date + "</strong><br>";
            addhistory += "<strong>TIME:  " + arrynote[i].time + "</strong></p>";
            addhistory += "</div></div>"
        }
    }

    noteserea.innerHTML = addhistory;
    setTimeout(function () {
        splicehistory(h);
    }, 1000);
}

function splicehistory(t) {
    //delete the note from the array and updating the local storage

    arryhist.push(arrynote[t]);
    arrynote.splice(t, 1);

    window.localStorage.arryhist = JSON.stringify(arryhist);

    window.localStorage.arrynote = JSON.stringify(arrynote);

    addhistory1 = "";

    for (i = 0; i < arrynote.length; i++) {

        addhistory1 += "<div class='notes'>";
        addhistory1 += "<div class='remove'>";
        addhistory1 += "<span class='glyphicon glyphicon-save-file history' onclick='addtohistory(" + i + ")'>History</span>";
        addhistory1 += "<span class='glyphicon glyphicon-remove-circle deleteicon' onclick='removenote(" + i + ")'></span></div>";
        addhistory1 += "<div class='insidenote nopadding'><p>" + arrynote[i].text + "</p></div>";
        addhistory1 += "<div class='datetime'><p><strong>DATE: " + arrynote[i].date + "</strong><br>";
        addhistory1 += "<strong>TIME:  " + arrynote[i].time + "</strong></p>";
        addhistory1 += "</div></div>"
    }

    noteserea.innerHTML = addhistory1;
}

//}
