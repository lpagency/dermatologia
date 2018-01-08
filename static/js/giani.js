$(document).ready(function(){

    $(".carritoicono").click(function(){
        if($(".carritoproductos").css("display")=="none"){
            $(".carritoproductos").slideDown();
        } else {
            $(".carritoproductos").slideUp();
        }
    });

    $("body").mouseup(function (e)
    {
        var container = $(".carritoproductos");

        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            if(!$(".fancybox-overlay").length)
                container.slideUp();
        }
    });



    if(typeof(Storage) !== "undefined") {

        if(!window.localStorage.getItem("user_id")){
            window.localStorage.setItem("user_id","0");
        }

        // @todo: uncomment once implemented

        return ;

        $.ajax({
            url: '/user/save-guess',
            cache: false,
            data: "user_id="+window.localStorage.getItem("user_id"),
            success: function(html){
                var objeto = $.parseJSON(html);
                if(objeto.success){
                    window.localStorage.setItem("user_id",objeto.success.toString());
                }
            }
        });

        
        GetCartByUserId(window.localStorage.getItem("user_id"));
        
    }

    $("a.logout").click(function(){
        if(typeof(Storage) !== "undefined") {
            window.localStorage.setItem("user_id","0");
        }
    });


    /*var device_touch = false

    try {
        document.createEvent("TouchEvent");
        device_touch = true;
    } catch (e) {
        device_touch = false;
    }

    if (!device_touch){
        $('.fancybox').fancybox({padding: 3, width: 600, href: $('.fancybox').attr('href') + '&ajax=0'});
    }*/

    $(document).on("click","a.eliminarproducto,a.borrarproducto",function(){
        var cart_id = $(this).attr("cart-id");
        var from_cart = $(this).hasClass("eliminarproducto");
        
        $.ajax({
            url:"/cart/remove",
            data:"cart_id="+cart_id,
            cache: false,
            success:function(html){
                if(html=="ok"){
                    fancyAlert("Producto ha sido eliminado del carro");
                    if(from_cart){
                        GetCartByUserId(window.localStorage.getItem("user_id"));
                    } else {
                        location.reload();
                    }
                } else {
                    fancyAlert(html);
                }
            }
        });
        
    });

    $(document).on("click","button.comprar", function(){
        location.href="/checkout/address";
    });

    if($("#contenedor").length>0){
        $("body,html").animate({
            scrollTop: $("#contenedor").offset().top
        }, 1000);
    }

    if($("div.userInfo").length>0){
        $("body,html").animate({
            scrollTop: $("div.userInfo").offset().top
        }, 1000);
    }

    $(document).on("click",".page-link",function(e){

        e.preventDefault();

        var url = $(this).attr("href");

        $.ajax({
            url: url,
            data: "ajax=1",
            type: "get",
            cache: false,
            beforeSend: function(){
                $("#ajax_productos").addClass("disable");
            },
            success: function(respuesta){
                $(".paginador").pagination("destroy");
                $(".paginador").remove();
                $("#ajax_productos").html(respuesta).removeClass("disable").addClass("active"); //.delay(100).fadeIn(200);
                
                /*$("#ajax_productos").animate({
                        opacity: 1
                    }, 3000, function() {
                });*/
            }
        });

        return false;
    });


    $(document).on("change","#InputCity", function(e){

        var city_id = $(this).val();
        $("#deposit_city_id").val(city_id);
        $("#webpay_city_id").val(city_id);

        $.ajax({
            url: "/checkout/getshippingcost",
            data: "city_id="+city_id,
            cache: false,
            success: function(html){
                var objeto = $.parseJSON(html);
                if(objeto.success){
                    $("span.shipping-cost").html(objeto.success.formatted);
                    $("#shipping-cost").val(objeto.success.no_formatted);
                    $("#deposit_shipping_price").val(objeto.success.no_formatted);
                    var suma_txt = $("b.suma").html();
                    var suma = parseInt(suma_txt.replace(/[^\d]+/ig,""));
                    var total = suma + parseInt(objeto.success.no_formatted);
                    $("span.total").html("$"+currencyFormat(total));
                    $("input[name='TBK_MONTO']").val(total+"00");
                    //console.info(currencyFormat(total));
                } else {
                    fancyAlert(objeto.error);
                }
            }
        });
    });

    var currencyFormat = function(num){
        return num
           .toFixed() // always two decimal digits
           .replace(".", ",") // replace decimal point character with ,
           .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."); // use . as a separator
    };

});