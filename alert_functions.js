// Menu toggle script
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

// Toggle the filter menu
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
  
// Read alert data from CSV file
var data;
var volume = [];
var timing = [];
var staff = [];
var environ = [];
var critical = [];
    $.ajax({
      type: "GET",  
      url: "alert.csv",
      dataType: "text",       
      success: function(response)  
      {
        data = $.csv.toArrays(response);
        data.forEach(initialSortByType);
        printData();
      }   
    });

function initialSortByType(value, index, array) {

    if (index != 0){
        if (value[1] == "Volume"){
            volume.push(value);
        }
        else if (value[1] == "Timing") {
            timing.push(value);
        } 
        else if (value[1] == "Staff") {
            staff.push(value);
        }
        else if (value[1] == "Environmental") {
            environ.push(value);
        }
        if (value[2] == "Critical") {
            critical.push(value);
        }
        critical = critical.sort(ComparatorTime);
    }
}

// Add all alerts to page
function printData() {
    critical.forEach(addToPageCrit);
    addAllAlerts();
}



// Adds critical alerts to page
function addToPageCrit(value, index, array) {
    // Select jumbotron element
    var element = document.getElementById("crit-alerts");

    // Create header 
    var header = document.createElement("h4");
    header.innerHTML = "Critical Alert(" +value[5] + "): " + value[1] + " " + value[3]

    // Create p tag for alert info
    var info = document.createElement("p");
    info.id = "UID:" + value[5];
    var alert_string = value[1] + "<br>" + value[2] + "<br>" + value[3] + "<br>" + value[4];
    if (value[6] != "") {
        alert_string += "<br>Note: " + value[6]
    }
    info.innerHTML = alert_string;

    // Put header and info in a div
    var div_1 = document.createElement("div");
    div_1.className = "col-md-7";
    div_1.appendChild(header);
    div_1.appendChild(info);

    //Create buttons
    var b_edit = document.createElement("button");
    b_edit.id = "edit";
    b_edit.className = "btn btn-primary-edit-crit";
    b_edit.innerHTML = "Add Note";

    //grab  anote from the user and unblock the dismiss button
    b_edit.onclick = function () {
        var text;
        prompt_string = "Enter a note for alert(" + value[3] + " " + value[0] + ": ";
        var note = prompt(prompt_string);
        value[6] =  note;
        alert_string += "<br>" + note;
        document.getElementById("UID:" + value[5]).innerHTML = alert_string;
        b_clear.disabled = false;
    }
        
    var b_clear = document.createElement("button");
    b_clear.id = "UID:" + value[5] + "clear";
    b_clear.className = "btn btn-primary-clear-crit";
    b_clear.innerHTML = "Dismiss";
    b_clear.setAttribute("disabled", "true");
    if (value[6] != "" ) {
          b_clear.disabled = false;
    }
    b_clear.onclick = function () { 
        var temp = document.getElementById("crit_alert_rows"); 
        temp.parentNode.removeChild(temp);
    };
    
    b_edit.style.color = "#fff";
    b_clear.style.color = "#fff";
    
    // Put buttons in a div
    var div_2 = document.createElement("div");
    div_2.className = "col-md-5";
    div_2.appendChild(b_edit);
    div_2.appendChild(b_clear);

    // Create div for row
    var div_row = document.createElement("div");
    div_row.className = "row-crit";
    div_row.id = "crit_alert_rows";
    div_row.appendChild(div_1);
    div_row.appendChild(div_2);

    element.appendChild(div_row);

}


