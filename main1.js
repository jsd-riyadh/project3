
window.onload=function(){
    var mb = document.querySelector('.cash-memory');
    mb.addEventListener("click", handler);
}

//to get the level based on user select Easy, Midium or Hard
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



function handler(e) {
    e.preventDefault()
    
   
    let  gameLevel = levelsOfGame().levelIs //used in number of image face should create based on level
    let gameLevels = levelsOfGame().gameLevels
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
            
}

let dateDropDown = document.querySelector('.dropDown2')
let dateList = function(countLength, dateUnique){//this function to create dropdown for date used the game
    dateDropDown.innerHTML = ""
    for(i=0; i< countLength; i++){
        let option = document.createElement('option')
        option.textContent = dateUnique[i]
        dateDropDown.appendChild(option)
    }
}

document.querySelector('.chartPerformance').addEventListener('click', e => {//here show (game or chart) button 
    
    if(e.target.textContent == 'Show Chart'){
        e.target.textContent = 'Show Game'
        document.querySelector('ul').classList = 'disableGame'
        document.querySelector('#chart').classList = '' 

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
        
        // here to get data base on level user selected and ordered by date to see the performance
        db.collection('chart').where('level','==',levelsOfGame().gameLevels).orderBy('date').get().then((snapshot) => {
                let milliseconds 
                let currentDate
                let flibsArray = [];
                let gameFlibs
                let dateArray = []
                let idData = []
                let month = new Date()
            snapshot.docs.forEach((doc) => { // here to put all data base on filter above line 207 on one array
                
                gameFlibs = doc.data().flibs
                flibsArray.push(gameFlibs)
                milliseconds = doc.data().date.seconds * 1000;
                currentDate = new Date(milliseconds)
                month = currentDate.getMonth()
                date1 = currentDate.getDate()
                let dateGame = `${date1} - ${month + 1}`
                dateArray.push(dateGame)
                idData.push(doc.id)
            })

            let listFlibs = document.querySelector('#flibsCollectoin')
            function countSumIndexEnd(index, count){ // Both functions to control array of data which created on line 215 to use it in for loop
                sum = 0
                if(index == 0){
                    return count[index]
                } else if(index >0){
                    for(i=0;i<index + 1;i++){
                    sum += count[i]    
                }
                return sum
                }
            }
            function countSumIndexStart(index, count){
                sum = 0
                if(index == 0){
                    return 0
                } else if(index > 0){
                    for(i=0;i<index ;i++){
                    sum += count[i]    
                }
                return sum
                }
            }

            let count = []
            let uniqueDate = [...new Set(dateArray)]
            for(i=0; i< uniqueDate.length; i++){
                count[i] = 0
                for(j=0; j < dateArray.length; j++){
                    if(uniqueDate[i] == dateArray[j]){
                        count[i] += 1
                    }
                }
                
            }
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
                    let crossx = document.querySelector('.cross') //ther is some bugs need to fixed 
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
                
            });
            
            var options = {// Chart code
                chart: {
                    height: height,
                    type: 'line',
                    shadow: {
                        enabled: true,
                        color: '#f3f9fb',
                        top: 18,
                        left: 7,
                        blur: 10,
                        opacity: 1
                    },
                    toolbar: {
                        show: false
                    }
                },
                colors: ['#77B6EA', '#545454'],
                dataLabels: {
                    enabled: true,
                },
                stroke: {
                    curve: 'smooth'
                },
                series: [{
                        name: "Total flibs",
                        data: flibsArray
                    }],
                title: {
                    text: 'Average High & Low Temperature',
                    align: 'center'
                },
                grid: {
                    borderColor: '#e7e7e7',
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                markers: {
                    
                    size: 6
                },
                xaxis: {
                    categories: dateArray,
                    title: {
                        text: 'Time'
                    }
                },
                yaxis: {
                    title: {
                        text: 'Flibs'
                    },
                    min: min,
                    max: max
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    floating: true,
                    offsetY: -25,
                    offsetX: -5
                }
            }
            
            var chart = new ApexCharts(
                document.querySelector("#chart"),
                options
            );
            chart.render();
            
        })

    } else if(e.target.textContent == 'Show Game'){ 
        e.target.textContent = 'Show Chart' 
        document.querySelector('ul').classList = ''
        document.querySelector('#chart').classList = 'disableChart'
    }
    
    })




//https://apexcharts.com/javascript-chart-demos/line-charts/data-labels/