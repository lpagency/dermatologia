QUnit.test( "test for add banner form", function(assert)
{
    var done = assert.async();
    var validations = new Validations();

    $(".test-front-end").load(
        "banner/add.html",
        function()
        {
            $("input[name=url]", ".banner-add-form").val("http://www.google.com");
            $("input[name=image]", ".banner-add-form").val("foo.png");

            var $error_url = $(".error[for=url]", ".banner-add-form");
            var $error_image = $(".error[for=image]", ".banner-add-form");

            assert.equal(validations.validateAddBanner(), true, "form valid");

            assert.equal($error_url.css("display"), "none", "error url");
            assert.equal($error_image.css("display"), "none", "error image");

            $("input[name=url]", ".banner-add-form").val("aaaa");
            $("input[name=image]", ".banner-add-form").val("");

            validations.validateAddBanner();
            assert.equal($error_url.css("display"), "block", "error url");
            assert.equal($error_image.css("display"), "block", "error image");

            $("input[name=url]", ".banner-add-form").val("http://www.google.com");
            $("input[name=image]", ".banner-add-form").val("foo.png");

            validations.validateAddBanner();
            assert.equal($error_url.css("opacity"), "0", "error url");
            assert.equal($error_image.css("opacity"), "0", "error image");

            $("input[name=image]", ".banner-add-form").val("foo.jpg");
            assert.equal(validations.validateAddBanner(), true, "must support for jpg");

            // white url is also valid
            $("input[name=url]", ".banner-add-form").val("");
            $("input[name=image]", ".banner-add-form").val("foo.png");

            assert.equal(validations.validateAddBanner(), true, "white url is also valid");


            $(".test-front-end").html("");
            done();
        });

});