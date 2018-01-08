//var expr = /^1[8-9]|[2-5]\d|60$/;
var expr_url = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/; //expression for a url
var expr_mail = /^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
var expr_numbers = /^[0-9+]{1,50}(,[0-9]{0,2})?$/;

/**
 * a set of validations, used for test forms
 */
var Validations = function()
{};

/**
 * validate if passed params is an url
 *
 * also return true if the url is empty.
 * @param  {string}  url a string to be validated
 * @return {Boolean}     true if the format fits with an URL or empty
 *                       false if is not an URL
 */
Validations.prototype.isURL = function(url) 
{
    if (url === "") 
        return true;
    return expr_url.test(url);
};

/**
 * validate if a name is a valid string
 * @param  {string}  name the string to be validated
 * @return {Boolean}      true if is valid
 */
Validations.prototype.isValidName = function(name) 
{
    name = $.trim(name);
    return name !== "";
};

/**
 * validate if a given parameter is an integet
 * @param  {Object}  n n could be an string with an int inside and will return true
 * @return {Boolean}   true if @param n can be parsed to integer
 */
Validations.prototype.isInteger = function(n) 
{
    n = parseInt(n);
    return !isNaN(n);
};

/**
 * validate if a given price is valid
 * @param  {Object}  price can be a string or integer
 * @return {Boolean}       true if the price can be parsed to integer
 *                         false if nan
 */
Validations.prototype.isValidPrice = function(price) 
{
    return this.isInteger(price);
};

/**
 * validate if a given quantity is a valid number
 * @param  {Object}  quantity can be string or integer
 * @return {Boolean}          true if the quantity can be parsed to integer
 *                            false if nan
 */
Validations.prototype.isValidQuantity = function(quantity) 
{
    return this.isInteger(quantity);
};

/**
 * validate if a given url ends with ".png"
 * @param  {String}  url full url to an image
 * @return {Boolean}     true if image ends with ".png" or ".PNG" 
 */
Validations.prototype.isPNG = function(url) 
{
    // get extension
    var suffix = "png";
    url = url || "";

    return url
            .toLowerCase()
            .indexOf(suffix, this.length - suffix.length) !== -1;
};

Validations.prototype.isJPG = function(url) 
{
    var suffix = "jpg";
    url = url || "";

    return url
            .toLowerCase()
            .indexOf(suffix, this.length - suffix.length) !== -1;
};

Validations.prototype.isImage = function(url) 
{
    return (this.isPNG(url) || this.isJPG(url));
};

Validations.prototype.isEMAIL = function(email) 
{
    //if (email === "") 
        //return true; 
    return expr_mail.test(email);
};

/**
 * validate the add product form, also update view for error messages
 * @return {Boolean} true if the form is valid
 */
Validations.prototype.validateAddProduct = function() 
{
    var errors = 0;

    var name = $("input[name=name]", ".product-add-form").val();
    var image = $("input[name=image]", ".product-add-form").val();
    var price = $("input[name=price]", ".product-add-form").val();
    var stock = $("input[name=stock]", ".product-add-form").val();

    if (!this.isValidName(name))
    {
        $(".error[for=name]", ".product-add-form").fadeIn("slow");
        errors ++;
    }
    else
    {
        $(".error[for=name]", ".product-add-form").fadeOut("slow");
    }

    if (!this.isImage(image)) 
    {
        $(".error[for=image]", ".product-add-form").fadeIn("slow");
        errors ++;
    }
    else
    {
        $(".error[for=image]", ".product-add-form").fadeOut("slow");
    }

    if (!this.isValidPrice(price)) 
    {
        $(".error[for=price]", ".product-add-form").fadeIn("slow");
        errors ++;
    }
    else
    {
        $(".error[for=price]", ".product-add-form").fadeOut("slow");
    }

    if (!this.isValidQuantity(stock)) 
    {
        $(".error[for=stock]", ".product-add-form").fadeIn("slow");
        errors ++;
    }
    else
    {
        $(".error[for=stock]", ".product-add-form").fadeOut("slow");
    }

    return errors === 0;
};

