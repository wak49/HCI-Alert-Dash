// Create an alert object to hold all of the alert's parameters
function Alert(title, type, severity, time, description, uid, note) {
    this.title = title;
    this.type = type;
    this.severity = severity;
    this.time = time;
    this.description = description;
    this.uid = uid;
    this.note = note;
}

var alert_list = [];
var critical_alert_list = [];
var resolved_alerts = [];

// Read in from CSV file and calls getData to populate alert_list
$.ajax({
    type: "GET",  
    url: "assets/alert.csv",
    dataType: "text",       
    success: function(response)  
    {
        console.log("Getting csv");
        data = $.csv.toArrays(response);
        data.forEach(getData);
        // Call printing function for noncritial alerts
        printNonCriticalAlerts();
    }   
});

// Creates Alert objects and adds them to alert_list
function getData(value, index, array) {
    
    // Do not add first value to list
    if (index != 0) {
        var next_alert = new Alert(value[0], value[1], value[2], value[3], value[4], value[5],value[6]);
        if (next_alert.note == "None") {
            next_alert.note = "";
        }

        // If critical, add to critical_alert_list
        if (next_alert.severity == "Critical") {
            critical_alert_list.push(next_alert);
        }

        // Else noncritical, so add to alert_list
        else {
        alert_list.push(next_alert);
        }
    }
}

// Print all noncritical alerts
// Create a div for each alert and just add the div to the corresponding td element
function printNonCriticalAlerts() {
    console.log("Initiating printing");
    // These are the table elements td that correspond to the noncritical 
    // alert type columns
    var volume = document.getElementById("volume");
    var timing = document.getElementById("timing");
    var staff = document.getElementById("staff");
    var environmental = document.getElementById("environmental");

    // Clear the elements
    while (volume.firstChild) {
        volume.removeChild(volume.firstChild);
    }
    while (timing.firstChild) {
        timing.removeChild(timing.firstChild);
    }
    while (staff.firstChild) {
        staff.removeChild(staff.firstChild);
    }
    while (environmental.firstChild) {
        environmental.removeChild(environmental.firstChild);
    }

    console.log("Alert list at printing: ", alert_list);

    // Loop for each item in alert_list
    for (var i = 0; i < alert_list.length; i++){

        // Create elements to populate the table
        var div = document.createElement("div");
        div.className = "card";
        var div_innerbody = document.createElement("div");
        div_innerbody.className = "card-body";
        div_innerbody.style = "/*width: 250;*/height: 250;";
        var header_1 = document.createElement("h4");
        header_1.className = "card-title";
        var header_2 = document.createElement("h6");
        header_2.className = "text-warning card-subtitle mb-2";
        var p = document.createElement("p");
        p.className = "card-text";
        p.style = "height: 120px;";
        var button_addnote = document.createElement("button");
        button_addnote.className = "btn btn-primary alert-btn-add";
        button_addnote.type = "button";
        button_addnote.innerHTML = "Add Note";
        var button_dismiss = document.createElement("button");
        button_dismiss.className = "btn btn-primary alert-btn-dismiss";
        button_dismiss.type = "button";
        button_dismiss.innerHTML = "Dismiss";

        // Add alert information to the elements
        header_1.innerHTML = alert_list[i].title;
        header_2.innerHTML = alert_list[i].severity;
        p.innerHTML = alert_list[i].description;
        if (alert_list[i].note != ""){
            p.innerHTML += "<br>" + alert_list[i].note;
        }

        // Add button functionality
        button_addnote.onclick = addNote(i);
        button_dismiss.onclick = dismissAlert(i);

        // Add elements together
        div_innerbody.appendChild(header_1);
        div_innerbody.appendChild(header_2);
        div_innerbody.appendChild(p);
        div_innerbody.appendChild(button_addnote);
        div_innerbody.appendChild(button_dismiss);
        div.appendChild(div_innerbody);

        // Add elements to table
        if (alert_list[i].type == "Volume"){
            volume.appendChild(div);
        }
        else if (alert_list[i].type == "Timing"){
            timing.appendChild(div);
        }
        else if (alert_list[i].type == "Staff"){
            staff.appendChild(div);
        }
        else if (alert_list[i].type == "Environmental"){
            environmental.appendChild(div);
        }

    }
}

// Add note to a card
function addNote(i) {
    return function() {
        // Open dialog box and get user's input
        // Append note to alert and print everything again
        prompt_string = "Enter a note for the alert: ";
        var new_note = "<br>";
        new_note += prompt(prompt_string);
        if (alert_list[i].note == "") {
            alert_list[i].note += new_note;
        }
        else {
            alert_list[i].note += "<br>" + new_note;
        }
        
        printNonCriticalAlerts();
        return false;
    };
}

// Dismiss alert
function dismissAlert(i) {
    return function() {

        var temp = alert_list[i]

        // Remove alert from alert_list, add it to resolved list and reprint everything
        alert_list.splice(i, 1);
        resolved_alerts.push(temp);
        printNonCriticalAlerts();

        return false;
    };
}


// add note button for critical alert
function addNoteCritical(){
    prompt_string = "Enter a note for the alert: ";
    var note = "<br>";
    note += prompt(prompt_string);
    return note;

}