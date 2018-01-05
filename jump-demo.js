//////////////////////////////
// develop support

// simple print debug way.
// console.log is not available in this VRC_WebPanel environment
function debugMsg(s) {
    document.getElementById("dbgmsg").innerHTML = "" + s;
}


//////////////////////////////
// VRChat binded method(s)

var bindingsReady = false;

function onBindingsReady(evt) {
    var div = document.getElementById("message");
    div.innerHTML = "Ready to go!";

    bindingsReady = true;
}

document.addEventListener('onBindingsReady', onBindingsReady, false);


function GoToRoom(id) {
    if (!bindingsReady) {
	debugMsg("! bindingsReady");
	throw new Error();
    }
    engine.call("VRCSDK2.Networking.GoToRoom", id);
}


//////////////////////////////
// Application code

var publicWorlds = [
    {id: "wrld_48cf80e6-15dd-4c17-8667-c5dc01baa5cb",
     name: "Help Videos"},
    {id: "wrld_eb7a5096-9c93-41db-a9d7-7b349a5d4815",
     name: "The HUB"},  	
    {id: "wrld_6caf5200-70e1-46c2-b043-e3c4abe69e0f",
     name: "The Great Pug"},
    {id: "wrld_8ef393c0-a985-4d7e-90f0-33ab10d41ee3",
     name: "Avatar Testing!"},
];


function jumpToWorld() {
    // debugMsg("world=" + JSON.stringify(this.obj_world));
    GoToRoom(this.obj_world.id);
}
    
function insertWorldTable(worldList) {
    var table = document.createElement("table");

    // var head = document.createElement("tr");
    // head.innerHTML = "<th>name<th>id";
    // table.appendChild(head);

    worldList.forEach(function(entry){
        var row = document.createElement("tr");

        var col = document.createElement("td");
	col.className = "worldEntry";
        col.innerHTML = "" + entry.name;
        row.appendChild(col);

        // col = document.createElement("td");
        // col.innerHTML = entry.id;
        // row.appendChild(col);

        table.appendChild(row);

	row.obj_world = entry;
    	row.addEventListener("click", jumpToWorld, false);
    });

    var container = document.getElementById("container");
    container.appendChild(table);
}

function testBtnOnClick() {
    debugMsg("testBtnOnClick");
    GoToRoom("wrld_48cf80e6-15dd-4c17-8667-c5dc01baa5cb");
}

function OnDOMContentLoaded() {
    document.getElementById("urlTxt").value = window.location;

    var btn;
    btn = document.getElementById("reloadBtn");
    btn.addEventListener("click", function() {window.location.reload(true);} , false);
    btn = document.getElementById("testBtn");
    btn.addEventListener("click", testBtnOnClick , false);

    insertWorldTable(publicWorlds);
    debugMsg("OnDOMContentLoaded end");
}
document.addEventListener('DOMContentLoaded', OnDOMContentLoaded, false);
