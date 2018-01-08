QUnit.test( "test for add products form", function(assert)
{

    var done = assert.async();
    var validations = new Validations();

    $(".test-front-end").load(
        "product/add.html",
        function()
        {
            // add product

            $("input[name=name]", ".product-add-form").val("foo");
            $("input[name=image]", ".product-add-form").val("foo.png");
            $("input[name=price]", ".product-add-form").val("100");
            $("input[name=stock]", ".product-add-form").val("100");

            var $error_name = $(".error[for=name]", ".product-add-form");
            var $error_image = $(".error[for=image]", ".product-add-form");
            var $error_price = $(".error[for=price]", ".product-add-form");
            var $error_stock = $(".error[for=stock]", ".product-add-form");

            assert.equal(validations.validateAddProduct(), true);

            assert.equal($error_name.css("display"), "none", "error name");
            assert.equal($error_image.css("display"), "none", "error image");
            assert.equal($error_price.css("display"), "none", "error price");
            assert.equal($error_stock.css("display"), "none", "error stock");


            $("input[name=name]", ".product-add-form").val("");
            $("input[name=image]", ".product-add-form").val("");
            $("input[name=price]", ".product-add-form").val("");
            $("input[name=stock]", ".product-add-form").val("");

            validations.validateAddProduct();
            assert.equal($error_name.css("display"), "block", "error name");
            assert.equal($error_image.css("display"), "block", "error image");
            assert.equal($error_price.css("display"), "block", "error price");
            assert.equal($error_stock.css("display"), "block", "error stock");


            $("input[name=price]", ".product-add-form").val("aa");
            $("input[name=stock]", ".product-add-form").val("aa");

            validations.validateAddProduct();
            assert.equal($error_price.css("display"), "block", "error price aa");
            assert.equal($error_stock.css("display"), "block", "error stock aa");


            $("input[name=name]", ".product-add-form").val("foo");
            $("input[name=image]", ".product-add-form").val("foo.png");
            $("input[name=price]", ".product-add-form").val("100");
            $("input[name=stock]", ".product-add-form").val("100");

            validations.validateAddProduct();
            assert.equal($error_name.css("opacity"), "0", "error name");
            assert.equal($error_image.css("opacity"), "0", "error image");
            assert.equal($error_price.css("opacity"), "0", "error price");
            assert.equal($error_stock.css("opacity"), "0", "error stock");


            $("input[name=image]", ".product-add-form").val("foo.jpg");
            assert.equal(validations.validateAddProduct(), true, "must support for jpg");

            $(".test-front-end").html("");
            done();
        });
} );
