# Project 3 [ first edition ]

[![N|Solid](https://marketing-prod.global.ssl.fastly.net/sites/default/files/2018-02/MiSKGALogoLockup_2.png)](https://nodesource.com/products/nsolid)

# Cash Memory Performance
This game it is last project to get three months JS course certificate by GA

### the porpuse of this game
To increase cash memory performance by practice everyday and you can see the chart of your performance how fast find maching image.
![N|Solid](https://i.imgur.com/eNjrkqW.png)
first: got to dropdown list and select the animal image you like (cat or dog), and that will git from API (TheCatAPI.com  and TheDogAPI.com)
then select the deficulty of the game (it should be on the top will do it in next update) 
Easy: 8 images.
Midium: 12 images.
Hard: 16 images.

### The code:
```sh
window.onload=function(){
    var mb = document.querySelector('.cash-memory');
    mb.addEventListener("click", handler);
}
```
window.onload The load event on the window object triggers when the whole page is loaded, I faced problem when press the button (start game) it is not run the code then find solution for this issue by using window.onload.

```sh
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
```
this function to check wich level selected and based on that return two values:
the number of images will mach and game level name.

```sh
function arrayOfNumbers(b) {
        var levelArrayNumber = []
        for(i=0; i<b; i++){
            levelArrayNumber.push(i) 
        }
        return levelArrayNumber
    }
```
This function to create Array numbers based on level of game's image length then random it by shuffle function
```sh
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
```
Shuffle function use it to random images array which get it from API.

Create randomArray by shuffle function
```sh
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
```

Here based on animal selected will import the images
```sh
let animalType = document.querySelector('.dropDown').selectedIndex
    if(animalType == 0){
        var settings = {// Cat images
            "url": "https://api.thecatapi.com/v1/images/search?format=json&has_breeds=true&order=RANDOM&page=0&limit=" + numberOfImage,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
                "x-api-key": "bbf91f7f-2707-47ac-acfd-f1361d0ad3d7"
            },
        };
    } else if(animalType == 1){
        var settings = {// Dog images
            "url": "https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=" + numberOfImage,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
                "x-api-key": "bbf91f7f-2707-47ac-acfd-f1361d0ad3d7"
            },
        };
    }
```
This code to create the list face images based on level selected
```sh
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
cashMemoryPerformance(gameLevel)
```

Here the mechanisem of check maching images and count the flibs till finish the games
```sh
 $(() => { // get images based on selected type of animal
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

            for(i=0; i < imageArray.length; i++){ //game mechanizem
                imageArray[i].addEventListener('click', (e) => {
                    j = Array.from(imageArray).indexOf(e.target) ;
                    let c = e.target.getAttribute('src')
                    let imageClick= gameImage[randomArray[j]]
                    let ccc = 'image/think.jpg'
                    let cArray = document.querySelectorAll('img[src =' +'"' + ccc +'"' + ']').length
                    e.target.src = imageClick
                    gameArray.push(imageClick)
                    clickArray.push(j)
                    if(clickArray[clickArray.length-1] == clickArray[clickArray.length-2]){
                        gameArray.pop()
                    } else if(cArray > 0){
                        flibCount += 1
                        document.querySelector('.flib-count').textContent = flibCount
                    } 
                    if( cArray >= 0 && (gameArray[gameArray.length-1] !== gameArray[gameArray.length-2]) && gameArray.length %2 == 0){
                        setTimeout(function(){ 
                            imageArray[clickArray[clickArray.length-1]].src = ccc;
                            imageArray[clickArray[clickArray.length-2]].src = ccc
                        }, 1000)
                    }
                    if(cArray == 1){
                        db.collection('chart').add({
                            date: new Date(),
                            flibs: flibCount,
                            level: gameLevels
                        }); 
                    }
                })
                
            }
            
        });

    });
```

here the image mach from API (need wait when click till image come dueto time to get image through API)
![N|Solid](https://i.imgur.com/S1L9g3T.png)

When press on (show chart) button will get the chart for your flibs did till finish the game
![N|Solid](https://i.imgur.com/B60ssNx.png)

Here function to create dropdown for date play the game or your practice
```sh
let dateDropDown = document.querySelector('.dropDown2')
let dateList = function(countLength, dateUnique){
    dateDropDown.innerHTML = ""
    for(i=0; i< countLength; i++){
        let option = document.createElement('option')
        option.textContent = dateUnique[i]
        dateDropDown.appendChild(option)
    }
}
```
![N|Solid](https://i.imgur.com/mrLRJyD.png)
when select the data will get the table of all flibs got it during that date
![N|Solid](https://i.imgur.com/39zpzcv.png)

```sh
document.querySelector('.chartPerformance').addEventListener('click', e => {//here show (game or chart) button 
    
    if(e.target.textContent == 'Show Chart'){
        e.target.textContent = 'Show Game'
        document.querySelector('ul').classList = 'disableGame'
        document.querySelector('#chart').classList = '' 
        // document.querySelector('h2').classList = 'disableGame'

        let height
        let max
        let min
        if(levelsOfGame().gameLevels == 'easy'){// here to control the chart size and scale
             height = 375
             max = 28
             min = 10
        } else if(levelsOfGame().gameLevels == 'midium'){
            height = 430
            max = 55
            min = 15
        } else if(levelsOfGame().gameLevels == 'hard'){
             height = 500
             max = 70
             min = 20
        }
```
when press the (show chart) button will change to (show game) button
the code next button for chart to control it based on level of game

Here to create the table and present the date and total flibs till complete the game
```sh
dateList(count.length, uniqueDate)
            let flibsList = document.querySelector('#flibsCollectoin')
            document.querySelector('#dateFlibsList').addEventListener('click', e => {// here build the HTML of flibs list
                let dateTableIndex = document.querySelector('.dropDown2').selectedIndex
                start = countSumIndexStart(dateTableIndex,count)
                end = countSumIndexEnd(dateTableIndex, count)
                flibsList.innerHTML = ""
                snapshot.docs.forEach((doc) => {
                    for(i=start; i<end; i++){
                        if(idData[i] == doc.id){
                            let li = document.createElement('li')
                            let flibsDate = document.createElement('span')
                            let flibsTotal = document.createElement('span')
                            let cross = document.createElement('div')
                            cross.classList = 'cross'
                            li.setAttribute('data-id', idData[i])
                            li.classList = 'dateAndFlibs'
                            flibsDate.textContent = dateArray[i]
                            flibsTotal.textContent = flibsArray[i]
                            cross.textContent = 'x'

                            li.appendChild(flibsDate)
                            li.appendChild(flibsTotal)
                            li.appendChild(cross)

                            listFlibs.appendChild(li)
                        }
                    }
                    
                })
```

Here code to delete the data you want from the table
```sh
let crossx = document.querySelector('.cross') 
let lists = document.querySelector('#flibsCollectoin')
if(crossx){
    crossx.addEventListener('click', e => {
        if(e.target.className == 'cross'){
            e.stopPropagation();
            let id = e.target.parentElement.getAttribute('data-id');
            let lii = e.target.parentElement
            console.log(lii,id)
            db.collection('chart').doc(id).delete();
            lists.removeChild(lii)
        }  
    })
}
```
### Huge thanks for Misk to give me this oportunity 
