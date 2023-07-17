//url
url = "https://www.whichbarbie.com/";

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
    $.get(url+"main.json", function(data, status){
        newImage(data.mostRecent);
    });
}

//checks for scores and adds them to menu
function checkScores(){
    //get from json file
    //note, requires web server
    $.get(url+"main.json", function(data, status){
        ids = data.ids;
        //ids should correspond to ids for buttons
        //iterate through them
        for(i = 0; i < ids.length; i++){
            guesses = localStorage.getItem("images/"+ids[i]+"/guesses");
            won = localStorage.getItem("images/"+ids[i]+"/won");

            if(guesses==null){
                //if they have not played yet
                $("#"+ids[i]).hide();
            }else if(guesses == -1){
                //if they lost this game
                $("#"+ids[i]).text("❌ Loss");
            }else if(won){
                //if they won this game
                $("#"+ids[i]).text("✔️ Won in " + guesses + " guesses");
            }else if(guesses == 1){
                //game still has guesses left
                $("#"+ids[i]).text(guesses + " guess used");
            }else{
                //game still has guesses left
                $("#"+ids[i]).text(guesses + " guesses used");                
            }
            
        }
    });
}