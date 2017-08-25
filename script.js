
init_tinymce = function () {
    
tinymce.init({
  selector: 'textarea',
  /*height: 500,*/
  theme: 'modern',
  resize: false,
  style_formats: [
    {    title: 'Heading 4',    block: 'h4'  }, 
    {    title: 'Heading 5',    block: 'h5'  }, 
    {    title: 'Heading 6',    block: 'h6'  }, 
    {    title: 'Times New Roman',    inline: 'span',    styles: {      'font-family': 'Times New Roman'    }  }, 
    {    title: 'Arial',    inline: 'span',    styles: {      'font-family': 'Arial'    }  }, 
    {    title: 'Arial Black',    inline: 'span',    styles: {      'font-family': 'Arial Black'    }  }, 
    {    title: '8px',    inline: 'span',    styles: {      'font-size': '8px'    }  }, 
    {    title: '10px',    inline: 'span',    styles: {      'font-size': '10px'    }  }, 
    {    title: '12px',    inline: 'span',    styles: {      'font-size': '12px'    }  }, 
    {    title: '14px',    inline: 'span',    styles: {      'font-size': '14px'    }  }, 
    {    title: '18px',    inline: 'span',    styles: {      'font-size': '18px'    }  }, 
    {    title: '24px',    inline: 'span',    styles: {      'font-size': '24px'    }  }, 
    {    title: '36px',    inline: 'span',    styles: {      'font-size': '36px'    }  }, 
    {    title: 'Indent 2 em',    block: 'p',    styles: {      'text-indent': '2em'    }  },
    {    title: 'Float Right',    block: 'div',    styles: {      'float': 'right', 'margin-left': '1em', 'margin-bottom': '1em', 'clear': 'both'    }  },

    {    title: 'Float Left',    block: 'div',    styles: {      'float': 'left', 'margin-right': '1em', 'margin-bottom': '1em;', 'clear': 'both'    }  }
  ],
  plugins: [
    'advlist autolink lists link image charmap print preview hr anchor pagebreak',
    'searchreplace wordcount visualblocks visualchars code fullscreen',
    'insertdatetime media nonbreaking save table contextmenu directionality',
    'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'
  ],
  toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
  toolbar2: 'link image tableprops | print preview media | forecolor backcolor emoticons | codesample code ',
  image_advtab: true,
  templates: [{
    title: 'Test template 1',
    content: 'Test 1'
  }, {
    title: 'Test template 2',
    content: 'Test 2'
  }],
  content_css: [
    '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
    '//www.tinymce.com/css/codepen.min.css'
  ]
});

};  // init_tinymce = function () {

$(function () {
    //init_tinymce(); 
});

// ----------------------

var _file_name_change = function () {
    var _file_name = $("#file_name").val().trim();
    
    if (_file_name !== "") {
        document.title = _file_name;
    }
};

$(function () {
    $("#file_name").change(_file_name_change);
    _file_name_change();
});

// ----------------------

var _save_file = function () {
    var _file_name = $("#file_name").val().trim();
    var _file_content = $("#file_content").val().trim();
    var _file_format = $("#file_format").val();
    
    // ---------------
    
    _file_name = _save_file_name_filter(_file_name, _file_format);
    
    // -----------
    
    _file_content = _save_file_content_filter(_file_content, _file_name);
    
    // -------------
    
    var _character_encoding = "utf-8";
    
    // ------------
    
    var blob = new Blob([_file_content], {type: "text/html;charset=" + _character_encoding});
    saveAs(blob, _file_name);
};

var _save_file_name_filter = function (_file_name, _file_format) {
    if (_file_format === "html") {
        if (_file_name.endsWith(".html") === false 
                && _file_name.endsWith(".htm") === false) {
            _file_name = _file_name + ".html";
        }
    }
    else if (_file_format === "odt") {
        if (_file_name.endsWith(".odt") === false) {
            _file_name = _file_name + ".odt";
        }
    }
    
    return _file_name;
};


var _save_file_content_filter = function (_file_content, _file_name) {
    return '<html><head><title>' + _file_name +'</title></head>' 
            + '<body>' + _file_content + '</body>'
            + '</html>';
};

$(function () {
    $("#save_button").click(_save_file);
});

// ----------------------

var _preview_file = function () {
    
    var _file_name = $("#file_name").val().trim();
    var _file_content = $("#file_content").val().trim();
    var _file_format = $("#file_format").val();
    
    _file_name = _save_file_name_filter(_file_name, _file_format);
    
    var _win = window.open("", "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=780, height=200, top="+(screen.height-400)+", left="+(screen.width-840));
    _win.document.body.innerHTML = _file_content;
    _win.document.title = _file_name;
};

$(function () {
    $("#preview_button").click(_preview_file);
    //_preview_file(); //for test
});