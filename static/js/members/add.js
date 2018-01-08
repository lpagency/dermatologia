/* global FileUploaderTemplates */

'use strict';

var AddProfileView = function(controller)
{
    this.controller = controller;
    this.options = {
        profilePicture : '.profile-picture',
        profileInput : '.profile_picture_input',
        companyInput : '.company_picture_input',
        companyPicture : '.company-picture'
    };
};

AddProfileView.prototype.init = function()
{
    var $profile_picture = $(this.options.profileInput);
    var $company_picture = $(this.options.companyInput);

    try
    {
        this.initPicture($company_picture, '.company-image-prev-data');
        this.initPicture($profile_picture, '.profile-image-prev-data');
    }
    catch(ex)
    {
        // nothing here
    }
};

AddProfileView.prototype.initPicture = function($picture, image_prev_data_selector) 
{
    var image = null;
    var image_list = [];
    var old_images = $.trim($(image_prev_data_selector).html());

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

    FileUploaderTemplates['imgup-image-add-template'] = ' \
        <li class="imgup-add-input-container" > \
            <div class="form-add-image" id="gallery-add-image-button"> \
                <i class="icon-plus icon-generic"></i> \
                <input type="file" class="imgup-add-input" multiple="multiple" /> \
            </div> \
        </li>';

    $picture.fileuploader({
        bseurl : '',
        uploadurl : 'https://static.loadingplay.com/image/upload', //site_base + "/gallery/addimage",
        thumbnail_origin : 'remote',
        thumbnail : 'thumb_200',
        images : image_list
    });
};


AddProfileView.prototype.centerImage = function($image, $container) 
{
    var size = [parseInt($container.css('width').replace('px', '')), 
                parseInt($container.css('height').replace('px', ''))];

    var image_size = [$image[0].naturalWidth,
                      $image[0].naturalHeight];

    var transform = this.controller.getTransform(size, image_size);

    $image.css('width', transform[0] + 'px');
    $image.css('height', transform[1] + 'px');
    $image.css('margin-left', transform[2] + 'px');
    $image.css('margin-right', transform[3] + 'px');
};

// controller
var AddProfileController = function()
{
    this.view = new AddProfileView(this);
};

AddProfileController.prototype.init = function() 
{
    this.view.init();
};

/**
 * return necesary transform for an image to be centered on a canvas
 * @param  {List} canvas_size pair values that indcate canvas size [width, height]
 * @param  {List} image_size  pair values that indcate image size [width, height]
 * @return {List}             list that contains all transformation must be applied
 *                                 i.e.:
 *                                 [width, height, left, top]
 * 
 */
AddProfileController.prototype.getTransform = function(canvas_size, image_size) 
{
    return $.me.getTransform(canvas_size, image_size);
};
