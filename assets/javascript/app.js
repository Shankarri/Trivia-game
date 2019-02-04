/* {
       question: "The half-giant Hogwarts gamekeeper loves all creatures",
       answer: "Rubeus Hagrid",
       quotes: "Harry -- yer a wizard.",
       picture: "assets/images/Guess_Images/Hagrid.jpg"
   },
   {
       question: "Harry’s devoted pet owl",
       answer: "Hedwig",
       quotes: "Tapping at the Window",
       picture: "assets/images/Guess_Images/Hedwig.jpg"
   },
   {
       question: "The strict but fair Head of Gryffindor house and Transfiguration teacher",
       answer: "Minerva McGonagall",
       quotes: "Don’t tell me what I can and can’t do, Potter.",
       picture: "assets/images/Guess_Images/Mcgonagall.jpg"
   },
   {
       question: "Harry Potter belongs to this House School",
       answer: "Gryffindor",
       quotes: "Where dwell the brave at heart,Their daring, nerve, and chivalry,Set them apart",
       picture: "assets/images/Guess_Images/Gryffindor-Logo.jpg"
   },
   {
       question: "Cedric Diggory belongs to this House School",
       answer: "Hufflepuff",
       quotes: "Where they are just and loyal,Those patient who are true",
       picture: "assets/images/Guess_Images/Hufflepuff-Logo.jpg"
   },
   {
       question: "Luna Lovegood belongs to this House School",
       answer: "Ravenclaw",
       quotes: "If you've a ready mind, Where those of wit and learning, Will always find their kind;",
       picture: "assets/images/Guess_Images/Ravenclaw-Logo.jpg"
   },
   {
       question: "Draco Malfoy belongs to this House School",
       answer: "Slytherin",
       quotes: "You'll make your real friends,These cunning folks use any means,To achieve their ends.",
       picture: "assets/images/Guess_Images/Slytherin.jpg"
   },
   {
       question: "Harry’s School of Witchcraft and Wizardry",
       answer: "Hogwarts",
       quotes: "Help will always be given here to those who ask for it.",
       picture: "assets/images/Guess_Images/Hogwarts.jpg"
   },
   {
       question: "Spell for producing Patronus",
       answer: "Expecto Patronum",
       quotes: "This spell is kind of Anti-Dementor – a guardian which acts as a shield between yourself and the Dementor",
       picture: "assets/images/Guess_Images/patronus.gif"
   },
   {
       question: "Magic parchment that reveals the current location of anyone on Hogwarts grounds",
       answer: "Marauders Map",
       quotes: "I solemnly swear I'm upto no good",
       picture: "assets/images/Guess_Images/Marauders_Map.gif"
   }, */


