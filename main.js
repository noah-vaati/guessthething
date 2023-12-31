//used to keep track of what picture in a folder is the 'latest' available
imageIndex = 0;
//max index for value above, should be 5
maxImageIndex = 5;
//what folder are we in? should default to most recent
let imageFolder;
//image extension, jpg for now
imageExt = ".jpg";
//url
url = null;
//file name for main json file
mainJSON = 'main.json';
//answer
let answer;




//initializes the page
function initPage(){
    //do a quick check for sessionStorage values
    if(sessionStorage.length == 0){
        sessionDefault()
    }else{
        setValues();
        
        changeImage(getImagePath(0));
    }
    newImageSet();
    initAutocomplete();

    if(localStorage.getItem(imageFolder+"guesses")!=null){
        restoreGame();
    }
}

//sets default sessionStorage values
function sessionDefault(){
    let path;
    //get most recent and possible answers from json file
    //note, requires web server
    $.get(url+mainJSON, function(data, status){
        path = data.mostRecent;

        sessionStorage.setItem('imageFolder',path);
        setValues();
        
        changeImage(getImagePath(0));

    });
    
}

//sets up autocomplete on input box
function initAutocomplete(){
    $.get(url+mainJSON, function(data, status){
        $('#input0').autocomplete({
            source: data.pAnswers
        });
    })
}

//sets values for answer and image folder
function setValues(){
    //set image folder
    imageFolder = sessionStorage.getItem('imageFolder');

    //find answer
    //note, requires web server
    $.get(url+imageFolder+"answer.json", function(data, status){
        answer = data.answer;
    });
}

//gets file path syntax based off of image folder 
function getImagePath(index){
    return imageFolder + index + imageExt
}

//sets the image in imageView to whatever path is given
function changeImage(imagePath){
    imageView.src=imagePath;
}

//toggles disable on buttons
function toggleBtnDisable(btnIndex){
    btnName = "btn" + btnIndex;
    btn = document.getElementById(btnName)
    btn.disabled = !btn.disabled;
}

//should run whenever a brand new set of images (i.e. a new game, movie, etc) is shown
function newImageSet(){
    //set buttons 1-4 to disabled
    for(i = 1; i < maxImageIndex; i++){
        toggleBtnDisable(i);
    }

    //submit button should be enabled
    document.getElementById("btnSubmit").disabled = false;
}

//functionality for the 'skip' button
//moves to next image, and uses a guess
function skip(){
    if(imageIndex+1<maxImageIndex){
        nextImage();
        toggleBtnDisable(imageIndex);
    }else if(imageIndex+1>=maxImageIndex){
        //out of guesses
        endGame(false);
    }
}

//submit answer, check if correct
function submitAnswer(){

    //gets value from input, then cears it
    guess = document.getElementById("input0").value;
    document.getElementById("input0").value = null;
    if(guess.toLowerCase() == answer.toLowerCase()){
        //correct answer        
        endGame(true);

    }else{
        //wrong answer
        
        //show previus guesses if hidden
        document.getElementById("prevGuesses").hidden = false;
        document.getElementById("guessesBanner").hidden = false;

        //reuse skip code
        skip();

        //apend br and guess to prevGuesses
        node = document.createTextNode(guess);
        document.getElementById("prevGuesses").appendChild(node);
        node = document.createElement("br");
        document.getElementById("prevGuesses").appendChild(node);

        
    }

    
}

//calls changeImage to use next image in sequence
function nextImage(){
    imageIndex++;
    //add record to local storage
    localStorage.setItem(imageFolder+"guesses",imageIndex);
    changeImage(getImagePath(imageIndex));
    //check if max guesses
}

//does stuff that should happen at the end of the game
//gameWon would be true if the game was won
function endGame(gameWon){
    //enable all of the picture buttons if they aren't already
    for(i = imageIndex+1; i < maxImageIndex; i++){
        toggleBtnDisable(i);
    }

    //hide the input, submit, and skip buttons
    document.getElementById("btnSubmit").hidden = true;
    document.getElementById("btnSkip").hidden = true;
    document.getElementById("input0").hidden = true;

    //show replay button
    document.getElementById("btnReplay").hidden = false;

    document.getElementById("answerBanner").hidden = false;
    document.getElementById("answerBanner").textContent = "The correct answer is: " + answer;

    if(gameWon){
        //add guess to localStorage
        localStorage.setItem(imageFolder+"guesses",imageIndex+1);
        localStorage.setItem(imageFolder+"won",true);

        //show congratulations message, along with correct answer
        document.getElementById("resultBanner").hidden = false;
        document.getElementById("resultBanner").textContent = "Congratulations!"

    }else{
        //add to local storage record that they lost
        localStorage.setItem(imageFolder+"guesses",-1);
        document.getElementById("resultBanner").hidden = false;
        document.getElementById("resultBanner").textContent = "Better luck next time!"
    }
}

//bring the gate up to the state it was last i, if there was one
function restoreGame(){
    rGuesses = localStorage.getItem(imageFolder+"guesses");
    rWon = localStorage.getItem(imageFolder+"won");

    //iterate game through as many guesses as there were
    for(i = 0; i < rGuesses; i++){
        skip();
        console.log("rSkip")
    }

    //trigger win/loss if applicable
    if(rWon){
        //if game was won

        //find answer
        //note, requires web server
        $.get(url+imageFolder+"answer.json", function(data, status){
            answer = data.answer;
            endGame(true);
        });
        
    }else if(rGuesses==-1){
        //if game was lost
        $.get(url+imageFolder+"answer.json", function(data, status){
            answer = data.answer;
            endGame(false);
        });
    }

}
