
$.me = function(){};

/**
 * return necesary transform for an image to be centered on a canvas
 * @param  {List} canvas_size pair values that indcate canvas size [width, height]
 * @param  {List} image_size  pair values that indcate image size [width, height]
 * @param  {List} offset      pair of values indicating percentual points of offset [x, y] (optional)
 * @return {List}             list that contains all transformation must be applied
 *                                 i.e.:
 *                                 [width, height, left, top]
 * 
 */
$.me.getTransform = function(canvas_size, image_size, offset)
{

    var off = offset === undefined ? [50, 50] : offset;
    var width = canvas_size[0];
    var height = canvas_size[1];
    var offset_x = 0;
    var offset_y = 0;
    var factor = 1;

    var x_gap = 0;
    var y_gap = 0;

    if (image_size[0] > image_size[1])  // when width is bigger than height
    {
        factor = canvas_size[1] / image_size[1];
        width = parseInt(image_size[0] * factor); // escale image width in order to fit image height in canvas
    }
    else
    {
        factor = canvas_size[0] / image_size[0];
        height = parseInt(image_size[1] * factor); // escale image width in order to fit image width in canvas
    }

    offset_x = parseInt((canvas_size[0] / 2));
    offset_y = parseInt((canvas_size[1] / 2));

    offset_x -= width  * (off[0] / 100);
    offset_y -= height * (off[1] / 100);

    offset_x = offset_x > 0 ? 0 : offset_x;
    offset_y = offset_y > 0 ? 0 : offset_y;

    // this is the gap between end of image and end of canvas
    x_gap = (width + offset_x) - canvas_size[0];
    y_gap = (height + offset_y) - canvas_size[1];

    offset_x = x_gap < 0 ? offset_x - x_gap : offset_x;
    offset_y = y_gap < 0 ? offset_y - y_gap : offset_y;

    // fix bug of not enough flattern images
    if (offset_x > 0)
    {
        // factor = canvas_size[0] / canvas_size[1];
        // width = canvas_size[0];
        // height = parseInt(image_size[1] * factor);
        width = canvas_size[0];
        height = "auto";
        offset_x = 0
    }

    return [width,height,offset_x,offset_y];
}

$(document).ready(function()
{
    // $("[lp-image-loader]").lp_image_preview({
    //     'img_selector' : '.image-preview',
    //     'callback' : function(image_name, image_extension)
    //     {
    //         console.log( image_name );
    //     }
    // });

    // masked input
    // $(".date").mask("99/99/9999 99:99",{placeholder:"dd/mm/yyyy hh:mm"});
    // 
});