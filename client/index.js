var clientConvert = {

    getCssStyle: function (selectorText) {

        var self = this;
        var cacheItem = self.styleCache[selectorText];
        //If we already added this to the cache, return it. 
        if (cacheItem){
            return cacheItem;
        }
        var styleSheets = document.styleSheets;
        for (var j = styleSheets.length - 1; j >= 0; j--) {
            try {
                var rules = styleSheets[j].rules || styleSheets[j].cssRules;
                for (var i = rules.length - 1; i >= 0; i--) {
                    var cssClass = rules[i];
                    if (cssClass && cssClass.selectorText === selectorText) {
                        var cssText = cssClass.cssText || cssClass.style.cssText;
                        //Because many times we select this item multiple times from places like gallery selection, build an internal cache of the items to reduce iterations.
                        self.styleCache[selectorText] = cssText;
                        return cssText;
                    }
                }
            } catch (error) {
                if (typeof console !== 'undefined') {
                    console.log(error);
                }
            }
        }
    }
};