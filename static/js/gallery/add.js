
/* global FileUploaderTemplates: true */
'use strict';

var imagesArray = [];  //jshint ignore: line


var GalleryView = function(controller)
{
    this.controller = controller;
    this.$element = $.noop();
};


GalleryView.prototype.init = function() 
{
    var image = null;
    var image_list = [];
    var old_images = $.trim($('.gallery-add-form-prev-data').html());

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

    // console.log(old_images);

    FileUploaderTemplates['imgup-image-add-template'] = ' \
        <li class="imgup-add-input-container" > \
            <div class="form-add-image" id="gallery-add-image-button"> \
                <i class="icon-plus icon-generic"></i> \
                <input type="file" class="imgup-add-input" multiple="multiple" /> \
            </div> \
        </li>';

    $('.gallery-add-form-input').fileuploader({
        bseurl : '',
        uploadurl : 'https://static.loadingplay.com/image/upload', //site_base + "/gallery/addimage",
        thumbnail_origin : 'remote',
        thumbnail : 'thumb_200',
        images : image_list
    });

    $('#submit_gallery_form').on('click', function(evt)
    {
        if (!$('.gallery-add-form-input').fileuploader('isready'))
        {
            evt.preventDefault();
            var $error_images = $('.error[for=image]', '.gallery-add-form');

            $error_images.html('Las imagenes se estan cargando, espere por favor');
            $error_images.fadeIn('slow');
        }

        // console.log("eeee");
    });
};

var GalleryController = function()
{
    this.view = new GalleryView(this);
};

GalleryController.prototype.init = function() 
{
    this.view.init();
};
