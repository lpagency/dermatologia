/*global $*/
/*export closeLightbox*/

'use strict';

var EditMenuModel = {
    archive : function(id, callback)
    {
        var data = {
            'id' : id
        };

        // @todo: implmenet this uri to archive content
        $.get( '/api/content/archive', data, function()
        {
            if (callback !== undefined)
            {
                callback(id);
            }
        } );
    }
};

var EditMenuController = function()
{
    this.model = EditMenuModel;
    this.view = new EditMenuView(this);

    this.init();
};

EditMenuController.prototype.init = function() 
{
    this.view.init();
};

EditMenuController.prototype.archive = function(id) 
{
    var id_validated = parseInt(id);
    this.model.archive(id_validated);
};


var EditMenuView = function(controller)
{
    this.controller = controller;
};

EditMenuView.prototype.init = function() 
{
    var self = this;
    $('.btn-mod-cont').click(function()
    {
        self.show( this );
    });

    $('.cerrar-opciones').click(function() 
    {
        self.hide(this);
    });

    // archive button
    $('.btn-archive').click(function(evt)
    {
        var $parent_element = $(this)
                                .parent()
                                .parent()
                                .parent()
                                .parent();
        var id = $parent_element.attr('cnt-id');

        $parent_element.parent().css('display', 'none');

        evt.preventDefault();
        self.controller.archive(id);
    });
};

EditMenuView.prototype.show = function(obj) 
{
    //mostrar opciones archivar y borrar
    var $element = $('.modifi', $(obj).parent());

    $element.fadeIn(500);
};

EditMenuView.prototype.hide = function(obj) 
{
    $('.modifi', $(obj).parent().parent()).fadeOut(100);
};


//ligthbox fondo desenfocado
$(document).ready(function() {

    new EditMenuController();

    //lightbox con fondo desengocado
    $(document).on('click', '.btn-agregar-cont-principal', function() {
        $('#menu_movil').fadeIn(500);
        // para agregar y quitar blur del fondo
        $('#cuerpo').addClass('descripcion_blur');
        $('.boton_busqueda_movil').addClass('b_blur');
    });

    $(document).on('click', 'button#tellmeboton2', function() {
        $('#menu_movil').fadeOut(100);
        // para agregar y quitar blur del fondo
        $('#cuerpo').removeClass('descripcion_blur');
        $('.boton_busqueda_movil').removeClass('b_blur');
    });
    // para ir a borradores
    $(document).on('click', '#g-borradores', function() {
        $('#g-contenido-a').fadeOut(100, function() {
            $('#g-borradores-a').fadeIn(500);
        });
    });
    //volver de borradores
    $(document).on('click', '.producto-volver-b', function() {
        $('#g-borradores-a').fadeOut(100, function() {
            $('#g-contenido-a').fadeIn(500);
        });
    });
    // para generar producto
    $(document).on('click', '#g-contenido', function() {
        $('.b_logo').fadeOut(100, function() {
            $('#g-contenido-a').fadeIn(500);
        });
    });
    // para abrir articulo
    $(document).on('click', '#g-articulo', function() {
        $('.b_logo').fadeOut(100, function() {
            $('#g-articulo-a').fadeIn(500);
        });
    });
    // para abrir banner
    $(document).on('click', '#g-banner', function() {
        $('.b_logo').fadeOut(100, function() {
            $('#g-banner-a').fadeIn(500);
        });
    });
    // para abrir evento
    $(document).on('click', '#g-evento', function() {
        $('.b_logo').fadeOut(100, function() {
            $('#g-evento-a').fadeIn(500);
        });
    });
    // para abrir Galeria
    $(document).on('click', '#g-galeria', function() {

        $('.b_logo').fadeOut(100, function() {
            $('#g-galeria-a').fadeIn(500);
        });
    });
    // para abrir perfil
    $(document).on('click', '#g-perfil', function() 
    {
        $('.b_logo').fadeOut(100, function() 
        {
            $('#g-perfil-a').fadeIn(500);
        });
    });
    // para pasar a segundo paso en perfil
    $(document).on('click', '#proximo-paso-perfil', function() {
        $('#paso-uno-perfil').fadeOut(100, function() {
            $('#paso-dos-perfil').fadeIn(500);
        });
    });

    var back = function(evt)
    {
        $('.step_two').fadeOut(100, function() {
            $('.b_logo').fadeIn(500);
        });

        evt.preventDefault();
    };

    // para volver de sgundo paso a primer paso
    $(document).on('click', '#producto-volver-7', back);
    // para volver a generar contenidos desde producto
    $(document).on('click', '#producto-volver', back);
    // para volver a generar contenidos desde articulo
    $(document).on('click', '#articulo-volver', back);
    // para volver a generar contenidos desde banner
    $(document).on('click', '#producto-volver-3', back);
    // para volver a generar contenidos desde evento
    $(document).on('click', '#producto-volver-4', back);
    // para volver a generar contenidos desde galeria
    $(document).on('click', '#producto-volver-5', back);
    // para volver a generar contenidos desde galeria
    $(document).on('click', '#producto-volver-6', back);

});