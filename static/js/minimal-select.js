$(document).ready(function(){
	$("#address").minimalect({
		placeholder:"Agregar nueva direcci&oacute;n",
		theme: "bubble",
		onchange: function(){
			$('#address').trigger('change');
		}
	});

	$("#InputCity").minimalect({
		placeholder:"Seleccione una ciudad",
		theme: "bubble",
		onchange: function(){
			$('#InputCity').trigger('change');
		}
	});
});