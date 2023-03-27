let editor;

window.onload = function() {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/cobalt");
    editor.session.setMode("ace/mode/c_cpp");
}
function changeLanguage() {

    let language = $("#languages").val();

    if(language == 'c' || language == 'cpp')editor.session.setMode("ace/mode/c_cpp");
    else if(language == 'java')editor.session.setMode("ace/mode/java");
    else if(language == 'python')editor.session.setMode("ace/mode/python");
}

function executeCode() {

    $.ajax({

        url: "/ide/app/compiler.php",

        method: "POST",

        data: {
            language: $("#languages").val(),
            code: editor.getSession().getValue()
        },

        success: function(response) {
            $(".output").text(response)
        }
    })
}

function saveFile() {
  
  let data = editor.getSession().getValue();
  const textToBLOB = new Blob([data], { type: 'text/plain' });
  textToBLOB.text().then(text => {console.log(text)})
  const sFileName = 'inputCode.cpp';

  const codeData = {
      filename: sFileName,
      data: textToBLOB
  }

  //
  // document.getElementById('Output.txt')
  //   .addEventListener('change', function() {
  //
  //     var fr=new FileReader();
  //     fr.onload=function(){
  //         document.getElementById('output')
  //           .textContent=fr.result;
  //     }
  //
  //     fr.readAsText(this.files[0]);
  // })
}