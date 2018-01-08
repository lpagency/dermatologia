var imageResize = function($img)
{
    if ($img.hasClass("no-resize"))
        return;

    var offset = [parseInt($img.attr("offsetx")), 
                  parseInt($img.attr("offsety"))];
    var $canvas = $img.parent().parent();

    if ($canvas.width() == 0)
    {
        $canvas = $img.parent();
    }

    var image_size = [$img[0].naturalWidth, $img[0].naturalHeight];
    var canvas_size = [parseInt($canvas.css("width").replace("px", "")), 
                        parseInt($canvas.css("height").replace("px", ""))];

    var transform = $.me.getTransform(canvas_size, image_size, offset);

    $img.width(transform[0]);
    $img.height(transform[1]);
    $img.css("margin-left", transform[2] + "px");
    $img.css("margin-top", transform[3] + "px");
    $img.css("max-width", "auto");
}

$(document).ready(function()
{
    $("img.lazy").lazyload({
        effect : "fadeIn",
        load : function()
        {
            imageResize($(this));
        }
    });

    $(window).resize(function()
    {
        $("img.lazy").each(function()
        {
            imageResize($(this));
        });
    });
});