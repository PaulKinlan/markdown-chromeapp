onload = function() {
  var mdEl = document.getElementById("markdown");
  var htmlEl = document.getElementById("html");
  var open = document.getElementById("open"); 
  var newFile = document.getElementById("new"); 
  var save = document.getElementById("save"); 
  var print = document.getElementById("print"); 

  var md = require( "markdown" ).markdown;

  var fileReference;
  
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
      fileReference = fileEntry;

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

  var saveMarkdown = function(fileEntry) {
    var blobData = new Array(mdEl.value.length);
    for(var i = 0; i < mdEl.value.length; i++) {
      blobData[i] = mdEl.value[i];//.charCodeAt(i);
    }
       
    var blob = new Blob(blobData);
    blob.type = "text/plain";
        
    fileEntry.createWriter(function(writer) {
      writer.truncate(function() { });

      writer.write(blob);
    });
  };

  save.onclick = function() {
    if(!!fileReference == false) {
      chrome.fileSystem.chooseEntry({ type: "saveFile" }, function(fileEntry) {
        if(!!fileEntry == false) return;
        fileReference = fileEntry;
        saveMarkdown(fileReference); 
      });
    }
    else {
      saveMarkdown(fileReference); 
    } 
  };
};