Validations.prototype.validateAddArticle = function() 
{
    var article_title = $("input[name=title]", ".article-add-form").val();
    var article_bajada = $("input[name=caption]", ".article-add-form").val();
    var article_text = $("textarea[name=text]", ".article-add-form").val();
    var image_path = $("input[name=image]", ".article-add-form").val();
    var errors = 0;


    if(article_title === "" || article_title.length > 50)
    {
        $(".error[for=title]", ".article-add-form").text("Ingrese un título. Max 50 caracteres. Actualmente tienes " + article_title.length);
        $(".error[for=title]", ".article-add-form").fadeIn("slow");
        errors++;
    }
    else
    {
        $(".error[for=title]", ".article-add-form").fadeOut();
    }

    if(article_bajada === "" || article_bajada.length > 500)
    {
        $(".error[for=caption]", ".article-add-form").text("Ingrese un texto. Máximo de 500 caracteres. Actualmente tienes " + article_bajada.length);
        $(".error[for=caption]", ".article-add-form").fadeIn("slow");
        errors++;
    }
    else
    {
        $(".error[for=caption]", ".article-add-form").fadeOut();
    }

    if(article_text == ""){
        $(".error[for=text]", ".article-add-form").fadeIn("slow");
        errors++;
    }else{
        $(".error[for=text]", ".article-add-form").fadeOut();
    }

    if(image_path == ""){
        $(".error[for=image]", ".article-add-form").fadeIn("slow");
        errors++;
    }else{
        $(".error[for=image]", ".article-add-form").fadeOut();
    }

    if (!this.isImage(image_path))
    {
        $(".error[for=image]", ".article-add-form").fadeIn("slow");
        errors++;
    } else {
        $(".error[for=image]", ".article-add-form").fadeOut();
    }

    return (errors == 0)
};


Validations.prototype.validateAddBanner = function() 
{
    var url = $("input[name=url]", ".banner-add-form").val();
    var image = $("input[name=image]", ".banner-add-form").val();

    $error_url = $(".error[for=url]", ".banner-add-form");
    $error_image = $(".error[for=image]", ".banner-add-form");

    var errors = 0;

    if (!this.isURL(url))
    {
        $error_url.fadeIn("slow");
        errors++;
    }
    else
    {
        $error_url.fadeOut();
    }

    if(image == "")
    {
        $error_image.fadeIn("slow");
        errors++;
    }
    else
    {
        $error_image.fadeOut();
    }

    if (!this.isImage(image))
    {
        $error_image.fadeIn("slow");
        errors++;
    }
    else
    {
        $error_image.fadeOut();
    }

    return (errors == 0) //  alert("alles NOT gut!");
};


Validations.prototype.validateAddEvent = function() 
{
    var name = $("input[name=name]", ".event-add-form").val();
    var begin = $("input[name=begin]", ".event-add-form").val();
    var description = $("textarea[name=description]", ".event-add-form").val();
    var image = $("input[name=image]", ".event-add-form").val();
    var form_url = $("input[name=form_url]", ".event-add-form").val();

    var $error_name = $(".error[for=name]", ".event-add-form");
    var $error_begin = $(".error[for=begin]", ".event-add-form");
    var $error_description = $(".error[for=description]", ".event-add-form");
    var $error_image = $(".error[for=image]", ".event-add-form");
    var $error_form_url = $(".error[for=form_url]", ".event-add-form");

    var errors = 0;

    if (!this.isValidName(name))
    {
        $error_name.fadeIn("slow");
        errors ++;
    }
    else
    {
        $error_name.fadeOut();
    }

    if (begin === "")
    {
        $error_begin.fadeIn("slow");
        errors ++;
    }
    else
    {
        $error_begin.fadeOut();
    }

    if (description === "")
    {
        $error_description.fadeIn("slow");
        errors ++;
    }
    else
    {
        $error_description.fadeOut();
    }

    if (!this.isImage(image))
    {
        $error_image.fadeIn("slow");
        errors ++;
    }
    else
    {
        $error_image.fadeOut();
    }

    if (!this.isURL(form_url))
    {
        $error_form_url.fadeIn("slow");
        errors ++;
    }
    else
    {
        $error_form_url.fadeOut();
    }

    return (errors === 0);

};

Validations.prototype.validateAddGallery = function() 
{
    var $error_name = $(".error[for=name]", ".gallery-add-form");
    var $error_images = $(".error[for=image]", ".gallery-add-form");
    var gallery_name = $("input[name=name]", ".gallery-add-form").val();
    var images = $("input[name=image]", ".gallery-add-form").val();
    var errors = 0;

    if(gallery_name == "")
    {
        $error_name.fadeIn("slow");
        errors++;
    }
    else
    {
        $error_name.fadeOut();
    }

    if(images == "")
    {
        $error_images.fadeIn("slow");
        $error_images.html("Debe haber al menos 1 imagen");
        errors++;
    }
    else
    {
        $error_images.fadeOut();
    }

    return (errors == 0)
};

