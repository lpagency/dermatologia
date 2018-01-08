/*global content_manager_url*/

var PageAddModel = {
    url : "",
    type : "content",
    keywords : "",
    title : "",
    caption : ""
};

/**** view ****/
var PageAddView = function(controller)
{

    this.controller = controller;
    this.options = {
        btnShow : ".btn-new-page",
        lightBox : ".descripcion_contenido",
        inputURL : "input[name=add-page-url-input]",
        inputKeywords : "input[name=add-page-tag-input]",
        btnURL : "input[name=add-page-url-button]",
        btnContent : ".select-type-content",
        btnStatic : ".select-type-static",
        addHTML : site_base + "/page/add",
        typeHTML : site_base + "/page/select_type"
    };

    this.init();
};

PageAddView.prototype.init = function() 
{
    var self = this;

    $(document).on("click", this.options.btnShow, function()
    {
        self.controller.show();
    });

    $(document).on("click", this.options.btnURL, function()
    {
        self.controller.selectType(
            $(self.options.inputURL).val(),
            $(self.options.inputKeywords).val());
    })

    $(document).on("click", this.options.btnContent, function()
    {
        self.controller.createContent();
    });

    $(document).on("click", this.options.btnStatic, function()
    {
        self.controller.createStatic();
    });

};

PageAddView.prototype.renderAddScreen = function() 
{
    $(".content-manager").attr("src", content_manager_url + "me/page/add");
    // var self = this;
    // $.get(this.options.addHTML, function(html)
    //     {
    //         $(self.options.lightBox).html(html);
    //         $(self.options.lightBox).css("display", "block");
    //     });
};

PageAddView.prototype.renderTypeScreen = function() 
{
    var self = this;
    $.get(this.options.typeHTML, function(html)
    {
        $(self.options.lightBox).html(html);
    });
};


/*** controller ***/
var PageAddController = function()
{
    this.view = new PageAddView(this);
    this.model = PageAddModel;

    this.options = {
        "addPageContentURL" : site_base + "/page/add_content",
        "addPageStaticURL" : site_base + "/page/add_static"
    }
};


PageAddController.prototype.show = function() 
{
    this.view.renderAddScreen();
};

PageAddController.prototype.selectType = function(url_name, keywords) 
{
    if (this.validateURL(url_name) && this.validateTags(keywords))
    {
        this.model.url = url_name;
        this.model.keywords = keywords;
        this.view.renderTypeScreen();
    }
};

/**
 * validate tags with correct format
 * @param  {List} tags list of space separated words
 * @return {Bool}      true if is a list with comma separated text
 */
PageAddController.prototype.validateTags = function(tags) 
{
    return true;
};

/**
 * validate if the url is well formatter
 * @param  {[type]} url_name [description]
 * @return {[type]}          [description]
 */
PageAddController.prototype.validateURL = function(url_name) 
{
    return true;
};


PageAddController.prototype.createPage = function() 
{
    var self = this;
    $.post(this.options.addPageContentURL, this.model, function(data)
    {
        var json_data = $.parseJSON(data);

        if (json_data.hasOwnProperty("success"))
        {
            document.location.href = self.model.url;
        }
        else
        {
            alert( json_data.error_message );
        }
    });
};


PageAddController.prototype.createContent = function() 
{
    this.model.type = "content";
    this.createPage();
};

PageAddController.prototype.createStatic = function() 
{
    this.model.type = "static";
    this.createPage();
};


$(document).ready(function()
    {
        new PageAddController();
    });
