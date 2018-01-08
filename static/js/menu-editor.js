$(document).ready(function(){
	var $ul_main = $('ul#menu-list-main');
	var $input_name = $('input#input-title-editor');
	var test_template = '<li id="first" class="" style="background-color:rgb(66, 76, 141);"><a href="javascript:void(0)" style=" color:white;">Some option</a></li>';
	var $li_item_actual;

	$('.forward').on('click', function(event)
	{
		li_item_actual = $(this).closest('li#first');
		//item_to_delete.remove();
	});

	/* NOT-TODAY D: !!
	$('#button-done-editor').on('click', function(event)
	{
		var title = $input_name.val();
		if ( title == '' ) title = 'Some title';
		var aux_temp = '<li id="first" class="" style="background-color:rgb(66, 76, 141);"><a href="javascript:void(0)" style=" color:white;">' + title + '</a></li>';
		$ul_main.append(aux_temp);
		//$ul_main.append(test_template);
	});
	*/

});

