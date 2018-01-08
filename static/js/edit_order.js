/*global $*/
/*global site_base*/

'use strict';

$(document).ready(function()
{
    $(document).on('keydown', '.edit-order', function(evt)
    {
        if (evt.keyCode === 13)
        {
            $(this).blur();
        }
    });

    $(document).on('blur', '.edit-order', function()
    {
        var json_data = {
            content_id : $(this).attr('content-id'),
            page : $(this).attr('page'),
            value : $(this).val()
        };

        $.post(site_base + '/content/order', json_data, function()
        {
            document.location.reload();
        });
    });
});