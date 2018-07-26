// function to make the HTTP GET call
// method - GET, POST, PUT, DELETE
// data - applicable for POST, PUT
export function httpAsync(theUrl, callback, method, data = null) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open(method, theUrl, false); // true for asynchronous 
    xmlHttp.send(data);
}

export function httpPostOrPut(url, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
        var response = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "201") {
            console.table(response);
        } else {
            //console.error(response);
        }
    }
    xhr.send(data);
}

// function to get Query string Parameter by Name
export function getParameterByName(name, urlFromRequest) {
    if (!urlFromRequest) urlFromRequest = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(urlFromRequest);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function clearChildNodes(div) {
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
};

export function clearBox(elementID)
{
    document.getElementById(elementID).innerHTML = "";
}

//export { httpAsync, getParameterByName, clearChildNodes };
