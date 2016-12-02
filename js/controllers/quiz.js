(function(){
 
    angular
        .module("turtleFacts")
        .controller("quizCtrl", QuizController);

    QuizController.$inject = ['quizMetrics', 'DataService']
 
    function QuizController(quizMetrics, DataService){
        var vm = this;
        vm.quizMetrics=quizMetrics;
        vm.dataService=DataService;
        vm.activeQuestion=0;
        vm.questionAnswered=questionAnswered;
        var numQuestionsAnswered=0;
        vm.setActiveQuestion = setActiveQuestion;
        vm.selectAnswer = selectAnswer;
        vm.goToQuestion=goToQuestion;
        vm.error = false;
        vm.finalize=false;
        vm.finalizeAnswers=finalizeAnswers;


       function setActiveQuestion(){
    		var breakOut = false;
    		var quizLength = DataService.quizQuestions.length - 1;
 			while(!breakOut){
        		 vm.activeQuestion = vm.activeQuestion < quizLength?++vm.activeQuestion:0;
        		 if(DataService.quizQuestions[vm.activeQuestion].selected === null){
                    breakOut = true;
                }if(vm.activeQuestion === 0){
        			vm.error = true;
    			}
    		}
		}


		function questionAnswered(){
 			var quizLength = DataService.quizQuestions.length;
 			if(DataService.quizQuestions[vm.activeQuestion].selected !== null){
        		numQuestionsAnswered++;
        		if(numQuestionsAnswered >= quizLength){
           			for(var i = 0; i < quizLength; i++){
                        if(DataService.quizQuestions[i].selected === null){
                            setActiveQuestion(i);
                            return;
                        }
                    }
                    vm.error=false;
                    vm.finalize=true;
                    return;
        		}
    		}
    		vm.setActiveQuestion();
 
		}

        function selectAnswer(i) {
            DataService.quizQuestions[vm.activeQuestion].selected=i;
        }

        function goToQuestion(i) {
            if(DataService.quizQuestions[vm.activeQuestion].selected!==null){
                  vm.questionAnswered();
            }
            vm.activeQuestion=i;
        }

        function finalizeAnswers(){
            vm.finalize = false;
            numQuestionsAnswered=0;
            vm.activeQuestion=0;
            quizMetrics.markQuiz();
            quizMetrics.changeState("quiz", false);
            quizMetrics.changeState("results", true);
        }
       
    }

})();