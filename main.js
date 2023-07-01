imageIndex = 0;

function toggleImage(){
    imageIndex ++;
    imageIndex = imageIndex%2;

    if(imageIndex==0)
        changeImage("images/test0/beach0.jpg");
    else
        changeImage("images/test0/beach1.jpg");
}

function changeImage(imagePath){
    imageView.src=imagePath;
}