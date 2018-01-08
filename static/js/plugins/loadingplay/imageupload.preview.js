/**
 * lp_image_preview
 * this plugin takes the onchange event from any input,
 * and load image into some "img" element. "img" element
 * could be selected with @param : img_selector
 *
 * @param {String} img_selector a jquery selector that 
 *                              points to an <img> element
 * @param {function} callback   method is called on image 
 *                              loaded. some params are passed
 *                              @param : image_name
 *                              @param : image_extension
 *
 * @sample : 
 * $(document).ready(function()
 * {
 *     $(".some_input").lp_image_preview({
 *         "img_selector" : ".img_object",
 *         "callback" : function(image_name, image_extension)
 *         {
 *             // if image is test.png, then output "test.png"
 *             console.log(image_name + "." + image_extension);
 *         }
 *     });
 * });
 */
(function ( $, window, document, undefined ) {
    
    // Create the defaults once
    var pluginName = 'lp_image_preview';

    $.fn[pluginName] = function ( options ) 
    {
        var defaults = {
            'img_selector' : 'img',
            'callback' : function(image_name, image_extension){}
        };

        options = $.extend({}, defaults, options);

        return this.each(function () 
        {
            if (!$.data(this, 'plugin_' + pluginName)) 
            {
                $.data(
                    this, 
                    'plugin_' + pluginName, 
                    new ImagePreview( this, options ));
            }
        });
    };

})( jQuery, window, document ); // jshint ignore: line

var ImagePreview = function( obj, options )
{
    var self = this;

    this.obj = obj;
    this.image_obj = $(options.img_selector);
    this.callback = options.callback;

    $(this.obj).change(function()
    {
        self.inputChange();
    });
};

ImagePreview.prototype.inputChange = function() 
{
    var self = this;
    if( this.obj.files && this.obj.files[0] )  // has somefile
    {
        var reader = new FileReader();
        reader.onload = function(e)
        {
            self.fileLoaded(e);
        }
        reader.readAsDataURL(this.obj.files[0]);
    }
};

ImagePreview.prototype.fileLoaded = function(e) 
{
    var image_path = this.obj.value.split("\\");
    var image_name = image_path[image_path.length - 1]
                        .split(".")[0]; 
    var image_extension = image_path[image_path.length - 1]
                        .split(".")[1];

    this.image_obj.attr("src", e.target.result);
    this.callback.call(this.image_obj, image_name, image_extension);
};
