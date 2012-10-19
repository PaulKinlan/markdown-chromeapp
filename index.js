onload = function() {
  var mdEl = document.getElementById("markdown");
  var htmlEl = document.getElementById("html");
  var open = document.getElementById("open"); 
  var newFile = document.getElementById("new"); 
  var save = document.getElementById("save"); 
  var print = document.getElementById("print"); 

  var md = require( "markdown" ).markdown;
  
  mdEl.onkeypress = function() {
    var output = md.toHTML( mdEl.value );
    htmlEl.innerHTML = output;
  };

  newFile.onclick = function() {
    mdEl.value = "";
    html.innerHTML = "";
  };

  open.onclick = function() {
    chrome.fileSystem.chooseEntry({ type: "openWritableFile" }, function(fileEntry) {
      if(!!fileEntry == false) return;

      fileEntry.file(function(theFile) {
        var reader = new FileReader();
        reader.onload = function(e) {
          mdEl.value = e.target.result;
          var output = md.toHTML( mdEl.value );
          htmlEl.innerHTML = output;
        };
        reader.onerror = function(e) { 
          console.log(e); 
        };
        reader.readAsText(theFile);
      });
    });
  };
};
