Localisation.js
========

Author: Matthew Harrison-Jones
Website: [matthojo.co.uk](http://matthojo.co.uk)
Twitter: [@matt_hojo](http://twitter.com/matt_hojo)
License: MIT

#### What does it do?

It allows you to localise your websites content, simply by specifying your language content in JSON format. 

#### Supported data types

Currently it only supports JSON but will hopefully expand to further data types.

## Setting Up
To get started simply call the script into your HTML.
```html
<script src="js/localisation.js"></script>
```
You then need to setup your localisation script so it knows where to get the languages from.
You can do this by specifying a JSON file.
```javascript
var language = new localisation("js/text.json", false);
```
or by passing in JSON from a variable
```javascript
var language = new localisation(json, true);
```
****
NOTE: The boolean parameter in the Object setup, this tells the script what your passing in. FALSE:: File, TRUE:: Variable
****
After that you need to tell the localisation object your language preference.
You specify a specific language or use "auto" to use whatever the browser is using.
```javascript
language.setLanguage("en_GB");
```
or
```javascript
language.setLanguage("auto");
```

### Getting the text
To get the text, simply call:
```javascript
language.returnString("welcome")
```
replacing 'welcome' with your required text key name.

### Generating a language drop down
There is also the ability to create a drop down box containing only the languages supported in your JSON.
You can either specify a parent for the drop down to go into, or create a drop down where the script is called.

This appends to a container called 'form_container' and has a class of 'form'. The 'false' says its not near the script.
```javascript
language.createLanguageChooser("form", "Choose Language", false, "form_container");
```
This creates the drop down in the parent element where the script tag is placed. 
```javascript
language.createLanguageChooser("form", "Choose Language", true);
```
****
NOTE: The drop down titles will be the short codes for the language, unless a 'language_name' is set in the JSON. See below.
****

### Example JSON file contain languages
This is an example JSON file.
```javascript
{
    "en_GB": {
        "language_name": "English",
        "welcome": "Hello!"
    },
    "en_US": {
        "language_name": "US English",
        "welcome": "Hey there!"
    },
    "cy": {
	    "welcome": "Croeso!"
    },
    "fr":{
	    "welcome": "Bonjour!"
    }
}
```
Each keyword needs to be the same, with the value being the translation.
A 'language_name' specifies the full name for the language (used in the drop down boxes).


## Change log
The versioning system is `major.minor.patch`.

2012/09/16

* Initial release