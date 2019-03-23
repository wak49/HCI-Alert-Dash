// Menu toggle script
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

// Reading XML file of alerts
function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
    }
    };
    xmlhttp.open("GET", "alert.xml" , true);
    xmlhttp.send();
}
function myFunction(xml) {
    var x, i, xmlDoc, title, type, severity;
    var head_jum, para, node_p, node_h, element;
    var d_row, d_col, d_text, b_edit, d_clear;
    xmlDoc = xml.responseXML;

    // Add alert to html
    x = xmlDoc.getElementsByTagName("alert")
    for (i = 0; i <= x.length; i++) 
    { 
        // Extract XML data
        title = x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
        type = x[i].getElementsByTagName("type")[0].childNodes[0].nodeValue;
        severity = x[i].getElementsByTagName("severity")[0].childNodes[0].nodeValue;
        alert = type + "<br>" + severity + "<br>" + 
        x[i].getElementsByTagName("time")[0].childNodes[0].nodeValue + "<br>" +
        x[i].getElementsByTagName("notes")[0].childNodes[0].nodeValue + "<br>";

        // If critical, add to jumbotron
        if (severity == "Critical")
        {
        // Create new row div
        d_row = document.createElement("div");
        d_row.className = "row";
        d_col = document.createElement("div");
        d_col.className = "col-md-7";
        d_text = document.createElement("div");
        d_text.className = "col-md-5";

        // Create h tag and add to div
        head_jum = document.createElement("h3");
        node_h = document.createTextNode(title);
        head_jum.appendChild(node_h);
        d_text.appendChild(head_jum);

        // Create p tag and add to div
        para = document.createElement("p");
        para.innerHTML = alert;
        d_text.appendChild(para);

        // Create buttons
        b_edit = document.createElement("a");
        b_edit.className = "btn btn-primary";
        b_edit.appendChild(document.createTextNode("Edit"));
        d_text.appendChild(b_edit);

        b_clear = document.createElement("a");
        b_clear.className = "btn btn-primary";
        b_clear.appendChild(document.createTextNode("Clear"));
        d_text.appendChild(b_clear);

        // Add everything to jumbotron
        element = document.getElementById("crit-alerts");
        element.appendChild(d_row);
        d_row.appendChild(d_col);
        d_row.appendChild(d_text);
        }

        // Add to corresponding column - maybe do same as in if and
        // Then do if statements on where to add it
    }
    }