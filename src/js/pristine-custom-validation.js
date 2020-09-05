Pristine.addValidator("url", function(value) {
  var re_weburl = new RegExp(
    "^" +
      // protocol identifier (optional)
      // short syntax // still required
      "(?:(?:(?:https?|ftp):)?\\/\\/)" +
      // user:pass BasicAuth (optional)
      "(?:\\S+(?::\\S*)?@)?" +
      "(?:" +
        // IP address exclusion
        // private & local networks
        "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
        "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
        "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
        // IP address dotted notation octets
        // excludes loopback network 0.0.0.0
        // excludes reserved space >= 224.0.0.0
        // excludes network & broadcast addresses
        // (first & last IP address of each class)
        "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
        "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
        "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
      "|" +
        // host & domain names, may end with dot
        // can be replaced by a shortest alternative
        // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
        "(?:" +
          "(?:" +
            "[a-z0-9\\u00a1-\\uffff]" +
            "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
          ")?" +
          "[a-z0-9\\u00a1-\\uffff]\\." +
        ")+" +
        // TLD identifier name, may end with dot
        "(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
      ")" +
      // port number (optional)
      "(?::\\d{2,5})?" +
      // resource path (optional)
      "(?:[/?#]\\S*)?" +
    "$", "i"
  );

  if(value){
    return re_weburl.test(value)
  }

  return true;

}, "This input format is invalid", 5, false);

Pristine.addValidator("alpha", function(value) {
  var regex = /^[A-Za-z]+$/;
  if(value){
    return value.match(regex)
  }
  return true;
}, "This input may only contain letters", 5, false);

Pristine.addValidator("alphanum", function(value) {
  var regex = /^[a-z0-9]+$/i;
  if(value){
    return value.match(regex)
  }
  return true;
}, "This input may only contain letters and numbers", 5, false);

Pristine.addValidator("alphadash", function(value) {
  var regex = /^[a-zA-Z0-9-_]+$/;
  if(value){
    return value.match(regex)
  }
  return true;
}, "This input may only contain letters, numbers, dashes and underscores", 5, false);

Pristine.addValidator("regex", function(value, regex) {
  regex = new RegExp(regex)

  if(value){
    return value.match(regex)
  }
  return true;
}, "This input format is invalid", 5, false);

Pristine.addValidator("not-regex", function(value, regex) {
  regex = new RegExp(regex)

  if(value){
    return !value.match(regex)
  }
  return true;
}, "This input format is invalid", 5, false);

Pristine.addValidator("file-ext", function(value, extenstions) {
  if (value) {
    var fileExt = value.split('.').pop();
    var allowedExtenstions = extenstions.split("|");
    var isValid = allowedExtenstions.includes(fileExt);
    return isValid;
  }

  return true
}, function() {
  var ext = arguments[1][1];
  var extensionsArray = ext.split("|");
  var extenstions = extensionsArray.join(', ');
  return `This input must be a file of type: ${extenstions}`
}, 5, false);

Pristine.addValidator("after-date", function(value, date) {
  var date = moment(date);
  var value = moment(value);
  return value.isAfter(date);
}, "This input must be a date after ${1}", 5, false);

Pristine.addValidator("after-or-equal-date", function(value, date) {
  var date = moment(date);
  var value = moment(value);
  return value.isSameOrAfter(date);
}, "This input must be a date after or equal to ${1}", 5, false);

Pristine.addValidator("before-date", function(value, date) {
  var date = moment(date);
  var value = moment(value);
  return value.isBefore(date);
}, "This input must be a date before ${1}", 5, false);

Pristine.addValidator("before-or-equal-date", function(value, date) {
  var date = moment(date);
  var value = moment(value);
  return value.isSameOrBefore(date);
}, "This input must be a date before or equal to ${1}", 5, false);

Pristine.addValidator("date-equals", function(value, date) {
  var date = moment(date);
  var value = moment(value);
  return value.isSame(date);
}, "This input must be a date equal to ${1}", 5, false);

Pristine.addValidator("between", function(value, min, max) {
  return parseInt(min) <= value && value <= parseInt(max)
}, "This input must be between ${1} and ${2}", 5, false);

Pristine.addValidator("different", function(value, field) {
  var fieldValue = document.querySelector('#' + field).value;
  return fieldValue.trim() != value.trim()
}, "This input and ${1} must be different", 5, false);

Pristine.addValidator("same", function(value, field) {
  var fieldValue = document.querySelector('#' + field).value;
  return fieldValue.trim() == value.trim()
}, "This input and ${1} must match", 5, false);

Pristine.addValidator("ends-with", function(value, strings) {
  var allowedEndStrings = strings.split("|");
  var isValid = false;
  for (let i = 0; i < allowedEndStrings.length; i++) {
    var endString = allowedEndStrings[i];
    if(value.trim().endsWith(endString)){
      isValid = true;
      break;
    }
  }
  return isValid;
}, function() {
  var stringsArg = arguments[1][1];
  var stringsArray = stringsArg.split("|");
  var strings = stringsArray.join(', ');
  return `This input must end with one of the following: ${strings}`;
}, 5, false);

Pristine.addValidator("starts-with", function(value, strings) {
  var allowedStartStrings = strings.split("|");
  var isValid = false;
  for (let i = 0; i < allowedStartStrings.length; i++) {
    var startString = allowedStartStrings[i];
    if(value.trim().startsWith(startString)){
      isValid = true;
      break;
    }
  }
  return isValid;
}, function() {
  var stringsArg = arguments[1][1];
  var stringsArray = stringsArg.split("|");
  var strings = stringsArray.join(', ');
  return `This input must start with one of the following: ${strings}`;
}, 5, false);

