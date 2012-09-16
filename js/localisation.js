/*
 * Localisation.js
 *
 * Author: Matthew Harrison-Jones
 * Author Website: matthojo.co.uk
 * License: MIT <http://en.wikipedia.org/wiki/MIT_License>
 *
 */

var _st = window.setTimeout;
/**
 * IE-specific polyfill which enables the passage of arbitrary arguments to the
 * callback functions of javascript timers (HTML5 standard syntax).
 *
 * https://developer.mozilla.org/en-US/docs/DOM/window.setInterval
 *
 * Syntax:
 * var timeoutID = window.setTimeout(func, delay, [param1, param2, ...]);
 * var timeoutID = window.setTimeout(code, delay);
 *
 * @type {Function|*}
 * @private
 */
window.setTimeout = function(fRef, mDelay) {
    if(typeof fRef == "function") {
        var argu = Array.prototype.slice.call(arguments,2);
        var f = (function(){ fRef.apply(null, argu); });
        return _st(f, mDelay);
    }
    return _st(fRef,mDelay);
};

/**
 * Main localisation object
 * @param content Either JSON object or file path
 * @param json true: JSON Object, false: file
 */
var localisation = function(content, json){
	
	var jsonObject;
	var language;

    var loaded = false;
		
	// Must be file
	if(!json) {
		var file = content;
		
		var my_JSON_object = {};
		var http_request = new XMLHttpRequest();
		http_request.open("GET", file, true);
		http_request.onreadystatechange = function () {
		    var done = 4, ok = 200;
		    if (http_request.readyState == done && http_request.status == ok) {
		        jsonObject = JSON.parse(http_request.responseText);
                loaded = true;
            }
		};
		http_request.send(null);
    }else{
    	var JSONText = JSON.stringify(content);
	    jsonObject = JSON.parse(JSONText);
        loaded = true;
    }

    /**
     * Define the language
     * @param l
     */
    this.setLanguage = function(l){
    	if(l == "auto"){
    		var detected = window.navigator.userLanguage || window.navigator.language;
    		detected = detected.replace ("-","_");  // replace dash with underscore
	    	this.language = detected;
	    	console.log("Language Auto set to: "+this.language);
    	}
		else this.language = l;

        return this.language;
    };

    /**
     * Adds a select box to the page with the languages provided.
     *
     * @param className
     * @param titleText
     * @param create true:: Creates a selectbox where script tag is located, false:: inserts select box in parent element
     * @param parent
     * @return {HTMLElement}
     */
    this.createLanguageChooser = function(className, titleText, create, parent){
        var CLCTimeout;

        if(loaded){
            var langs = [];
            for (var lang in jsonObject) {
                if (jsonObject.hasOwnProperty(lang)) {
                    var name = "";
                    // setup option name
                    if(jsonObject[lang].language_name) name = jsonObject[lang].language_name;
                    else name = lang;
                    var optionSettings = {
                        text: name,
                        value: lang
                    };
                    langs.push(optionSettings);
                }
            }

            // create select box
            var selectBox = document.createElement("select");
            selectBox.className += className;

            // Add title option
            var option = document.createElement("option");
            option.text = titleText;
            option.value = "auto";
            selectBox.options.add(option);

            // Create options
            for(var i=0;i<langs.length;i++){
                option = document.createElement("option");
                option.text = langs[i].text;
                option.value = langs[i].value;
                selectBox.options.add(option);
            }

            if(create){
                // Get script tag
                var scripts = document.getElementsByTagName('script');
                var script = scripts[scripts.length-1];
                // Insert into DOM
                script.parentNode.insertBefore(selectBox, script);
            }else{
                var readyStateCheckInterval = setInterval(function() {
                    if (document.readyState === "complete") {
                        document.getElementById(parent).appendChild(selectBox);
                    }
                }, 10);
            }

            clearTimeout(CLCTimeout);

            return selectBox;
        }else{
            CLCTimeout = setTimeout(this.createLanguageChooser, 100, className, titleText, create, parent);
        }
    };

    /**
     * Return specified string
     * @param message
     * @return {*}
     */
	this.returnString = function(message){
		if(loaded) return jsonObject[this.language][message];
        else setTimeout(this.returnString, 100, message);
	};
	
};