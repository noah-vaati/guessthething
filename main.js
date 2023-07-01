//used to keep track of what picture in a folder is the 'latest' available
imageIndex = 0;
//max index for value above, should be 5
maxImageIndex = 5;
//what folder are we in? should default to most recent
//TODO: automate this when picture changes
imageFolder = "images/test1/";
//image extension, jpg for now
imageExt = ".jpg";

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
}

//functionality for the 'skip' button
//moves to next image, and uses a guess
function skip(){
    if(imageIndex+1<maxImageIndex){
        nextImage();
        toggleBtnDisable(imageIndex);
    }
}

//calls changeImage to use next image in sequence
function nextImage(){
    imageIndex++;
    changeImage(getImagePath(imageIndex));
}