Pristine.addValidator("gt", function(value, field) {
  var fieldValue = document.querySelector('#' + field).value;
  return value > fieldValue;
}, "This input must be greater than field ${1}", 5, false);

Pristine.addValidator("gte", function(value, field) {
  var fieldValue = document.querySelector('#' + field).value;
  return value >= fieldValue;
}, "This input must be greater than or equal field ${1}", 5, false);

Pristine.addValidator("lt", function(value, field) {
  var fieldValue = document.querySelector('#' + field).value;
  return value < fieldValue;
}, "This input must be less than field ${1}", 5, false);

Pristine.addValidator("lte", function(value, field) {
  var fieldValue = document.querySelector('#' + field).value;
  return value <= fieldValue;
}, "This input must be less than or equal field ${1}", 5, false);

Pristine.addValidator("in", function(value, string) {
  var allowedStrings = string.split("|");
  var isValid = false;
  for (let i = 0; i < allowedStrings.length; i++) {
    var allowedString = allowedStrings[i];
    if(value.trim().toLowerCase() == allowedString.trim().toLowerCase()){
      isValid = true;
      break;
    }
  }
  return isValid;
}, "This input is invalid", 5, false);

Pristine.addValidator("not-in", function(value, string) {
  var allowedStrings = string.split("|");
  var isValid = true;
  for (let i = 0; i < allowedStrings.length; i++) {
    var allowedString = allowedStrings[i];
    if(value.trim().toLowerCase() == allowedString.trim().toLowerCase()){
      isValid = false;
      break;
    }
  }
  return isValid;
}, "This input is invalid", 5, false);

Pristine.addValidator("required-if", function(value, field, fieldVal) {
  var isRequired = false;
  var fieldValue = document.querySelector('#' + field).value;
  if(fieldValue.trim() == fieldVal.trim()){
    isRequired = true;
  }

  var isValid = true;
  if (isRequired) {
    if (value.length == 0) {
      isValid = false
    }
  }

  return isValid;
}, "This input field is required when ${1} is ${2}", 5, false);

Pristine.addValidator("required-unless", function(value, field, fieldVal) {
  var isRequired = false;
  var fieldValue = document.querySelector('#' + field).value;
  if(fieldValue.trim() != fieldVal.trim()){
    isRequired = true;
  }

  var isValid = true;
  if (isRequired) {
    if (value.length == 0) {
      isValid = false
    }
  }

  return isValid;
}, "This input field is required unless ${1} is ${2}", 5, false);

Pristine.addValidator("required-with", function(value, fields) {
  var isRequired = false;

  var otherFields = fields.split("|");
  for (let i = 0; i < otherFields.length; i++) {
    var otherField = otherFields[i];
    var fieldValue = document.querySelector('#' + otherField).value;
    if (fieldValue) {
      isRequired = true;
      break;
    }
  }

  var isValid = true;
  if (isRequired) {
    if (value.length == 0) {
      isValid = false
    }
  }

  return isValid;
}, function() {
  var fieldsArg = arguments[1][1];
  var fieldsArray = fieldsArg.split("|");
  var fields = fieldsArray.join(' / ');
  return `This input field is required when ${fields} is present`;
}, 5, false);

Pristine.addValidator("required-without", function(value, fields) {
  var isRequired = false;

  var otherFields = fields.split("|");
  for (let i = 0; i < otherFields.length; i++) {
    var otherField = otherFields[i];
    var fieldValue = document.querySelector('#' + otherField).value;
    if (fieldValue.length == 0) {
      isRequired = true;
      break;
    }
  }

  var isValid = true;
  if (isRequired) {
    if (value.length == 0) {
      isValid = false
    }
  }

  return isValid;
}, function() {
  var fieldsArg = arguments[1][1];
  var fieldsArray = fieldsArg.split("|");
  var fields = fieldsArray.join(' / ');
  return `This input field is required when ${fields} is not present`;
}, 5, false);

Pristine.addValidator("required-with-all", function(value, fields) {
  var isRequired = true;

  var otherFields = fields.split("|");
  for (let i = 0; i < otherFields.length; i++) {
    var otherField = otherFields[i];
    var fieldValue = document.querySelector('#' + otherField).value;
    if (fieldValue.length == 0) {
      isRequired = false;
      break;
    }
  }

  var isValid = true;
  if (isRequired) {
    if (value.length == 0) {
      isValid = false
    }
  }

  return isValid;
}, function() {
  var fieldsArg = arguments[1][1];
  var fieldsArray = fieldsArg.split("|");
  var fields = fieldsArray.join(' / ');
  return `This input field is required when ${fields} are present`;
}, 5, false);

Pristine.addValidator("required-without-all", function(value, fields) {
  var isRequired = true;

  var otherFields = fields.split("|");
  for (let i = 0; i < otherFields.length; i++) {
    var otherField = otherFields[i];
    var fieldValue = document.querySelector('#' + otherField).value;
    if (fieldValue) {
      isRequired = false;
      break;
    }
  }

  var isValid = true;
  if (isRequired) {
    if (value.length == 0) {
      isValid = false
    }
  }

  return isValid;
}, function() {
  var fieldsArg = arguments[1][1];
  var fieldsArray = fieldsArg.split("|");
  var fields = fieldsArray.join(' / ');
  return `This input field is required when none of ${fields} are present`;
}, 5, false);
