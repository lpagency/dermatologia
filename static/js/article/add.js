$(document).ready(function(){
    var image = $('#image-preview').val();

    if(image!==''){
        $("#article-input-image").fileuploader("loadimages", [{
            images : [{
                name : "bug_2.png",
                src : $("#image-preview").val(),
                value : $("#image-preview").val()
            }]
        }]);
    }

});