var v = 0;
var t = 0;
var s = 0;
var e = 0;
// Adds all alert to the page
function addAllAlerts() {
    // Select row container element
    var element = document.getElementById("all-alerts");
    element.innerHTML = "";

    var vol_clear = [];
    var tim_clear = [];
    var staf_clear = [];
    var env_clear = [];
    
    // Only iterates twice to make 2 rows
    for (var i = 0; i < 2; i++)
    {

        // Create a new row
        var div_row = document.createElement("div");
        div_row.className = "row text-center";

        if ((v < 2) && (volume[v] != "")){

            // Create Volume alert elements
            var div_vol = document.createElement("div");
            div_vol.className = "col-lg-3 col-md-6 mb-4";
            div_vol.id = "div_vol" + v;
            var card_vol = document.createElement("div");
            card_vol.className = "card h-100";
            var cardbody_vol = document.createElement("div");
            cardbody_vol.className = "card-body";
            var h_1 = document.createElement("h4");
            h_1.className = "card-title";
            h_1.innerHTML = volume[v][0];
            var info_vol = document.createElement("p");
            info_vol.className = "card-text";
            info_vol.innerHTML = volume[v][2] + "<br>" + volume[v][3] + "<br>" + volume[v][4];

            // Create Volume buttons
            var footer_vol = document.createElement("div");
            footer_vol.className = "card-footer";
            var vol_edit = document.createElement("a");
            vol_edit.className = "btn btn-primary-edit";
            vol_edit.innerHTML = "Add Note";
            vol_clear[i] = document.createElement("a");
            vol_clear[i].className = "btn btn-primary-clear";
            vol_clear[i].innerHTML = "Dismiss";
            vol_clear[i].style.color = "#fff";
            footer_vol.appendChild(vol_edit);
            footer_vol.appendChild(vol_clear[i]);

            // Add volume alerts to row div
            cardbody_vol.appendChild(h_1);
            cardbody_vol.appendChild(info_vol);
            card_vol.appendChild(cardbody_vol);
            card_vol.appendChild(footer_vol);
            div_vol.appendChild(card_vol);
            div_row.appendChild(div_vol);

            // when dismiss button clicked, maybe set inner html to "" so that there is still a placeholder
            vol_clear[0].onclick = function () { 
                var parent = document.getElementById("div_vol" + 0);
                parent.innerHTML = "";
                v = 1;
                t = 0;
                s = 0;
                e = 0;
                addAllAlerts();
            };
            if (i >= 1){
                vol_clear[1].onclick = function () { 
                    var parent = document.getElementById("div_vol" + 1);
                    parent.innerHTML = "";
                    v = 0;
                    t = 0;
                    s = 0;
                    e = 0;
                    volume[1] = "";
                    addAllAlerts();
                };}
        v++;
        }
        else {
            var div_vol = document.createElement("div");
            div_vol.className = "col-lg-3 col-md-6 mb-4";
            div_row.appendChild(div_vol);
        }

       
        if ((t < 2) && (timing[t] != "")){
            // Create Volume alert elements
            var div_tim = document.createElement("div");
            div_tim.className = "col-lg-3 col-md-6 mb-4";
            div_tim.id = "div_tim" + t;
            var card_tim = document.createElement("div");
            card_tim.className = "card h-100";
            var cardbody_tim = document.createElement("div");
            cardbody_tim.className = "card-body";
            var h_2 = document.createElement("h4");
            h_2.className = "card-title";
            h_2.innerHTML = timing[t][0];
            var info_tim = document.createElement("p");
            info_tim.className = "card-text";
            info_tim.innerHTML = timing[t][2] + "<br>" + timing[t][3] + "<br>" + timing[t][4];

            // Create Volume buttons
            var footer_tim = document.createElement("div");
            footer_tim.className = "card-footer";
            var tim_edit = document.createElement("a");
            tim_edit.className = "btn btn-primary-edit";
            tim_edit.innerHTML = "Add Note";
            tim_clear[i] = document.createElement("a");
            tim_clear[i].className = "btn btn-primary-clear";
            tim_clear[i].innerHTML = "Dismiss";
            tim_clear[i].style.color = "#fff";
            footer_tim.appendChild(tim_edit);
            footer_tim.appendChild(tim_clear[i]);

            // Add volume alerts to row div
            cardbody_tim.appendChild(h_2);
            cardbody_tim.appendChild(info_tim);
            card_tim.appendChild(cardbody_tim);
            card_tim.appendChild(footer_tim);
            div_tim.appendChild(card_tim);
            div_row.appendChild(div_tim);

            // when dismiss button clicked, maybe set inner html to "" so that there is still a placeholder
            tim_clear[0].onclick = function () { 
                var parent = document.getElementById("div_tim" + 0);
                parent.innerHTML = "";
                t = 1;
                v = 0;
                s = 0;
                e = 0;
                addAllAlerts();
            };
            
            if (i >= 1){
                tim_clear[1].onclick = function () { 
                    var parent = document.getElementById("div_tim" + 1);
                    parent.innerHTML = "";
                    t = 0;
                    v = 0;
                    s = 0;
                    e = 0;
                    timing[1] = "";
                    addAllAlerts();
                };}
        t++;
        }
        else {
            var div_tim = document.createElement("div");
            div_tim.className = "col-lg-3 col-md-6 mb-4";
            div_row.appendChild(div_tim);
        }

        // Staff stuff
        if ((s < 2) && (staff[s] != "")){
            // Create Staff alert elements
            var div_staf = document.createElement("div");
            div_staf.className = "col-lg-3 col-md-6 mb-4";
            div_staf.id = "div_staf" + s;
            var card_staf = document.createElement("div");
            card_staf.className = "card h-100";
            var cardbody_staf = document.createElement("div");
            cardbody_staf.className = "card-body";
            var h_3 = document.createElement("h4");
            h_3.className = "card-title";
            h_3.innerHTML = staff[s][0];
            var info_staf = document.createElement("p");
            info_staf.className = "card-text";
            info_staf.innerHTML = staff[s][2] + "<br>" + staff[s][3] + "<br>" + staff[s][4];
            
            // Create Staff buttons
            var footer_staf = document.createElement("div");
            footer_staf.className = "card-footer";
            var staf_edit = document.createElement("a");
            staf_edit.className = "btn btn-primary-edit";
            staf_edit.innerHTML = "Add Note";
            staf_clear[i] = document.createElement("a");
            staf_clear[i].className = "btn btn-primary-clear";
            staf_clear[i].innerHTML = "Dismiss";
            staf_clear[i].style.color = "#fff";
            footer_staf.appendChild(staf_edit);
            footer_staf.appendChild(staf_clear[i]);

            // Add Staff alerts to row div
            cardbody_staf.appendChild(h_3);
            cardbody_staf.appendChild(info_staf);
            card_staf.appendChild(cardbody_staf);
            card_staf.appendChild(footer_staf);
            div_staf.appendChild(card_staf);
            div_row.appendChild(div_staf);


            // Dismiss button
            staf_clear[0].onclick = function () { 
                var parent = document.getElementById("div_staf" + 0);
                parent.innerHTML = "";
                s = 1;
                t = 0;
                v = 0;
                e = 0;
                addAllAlerts();
            };
            
            if (i >= 1){
                staf_clear[1].onclick = function () { 
                    var parent = document.getElementById("div_staf" + 1);
                    parent.innerHTML = "";
                    t = 0;
                    v = 0;
                    s = 0;
                    e = 0;
                    staff[1] = "";
                    addAllAlerts();
                };}
        s++;
        }
        else {
            var div_staf = document.createElement("div");
            div_staf.className = "col-lg-3 col-md-6 mb-4";
            div_row.appendChild(div_staf);
        }

        // Environmental stuff
        if ((e < 2) && (environ[e] != "")){
            // Create Environmental alert elements
            var div_env = document.createElement("div");
            div_env.className = "col-lg-3 col-md-6 mb-4";
            div_env.id = "div_env" + e;
            var card_env = document.createElement("div");
            card_env.className = "card h-100";
            var cardbody_env = document.createElement("div");
            cardbody_env.className = "card-body";
            var h_4 = document.createElement("h4");
            h_4.className = "card-title";
            h_4.innerHTML = environ[e][0];
            var info_env = document.createElement("p");
            info_env.className = "card-text";
            info_env.innerHTML = environ[e][2] + "<br>" + environ[e][3] + "<br>" + environ[e][4];

            // Create Environmental buttons
            var footer_env = document.createElement("div");
            footer_env.className = "card-footer";
            var env_edit = document.createElement("button");
            env_edit.className = "btn btn-primary-edit";
            env_edit.innerHTML = "Add Note";
            env_clear[i] = document.createElement("button");
            env_clear[i].className = "btn btn-primary-clear";
            env_clear[i].innerHTML = "Dismiss";
            env_clear[i].style.color = "#fff";
            footer_env.appendChild(env_edit);
            footer_env.appendChild(env_clear[i]);

            // Add Environmental alerts to row div
            cardbody_env.appendChild(h_4);
            cardbody_env.appendChild(info_env);
            card_env.appendChild(cardbody_env);
            card_env.appendChild(footer_env);
            div_env.appendChild(card_env);
            div_row.appendChild(div_env);


            // Dismiss button
            env_clear[0].onclick = function () { 
                var parent = document.getElementById("div_env" + 0);
                parent.innerHTML = "";
                s = 0;
                t = 0;
                v = 0;
                e = 1;
                addAllAlerts();
            };
            
            if (i >= 1){
                env_clear[1].onclick = function () { 
                    var parent = document.getElementById("div_env" + 1);
                    parent.innerHTML = "";
                    t = 0;
                    v = 0;
                    s = 0;
                    e = 0;
                    environ[1] = "";
                    addAllAlerts();
                };}
        e++;
        }
        else {
            var div_env = document.createElement("div");
            div_env.className = "col-lg-3 col-md-6 mb-4";
            div_env.appendChild(div_env);
        }

        vol_edit.style.color = "#fff";
        tim_edit.style.color = "#fff";
        staf_edit.style.color = "#fff";
        env_edit.style.color = "#fff";

        // Add row to container element
        element.appendChild(div_row);
    }
}



