//url
url = "https://www.yoururlhere.com";

//launch new image
//currently use hard coded paths in the html, not sure there is a better way, 
//may think about it
function newImage(folderPath){
    sessionStorage.setItem('imageFolder', folderPath)
    window.location.replace(url);
}

//load the most recent image
function mostRecentImage(){
    //get from json file
    //note, requires web server
    $.get(url+"mostRecent.json", function(data, status){
        newImage(data.mostRecent);
    });
}