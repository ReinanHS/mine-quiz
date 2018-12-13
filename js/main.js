(function(){
	var index = 1;
	var resultados = [];

	var form = document.getElementsByTagName('form')[0];

	form.addEventListener("submit", function(elem){
		elem.preventDefault();
		
		var email = document.querySelector('input[type="email"]');
		
		if(email.value == null || email.value == undefined) return alert('Informe um email válido');

		document.querySelector('.first').style.display = 'none';
		document.querySelector('.instructions').style.display = 'block';
	});


	document.getElementsByTagName('button')[1].addEventListener('click', function(){
		document.querySelector('.start').style.display = 'none';
		document.querySelector('.quiz').style.display = 'flex';
	});


	$(document).ready(function(){
		createQuiz();
	  	var checkmark = "<span class='checkmark'>&#x2713;</span>";
	  
		$(".answer").click(function() {
			$(this).siblings(".answer").removeClass("active").children("span").remove();
			$(this).addClass("active").append(checkmark);
		});
	  
	  
		$("#btnQuiz").click(function() {
			if($(".active").length) {

				resultados[index] = $(".active").index();
				
				if(index <= 25){
					index = index + 1;
					createQuiz();
				}


			} else {
				alert("Por favor selecione uma resposta!");
			}
		});
	});

	function createQuiz()
	{
		$.ajax({
		  	url: 'http://localhost/quizPrepara/quiz/'+index,
		  	type: 'GET',
		  	dataType: 'json'
		  })
		  .done(function(result) {
		  	//console.log("success");
		  	//console.log(result);

		  	document.querySelector('.question').children[0].innerHTML = '<span>'+index+'.</span> '+result.question;
		  	document.querySelectorAll('.answers li p')[0].innerHTML = '<span>I</span> '+result.i+'</div>';
			document.querySelectorAll('.answers li p')[1].innerHTML = '<span>C</span> '+result.c+'</div>';
			document.querySelectorAll('.answers li p')[2].innerHTML = '<span>A</span> '+result.a+'</div>';
			document.querySelectorAll('.answers li p')[3].innerHTML = '<span>O</span> '+result.o+'</div>';
		  
		  })
		  .fail(function(error) {
		  	console.log("error");
		  	console.log(error);
		  })
		  .always(function() {
		  	//console.log("complete");
		});

		return true;
	}

})();