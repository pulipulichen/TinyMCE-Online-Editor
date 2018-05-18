
init_tinymce = function () {
    
tinymce.init({
  selector: 'textarea',
  /*height: 500,*/
  //language: 'zh_TW',
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
  /*
  templates: [{
    title: 'Test template 1',
    content: 'Test 1'
  }, {
    title: 'Test template 2',
    content: 'Test 2'
  }],
  */
  content_css: [
    '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
    // '//www.tinymce.com/css/codepen.min.css'
  ],
  setup: function(editor) {
        editor.on('change', function(e) {
            //console.log('change event', e);
            //tinymce.get('file_content').getContent();
            tinymce.triggerSave();
            _update_preview_window();
            _storage_save();
        });
    }
});

};  // init_tinymce = function () {

//$(function () {
//    init_tinymce(); 
//});

// ----------------------

var _file_name_change = function () {
    var _file_name = $("#file_name").val().trim();
    
    if (_file_name !== "") {
        document.title = _file_name;
    }
};

$(function () {
    $("#file_name").change(_file_name_change);
    //_file_name_change();
});

// ----------------------

var _save_file = function () {
    var _file_name = $("#file_name").val().trim();
    var _file_content = $("#file_content").val().trim();
    if (_file_content === "") {
        return;
    }
    
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
    
    var _timestamp = generate_time_string();
    _file_name = _file_name.split("{timestamp}").join(_timestamp);
    
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

var _preview_window = undefined;

var _preview_file = function () {
    
    var _screen_height = screen.height;
    var _screen_width = screen.width;
    _preview_window = window.open("", "tinymce_preview", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes"
                + ", left=" + parseInt(_screen_width/2, 10) + ", width=" + parseInt(_screen_width/2, 10)
                + ", top=0, height=" + _screen_height);
    
    //setTimeout(function () {
    //    _preview_window.moveTo(parseInt(_screen_width/2, 10), 0);
    //    console.log([parseInt(_screen_width/2, 10)]);
    //}, 100);
    
    _update_preview_window();
    
    // 改變自己的視窗
    //window.width = parseInt(_screen_width/2, 10);
    //window.resizeTo(parseInt(_screen_width/2, 10), _screen_height);
    //window.moveTo(0, 0);
    
    // 不能改變自己的視窗
    // https://stackoverflow.com/a/7602372/6645399
};

var _update_preview_window = function () {
    if (_preview_window === undefined 
            || _preview_window === false) {
        return;
    }
    
    var _file_name = $("#file_name").val().trim();
    var _file_content = $("#file_content").val().trim();
    var _file_format = $("#file_format").val();
    
    _file_name = _save_file_name_filter(_file_name, _file_format);
    _file_name = "(PREVIEW) " + _file_name;
    
    _preview_window.document.body.innerHTML = _file_content;
    _preview_window.document.title = _file_name;
};

$(function () {
    $("#preview_button").click(_preview_file);
    
    $("#file_name").change(_update_preview_window);
    $("#file_content").change(_update_preview_window);
    
    $(window).unload(function () {
        if (_preview_window !== undefined) {
            _preview_window.close();
        }
    });
    
    //_preview_file(); //for test
});

// ----------------------

var _new_file = function () {
    $("#file_name").val("HTML file {timestamp}").change();
    $("#file_content").val("").change();
};

$(function () {
    $("#new_button").click(_new_file);
    //_new_file(); //for test
});

// ------------------------

var _load_file = function () {
    $("#input_html_file").click();
};

$(function () {
    $("#load_button").click(_load_file);
    //_new_file(); //for test
    
});

// ----------------------------

$(function () {
    $("#file_content").change(function () {
        var _file_content = $(this).val().trim();
        if (tinymce.get('file_content') !== null) {
            tinymce.get('file_content').setContent(_file_content);
            //console.log(_file_content);
        }
    });
});

// ---------------------------------

var _load_filename_parameter = function () {
    if (parse_query_string("filename") !== null) {
        $("#file_name").val(parse_query_string("filename")).change();
    }
};

var _load_content_parameter = function () {
    if (parse_query_string("content") !== null) {
        $("#file_content").val(parse_query_string("content")).change();
    }
};

var _load_file_parameter = function () {
    if (parse_query_string("file") !== null) {
        $.get(parse_query_string("file"), function (_result)  {
            $("#file_content").val(_result);
        });
    }
};

// ---------------------------

/**
 * @type Boolean 是否啟用本地端儲存
 * @author Pulipuli Chen 20170826
 */

var STORAGE_ENABLE = true;
//STORAGE_ENABLE = false; // for test
if (typeof(Storage) === "undefined") {
    STORAGE_ENABLE = false;
}

/**
 * 儲存在localStorage
 * @author Pulipuli Chen 20170826
 */
var _storage_save = function () {
    if (STORAGE_ENABLE === false) {
        return;
    }
    
    var _file_name = $("#file_name").val().trim();
    var _file_content = $("#file_content").val().trim();
    var _file_format = $("#file_format").val();
    
    // Store
    localStorage.setItem("file_name", _file_name);
    localStorage.setItem("file_content", _file_content);
    localStorage.setItem("file_format", _file_format);
};

var _storage_load = function () {
    if (STORAGE_ENABLE === false) {
        return;
    }
    
    var _file_name = localStorage.getItem("file_name");
    var _file_content = localStorage.getItem("file_content");
    var _file_format = localStorage.getItem("file_format");

    if (_file_name !== null && _file_name !== undefined) {
        $("#file_name").val(_file_name).change();
    } 
    
    if (_file_content !== null && _file_content !== undefined) {
        $("#file_content").val(_file_content).change();
    }
    
    if (_file_format !== null && _file_format !== undefined) {
        $("#file_format").find('option[value="' + _file_format + '"]').attr("selected", "selected");
    }
    
    return this;
};

$(function () {
    $("#file_name").change(_storage_save);
    $("#file_content").change(_storage_save);
    $("#file_format").change(_storage_save);
});

// ---------------------------------

/**
 * 所有要開始啟動的功能
 */
var _startup = function () {
    _storage_load();
    
    _load_filename_parameter();
    _load_content_parameter();
            
    _load_file_parameter();
    
    _file_name_change();
    
    init_tinymce(); 
};

$(function () {
    _startup();
});
