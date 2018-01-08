$(document).ready(function(){
    var editor = textboxio.inline('#description');
    
    $('#description').blur(function () {
        // do something
        $.post(
            $("#article-description-ajax-url").val(),
            {
                "content_id": $("#article-content-id").val(),
                "description": editor.content.get()
            }
            );
    });
});