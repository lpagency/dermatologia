QUnit.test( "image size adapt", function(assert)
{
    var add_profile_controller = new AddProfileController();

    assert.deepEqual(
        add_profile_controller.getTransform([100,100], [100,100]),
        [100,100,0,0],
        "if image and canvas are equal, must return \
        [canvas_width, canvas_height, 0, 0]");


    assert.deepEqual(
        add_profile_controller.getTransform([100, 100], [200, 100]),
        [200, 100, -50, 0],
        "when image is wider");

    assert.deepEqual(
        add_profile_controller.getTransform([100, 100], [100, 200]),
        [100, 200, 0, -50],
        "when image is higher");


    assert.deepEqual(
        add_profile_controller.getTransform([100, 100], [200, 200]),
        [100, 100, 0, 0],
        "when image is wider and higher");


    assert.deepEqual(
        add_profile_controller.getTransform([100, 100], [200, 400]),
        [100, 200, 0, -50],
        "when image is wider and higher");


    assert.deepEqual(
        add_profile_controller.getTransform([100, 100], [400, 200]),
        [200, 100, -50, 0],
        "when image is wider and higher");
});