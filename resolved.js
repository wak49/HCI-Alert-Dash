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
    critical.forEach(addToResolved);
    addAllAlerts();
}


// Adds critical alerts to page
function addToResolved(value, index, array) {
    // Select jumbotron element
    var element = document.getElementById("resolved");

	var parent_div = document.createElement("div")
	parent_div.className = "list-group list-group-flush";

	var parent_table = document.createElement("table");
	parent_table.className = "resolved table";
	var c, r;

	r = partent_table.insert_row();

	c = parent_table.inserct_cell();
	c.innerHTML = value[0];

	c = parent_table.inserct_cell();
	c.innerHTML = value[1];

	c = parent_table.inserct_cell();
	c.innerHTML = value[2];

	c = parent_table.inserct_cell();
	c.innerHTML = value[3];

	c = parent_table.inserct_cell();
	c.innerHTML = value[4];

	document.getElementById("resolved").appendChild(parent_div)
	document.getElementById("parent_div").appendChild(parent_table);
 }

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