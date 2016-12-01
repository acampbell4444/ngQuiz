(function(){
	angular
		.module('turtleFacts')
		.factory('quizMetrics',QuizMetrics);

	QuizMetrics.$inject = ['DataService'];

	function QuizMetrics(DataService){
		var quizObj={
			resultsActive : false,
			quizActive:false,
			changeState : changeState,
			correctAnswers : [],
			markQuiz : markQuiz,
			numCorrect : 0
		};

		function changeState(metric, state){
    		if(metric === "quiz"){
        		quizObj.quizActive = state;
    		}else if(metric === "results"){
        		quizObj.resultsActive = state;
    		}else{
        		return false;
    		}
		};

		function markQuiz() {
			for(var i = 0; i < DataService.quizQuestions.length; i++){
	        	if(DataService.quizQuestions[i].selected === DataService.correctAnswers[i]){
	            	DataService.quizQuestions[i].correct = true;
	            	quizObj.numCorrect++;
	        	}else{
	            	DataService.quizQuestions[i].correct = false;
	        	}
	    	}
		};
	    return quizObj;
	}

})();