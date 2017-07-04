//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show();
	//next_fs.attr("style", "visibility: visible;"); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'transform': 'scale('+scale+')'});
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			//current_fs.hide();
			current_fs.attr("style", "visibility: hidden;");
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//previous_fs.attr("style", "visibility: visible;");
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			//current_fs.hide();
			current_fs.attr("style", "visibility: hidden;");
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".afp").validate({
    rules: {
        sueldo: { 
        	required: true
        },
        aporte: { 
        	required: true
        },
        fondo: { 
        	required: true 
        },
        edad_retiro: { 
        	required: true 
        }
    },


    messages: {
        sueldo: "Debe introducir su sueldo.",
        aporte: "Debe introducir su aporte mensual.",
        fondo: "Debe seleccionar su tipo de fondo",
        edad_retiro: "Deve seleccionar su edad de retiro"
    },


    submitHandler: function() {
        $.ajax({
			url: '/',
			method: 'post',
			data: $(".afp").serialize(),
			success: function(data){
				$(".afp").hide();
				$(".results").html("\
					<div id='msform'>\
					  <fieldset>\
					    <h2 class='fs-title'>Results</h2>\
					    <label> La pension es: S/." + data.pension + "</label><br>\
					    <label> El fondo acumulado es: S/." + data.fondo_acumulado + "</label><br>\
					    <input class='action-button' type='button'  value='Cerrar' onclick='cerrar()'/>\
					  </fieldset>\
					</div>");
				
			}
		});
    }
});

$(".register").validate({
    rules: {
        name: { 
        	required: true
        },
        lastname: { 
        	required: true
        },
        date: { 
        	required: true
        },
        username: { 
        	required: true,
        	minlength: 4
        },
        email: { 
        	required: true,
        	email: true
        },
        password: {
        	minlength: 5
        },
        cpass: { 
        	minlength: 5,
        	equalTo: '#pass'
        },
        sex: { 
        	required: true
        }
    },


    messages: {
        name: "Debe introducir su nombre.",
        lastname: "Debe introducir su apellido.",
        date: "Debe introducir su fecha de nacimiento.",
        username: "Debe introducir su usuario.",
        email: "Debe introducir su correo.",
        password: "Debe introducir su contraseña.",
        cpass: "Las contraseñas deben ser iguales.",
        sex: "Debe introducir su sexo."
    },

    submitHandler: function() {
        $.ajax({
			url: '/register',
			method: 'post',
			data: $(".register").serialize(),
			success: function(data){
				if(typeof data.redirect === 'string'){
					window.location = data.redirect;
				}else{
					$('.error-message').html('<label class="label">' +  data.error + '</label>');
				}
			}
		});
    }
});

$(".login").validate({
    rules: {
        username: { 
        	required: true
        },
        password: { 
        	required: true, 
        	minlength: 4 
        }
    },
    messages: {
        username: "Debe introducir su usuario.",
        password: "Debe introducir su contraseña."
    },
    submitHandler: function() {
        $.ajax({
			url: '/login',
			method: 'post',
			data: $(".login").serialize(),
			success: function(data){
				if(typeof data.redirect === 'string'){
					window.location = data.redirect;
				}else{
					$('.error-message').html('<label class="label">' +  data.error + '</label>');
				}
			}
		});
    }
});

function cerrar(){
	window.location = '/';
}