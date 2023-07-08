//placeholder launch new image
function newImage(imageIndex){
    folderPath = "images/test" + imageIndex + "/";
    sessionStorage.setItem('imageFolder', folderPath)
    window.location.replace("main.html");
}