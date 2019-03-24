// Menu toggle script
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

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
    var header = document.createElement("h3");
    header.innerHTML = value[0];

    // Create p tag for alert info
    var info = document.createElement("p");
    info.innerHTML = value[1] + "<br>" + value[2] + "<br>" + value[3] + "<br>" + value[4];

    // Put header and info in a div
    var div_1 = document.createElement("div");
    div_1.className = "col-md-7";
    div_1.appendChild(header);
    div_1.appendChild(info);

    // Create buttons
    var b_edit = document.createElement("a");
    b_edit.className = "btn btn-primary";
    b_edit.innerHTML = "Edit";
    var b_clear = document.createElement("a");
    b_clear.className = "btn btn-primary";
    b_clear.innerHTML = "Clear";

    // Put buttons in a div
    var div_2 = document.createElement("div");
    div_2.className = "col-md-5";
    div_2.appendChild(b_edit);
    div_2.appendChild(b_clear);

    // Create div for row
    var div_row = document.createElement("div");
    div_row.className = "row";
    div_row.appendChild(div_1);
    div_row.appendChild(div_2);

    element.appendChild(div_row);
}


// Adds all alert to the page
function addAllAlerts() {
    // Only iterates twice to make 2 rows
    for (var i = 0; i < 2; i++)
    {
        // Select row container element and create a new row
        var element = document.getElementById("all-alerts");
        var div_row = document.createElement("div");
        div_row.className = "row text-center";

        // Create Volume alert elements
        var div_vol = document.createElement("div");
        div_vol.className = "col-lg-3 col-md-6 mb-4";
        var card_vol = document.createElement("div");
        card_vol.className = "card h-100";
        var cardbody_vol = document.createElement("div");
        cardbody_vol.className = "card-body";
        var h_1 = document.createElement("h4");
        h_1.className = "card-title";
        h_1.innerHTML = volume[i][0];
        var info_vol = document.createElement("p");
        info_vol.className = "card-text";
        info_vol.innerHTML = volume[i][1] + "<br>" + volume[i][2] + "<br>" + volume[i][3] + "<br>" + volume[i][4];

        // Create Volume buttons
        var footer_vol = document.createElement("div");
        footer_vol.className = "card-footer";
        var vol_edit = document.createElement("a");
        vol_edit.className = "btn btn-primary";
        vol_edit.innerHTML = "Edit";
        var vol_clear = document.createElement("a");
        vol_clear.className = "btn btn-primary";
        vol_clear.innerHTML = "Clear";
        footer_vol.appendChild(vol_edit);
        footer_vol.appendChild(vol_clear);

        // Add volume alerts to row div
        cardbody_vol.appendChild(h_1);
        cardbody_vol.appendChild(info_vol);
        card_vol.appendChild(cardbody_vol);
        card_vol.appendChild(footer_vol);
        div_vol.appendChild(card_vol);
        div_row.appendChild(div_vol);


        // Create Timing alert elements
        var div_tim = document.createElement("div");
        div_tim.className = "col-lg-3 col-md-6 mb-4";
        var card_tim = document.createElement("div");
        card_tim.className = "card h-100";
        var cardbody_tim = document.createElement("div");
        cardbody_tim.className = "card-body";
        var h_2 = document.createElement("h4");
        h_2.className = "card-title";
        h_2.innerHTML = timing[i][0];
        var info_tim = document.createElement("p");
        info_tim.className = "card-text";
        info_tim.innerHTML = timing[i][1] + "<br>" + timing[i][2] + "<br>" + timing[i][3] + "<br>" + timing[i][4];

        // Create Timing buttons
        var footer_tim = document.createElement("div");
        footer_tim.className = "card-footer";
        var tim_edit = document.createElement("a");
        tim_edit.className = "btn btn-primary";
        tim_edit.innerHTML = "Edit";
        var tim_clear = document.createElement("a");
        tim_clear.className = "btn btn-primary";
        tim_clear.innerHTML = "Clear";
        footer_tim.appendChild(tim_edit);
        footer_tim.appendChild(tim_clear);

        // Add Timing alerts to row div
        cardbody_tim.appendChild(h_2);
        cardbody_tim.appendChild(info_tim);
        card_tim.appendChild(cardbody_tim);
        card_tim.appendChild(footer_tim);
        div_tim.appendChild(card_tim);
        div_row.appendChild(div_tim);


        // Create Staff alert elements
        var div_staf = document.createElement("div");
        div_staf.className = "col-lg-3 col-md-6 mb-4";
        var card_staf = document.createElement("div");
        card_staf.className = "card h-100";
        var cardbody_staf = document.createElement("div");
        cardbody_staf.className = "card-body";
        var h_3 = document.createElement("h4");
        h_3.className = "card-title";
        h_3.innerHTML = staff[i][0];
        var info_staf = document.createElement("p");
        info_staf.className = "card-text";
        info_staf.innerHTML = staff[i][1] + "<br>" + staff[i][2] + "<br>" + staff[i][3] + "<br>" + staff[i][4];
        
        // Create Staff buttons
        var footer_staf = document.createElement("div");
        footer_staf.className = "card-footer";
        var staf_edit = document.createElement("a");
        staf_edit.className = "btn btn-primary";
        staf_edit.innerHTML = "Edit";
        var staf_clear = document.createElement("a");
        staf_clear.className = "btn btn-primary";
        staf_clear.innerHTML = "Clear";
        footer_staf.appendChild(staf_edit);
        footer_staf.appendChild(staf_clear);

        // Add Staff alerts to row div
        cardbody_staf.appendChild(h_3);
        cardbody_staf.appendChild(info_staf);
        card_staf.appendChild(cardbody_staf);
        card_staf.appendChild(footer_staf);
        div_staf.appendChild(card_staf);
        div_row.appendChild(div_staf);


        // Create Environmental alert elements
        var div_env = document.createElement("div");
        div_env.className = "col-lg-3 col-md-6 mb-4";
        var card_env = document.createElement("div");
        card_env.className = "card h-100";
        var cardbody_env = document.createElement("div");
        cardbody_env.className = "card-body";
        var h_4 = document.createElement("h4");
        h_4.className = "card-title";
        h_4.innerHTML = environ[i][0];
        var info_env = document.createElement("p");
        info_env.className = "card-text";
        info_env.innerHTML = environ[i][1] + "<br>" + environ[i][2] + "<br>" + environ[i][3] + "<br>" + environ[i][4];

        // Create Environmental buttons
        var footer_env = document.createElement("div");
        footer_env.className = "card-footer";
        var env_edit = document.createElement("a");
        env_edit.className = "btn btn-primary";
        env_edit.innerHTML = "Edit";
        var env_clear = document.createElement("a");
        env_clear.className = "btn btn-primary";
        env_clear.innerHTML = "Clear";
        footer_env.appendChild(env_edit);
        footer_env.appendChild(env_clear);

        // Add Environmental alerts to row div
        cardbody_env.appendChild(h_4);
        cardbody_env.appendChild(info_env);
        card_env.appendChild(cardbody_env);
        card_env.appendChild(footer_env);
        div_env.appendChild(card_env);
        div_row.appendChild(div_env);

        // Add row to container element
        element.appendChild(div_row);

    }
}
