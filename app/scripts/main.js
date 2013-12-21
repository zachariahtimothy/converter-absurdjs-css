'use strict';

var utilities = {
    parseCSS: function(css) {
        var rules = {};
        css = this.removeComments(css);
        var blocks = css.split('}');
        blocks.pop();
        var len = blocks.length;
        for (var i = 0; i < len; i++) {
            var pair = blocks[i].split('{');
            if (pair.length > 1){
                rules[$.trim(pair[0])] = this.parseCSSBlock(pair[1]);
            }
        }
        return rules;
    },

    parseCSSBlock: function(css) { 
        var rule = {};
        var declarations = css.split(';');
        declarations.pop();
        var len = declarations.length;
        for (var i = 0; i < len; i++)
        {
            var loc = declarations[i].indexOf(':');
            var property = $.trim(declarations[i].substring(0, loc));
            var value = $.trim(declarations[i].substring(loc + 1));

            if (property !== "" && value !== ""){
                rule[property] = value;
            }
        }
        return rule;
    },

    removeComments: function(css) {
        return css.replace(/\/\*(\r|\n|.)*\*\//g,"");
    }
};

var CssToAbsurd = {
    sendFormFromHTML: function (form) {

        var formData = new FormData(form);
        //formData.append('id', '123456'); // alternative to hidden fields
        var xhr = new XMLHttpRequest();
        xhr.open('POST', form.action, true);
        xhr.onload = function() { 
            var data = $.parseJSON(this.responseText);
            var parts = data.path.split('/');

            $.get('styles/' + parts[parts.length - 1], function (result) {
                var parsedCss = utilities.parseCSS(result);
             
                $.ajax({
                    type: 'POST',
                    url: '/parse',
                    data: {css: JSON.stringify(parsedCss) },
                    success: function (data) {
                        var code = "";
                        var keys = Object.keys(data);

                        keys.forEach(function (key, i) {
                            var rule = JSON.stringify(data[key]);
                            key = key.replace(/"/g, "'");
                            var ruleString = rule.replace(/{/g, '{\n     ').replace(/}/g, '\n}');
                            //TODO: Find rule comma's only and split line
                            if (i > 0) { code += "\n"; }
                            code += '"' + key + '": ' + ruleString;
                            if (i < keys.length-1){ code += ','; }
                        });
                        $('#message pre code').html(code);
                        
                        $('.panel-2').click();
                    },
                    error: function (error) {
                        $('#message').html(error);
                    }
                });
            });
        };
        xhr.send(formData);
        return false;
    }
};

$(function () {
    $('#uploadForm').submit(function (event) {
        event.preventDefault();
        CssToAbsurd.sendFormFromHTML(this);
    });

    var $panels = $('.panel');
    $panels.on('click', function (event) {
        $panels.not(this).find('.panel-body').slideUp('fast');
        $(this).find('.panel-body').slideDown('fast');

    });

    $.zeroclipboard({
        moviePath: '/bower_components/zeroclipboard/ZeroClipboard.swf',
        activeClass: 'active',
        hoverClass: 'hover'
    });

    $('.copy-to-clipboard').zeroclipboard({
        dataRequested: function (event, setText) {
            // In order to dynamically set the text to copy to the clipboard
            // at the time the mouse clicks the button
            // NOTE: this function is called within the execution context of the flash movie,
            // therefore any exception might be silently ignored.
            // NOTE 2: the function "setText" should be called during the execution of this
            // callback otherwise the text copied on the clipboard will not be correct.
            // Therefore any AJAX call should be configured to be SYNCHRONOUS
            setText($('#message pre code').text());
        },
        complete: function () {
            $('#message button').after('<span class="well well-sm">AbsurdJS styles copied to clipboard!</span>');
        }
    });

    prettyPrint();
});
