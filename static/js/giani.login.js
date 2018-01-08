// pasar a giani.js
$(document).ready(function(){

	// repetir password
	$('input[name=password]').change( function(){
		$('input[name=re-password]').attr( "pattern", $(this).val() );
	} );

	// repetir email
	// $('input[name=email]').change( function(){
	//  $('input[name=re-email]').attr( "pattern", $(this).val() );
	// } );

	// login submit
	$( ".form-login" ).submit( function(evt)
	{

		var tthis = $( this );

		var email = $("input[name=email]", tthis).val().trim();
		var password = $("input[name=password]", tthis).val().trim();

		evt.preventDefault();

		if(email!=""&&password!=""){

			var tthis = $(this);

			var data = { "ajax":"true",
						 "email":email,
						 "password":password,
						 "user_id":window.localStorage.getItem("user_id") };


			$.ajax({ 

				url: $( this ).attr( 'action' ), 
				type: "post",
				data: data,
				cache: false,
				beforeSend: function(objeto){
		            $("div.cargando").fadeIn();
		        },
				success: function(rtn){

					var rtn_pair = $.parseJSON(rtn);

					if (rtn_pair.status == "ok") 
					{
						window.localStorage.setItem("user_id",rtn_pair["user_id"].toString());
						window.parent.document.location.href = rtn_pair["next"];
					}
					else
					{
						fancyAlert( rtn_pair.message );
					}

					$("div.cargando").fadeOut();
				} 
			});
		} else {
			fancyAlert("Debe ingresar email y contrase\xF1a");
		}
		return false;
	});

	$( ".form-register" ).submit(function(evt)
	{
		evt.preventDefault();

		var tthis = $( this );

		var email = $("input[name=email]", tthis).val().trim();
		var password = $("input[name=password]", tthis).val().trim();
		var name = $("input[name=name]", tthis).val().trim();
		var repassword = $("input[name=re-password]", tthis).val().trim();
		var tos = $("input[name=tos]:checked", tthis).val();
		var user_id = 0;

		if(window.localStorage.getItem("user_id")){
			user_id = window.localStorage.getItem("user_id");
		}

		if(name==""){
			fancyAlert("Debe ingresar nombre de usuario");
			return false;
		}

		if(email==""){
			fancyAlert("Debe ingresar email");
			return false;
		}

		if(password==""){
			fancyAlert("Debe ingresar contrase\xF1a");
			return false;
		} else if(password!=repassword){
			fancyAlert("Error en al confimar contrase\xF1a");
			return false;
		}

		if(tos!="on"){
			fancyAlert("Debe aceptar los t\xE9rminos y condiciones");
			return false;
		}


			
		var data = { "ajax":"true",
					 "name":name,
					 "email":email,
					 "password":password,
					 "re-password":repassword,
					 "user_id":user_id,
					 "tos":tos}

		/*$.post( $( this ).attr( 'action' ), data, function(rtn){

			var rtn_pair = $.parseJSON(rtn);

			if (rtn_pair.success) 
			{
				window.parent.document.location.href = rtn_pair.success;
			}
			else
			{
				fancyAlert( rtn_pair.error );
			}
		});*/

		$.ajax({ 

			url: $( this ).attr( 'action' ), 
			type: "post",
			data: data,
			cache: false,
			beforeSend: function(objeto){
	            $("div.cargando").fadeIn();
	        },
			success: function(rtn){

				var rtn_pair = $.parseJSON(rtn);

				if (rtn_pair.success) 
				{
					window.parent.document.location.href = rtn_pair.success;
				}
				else
				{
					alert( rtn_pair.error );
				}

				$("div.cargando").fadeOut();
			} 
		});

		return false;
	});

	$(".parent-link").click(function(evt){
		evt.preventDefault();
		var user_id = window.localStorage.getItem("user_id");
		window.localStorage.setItem("user_id","0");
		var url = $(this).attr( "href" ) + "?user_id=" + user_id;
		/*fancyAlert("se va al login de fb " + url);*/
		window.parent.document.location.href = url;
	});


	if(typeof(Storage) !== "undefined") {

		if(!window.localStorage.getItem("user_id")){
			window.localStorage.setItem("user_id","0");
		}

        // @todo : uncomment once implemented
        return;

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
	
});