
QUnit.test( "test for add article form", function(assert)
{
    var done = assert.async();
    var validations = new Validations();

    $(".test-front-end").load(
        "article/add.html",
        function()
        {
            $("input[name=title]", ".article-add-form").val("foo");
            $("input[name=caption]", ".article-add-form").val("foo");
            $("textarea[name=text]", ".article-add-form").text("foo");
            $("input[name=image]", ".article-add-form").val("foo.png");

            var $error_name = $(".error[for=title]", ".article-add-form");
            var $error_caption = $(".error[for=caption]", ".article-add-form");
            var $error_text = $(".error[for=text]", ".article-add-form");
            var $error_image = $(".error[for=image]", ".article-add-form");

            assert.equal(validations.validateAddArticle(), true, "form valid");

            assert.equal($error_name.css("display"), "none", "error title");
            assert.equal($error_caption.css("display"), "none", "error caption");
            assert.equal($error_text.css("display"), "none", "error caption");
            assert.equal($error_image.css("display"), "none", "error image");

            $("input[name=title]", ".article-add-form").val("");
            $("input[name=caption]", ".article-add-form").val("");
            $("textarea[name=text]", ".article-add-form").text("");
            $("input[name=image]", ".article-add-form").val("");

            validations.validateAddArticle();
            assert.equal($error_name.css("display"), "block", "error name");
            assert.equal($error_caption.css("display"), "block", "error caption");
            assert.equal($error_text.css("display"), "block", "error caption");
            assert.equal($error_image.css("display"), "block", "error image");

            $("input[name=title]", ".article-add-form").val("foo");
            $("input[name=caption]", ".article-add-form").val("foo");
            $("textarea[name=text]", ".article-add-form").text("foo");
            $("input[name=image]", ".article-add-form").val("foo.png");

            validations.validateAddArticle();
            assert.equal($error_name.css("opacity"), "0", "error name");
            assert.equal($error_caption.css("opacity"), "0", "error caption");
            assert.equal($error_text.css("opacity"), "0", "error caption");
            assert.equal($error_image.css("opacity"), "0", "error image");


            $("input[name=image]", ".article-add-form").val("foo.jpg");
            assert.equal(validations.validateAddArticle(), true, "must support for jpg");

            $(".test-front-end").html("");
            done();
        });

});