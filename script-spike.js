function OnReadyForJavascript(evt) {
    var funcsPromise = engine.call("ListBindings");
    funcsPromise.success(function (funs) {
        var table = document.createElement("table");
        funs.forEach(function (func) {
            var row = document.createElement("tr");
            table.appendChild(row);
            var col = document.createElement("td");
            col.innerHTML = func;
            row.appendChild(col);
        });
        document.body.appendChild(table);
    });
}

function peekObject(anObj) {
    var table = document.createElement("table");

    for(var pname in anObj) {
        var row = document.createElement("tr");
        table.appendChild(row);
	
        var col = document.createElement("td");
        col.innerHTML = pname;
        row.appendChild(col);

        col = document.createElement("td");
        col.innerHTML = "" + anObj[pname];
        row.appendChild(col);
    }

    document.body.appendChild(table);
}

