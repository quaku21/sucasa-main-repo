utils = {
  browserDetect(userAgent) {
    let isBrowser = false;
    if (
      userAgent.match(
        /mozilla|PostmanRuntime|ManyChat|chrome|iemobile|safari|darwin|ucbrowser|alamofire|msapphost|phantomjs|samsungbrowser|trident|msie|chromium|crios|flock|amaya|konqueror|seamonkey|epiphany|omniweb|firefox|opr|opera|fxios|yabrowser|edge|edga|edgios|edg|iphone|ipad|internet|mobi|android|macintosh|windows|applewebkit|fba|linux|touch|micromessenger|mini/i
      )
    ) {
      isBrowser = true;
    }
    return isBrowser;
  },
};

module.exports = { utils };
