var fancyAlert = function(msg) {


	var html = "<div class=\"iconosalarmas\">"
			 + "<i class=\"icon-thumbs-up-alt\"></i>"
			 + "</div>"
			 +"<div style=\"width: 100%; height: 100%; margin:0px;width:240px;text-align:center;\">"
	         + msg
	         + "<div style=\"text-align:center;margin-top:15px; width: 100%;\">"
	         + "<input style=\"font-wieght: 500;text-transform:uppercase;background-color: white;margin:0px;padding:5px;width:70%; height: 40px; border: 2px solid black; color: black; font-size: 15px;\" type=\"button\" onclick=\"jQuery.fancybox.close();\" value=\"Cerrar\">"
	         + "</div>"
	         + "</div>";

    jQuery.fancybox({
        'modal' : true,
        'content' : html
    });
}


var GetCartByUserId = function(){

	if(Storage !== "undefined") {

        // @todo: uncommente once implemented
        return ;

		$.ajax({
			cache: false,
			url:"/cart/getbyuserid",
			data:"user_id="+window.localStorage.getItem("user_id"),
			success: function(html){
				if(html.indexOf("error") > -1 )
					fancyAlert("Se produjo un error al intentar obtener el carro de compra");
				else{
					var cantidad = $(html).find("span#total_items").html();
					var total = $(html).find("p.totalcarrrito").text();
					$("span.total-quantity").html(cantidad);
					$("span.sqs-money-native").html(total);

					if ($(".cart-list").length==0) {
						if (parseInt(cantidad) > 0) {
							$(".absolute-cart-box").fadeIn();
						}
					}
				}
			}
		});
	}
}

var ValidateCheckoutPayment = function(){

	console.info("llega");

	var checked = $('#checkboxes-1:checked').val();
	var comprobante = $("#comprobante").val().trim();

	if(checked==undefined||comprobante==""){
		fancyAlert("Debe ingresar comprobante y aceptar t\xE9rminos y condiciones");
		return false;
	}

	var data = $('#order-form').find("input").clone();
	
	$("#form-payment div.hidden").html(data);

	return ValidateRequired("order-form");

}

var ValidateWebpay = function(){

	var checked = $('#term-1:checked').val();

	if(checked==undefined){
		fancyAlert("Debe aceptar t\xE9rminos y condiciones");
		return false;
	}

	var data = $('#order-form').find("input").clone();
	
	$("#webpayplus div.hidden").html(data);

	return ValidateRequired("order-form");

}

var ValidateTerms = function(){
	var checked = $('#term-1:checked').val();

	if(checked==undefined){
		fancyAlert("Debe aceptar los t\xE9rminos y condiciones");
		return false;
	}

	return true;
}

var GetAddressById = function(_id){

	$("#InputContactId").val(_id);


	$.ajax({
		url:"/checkout/getaddressbyid",
		data:"id="+_id,
		cache: false,
		success: function(html){
			var obj = jQuery.parseJSON( html );

			if(obj){

				if(obj.success){
					$("#InputAddress").val(obj.success.address);
					$("#InputCity").val(obj.success.city_id);
					$('#InputCity').trigger('change');
					$("#InputZip").val(obj.success.zip_code);
					$("#InputMobile").val(obj.success.telephone);
					$("#InputEmail").val(obj.success.email);
					$("#InputLastName").val(obj.success.lastname);
					$("#InputName").val(obj.success.name);
					$("#InputTown").val(obj.success.town);
					$("#InputRut").val(obj.success.rut);
				} else {
					alert(obj.error);
				}

			}
		}
	});
}

var ValidateRequired = function(id_formulario){
	var valid = true;
	$("#"+id_formulario).find("div.required :text, div.required textarea").each(function(){
		var valor = $(this).val().trim();

		if(valor==""){
			valid = false;
		}
	});

	if(!valid){
		fancyAlert("Debe llenar todos los campos requeridos");
	}

	return valid;
}

var enviarFormulario = function(id_formulario){

	var same_address = false;

	if($("#same_address").length){
		if($("#same_address:checked").val()=="on"){
			same_address = true;
		}
	}

	if(!same_address){
		if(ValidateRequired(id_formulario)){
			$("#"+id_formulario).submit();
		}
	} else {
		$("#"+id_formulario).submit();
	}

}

var votar = function(product_id){

	if($(".fotomegusta").hasClass("enabled")){

		$.ajax({
			url:"/store/voteproduct",
			cache: false,
			data: "product_id="+product_id+"&user_id="+window.localStorage.getItem("user_id"),
			success: function(html){
				response = $.parseJSON(html)
				if(response.error){
					fancyAlert(response.error);
				} else {
					$(".fotomegusta img").attr("src","/static/images/corazon2.png");
					getvotes(product_id);
				}
			}
		});
	}
}

var ifvoted = function(product_id){
	$.ajax({
		url:"/store/product/ifvoted",
		cache: false,
		data: "product_id="+product_id+"&user_id="+window.localStorage.getItem("user_id"),
		success: function(html){
			response = $.parseJSON(html)
			if(response.success){
				$(".fotomegusta").removeClass("enabled");
				$(".fotomegusta img").attr("src","/static/images/corazon2.png");
			}
		}
	});
}

var getvotes = function(product_id){
	$.ajax({
		url:"/store/product/getvotes",
		data: "product_id="+product_id,
		cache: false,
		success: function(html){
			response = $.parseJSON(html)
			if(response.success){
				$("#votes-quantity").html(response.success);
			}
		}
	});
}