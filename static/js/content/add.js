/*global GalleryController */
/*global AddProfileController*/
/*global site_base*/
/*global FileUploaderTemplates*/
/*global textboxio*/
/*global content_manager_url*/

'use strict';

var ContentAddModel = 
{
};

var ContentAddView = function(controller)
{
    this.controller = controller;

    this.options = {
        contentAddButton : '.btn-new-content',
        contentAddURL : site_base + '/content/add_form',
        contentLightbox : '.descripcion_contenido',
        contentEditButton : '.edit_button'
    };

    this.init();
};

ContentAddView.prototype.init = function() 
{
    var self = this;
    $(document).on(
        'click', this.options.contentAddButton, function()
        {
            self.render();
        });

    $(document).on(
        'click', this.options.contentEditButton, function(evt)
        {
            $(".content-manager").attr("src", $(this).attr('href'));
            // self.renderEdit($(this).attr('href'));
            evt.preventDefault();
        });
};

ContentAddView.prototype.render = function() 
{
    $(".content-manager").attr("src", content_manager_url + "me/content/add");
    // var self = this;
    // $.get(
    //     this.options.contentAddURL, 
    //     function(html)
    //     {
    //         $(self.options.contentLightbox).html(html);
    //         self.initOthers();

    //         // init date field
    //         // $('.date').mask('99/99/9999 99:99',{placeholder:'dd/mm/yyyy hh:mm'});
    //     });
};


ContentAddView.prototype.initOthers = function() 
{
    this.initWYSIWYG();

    this.initImageLoader();
    // $('[lp-image-loader]').lp_image_preview({
    //     'img_selector' : '.image-preview',
    //     'callback' : function(image_name, image_extension)
    //     {
    //         $('.form-added-image').show();
    //     }
    // });

    this.initDatetimePicker();

    this.controller.gallery_controller.init();
    this.controller.profile_controller.init();
};

ContentAddView.prototype.initDatetimePicker = function()
{
    if($('#datetimepicker').length){
        $('#datetimepicker').datetimepicker({
            format: 'DD/MM/YYYY  HH:mm'
        });
    }
};


ContentAddView.prototype.initImageLoader = function() 
{
    var image = null;
    var image_list = [];
    var old_images = $.trim($('.content-add-form-prev-data').html());

    old_images = old_images === '' || old_images === undefined ? [] : $.parseJSON(old_images);

    for (var i = 0; i < old_images.length; i++) 
    {
        image = old_images[i];
        image_list.push({
            'name' : 'foo.png',
            'src' : image.url,
            'value' : JSON.stringify(image)
        });
    }

    // setting template
    FileUploaderTemplates['imgup-image-add-template'] = ' \
    <li class="imgup-add-input-container" > \
        <div class="form-add-image" id="gallery-add-image-button"> \
            <i class="icon-plus icon-generic"></i> \
            <input type="file" class="imgup-add-input"/> \
        </div> \
    </li>';

    $('.content-add-form-input').fileuploader({
        bseurl : '',
        uploadurl : 'https://static.loadingplay.com/image/upload', //site_base + '/gallery/addimage',
        thumbnail_origin : 'remote',
        thumbnail : 'thumb_200',
        multi : false,
        images : image_list
    });

    /*
    use to validate if images are loaded: 
    $('.gallery-add-form-input').fileuploader('isready')
    */
};


ContentAddView.prototype.renderEdit = function(href) 
{
    $('.b_logo').css('display','none');
    var self = this;

    $.get(
        href, 
        function(html)
        {
            $(self.options.contentLightbox).html(html);
            $('.step_two').fadeIn(500);
            self.initOthers();
        }
    );
};

ContentAddView.prototype.initWYSIWYG = function() 
{

    try
    {
        var editors = textboxio.get('.textboxio');

        for(var i=0; i< editors.length; i++){
            var e = editors[i];
            e.restore();
        }

        var config = {
            images : {
                upload : {
                    handler : function (data, success, failure) {
                        // For example, if myuploader.upload() returns a promise, e.g. jQuery ajax
                        $.post(
                            'https://static.loadingplay.com/image/upload',
                            {
                                "data": data.base64(),
                                "name": data.filename(),
                                "extension": 'png'
                            },
                            null,
                            'json'
                        ).then(function (response) {
                            var url_thumb = response.thumb_200;
                            success(url_thumb);
                        }, function () {
                            failure("my failure message");
                        });
                    }
                }
            }
        };
        textboxio.replaceAll('.step_two .textboxio', config);
    }
    catch(ex)
    {
        // nothing here
    }
    // editor.content.set($('.step_two .textbox').html());

    // @todo : SI!, esto esta -a la mala- por ahora... ya lo dejo hermoso, chill.
    // var editor_gallery = new wysihtml5.Editor('wysihtml5-gallery-textarea', { // id of textarea element
    //     toolbar:      'wysihtml5-gallery-toolbar', // id of toolbar element
    //     parserRules:  wysihtml5ParserRules // defined in parser rules set 
    // });
    // var wysi; 
    // if($('#wysihtml5-event-textarea').length)
    // {
    //     wysi = new wysihtml5.Editor(
    //         'wysihtml5-event-textarea', 
    //         { // id of textarea element
    //             'font-styles': false,
    //             toolbar:      'wysihtml5-event-toolbar', // id of toolbar element
    //             parserRules:  wysihtml5ParserRules // defined in parser rules set 
    //         });
    // }
    // if($('#wysihtml5-article-textarea').length)
    // {
    //     wysi = new wysihtml5.Editor(
    //         'wysihtml5-article-textarea', 
    //         { // id of textarea element
    //             'font-styles': false,
    //             toolbar:      'wysihtml5-article-toolbar', // id of toolbar element
    //             parserRules:  wysihtml5ParserRules // defined in parser rules set 
    //         });
    // }
    // if($('#wysihtml5-gallery-textarea').length)
    // {
    //     wysi = new wysihtml5.Editor(
    //         'wysihtml5-gallery-textarea', 
    //         { // id of textarea element
    //             'font-styles': false,
    //             toolbar:      'wysihtml5-gallery-toolbar', // id of toolbar element
    //             parserRules:  wysihtml5ParserRules // defined in parser rules set 
    //         });
    // }
    // if($('#wysihtml5-product-textarea').length)
    // {
    //     wysi = new wysihtml5.Editor(
    //         'wysihtml5-product-textarea', 
    //         { // id of textarea element
    //             'font-styles': false,
    //             toolbar:      'wysihtml5-product-toolbar', // id of toolbar element
    //             parserRules:  wysihtml5ParserRules // defined in parser rules set 
    //         });
    // }
};


var ContentAddController = function()
{
    this.model = ContentAddModel;
    this.view = new ContentAddView(this);


    this.gallery_controller = new GalleryController();
    this.profile_controller = new AddProfileController();
};


$(document).ready(function()
{
    var content_add_controlle = new ContentAddController();  // jshint ignore: line
});