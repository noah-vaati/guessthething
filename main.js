//used to keep track of what picture in a folder we are looking at
imageIndex = 0;
//max index for value above, should be 5
maxImageIndex = 5;
//what folder are we in? should default to most recent
//TODO: automate this when picture changes
imageFolder = "images/test1/";
//image extension, jpg for now
imageExt = ".jpg";

//sets the image in imageView to whatever path is given
function changeImage(imagePath){
    imageView.src=imagePath;
}

//gets the filename for the first image, used on body load
function getFirstImage(){
    //should always grab first image in folder, 0.jpg
    return imageFolder + 0 + imageExt;
}

//functionality for the 'skip' button
//moves to next image, and uses a guess
function skip(){
    if(imageIndex+1<maxImageIndex){
        nextImage();
    }
}

//calls changeImage to use next image in sequence
function nextImage(){
    imageIndex++;
    imagePath = imageFolder + imageIndex + imageExt;
    changeImage(imagePath);
}