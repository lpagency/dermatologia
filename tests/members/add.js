QUnit.test( "test for add members form", function(assert)
{
    var done = assert.async();
    var validations = new Validations();

    $(".test-front-end").load(
        "members/add.html",
        function()
        {

            $("input[name=profile_picture_input]", ".members-add-form").val("foo.png");
            $("input[name=company_picture_input]", ".members-add-form").val("foo.png");
            $("input[name=name]", ".members-add-form").val("foo");
            $("input[name=email]", ".members-add-form").val("foo@foo.cl");
            $("input[name=phone]", ".members-add-form").val("123");
            $("input[name=url]", ".members-add-form").val("http://www.google.com");
            $("input[name=company_name]", ".members-add-form").val("foo");
            $("input[name=position]", ".members-add-form").val("foo");
            $("input[name=phone]", ".members-add-form").val("123");
            $("textarea[name=description]", ".members-add-form").val("foo");
            $("textarea[name=description_company]", ".members-add-form").val("foo");

            var $error_company_picture_input = $(".error[for=company_picture_input]", ".members-add-form");
            var $error_company_name = $(".error[for=company_name]", ".members-add-form");
            var $error_email = $(".error[for=email]", ".members-add-form");
            var $error_description_company = $(".error[for=description_company]", ".members-add-form");
            var $error_profile_picture_input = $(".error[for=profile_picture_input]", ".members-add-form");
            var $error_name = $(".error[for=name]", ".members-add-form");
            var $error_position = $(".error[for=position]", ".members-add-form");
            var $error_url = $(".error[for=url]", ".members-add-form");
            var $error_phone = $(".error[for=phone]", ".members-add-form");
            var $error_description = $(".error[for=description]", ".members-add-form");


            assert.equal(validations.validateAddMembers(), true, "form valid");

            assert.equal($error_company_picture_input.css("display"), "none", "error $error_company_picture_input");
            assert.equal($error_company_name.css("display"), "none", "error $error_company_name");
            assert.equal($error_email.css("display"), "none", "error $error_email");
            assert.equal($error_description_company.css("display"), "none", "error $error_description_company");
            assert.equal($error_profile_picture_input.css("display"), "none", "error $error_profile_picture_input");
            assert.equal($error_name.css("display"), "none", "error $error_name");
            assert.equal($error_position.css("display"), "none", "error $error_position");
            assert.equal($error_url.css("display"), "none", "error $error_url");
            assert.equal($error_phone.css("display"), "none", "error $error_phone");
            assert.equal($error_description.css("display"), "none", "error $error_description");

            $("input[name=profile_picture_input]", ".members-add-form").val("");
            $("input[name=name]", ".members-add-form").val("");
            $("input[name=phone]", ".members-add-form").val("");
            $("input[name=url]", ".members-add-form").val("");
            $("input[name=description]", ".members-add-form").val("");

            assert.equal(validations.validateAddMembers(), true, "form valid");

            assert.equal($error_company_picture_input.css("display"), "none", "error $error_company_picture_input");
            assert.equal($error_company_name.css("display"), "none", "error $error_company_name");
            assert.equal($error_email.css("display"), "none", "error $error_email");
            assert.equal($error_description_company.css("display"), "none", "error $error_description_company");
            assert.equal($error_profile_picture_input.css("display"), "none", "error $error_profile_picture_input");
            assert.equal($error_name.css("display"), "none", "error $error_name");
            assert.equal($error_position.css("display"), "none", "error $error_position");
            assert.equal($error_url.css("display"), "none", "error $error_url");
            assert.equal($error_phone.css("display"), "none", "error $error_phone");
            assert.equal($error_description.css("display"), "none", "error $error_description");


            $("input[name=company_picture_input]").val("");
            assert.equal(validations.validateAddMembers(), false, "form invalid");
            $("input[name=company_picture_input]").val("foo");
            assert.equal(validations.validateAddMembers(), false, "form valid");
            $("input[name=company_picture_input]").val("foo.png");
            assert.equal(validations.validateAddMembers(), true, "form valid");


            $("input[name=company_name]").val("");
            assert.equal(validations.validateAddMembers(), false, "form invalid");
            $("input[name=company_name]").val("foo");
            assert.equal(validations.validateAddMembers(), true, "form valid");

            $("input[name=email]").val("");
            assert.equal(validations.validateAddMembers(), false, "form invalid");
            $("input[name=email]").val("foo@foo.com");
            assert.equal(validations.validateAddMembers(), true, "form valid");

            $("textarea[name=description_company]").val("");
            assert.equal(validations.validateAddMembers(), false, "form invalid");
            $("textarea[name=description_company]").val("asdasd");
            assert.equal(validations.validateAddMembers(), true, "form invalid");

            $(".test-front-end").html("");
            done();
        });

});