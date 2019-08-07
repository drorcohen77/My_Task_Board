//window.onload = function() {

if (localStorage.arryhist)
    arryhist = JSON.parse(localStorage.arryhist);

createhistory();

function createhistory() {
    var strhistory = "";

    console.log(arryhist);

    for (i = 0; i < arryhist.length; i++) {
        strhistory += "<div class='notesfadein'>";
        strhistory += "<div class='remove'>";
        strhistory += "<span class='glyphicon glyphicon-remove-circle deleteicon' onclick='removenote(" + i + ")'></span></div>";
        strhistory += "<div class='insidenote nopadding'><p>" + arryhist[i].text + "</p></div>";
        strhistory += "<div class='datetime'><p><strong>DATE: " + arryhist[i].date + "</strong><br>";
        strhistory += "<strong>TIME:  " + arryhist[i].time + "</strong></p>";
        strhistory += "</div></div>"

    }
    console.log(strhistory);
    historynotes.innerHTML = strhistory;
}

function removenote(n) {
    //removing the chosen note from the clip board with fade out
    var history = "";

    for (i = 0; i < arryhist.length; i++) {
        if (i == n) {
            history += "<div class='notesfadeout'>";
            history += "<div class='remove'>";
            history += "<span class='glyphicon glyphicon-remove-circle deleteicon' onclick='removenote(" + i + ")'></span></div>";
            history += "<div class='insidenote nopadding'><p>" + arryhist[i].text + "</p></div>";
            history += "<div class='datetime'><p><strong>DATE: " + arryhist[i].date + "</strong><br>";
            history += "<strong>TIME:  " + arryhist[i].time + "</strong></p>";
            history += "</div></div>"
        } else {
            history += "<div class='notes'>";
            history += "<div class='remove'>";
            history += "<span class='glyphicon glyphicon-remove-circle deleteicon' onclick='removenote(" + i + ")'></span></div>";
            history += "<div class='insidenote nopadding'><p>" + arryhist[i].text + "</p></div>";
            history += "<div class='datetime'><p><strong>DATE: " + arryhist[i].date + "</strong><br>";
            history += "<strong>TIME:  " + arryhist[i].time + "</strong></p>";
            history += "</div></div>";
        }
    }

    historynotes.innerHTML = history;
    setTimeout(function () {
        splice(n);
    }, 1000);
}


function splice(z) {
    //delete the note from the array and updating the local storage
    arryhist.splice(z, 1);
    window.localStorage.arryhist = JSON.stringify(arryhist);

    history1 = "";

    for (i = 0; i < arryhist.length; i++) {

        history1 += "<div class='notes'>";
        history1 += "<div class='remove'>";
        history1 += "<span class='glyphicon glyphicon-remove-circle deleteicon' onclick='removenote(" + i + ")'></span></div>";
        history1 += "<div class='insidenote nopadding'><p>" + arryhist[i].text + "</p></div>";
        history1 += "<div class='datetime'><p><strong>DATE: " + arryhist[i].date + "</strong><br>";
        history1 += "<strong>TIME:  " + arryhist[i].time + "</strong></p>";
        history1 += "</div></div>";
    }

    historynotes.innerHTML = history1;
}


//}
