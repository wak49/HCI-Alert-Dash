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
        if (value[2]) {
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

    
    
    // Create div for row
    var div_row = document.createElement("div");
    div_row.className = "row-crit";
    div_row.id = "crit_alert_rows";
    div_row.appendChild(div_1);

    element.appendChild(div_row);

}

// Adds all alert to the page

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