$(document).ready(function () {

    var originalDetails = [
        {
            id: 1,
            question: "The boy who lived",
            choices: ["Ronald Weasley", "Harry Potter", "Draco Malfoy", "Dudley Dursley"],
            answer: "Harry Potter",
            quotes: "Sorry, Professor, but I must not tell lies.",
            picture: "assets/images/guess_images/Harry_Potter.jpg",
            gif: "assets/images/guess_gifs/HarryPotter_Spell.gif",
        },
        {
            id: 2,
            question: "The cleverest witch of her age",
            choices: ["Luna Lovegood", "Ginny Weasley", "Hermione Granger", "Molly Weasley"],
            answer: "Hermione Granger",
            quotes: "It's leviOsa, not levioSA!",
            picture: "assets/images/Guess_Images/Hermoine_Granger.jpg",
            gif: "assets/images/guess_gifs/GinnyWeasly_Spell.gif",
        },
        {
            id: 3,
            question: "Harry's best friend and youngest Weasley son",
            choices: ["Fred Weasley", "Percy Weasley", "George Weasley", "Ronald Weasley"],
            answer: "Ronald Weasley",
            quotes: "'Of all the trees we could’ve hit, we had to get one that hits back.'",
            picture: "assets/images/Guess_Images/Ronald_Weasley.png",
            gif: "assets/images/guess_gifs/DracoMalfoy_Spell.gif",
        },
        {
            id: 4,
            question: "Hogwarts Headmaster and founder of the Order of the Phoenix,",
            choices: ["Albus Dumbledore", "Severus Snape", "Barty Crouch Sr.", "Dolores Umbridge"],
            answer: "Albus Dumbledore",
            quotes: "Happiness can be found, even in the darkest of times, if one only remembers to turn on the light",
            picture: "assets/images/Guess_Images/Albus_Dumbledore.jpg",
            gif: "assets/images/guess_gifs/Dumbledore_Spell.gif",
        },

        {
            id: 5,
            question: "He who must not be Named",
            choices: ["Harry Potter", "Albus Dumbledore", "Lord Voldemort", "Salazar Slytherin"],
            answer: "Lord Voldemort",
            quotes: "There is no good and evil. There is only power, and those too weak to seek it",
            picture: "assets/images/Guess_Images/Voldemort_2.jpg",
            gif: "assets/images/guess_gifs/Voldemart_Spell.gif",
        },
    ];
    var intervalId;
    var currentQuestion;
    var availableDetails;
    var time;
    var correctAnswer;
    var inCorrectAnswer;
    var unAnswered;

    intialize();

    function intialize()
    {
        availableDetails = originalDetails.slice();
        time = 30;
        correctAnswer = 0;
        inCorrectAnswer = 0;
        unAnswered = 0;
        $("#main-content").show();
        $("#result-row").hide();
        updateRandomQuestion();
    }
    $("#restart-btn").on("click", function (event) { 
        intialize();
    });

    function updateRandomQuestion() {

        if (availableDetails.length > 0) {
            resettimer();

            $("#question-col button").removeClass('disabled');
            $("#question-col button").removeClass('bg-dark');

            var randonDetailsIndex = Math.floor(Math.random() * availableDetails.length);
            currentQuestion = availableDetails[randonDetailsIndex];
            availableDetails.splice(randonDetailsIndex, 1);

            $("#answer-col").hide();
            $("#guess-img").attr("src", currentQuestion.picture);
            $("#question").html(currentQuestion.question);
            for (var i = 0; i < currentQuestion.choices.length; i++) {
                var j = i + 1;
                $("#option" + j).text(currentQuestion.choices[i]);
            }
        }
        else
        {
            $("#main-content").hide();
            $("#correct-answer").html(correctAnswer);
            $("#incorrect-answer").html(inCorrectAnswer);
            $("#unanswered").html(unAnswered);
            $("#result-row").show();
        }
    }

    function resettimer()
    {
        clearInterval(intervalId);
        time = 30;
        $("#time-left").html(time); 
        intervalId = setInterval(function () {

            if (time > 0)  $("#time-left").html(--time); 
            else  displayAnswer(""); 
        }, 1000);
    }
    
    function displayAnswer(ChoiceAnswer)
    {
        $("#answer-gif").attr("src", currentQuestion.gif);
        if (time <= 0)
        {
            unAnswered++;
            $("#answer").html("You have run out of time <br> The correct Answer is " + currentQuestion.answer);
        }
        else if (ChoiceAnswer == currentQuestion.answer) {
            correctAnswer++;
            $("#answer").html("That's Correct");
        }
        else 
        {
            inCorrectAnswer++;
            $("#answer").html("Nope!!! <br> The correct Answer is " + currentQuestion.answer);
        }
        $("#quotes").html(currentQuestion.quotes);
        $("#answer-col").show();
        clearInterval(intervalId);
        setTimeout(updateRandomQuestion, 3000);        
    }

    $("#question-col button").on("click", function (event) {

        var buttonId = "#" + event.target.id;
        $(buttonId).addClass("bg-dark");
        $("#question-col button").addClass('disabled ');
        displayAnswer(event.target.textContent)
    });
 });

