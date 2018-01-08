QUnit.test( "test for add event form", function(assert)
{
    var done = assert.async();
    var validations = new Validations();

    $(".test-front-end").load(
        "event/add.html",
        function()
        {
            $("input[name=name]", ".event-add-form").val("foo");
            $("input[name=begin]", ".event-add-form").val("foo");
            $("textarea[name=description]", ".event-add-form").text("foo");
            $("input[name=image]", ".event-add-form").val("foo.png");
            $("input[name=form_url]", ".event-add-form").val("http://www.google.com");


            var $error_name = $(".error[for=name]", ".event-add-form");
            var $error_begin = $(".error[for=begin]", ".event-add-form");
            var $error_description = $(".error[for=description]", ".event-add-form");
            var $error_image = $(".error[for=image]", ".event-add-form");
            var $error_form_url = $(".error[for=form_url]", ".event-add-form");

            assert.equal(validations.validateAddEvent(), true, "form valid");

            assert.equal($error_name.css("display"), "none", "error name");
            assert.equal($error_begin.css("display"), "none", "error begin");
            assert.equal($error_description.css("display"), "none", "error description");
            assert.equal($error_image.css("display"), "none", "error image");
            assert.equal($error_form_url.css("display"), "none", "error form_url");

            $("input[name=name]", ".event-add-form").val("");
            $("input[name=begin]", ".event-add-form").val("");
            $("textarea[name=description]", ".event-add-form").text("");
            $("input[name=image]", ".event-add-form").val("");
            $("input[name=form_url]", ".event-add-form").val("aaaa");

            validations.validateAddEvent();
            assert.equal($error_name.css("display"), "block", "error name");
            assert.equal($error_begin.css("display"), "block", "error begin");
            assert.equal($error_description.css("display"), "block", "error description");
            assert.equal($error_image.css("display"), "block", "error image");
            assert.equal($error_form_url.css("display"), "block", "error form_url");


            $("input[name=name]", ".event-add-form").val("foo");
            $("input[name=begin]", ".event-add-form").val("foo");
            $("textarea[name=description]", ".event-add-form").text("foo");
            $("input[name=image]", ".event-add-form").val("foo.png");
            $("input[name=form_url]", ".event-add-form").val("http://www.google.com");

            validations.validateAddEvent();
            assert.equal($error_name.css("opacity"), "0", "error name");
            assert.equal($error_begin.css("opacity"), "0", "error begin");
            assert.equal($error_description.css("opacity"), "0", "error description");
            assert.equal($error_image.css("opacity"), "0", "error image");
            assert.equal($error_form_url.css("opacity"), "0", "error form_url");


            $("input[name=image]", ".event-add-form").val("foo.jpg");
            assert.equal(validations.validateAddEvent(), true, "must support for jpg");

            $("input[name=form_url]", ".event-add-form").val("");
            assert.equal(validations.validateAddEvent(), true, "white url is also valid");



            $(".test-front-end").html("");
            done();
        });

});