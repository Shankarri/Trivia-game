$(document).ready(function () {

    // Original Trivia Question and answer
    var originalDetails = [
        {
            question: "What is the name of Chandler's father's gay Las Vegas show?",
            choices: ["VIVA LAS GAYGAS","THE GAY DIARIES", "SATURDAY NIGHT JACKPOT","SUNSET STRIPTEASE"],
            answer: "VIVA LAS GAYGAS",
            picture: "assets/images/guess_images/01.Vegas.jpg",
            gif: "assets/images/answer_images/01.Vegas.gif",
        },
        {
            question: "What is the name of Phoebe's birth mother?",
            choices: ["ROSE","PHOEBE","LILY", "DAISY"],
            answer: "PHOEBE",
            picture: "assets/images/guess_images/02.Phoebe_Mom.jpg",
            gif: "assets/images/answer_images/02.Phoebe_Mom.gif",
        },
        {
            question: "What does Rachel gets as a tattoo?",
            choices: ["HER ZODIAC SIGN","THE LETTER R","A HEART","A RAINBOW"],
            answer: "A HEART",
            picture: "assets/images/guess_images/03.Rachael_Tattoo.jpg",
            gif: "assets/images/answer_images/03.Rachael_Tattoo.jpg",
        },
        {
            question: "What did Joey want to wear while performing Monica and Chandler's wedding?",
            choices: ["A tuxedo","Multi-colored robes","Army Costume","A priest's robe"],
            answer: "Army Costume",
            picture: "assets/images/guess_images/04.Joey_dress.jpg",
            gif: "assets/images/answer_images/04.Joey_dress.gif",
        },
        {
            question: "What is the name of character Joey play as doctor in 'Days of Our Lives'?",
            choices: ["Ramone Striker", "Drake Ramoray","Bo Horton","Jack Brady"],
            answer: "Drake Ramoray",
            picture: "assets/images/guess_images/05.Dr_Joey.gif",
            gif: "assets/images/answer_images/05.Dr_Joey.gif",
        },
        {
            question: "Joey auditions for a job as a host for a new game show called ?",
            choices: ["Match Game", "Bamboozled","Pyramid","Cups"],
            answer: "Bamboozled",
            picture: "assets/images/guess_images/06.bamboozled.gif",
            gif: "assets/images/answer_images/06.bamboozled.gif",
        },
        {
            question: "What is the address label printed on Chandler and Joey's TV Guide?",
            choices: ["Mr Chandler Bing", "Miss Chanadler Bong","Mr Chandler Bong","Miss Chanadler Bing"],
            answer: "Miss Chanadler Bong",
            picture: "assets/images/guess_images/07.MissChanadlerBong.gif",
            gif: "assets/images/answer_images/07.MissChanadlerBong.gif",
        },
        {
            question: " What is the name of Joey's stuffed penguin?",
            choices: ["Huggy", "Mr. Huggy","Hugsy","Hugger"],
            answer: "Hugsy",
            picture: "assets/images/guess_images/08.Joey_Pet.gif",
            gif: "assets/images/answer_images/08.Joey_Pet.gif",
        },
        {
            question: "What does Phoebe change her name to after marrying Mike Hannigan?",
            choices: [ "Mrs Phoebe Hannigan-Buffay ","Mrs Phoebe Buffay-Hannigan","Mrs Phoebe Hannigan", "Princess Consuela Bananahammock"],
            answer: "Princess Consuela Bananahammock",
            picture: "assets/images/guess_images/09.Phoebe_name.gif",
            gif: "assets/images/answer_images/09.Phoebe_name.gif",
        },
        {
            question: "What was Joeys choice when played Rock, Paper, Scissors?",
            choices: [ "Rock ","Paper","Fire", "Scissors"],
            answer: "Fire",
            picture: "assets/images/guess_images/10.Joey_fire.gif",
            gif: "assets/images/answer_images/10.Joey_fire.gif",
        },
    ];
    
    // -------------------------------------------------------------------------
    
    // Declaring Global variable
    var intervalId;
    var currentQuestion;
    var availableDetails;
    var time;
    var correctAnswer;
    var inCorrectAnswer;
    var unAnswered;
    var questionNo = 0;
    
    $("#main-content").hide();
    $("#result-row h5").hide();

    // -------------------------------------------------------------------------

    // Initialize for the game to start
    function intialize()
    {
        // create a new array copying the originalDetails Array for data manipulation
        availableDetails = originalDetails.slice();
        time = 60;
        correctAnswer = 0;
        inCorrectAnswer = 0;
        unAnswered = 0;
        questionNo =0;
        $("#main-content").show();
        $("#result-row").hide();

        // After initialization update the page with random question
        updateRandomQuestion();
    }

    // -------------------------------------------------------------------------

    // Clicking restart Button should restart the game by intializing
    $("#restart-btn").on("click", function (event) { 
        intialize();
        $("#restart-btn").text("Restart Game");  
    });

    // -------------------------------------------------------------------------

    // Updating Random Question
    function updateRandomQuestion() {

        // Empty the images so image is loaded after the question 
        $("#answer-gif").attr("src", "");
        $("#guess-img").attr("src", "");
        
        // If Copied array has elements 
        if (availableDetails.length > 0) {

            // call the reset timer to update the timer
            resettimer();

            // Remove the clicked colored button class and enable the buttons  
            $("#question-col button").removeAttr("disabled");
            $("#question-col button").removeClass('bg-dark text-light');

            // Select the random Element in the availableDetails Array
            var randonDetailsIndex = Math.floor(Math.random() * availableDetails.length);
            currentQuestion = availableDetails[randonDetailsIndex];

            // Once we get the random element, remove that element from the array 
            // so we will not ask the same question again to the user
            availableDetails.splice(randonDetailsIndex, 1);

            // Update the questions, choices and guess Image columns 
            questionNo++;
            $("#answer-col").hide();
            $("#question-no").html(questionNo);
            $("#remaining-no").html(availableDetails.length);
            $("#guess-img").attr("src", currentQuestion.picture);
            $("#question").html(currentQuestion.question);
            for (var i = 0; i < currentQuestion.choices.length; i++) {
                var j = i + 1;
                $("#option" + j).text(currentQuestion.choices[i]);
            }
        }

        // If copied array has no elements then the trivia is over so show results 
        else
        {
            
            $("#main-content").hide();
            $("#correct-answer").html(correctAnswer);
            $("#incorrect-answer").html(inCorrectAnswer);
            $("#unanswered").html(unAnswered);
            $("#result-row").show();
            $("#result-row h5").show();
        }
    }

    // -------------------------------------------------------------------------
    
    // Reset the timer for the Question page 
    function resettimer()
    {
        clearInterval(intervalId);
        time = 60;
        
        $("#time-left").html(time); 
        
        intervalId = setInterval(function () {
            // if time is not zero then countdown the time
            if (time > 0)  $("#time-left").html(--time); 
            // if time goes to zero then display answer
            else  displayAnswer(""); 
        }, 1000);
    }

    // -------------------------------------------------------------------------

    // when we click on one of the choices 
       $("#question-col button").on("click", function (event) {

        var buttonId = "#" + event.target.id;

        //Highlight the button but make it disabled so user cannot click on timeout
        $(buttonId).addClass("bg-dark text-light");
        $("#question-col button").attr('disabled','disabled');

        //Send the clicked choice for displaying the answer
        displayAnswer(event.target.textContent)
    });
    
    // -------------------------------------------------------------------------

    //Display answer on screen
    function displayAnswer(ChoiceAnswer)
    {
        // if time is run out, update the message and add one to unanswered 
        $("#answer-gif").attr("src", currentQuestion.gif);
        if (time <= 0)
        {
            unAnswered++;
            $("#answer").html("<span class='text-danger'>*** You have run out of time *** </span><br> The correct Answer is " + currentQuestion.answer);
        }

        // if choice is equal to correct answer then display success message and add one to correct answer  
        else if (ChoiceAnswer == currentQuestion.answer) {
            correctAnswer++;
            $("#answer").html("<span class='text-primary'>** That's Correct *** </span>");
        }

        // if choice is wrong then display failure message and add one to incorrect answer
        else 
        {
            inCorrectAnswer++;
            $("#answer").html("<span class='text-danger'>*** Nope!!! ***</span> <br> The correct Answer is " + currentQuestion.answer);
        }
    
        // show answer Gif 
        $("#answer-col").show();

        // clear timer so it starts as fresh
        clearInterval(intervalId);

        // Update next question after timeout
        setTimeout(updateRandomQuestion, 4000);        
    }
    // -------------------------------------------------------------------------
 });