Validations.prototype.validateAddMembers = function() 
{
    var profile_image = $("input[name=profile_picture_input]", ".members-add-form").val();
    var company_logo = $("input[name=company_picture_input]", ".members-add-form").val();
    var profile_name = $("input[name=name]", ".members-add-form").val().toString(); 
    var profile_mail = $("input[name=email]", ".members-add-form").val().toString();
    var profile_phone = $("input[name=phone]", ".members-add-form").val().toString();
    var profile_url = $("input[name=url]", ".members-add-form").val().toString();
    var company_name = $("input[name=company_name]", ".members-add-form").val();
    var description = $("textarea[name=description]", ".members-add-form").val();
    var description_company = $("textarea[name=description_company]", ".members-add-form").val();

    var $error_profile_image = $(".error[for=profile_picture_input]", ".members-add-form");
    var $error_company_image = $(".error[for=company_picture_input]", ".members-add-form");
    var $error_name = $(".error[for=name]", ".members-add-form");
    var $error_email = $(".error[for=email]", ".members-add-form");
    var $error_phone = $(".error[for=phone]", ".members-add-form");
    var $error_url = $(".error[for=url]", ".members-add-form");
    var $error_company_name = $(".error[for=company_name]", ".members-add-form");
    var $error_description = $(".error[for=description]", ".members-add-form");
    var $error_description_company = $(".error[for=description_company]", ".members-add-form");

    var errors = 0;

    if ($.trim(description_company) === "")
    {
        $error_description_company.fadeIn("slow");
        errors++;
    }
    else
    {
        $error_description_company.fadeOut();
    }

    if (company_name === "" || company_name.length > 50)
    {
        $error_company_name.fadeIn("slow");
        errors++;
    }
    else
    {
        $error_company_name.fadeOut();
    }

    if(!this.isURL(profile_url))
    {
        $error_url.fadeIn("slow");
        errors++;
    }
    else
    {
        $error_url.fadeOut();
    }

    if(expr_mail.test(profile_mail))
    {
        $error_email.fadeOut();
    }
    else
    {
        $error_email.fadeIn("slow");
        errors++;
    }

    if(company_logo === "" || !this.isImage(company_logo))
    {
        $error_company_image.fadeIn("slow");
        errors++;
    }
    else
    {
        $error_company_image.fadeOut();
    }

    return (errors == 0);
};

Validations.prototype.validateContact = function() 
{
    var name = $("input[name=name]", ".contact-add-form").val();
    var email = $("input[name=email]", ".contact-add-form").val();
    var message = $("textarea[name=message]", ".contact-add-form").val();

    $error_name = $(".error[for=name]", ".contact-add-form");
    $error_email = $(".error[for=email]", ".contact-add-form");
    $error_message = $(".error[for=message]", ".contact-add-form");

    var errors = 0;

    if (!this.isValidName(name))
    {
        $error_name.fadeIn("slow");
        errors++;
    }
    else
    {
        $error_name.fadeOut();
    }

    if (!this.isEMAIL(email))
    {
        $error_email.fadeIn("slow");
        errors++;
    }
    else
    {
        $error_email.fadeOut();
    }

    if (!this.isValidName(message))
    {
        $error_message.fadeIn("slow");
        errors++;
    }
    else
    {
        $error_message.fadeOut();
    }

    return (errors == 0) //  alert("alles NOT gut!");
};

