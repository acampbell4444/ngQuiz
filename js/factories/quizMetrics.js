(function(){
	angular
		.module('turtleFacts')
		.factory('quizMetrics',QuizMetrics);

	function QuizMetrics(){
		var quizObj={
			quizActive:false,
			changeState : changeState
		};

		function changeState(state) {
	    	quizObj.quizActive = state
	    }



	    return quizObj;

	    
	}

})();