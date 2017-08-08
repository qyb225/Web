(function (global) {
    var ajaxUtils = {};

    var getRequestObject = function () {
        var request;
        if (window.XMLHttpRequest) {
            request = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            try {
                request = new ActiveXObject('Msxml2.XMLHTTP');
            } catch (oldMS) {
                request = new ActiveXObject('Microsoft.XMLHTTP');
            }
        } else {
            request = null;
        }

        return request;
    };

    var handlerResponse = function (request, responseHandler, isJasonResponse) {
        if (request.readyState == 4 && request.status == 200) {
            if (isJasonResponse) {
                responseHandler(JSON.parse(request.responseText));
            } else {
                responseHandler(request.responseText);
            }
        }
    };

    ajaxUtils.sendGetRequest = function (url, handler, isJasonResponse) {
        var request = getRequestObject();
        request.onreadystatechange = function () {
            handlerResponse(request, handler, isJasonResponse);
        };
        request.open("Get", url, true);
        request.send(null);
    };

    global.$ajaxUtils = ajaxUtils;

})(window);
