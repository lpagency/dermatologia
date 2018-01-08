$(document).ready(function(){


	//fancyAlert("holi");

	$("button.add-to-cart").click(function(){
		var product_id = $(this).attr("product-id");
		var size = $("#size").val()
		var quantity = $("#quantity").val()
		$.ajax({
			url:"/cart/add",
			cache: false,
			data:"product_id="+product_id+"&size="+size+"&quantity="+quantity+"&user_id="+window.localStorage.getItem("user_id"),
			success:function(html){
				if(html!="ok"){
					fancyAlert(html);
				} else {
					GetCartByUserId(window.localStorage.getItem("user_id"));
					$(".absolute-cart-box").fadeIn();
				}
			}
		})
	});

	var size_changed = function(){
		var sku = $(this).attr("sku");
		var size = $(this).val();
		$.ajax({
			url:"/kardex/getunitsbysize",
			cache: false,
			data:"sku="+sku+"&size="+size,
			success:function(html){
				if(html.indexOf("error") > -1){
					fancyAlert(html);
					$("#quantity").empty();
					var total_unidades = parseInt(html);
					$("#quantity").append($("<option></option>").attr("value",0).text(0));
				} else {
					$("#quantity").empty();
					var total_unidades = parseInt(html);
					for (i = 1; i <= total_unidades; i++) {
						$("#quantity").append($("<option></option>").attr("value",i).text(i));
					}
				}
			}
		});
	};

	$("#size").change(size_changed);
	$("#size").trigger( "change" );

	//$("#size").ready(size_changed);


	if($("input[name='quanitySniper']").length){
		$("input[name='quanitySniper']").TouchSpin({
			buttondown_class: "btn btn-link",
			buttonup_class: "btn btn-link"
		});
	}

	if($("select#address").length){

		GetAddressById($("select#address").val());

		$("select#address").change(function(){
			if($("select#address").val()!=""){
				_id = $(this).val();
				GetAddressById(_id);
			}
		});		
	}

	$("#same_address").change(function(){
		var checked = $("#same_address:checked").val();
		if(checked=="on"){
			$("#formulario_direccion").fadeOut();
		} else {
			$("#formulario_direccion").fadeIn();
		}
	});

	$("#same_address").trigger("change");

	$("img.otro-angulo").click(function(){
		var image_src = $(this).attr("data-src");
		$("img.foto-producto").attr("src",image_src);
	});

});

