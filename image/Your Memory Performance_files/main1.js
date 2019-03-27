//if radioButton == 'easy' then b = 8
// function arrayOfNumbers(b) { // take it in line 114
//     var levelArrayNumber = []
//     for(i=0; i<b; i++){
//         levelArrayNumber.push(i) 
//     }
//     return levelArrayNumber
// }

//Shuffle function of an array
// function shuffle(b,arrayOfNumbers) { take in line 122
//     a = arrayOfNumbers(b)
//     var j, x, i;
//     for (i = a.length - 1; i > 0; i--) {
//         j = Math.floor(Math.random() * (i + 1));
//         x = a[i];
//         a[i] = a[j];
//         a[j] = x;
//     }
//     return a;
// }


// function repeatImage(imageArray, timesOfRepeat = 2){ //imageArray has the links from API after reduce number of image based on the level. // taken in line 198
//     let imageArrayRepeated = []
// for(i=0; i< timesOfRepeat; i++){
//     for(j=0; j< imageArray.length; j++){
//         imageArrayRepeated.push(imageArray[j])
//     }
// }
// return imageArrayRepeated
// }
// let flibCount = 0
// let gameArray = []
// let clickArray = []
// let randomArray = shuffle(8,arrayOfNumbers)//in line 122 


//-------------------------------------------------------------------------------------

window.onload=function(){
    var mb = document.querySelector('.cash-memory');
    mb.addEventListener("click", handler);
    // mb.addEventListener("click", handler2);
}

//to get the level based on user select Easy, Midium or Hard
function handler(e) {
    e.preventDefault()
    
    function levelsOfGame(){
        let levelIs = 0;
        let gameLevels = "";
        if(document.querySelector('#easy').checked){
            levelIs = 8;
            gameLevels = "easy";
        } else if(document.querySelector('#midium').checked){
            levelIs = 12;
            gameLevels = "midium";
        } else if(document.querySelector('#hard').checked){
            levelIs = 16;
            gameLevels = "hard";
        }
        return {levelIs, gameLevels}
    }
    let  gameLevel = levelsOfGame().levelIs //used in number of image face should create based on level

    let numberOfImage = gameLevel/2 // used in number of image retrive from API then dublicate it by repeatImage() function 
    
    function arrayOfNumbers(b) {// to create Array numbers based on level of game's image length then random it by shuffle function
        var levelArrayNumber = []
        for(i=0; i<b; i++){
            levelArrayNumber.push(i) 
        }
        return levelArrayNumber
    }
    //Shuffle function to generate random array number 
    function shuffle(b,arrayOfNumbers) {
        a = arrayOfNumbers(b)
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    let randomArray = shuffle(gameLevel,arrayOfNumbers)
    //repeat the image to duble for cash memeory game
    function repeatImage(imageArray, timesOfRepeat = 2){ //imageArray has the links from API after reduce number of image based on the level by variable numberOfImage.
        let imageArrayRepeated = []
    for(i=0; i< timesOfRepeat; i++){
        for(j=0; j< imageArray.length; j++){
            imageArrayRepeated.push(imageArray[j])
        }
    }
    return imageArrayRepeated
    }
    
    let animalType = document.querySelector('.dropDown').selectedIndex
    if(animalType == 0){
        var settings = {
            "url": "https://api.thecatapi.com/v1/images/search?format=json&has_breeds=true&order=RANDOM&page=0&limit=" + numberOfImage,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
                "x-api-key": "bbf91f7f-2707-47ac-acfd-f1361d0ad3d7"
            },
        };
    } else if(animalType == 1){
        var settings = {
            "url": "https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=" + numberOfImage,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
                "x-api-key": "bbf91f7f-2707-47ac-acfd-f1361d0ad3d7"
            },
        };
      }

    
        const collectionOfImage = document.querySelector('#imageCollection')
        function cashMemoryPerformance(level){
            //create elements
            collectionOfImage.innerHTML = ""//to delete all and start one again
            for(i = 0; i < level; i++){
                const list = document.createElement('li');
                const image = document.createElement('img');
                //apend to document
                collectionOfImage.appendChild(list);
                list.appendChild(image)
                //class name
                list.className = "gameBox"
                //add face image
                image.src = "image/think.jpg"
            }

        }

        cashMemoryPerformance(gameLevel)//b in line 113
        
        $(() => {
            $.ajax(settings).done(function (response) {
                let image2 = [];
                response.forEach(element => {
                    image2.push(element.url);
                   
                });
                
              
                 
                let flibCount = 0
                let gameArray = []
                let clickArray = []
                let gameImage = repeatImage(image2)
                let imageArray = document.querySelectorAll("img");

                for(i=0; i < imageArray.length; i++){
                    imageArray[i].addEventListener('click', (e) => {
                    j = Array.from(imageArray).indexOf(e.target) ;
                    console.log(j)
                    let c = e.target.getAttribute('src')
                    
                    let imageClick= gameImage[randomArray[j]]
                    console.log(imageArray[j].src)
                    let ccc = 'image/think.jpg'
                    let imageClickArray = document.querySelectorAll('img[src =' +'"' + imageClick +'"' + ']')
                    // console.log(imageClickArray.length)
                    let cArray = document.querySelectorAll('img[src =' +'"' + ccc +'"' + ']').length
                    // console.log(cArray.length)
                    e.target.src = imageClick
                    gameArray.push(imageClick)
                    console.log(gameArray)
                    clickArray.push(j)
                    console.log(clickArray)
                    
                    if(clickArray[clickArray.length-1] == clickArray[clickArray.length-2]){
                        
                        gameArray.pop()
                    } else if(cArray > 0){
                        flibCount += 1
                        console.log(flibCount)
                    } 
                    
                    if( cArray >= 0 && (gameArray[gameArray.length-1] !== gameArray[gameArray.length-2]) && gameArray.length %2 == 0){
                        setTimeout(function(){ 
                            imageArray[clickArray[clickArray.length-1]].src = ccc;
                            imageArray[clickArray[clickArray.length-2]].src = ccc
                        }, 1000)
                        
                    }
                    console.log("length is: ", cArray)
                    if(cArray == 1){
                        db.collection('chart').add({
                            date: new Date(),
                            flibs: flibCount,
                            level: gameLevels
                        });
                        console.log(cArray)
                    }

                    //if((gameArray[gameArray.length-1] !== gameArray[gameArray.length-2]) && gameArray.length %2 == 0 ){
                       // setTimeout(function(){ 
                         //   imageArray[clickArray[clickArray.length-1]].src = ccc;
                         //   imageArray[clickArray[clickArray.length-2]].src = ccc
                       // }, 1000)
                  //  }
                    })
                }
                
            });

    });
            
}
        
