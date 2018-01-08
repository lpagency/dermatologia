QUnit.test( "test for validations backend", function(assert)
{

    // ---- url ----
    validations = new Validations();
    assert.equal(
        validations.isURL("no es url"), 
        false,
        "test for non url");

    assert.equal(
        validations.isURL("httpss://www.google.com"),
        false,
        "test wrong protocol")

    assert.equal(
        validations.isURL("http//www.google.com"),
        false,
        "test without :")

    // ---- image ----
    assert.equal(
        validations.isPNG("some_random_url.png"),
        true,
        "test with ending '.png'")

    assert.equal(
        validations.isPNG("some_random_url.PNG"),
        true,
        "test with ending '.PNG'")

    assert.equal(
        validations.isPNG(),
        false,
        "test width undefined");

    assert.equal(
        validations.isPNG("ends_with_pn.pn"),
        false)

    // ---- name ----
    assert.equal(
        validations.isValidName("some name"),
        true,
        "name")

    assert.equal(
        validations.isValidName(""),
        false,
        "name empty")

    // ---- price ----
    assert.equal(
        validations.isValidPrice(1000),
        true,
        "price");

    assert.equal(
        validations.isValidPrice("aa"),
        false,
        "price with string ");

    assert.equal(
        validations.isValidPrice("2"),
        true,
        "price with string properly formatted");

    // ---- quantity ----
    assert.equal(
        validations.isValidQuantity(1000),
        true,
        "quantity");

    assert.equal(
        validations.isValidQuantity("aa"),
        false,
        "quantity with string ");

    assert.equal(
        validations.isValidQuantity("2"),
        true,
        "quantity with string properly formatted");

} );

