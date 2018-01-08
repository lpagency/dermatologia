/*** view ***/

var SetFixedView = function(controller)
{
    this.controller = controller;
    this.options = {
        btnSet : ".btn-set-cont",
        btnUnSet : ".btn-contet-fixed",
        setClass : "btn-set-cont",
        unSetClass : "btn-contet-fixed",
        contentIDAttr : "content-id",
        boxIDAttr : "box-id"
    }
};

SetFixedView.prototype.init = function() 
{
    var self = this;
    $(document).on("click", this.options.btnSet, function(evt)
    {
        var $element = $(this);

        $element.animate(
            {
                x : 1
            }, 
            {
                duration : 100, 
                step : function(now, fx)
                {
                    var r = (1 - now) * 45;

                    $element.css("-ms-transform", "rotate("+r+"deg)");
                    $element.css("-webkit-transform", "rotate("+r+"deg)");
                    $element.css("transform", "rotate("+r+"deg)");
                },
                complete : function()
                {
                    var content_id = $element.attr(self.options.contentIDAttr);
                    var box_id = $element.attr(self.options.boxIDAttr);

                    $element.removeClass(self.options.setClass);
                    $element.addClass(self.options.unSetClass);

                    $element.css("x", 0);

                    self.controller.setContent(content_id, box_id);
                }
            });

        evt.preventDefault();
    });

    $(document).on("click", this.options.btnUnSet, function(evt)
    {
        var $element = $(this);

        $element.animate(
            {
                x : 1
            }, 
            {
                duration : 100, 
                step : function(now, fx)
                {
                    var r = (now) * 45;

                    $element.css("-ms-transform", "rotate("+r+"deg)");
                    $element.css("-webkit-transform", "rotate("+r+"deg)");
                    $element.css("transform", "rotate("+r+"deg)");
                },
                complete : function()
                {
                    var content_id = $element.attr(self.options.contentIDAttr);
                    var box_id = $element.attr(self.options.boxIDAttr);

                    $element.addClass(self.options.setClass);
                    $element.removeClass(self.options.unSetClass);

                    $element.css("x", 0);

                    self.controller.unSetContent(content_id, box_id);
                }
            });

        evt.preventDefault();
    });
};

SetFixedView.prototype.renderFixedContent = function(json_list) 
{
    for (var i = 0; i < json_list.length; i++) 
    {
        $element = $("[" + this.options.boxIDAttr + "=" + json_list[i] + "]");
        $element.removeClass(this.options.setClass);
        $element.addClass(this.options.unSetClass);
    };
};


/*** model ***/

var SetFixedModel = {
    "urlFixedContents" : site_base + "/content/fixed_content",
    "urlSetContent" : site_base + "/content/set",
    "urlUnSetContent" : site_base + "/content/unset",
    "data" : {
        "content_id" : 0,
        "box_id" : 0
    },
    "set" : function()
    {
        $.get(this.urlSetContent, this.data, $.noop);
    },
    "unset" : function()
    {
        $.get(this.urlUnSetContent, this.data, $.noop);
    },
    "fixed_content" : function(callback)
    {
        $.get(this.urlFixedContents, (callback||$.noop))
    }
};


/*** controller ***/

var SetFixedController = function()
{
    this.view = new SetFixedView(this);
    this.view.init();
    this.model = SetFixedModel;

    this.loadFixedContent();
}

SetFixedController.prototype.setContent = function(content_id, box_id) 
{
    this.model.data.content_id = content_id;
    this.model.data.box_id = box_id;
    this.model.set();
};

SetFixedController.prototype.unSetContent = function(content_id, box_id) 
{
    this.model.data.content_id = content_id;
    this.model.data.box_id = box_id;
    this.model.unset();
};

SetFixedController.prototype.loadFixedContent = function() 
{
    var self = this;
    this.model.fixed_content(function(data)
        {
            var json_data = $.parseJSON(data);
            self.view.renderFixedContent(json_data);
        });
};


$(document).ready(function()
{
    new SetFixedController();
});