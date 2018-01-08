/*var productImagesArray = new Array();

var productAdd = function()
{
    var product_list_div = $("div#product-list");

    // $("#product-input-image").hide();
    $("#product-input-image").on("change", function(evt) {
        var files = evt.target.files;        
        var i = 0;
        for (i = 0; i < files.length; i++){
            var reader = new FileReader();
            reader.onload = function(e) {
                $("#preview-image-holder").attr("src", e.target.result);
                productImagesArray.push($("#preview-image-holder").attr("src"));
                product_list_div.html("");
                
                for (i = 0; i < productImagesArray.length; i++) {
                    var template = $(".product-template").html();
                    template = template.replace(";;src;;", productImagesArray[i]);
                    template = template.replace(";;index;;", i);
                    product_list_div.append(template);
                }
                // $("#product-input-image").val("");
            }
            reader.readAsDataURL(this.files[i]);
        }
    });

    //To make template image clickables...
    product_list_div.delegate("i#image-remover", "click", function() {
        //ERASE IMAGE
        var array_size = productImagesArray.length;
        if (array_size == 1) {
            productImagesArray = new Array();
            product_list_div.html("");
        } else {
            var target_to_erase = parseInt(($(this).attr("index")));
            var auxArray = new Array();
            var i = 0;
            for (i; i < array_size; i++) {
                if (i != target_to_erase) {
                    auxArray.push(productImagesArray[i]);
                }
            }
            productImagesArray = auxArray;
            product_list_div.html("");
            for (i = 0; i < productImagesArray.length; i++) {
                var template = $(".product-template").html();
                template = template.replace(";;src;;", auxArray[i]);
                template = template.replace(";;index;;", i);
                product_list_div.append(template);
            }
        }
    });
}

$(document).ajaxComplete(function()
{
    productAdd();
});

$(document).ready(function() 
{
    productAdd();
});*/