// Toggle filter menu
window.onclick = function(event) {
    if (!event.target.matches('#dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Compare function for sortByTime
function ComparatorTime(a, b) {
    if (a[3] < b[3]) return -1;
    if (a[3] > b[3]) return 1;
    return 0;
}
// Sort alerts by time and print
function sortByTime() {
    // Sort
    volume = volume.sort(ComparatorTime);
    timing = timing.sort(ComparatorTime);
    staff = staff.sort(ComparatorTime);
    environ = environ.sort(ComparatorTime);
    console.log(staff);
    v = 0;
    t = 0;
    s = 0;
    e = 0;
    // Call printing function
    addAllAlerts();
}


// Compare function for sortBySeverity
function ComparatorSeverity(a, b) {
    if (a[2] < b[2]) return -1;
    if (a[2] > b[2]) return 1;
    return 0;
}
// Sort alerts by severity and print
function sortbySeverity() {
    // Sort
    volume = volume.sort(ComparatorSeverity);
    timing = timing.sort(ComparatorSeverity);
    staff = staff.sort(ComparatorSeverity);
    environ = environ.sort(ComparatorSeverity);
    v = 0;
    t = 0;
    s = 0;
    e = 0;
    // Call printing function
    addAllAlerts();
}

function check_empty() {
if (document.getElementById('name').value == "" || document.getElementById('email').value == "" || document.getElementById('msg').value == "") {
alert("Fill All Fields !");
} else {
document.getElementById('form').submit();
alert("Form Submitted Successfully...");
}
}
//Function To Display Popup
function div_show() {
document.getElementById('abc').style.display = "block";
}
//Function to Hide Popup
function div_hide(){
document.getElementById('abc').style.display = "none";
}
