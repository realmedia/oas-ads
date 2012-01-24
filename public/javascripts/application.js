var OAS_host = (("https:" == document.location.protocol) ? "https://" : "http://");
var OAS_url  = OAS_host + 'de.realmediadigital.com/RealMedia/ads/';

var addEvent = function (obj, evType, fn, useCapture) {
    if (obj.addEventListener) {
        obj.addEventListener(evType, fn, useCapture);
        return true;
    } else if (obj.attachEvent) {
        var r = obj.attachEvent("on" + evType, fn);
        return r;
    } else {
        alert("Handler could not be attached");
    }
};

var removeEvent = function (obj, evType, fn, useCapture) {
    if (obj.removeEventListener) {
        obj.removeEventListener(evType, fn, useCapture);
        return true;
    } else if (obj.detachEvent) {
        var r = obj.detachEvent("on" + evType, fn);
        return r;
    } else {
       alert("Handler could not be removed");
    }
};

var uniqid = function () {
    var newDate = new Date();
    return newDate.getTime();
};

var getFrameContents = function (ifrmId) {
    var iFrame = document.getElementById(ifrmId);
    var iFrameBody;
    if (iFrame.contentDocument) { 
        // FF
        iFrameBody = iFrame.contentDocument.getElementsByTagName('body')[0];
    } else if (iFrame.contentWindow) {
        // IE
        iFrameBody = iFrame.contentWindow.document.getElementsByTagName('body')[0];
    }
    alert(iFrameBody.innerHTML);
};

var callbackfn = function (ifrmId, containerId) {
  console.log("Loaded ad '" + ifrmId + "' in container '" + containerId + "'");
};

var loadAd = function(sitePage, pos, containerId) {  
    var container = document.getElementById(containerId);
    if (container.hasChildNodes()) {
      while (container.childNodes.length >= 1 ) {
        container.removeChild(container.firstChild );
      }
    }
    
    var ifrm = document.createElement("iframe");
    ifrm.setAttribute("src", OAS_url + "adstream_sx.ads/" +sitePage + "/" + uniqid() + "@" + pos);
    var ifrmId = "ifrm_" + uniqid();
    ifrm.setAttribute("id", ifrmId);
    ifrm.setAttribute("marginwidth", 0);
    ifrm.setAttribute("marginheight", 0);
    ifrm.setAttribute("frameborder", 0);
    ifrm.setAttribute("scrolling", 0);
    ifrm.setAttribute("height", container.scrollHeight + (container.offsetHeight - container.clientHeight));
    ifrm.setAttribute("width", container.scrollWidth + (container.offsetWidth - container.clientWidth));
  
    addEvent(ifrm, 'load', function () {
      callbackfn(ifrmId, containerId);
    });

    container.appendChild(ifrm);
    return false;
};
