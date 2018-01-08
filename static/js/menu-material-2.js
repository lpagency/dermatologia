$(document).ready(function() 
{
    var expanded = false;
    var edit_item_icons = false;
    var edit_ui = false;
    var $link_to_edit;

    PositionButtonAddItem();

    //para ejecutal el menu
    $(".cover-material, .btn-categories").click(function(event) {

        event.stopPropagation();
        menu_height = $('ul#menu-list-main li#first').length * 82.5;

        // Slide down menu if hidden
        if (!expanded) {
            //$(".btn-edit-menu").fadeIn('fast');
            $(".ul-filtro").animate({
                "height": menu_height
            }, "fast");
            expanded = true;
        }
        // Slide up menu if shown
        else {
            $(".btn-edit-menu").fadeOut('fast');
            $(".ul-filtro").animate({
                "height": 0
            }, "slow", function() {
                //para hacer un reset sobre los niveles del menú
                $(".nav-container-2").removeClass("show-sub-3");
                $(".nav-container-2").removeClass("show-sub-2");
                $(".has-sub-nav-2").removeClass("active-2");
            });

            expanded = false;            
        }

        if (edit_item_icons){
            $('.button-edit-item').each(function(){
                $(this).fadeOut('fast');
            });            
            edit_item_icons = false;
        }

        if (edit_ui){
            $('div.menu-editor-container').fadeOut('fast');
            edit_ui = false;
        }
    });


    $("#menu-material-4").click(function(event) {
        event.stopPropagation();
    });

    $(".prop-stoper").click(function(event) {
        event.stopPropagation();
    });

    $('.btn-edit-menu').click(function(event) {
        event.stopPropagation();

        // APARECER o desaparecer los iconos para editar.
        if (edit_item_icons){
            $('.button-edit-item').each(function(){
                $(this).fadeOut('fast');
            });            
            edit_item_icons = false;
        } 
        else {
            $('.button-edit-item').each(function(){
                $(this).fadeIn('fast');
            });            
            edit_item_icons = true;
        }
        //FIN aparecer/desaparecer.

        if (edit_ui){
            $('div.menu-editor-container').fadeOut('fast');
            edit_ui = false;
        }
    });

    $('.button-edit-item').click(function(event){
        //event.stopPropagation();
        $link_to_edit = $(this).siblings('a');        
        var item_name = $link_to_edit.text();
        console.log('name: ' + item_name);

        //edit editionwindow
        $('input#input-name-editor').val(item_name);

        if (!edit_ui){
            $('div.menu-editor-container').fadeIn('fast');
            edit_ui = true;            
        }
    });

    $('#button-done-editor').click(function(){

        console.log('clicked!');
        $link_to_edit.text($('input#input-name-editor').val());

        if (edit_ui){
            $('div.menu-editor-container').fadeOut('fast');
            edit_ui = false;
        }
    });

    // para cerrar el menu y hacer un reset sobre los niveles del menu
    $(document).click(function() {
        if (expanded) {
            $(".btn-edit-menu").fadeOut('fast');
            $(".ul-filtro").animate({
                "height": 0
            }, "slow", function() {
                $(".nav-container-2").removeClass("show-sub-3");
                $(".nav-container-2").removeClass("show-sub-2");
                $(".has-sub-nav-2").removeClass("active-2");
            });
            expanded = false;
        }

        if (edit_item_icons){
            $('.button-edit-item').each(function(){
                $(this).fadeOut('fast');
            });            
            edit_item_icons = false;
        }

        if (edit_ui){
            $('div.menu-editor-container').fadeOut('fast');
            edit_ui = false;
        }
    });

    // se agrega clase has-sub-nav-2 para que funcione toda la funcion
    $(".nav-main-2 li:has(ul)").addClass("has-sub-nav-2");
    // se agrega la clase forward para avanzar al primer nivel
    $(".nav-main-2 a").addClass("forward");
    // se quita forward para agregar forward-2 para poder avanzar al segundo nivel
    $(".nav-main-2 ul li ul li a").removeClass("forward");
    // $(".nav-main-2 ul li ul li a").addClass("forward-2");

    // se agrega active para haceer visibles todas las listas y mover el primer nivel hacia la izquierda
    $(".has-sub-nav-2 .forward").click(function() {
        $(this).parent().addClass("active-2");
        $(".nav-container-2").addClass("show-sub-3");
    });
    // se agrega para porder llegar al segundo nivel menú
    $(".has-sub-nav-2 .forward-2").click(function() {
        $(".nav-container-2").addClass("show-sub-2");
    });
    // función para volver del primer nivel
    $(".has-sub-nav-2 .back").click(function() {
        $(".nav-container-2").removeClass("show-sub-3");
        $(".has-sub-nav-2").removeClass("active-2");
    });
    // función para volver del segundo nivel
    $(".has-sub-nav-2 .back-2").click(function() {
        $(".nav-container-2").removeClass("show-sub-2");
    });

    //FIX descuadre cuando el submenu tiene muchas opciones
    $('a.menu-link-first').click(function()
    {
        var $ul = $(this).siblings('ul');
        ///var number_of_subelements = $ul.children('li').length;
        
        //if (number_of_subelements > 8)
        if ($ul.height() > $('nav.nav-main-2').height())
        {
            $ul.width("100%");
        }
    });

});

PositionButtonAddItem = function(){

    var $btn = $('.btn-add-menu-item');
    var position_y = $('ul#menu-list-main li#first').length * 82.5 + 105;

    $btn.css({'bottom': + position_y + 'px'});
};