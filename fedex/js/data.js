// Initialize some important variables
var data;
var m_26 = 0, m_25 = 0, m_24 = 0, m_23 = 0, m_22 = 0, m_21 = 0, m_20 = 0;
var volume = [];
var timing = [];
var staff = [];
var environ = [];
var chart_title = "Volume Alerts";

// Create buttons at bottom of page, but only add 3
var buttom_element = document.getElementById("other-alerts");
var div_info = document.createElement("div");
div_info.className = "col-lg-3 col-md-6 mb-4";
div_info.innerHTML = "View other alert types:";

var div_vol = document.createElement("div");
div_vol.className = "col-lg-2 col-md-6 mb-4";
var b_vol = document.createElement("button");
b_vol.className = "btn btn-primary";
b_vol.onclick = graphVolume;
b_vol.innerHTML = "Volume";
div_vol.appendChild(b_vol);

var div_tim = document.createElement("div");
div_tim.className = "col-lg-2 col-md-6 mb-4";
var b_tim = document.createElement("button");
b_tim.className = "btn btn-primary";
b_tim.onclick = graphTiming;
b_tim.innerHTML = "Timing";
div_tim.appendChild(b_tim);

var div_staf = document.createElement("div");
div_staf.className = "col-lg-2 col-md-6 mb-4";
var b_staf = document.createElement("button");
b_staf.className = "btn btn-primary";
b_staf.onclick = graphStaff;
b_staf.innerHTML = "Staff";
div_staf.appendChild(b_staf);

var div_env = document.createElement("div");
div_env.className = "col-lg-2 col-md-6 mb-4";
var b_env = document.createElement("button");
b_env.className = "btn btn-primary";
b_env.onclick = graphEnv;
b_env.innerHTML = "Environmental";
div_env.appendChild(b_env);

buttom_element.appendChild(div_info);
buttom_element.appendChild(div_tim);
buttom_element.appendChild(div_staf);
buttom_element.appendChild(div_env);

// Read csv file and generate initial volume graph
$.ajax({
    type: "GET",  
    url: "alert_list_graph.csv",
    dataType: "text",       
    success: function(response)  
    {
    data = $.csv.toArrays(response);
    data.forEach(initialSortByType);
    getData(volume);
    datastuff = [m_20, m_21, m_22, m_23, m_24, m_25, m_26];
    labels =  ["3/20", "3/21", "3/22", "3/23", "3/24", "3/25", "3/26"];
    renderChart(datastuff, labels);
    }   
});

// Separate alerts by type
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
    }
}

function getData(arr) {
    arr.forEach(countByDate);
}

// Count alerts by date
function countByDate(value, index, array) {
    if (value[3] == "3/20/19"){
        m_20++;
    }
    else if (value[3] == "3/21/19"){
        m_21++;
    }
    else if (value[3] == "3/22/19"){
        m_22++;
    }
    else if (value[3] == "3/23/19"){
        m_23++;
    }
    else if (value[3] == "3/24/19"){
        m_24++;
    }
    else if (value[3] == "3/25/19"){
        m_25++;
    }
    else if (value[3] == "3/26/19"){
        m_26++;
    }
}

// Create chart
function renderChart(data, labels) {
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: "This week",
                data: data,
            }]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: chart_title,
            },      
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        
        },
    });
}

// Graph timing data
function graphTiming() {
    // Empty canvas element
    var canvas = document.getElementById("myChart");
    canvas.innerHTML = "";

    // Get timing data
    m_20 = 0;
    m_21 = 0;
    m_22 = 0;
    m_23 = 0;
    m_24 = 0;
    m_25 = 0;
    m_26 = 0;
    getData(timing);

    chart_title = "Timing Alerts";

    // Call renderChart with timing data
    datastuff = [m_20, m_21, m_22, m_23, m_24, m_25, m_26];
    labels =  ["3/20", "3/21", "3/22", "3/23", "3/24", "3/25", "3/26"];
    renderChart(datastuff, labels);

    // Change rows displayed
    buttom_element.innerHTML = "";
    buttom_element.appendChild(div_info);
    buttom_element.appendChild(div_vol);
    buttom_element.appendChild(div_staf);
    buttom_element.appendChild(div_env);
}

// Graph volume data
function graphVolume() {
    // Empty canvas element
    var canvas = document.getElementById("myChart");
    canvas.innerHTML = "";

    // Get timing data
    m_20 = 0;
    m_21 = 0;
    m_22 = 0;
    m_23 = 0;
    m_24 = 0;
    m_25 = 0;
    m_26 = 0;
    getData(volume);

    chart_title = "Volume Alerts";

    // Call renderChart with volume data
    datastuff = [m_20, m_21, m_22, m_23, m_24, m_25, m_26];
    labels =  ["3/20", "3/21", "3/22", "3/23", "3/24", "3/25", "3/26"];
    renderChart(datastuff, labels);

    // Change row displayed
    buttom_element.innerHTML = "";
    buttom_element.appendChild(div_info);
    buttom_element.appendChild(div_tim);
    buttom_element.appendChild(div_staf);
    buttom_element.appendChild(div_env);
}

// Graph staff data
function graphStaff() {
    // Empty canvas element
    var canvas = document.getElementById("myChart");
    canvas.innerHTML = "";

    // Get timing data
    m_20 = 0;
    m_21 = 0;
    m_22 = 0;
    m_23 = 0;
    m_24 = 0;
    m_25 = 0;
    m_26 = 0;
    getData(staff);
    
    chart_title = "Staff Alerts";

    // Call renderChart with staff data
    datastuff = [m_20, m_21, m_22, m_23, m_24, m_25, m_26];
    labels =  ["3/20", "3/21", "3/22", "3/23", "3/24", "3/25", "3/26"];
    renderChart(datastuff, labels);

    // Change row displayed
    buttom_element.innerHTML = "";
    buttom_element.appendChild(div_info);
    buttom_element.appendChild(div_vol);
    buttom_element.appendChild(div_tim);
    buttom_element.appendChild(div_env);
}

// Graph environmental data
function graphEnv() {
    // Empty canvas element
    var canvas = document.getElementById("myChart");
    canvas.innerHTML = "";

    // Get timing data
    m_20 = 0;
    m_21 = 0;
    m_22 = 0;
    m_23 = 0;
    m_24 = 0;
    m_25 = 0;
    m_26 = 0;
    getData(environ);

    chart_title = "Environmental Alerts";

    // Call renderChart with timing data
    datastuff = [m_20, m_21, m_22, m_23, m_24, m_25, m_26];
    labels =  ["3/20", "3/21", "3/22", "3/23", "3/24", "3/25", "3/26"];
    renderChart(datastuff, labels);

    // Change row displayed
    buttom_element.innerHTML = "";
    buttom_element.appendChild(div_info);
    buttom_element.appendChild(div_vol);
    buttom_element.appendChild(div_tim);
    buttom_element.appendChild(div_staf);
}
