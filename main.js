//used to keep track of what picture in a folder is the 'latest' available
imageIndex = 0;
//max index for value above, should be 5
maxImageIndex = 5;
//what folder are we in? should default to most recent
//TODO: automate this when picture changes
imageFolder = "images/test1/";
//image extension, jpg for now
imageExt = ".jpg";

//answer
//TODO: make this less static
answer = "beach"

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
        console.log("Out of guesses");
        document.getElementById("btnSubmit").disabled = true;
        document.getElementById("btnSkip").hidden = true;
    }
}

//submit answer, check if correct
function submitAnswer(){

    //gets value from input, then cears it
    guess = document.getElementById("input0").value;
    document.getElementById("input0").value = null;
    if(guess == answer){
        //correct answer
        console.log("Success");
        
        document.getElementById("btnSubmit").disabled = true;
    }else{
        //wrong answer
        console.log(imageIndex);
        //reuse skip code
        skip();

        //apend br and guess to prevGuesses
        node = document.createElement("br");
        document.getElementById("prevGuesses").appendChild(node);
        node = document.createTextNode(guess);
        document.getElementById("prevGuesses").appendChild(node);

        
    }

    
}

//calls changeImage to use next image in sequence
function nextImage(){
    imageIndex++;
    changeImage(getImagePath(imageIndex));
    //check if max guesses
}