$(document).ready(function() 
{
    var validations = new Validations();
    var gallery_name;
    var number_of_images; //this.name + "_in_gallery"
    var article_title;
    var article_bajada;
    var article_text;
    var banner_url;
    var profile_name;
    var profile_mail;
    var profile_url;
    var profile_phone;
    var errors;

    console.log('___STARTED!___');

    //CONTACT!
    $('.btn-contact-submit').removeAttr('disabled');
    $(document).on('click', 'button.btn-contact-submit', function(event)
    {
        if (!validations.validateContact())
        {
            event.preventDefault();
        }
    });

    //GALLERY
    $(document).on("click", "#submit_gallery_form", function(evt)
    {
        if (!validations.validateAddGallery())
        {
            evt.preventDefault();
        }
    });

    $(document).on("click", "#gallery-input-image", function() {
        $("#error_gallery_images").fadeOut();
    });
    $(document).on("click", "#gallery-name-field", function() {
        $("#error_gallery_name").fadeOut();
        //gallery_name = $("#gallery-name-field").val().toString();
        //alert("caracteres: " + gallery_name.length);
    });
    //END GALLERY
    
    //EVENT
    $(document).on("click", ".submit_event_form", function(evt)
    {
        if (!validations.validateAddEvent())
        {
            evt.preventDefault();
        }
    })
    //END EVENT

    //ARTICLE
    $(document).on("click", "#submit_article_form", function(evt)
    {
        if (!validations.validateAddArticle())
        {
            evt.preventDefault();
        }
    });

    $(document).on("change", "#article_title_field", function()
    {
        article_title = $("#article_title_field").val().toString();      
        if(article_title == "" || article_title.length > 50){
            $("#error_article_title").text("Ingrese un título. Max 50 caracteres. Actualmente tienes " + article_title.length);
            $("#error_article_title").fadeIn("slow");
        }else{
            $("#error_article_title").fadeOut();
        }
    });
    $(document).on("change", "#article_bajada_field", function()
    {
        article_bajada = $("#article_bajada_field").val().toString();      
        if(article_bajada == "" || article_bajada.length > 500){
            $("#error_article_bajada").text("Ingrese un texto. Máximo de 500 caracteres. Actualmente tienes " + article_bajada.length);
            $("#error_article_bajada").fadeIn("slow");
        }else{
            $("#error_article_bajada").fadeOut();
        }
    });
    $(document).on("click", "#wysihtml5-article-textarea", function()
    {
        article_text = $("#wysihtml5-article-textarea").val();
        if(article_text == ""){
            $("#error_article_text").fadeIn("slow");
        }else{
            $("#error_article_text").fadeOut();
        }
    });
    $(document).on("change", "#article_input_image", function()
    {
        $("#error_article_photo").fadeOut();
    });
    //END ARTICLE

    //BANNER
    $(document).on("click", "#submit_banner_form", function(evt)
    {
        if (!validations.validateAddBanner())
        {
            evt.preventDefault();
        }
    });

    // $(document).on("change", "#banner_input_image", function()
    // {
    //     $("#error_banner_photo").fadeOut();
    // });

    $(document).on("change", "#banner_url_field", function()
    {
        banner_url = $("#banner_url_field").val().toString();      
        if(!validations.isURL(banner_url)){
            $("#error_banner_url").fadeIn("slow");
        }else{
            $("#error_banner_url").fadeOut();
        }
    });
    //END BANNER

    //PERFIL
    $(document).on("click", "#submit_profile_form", function(evt)
    {
        if (!validations.validateAddMembers())
        {
            evt.preventDefault();
        }
    });

    $(document).on("change", "#profile_url_field", function()
    {
        if(!validations.isURL($(this).val().toString())){
            $("#error_profile_url").fadeIn("slow");
        }else{
            $("#error_profile_url").fadeOut();
        }
    });

    $(document).on("change", "#profile_phone_field", function()
    {
        if(!expr_numbers.test($(this).val().toString())){
            $("#error_profile_phone").fadeIn("slow");
        }else{
            $("#error_profile_phone").fadeOut();
        }
    });

    $(document).on("change", "#profile_mail_field", function()
    {
        profile_mail = $("#profile_mail_field").val().toString();    
        if(!expr_mail.test(profile_mail)){
            $("#error_profile_mail").fadeIn("slow");
        }
        else
        {
            $("#error_profile_mail").fadeOut();
        }
    });

    $(document).on("change", "#profile_name_field", function()
    {
        profile_name = $("#profile_name_field").val().toString(); 
        if(profile_name == "" || profile_name.length > 50){
            $("#error_profile_name").text("Ingrese un nombre. Max 50 caracteres. Actualmente tienes " + profile_name.length);
            $("#error_profile_name").fadeIn("slow");
        }else{
            $("#error_profile_name").fadeOut();
        }
    });

    $(document).on("change", "#profile_input_image1", function()
    {
        $("#error_profile_photo1").fadeOut();
    });

    $(document).on("change", "#profile_input_image2", function()
    {
        $("#error_profile_photo2").fadeOut();
    });

    //END PERFIL
    

    //PRODUCT
    $(document).on("click", ".product-add", function(evt)
    {
        if (!validations.validateAddProduct())
        {
            evt.preventDefault();
        }
    });
    //END PRODUCT

    //OTHER STUFF
    // $("#banner_input_image").hide();
    // $(document).on("click", "i#banner_input_image_button", function() {
    //     $("#banner_input_image").trigger("click");
    // });
});