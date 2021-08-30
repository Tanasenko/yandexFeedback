ymaps.ready(init);
    function init(){
        var myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 11,
            controls: []
        });

        var coords = {};
        var myBallon = {
            balloonContent: [
                '<div class="balloon">',
                    '<div class="reviews"></div>',
                    '<div class="title">Отзыв:</div>',
                    '<input class="name" placeholder="Укажите ваше имя">',
                    '<input class="place" placeholder="Укажите место">',
                    '<textarea class="comment" placeholder="Оставить отзыв"></textarea>',
                    '<button class="addButton">Добавить</button>',
                '</div>'
            ].join('')
        };
        var addButton = document.querySelector('.addButton');
        

        
        myMap.events.add('click', function(e) {
            var coord = e.get('coords');
            var myPlacemark = new ymaps.Placemark((coord), myBallon);
            myMap.geoObjects.add(myPlacemark);
           
            window.addEventListener('click', event => {
                if (event.target.className === 'addButton') {
                    var nameInput = document.querySelector('.name');
                    var placeInput = document.querySelector('.place');
                    var commentInput = document.querySelector('.comment');                    
                    var reviews = document.querySelector('.reviews');
                    var review = document.createElement('div');
                    review.className = 'review';
                    review.innerHTML = `${nameInput.value}` + ' ' + `${placeInput.value}`  + ': ' + `${commentInput.value}`;
                    reviews.appendChild(review);
                    nameInput.value = '';
                    placeInput.value = '';
                    commentInput.value = '';
                    if (!coords[`${e.get('coords')}`]) {
                        coords[`${e.get('coords')}`] = new Array;
                        coords[`${e.get('coords')}`].push(`${review.innerHTML}`);
                    } else {
                        coords[`${e.get('coords')}`].push(`${review.innerText}`);
                    }                    
                    console.log(coords);
                    localStorage.setItem('dataStorage', JSON.stringify(coords));
                    //myMap.balloon.close();
                    console.log(localStorage.dataStorage);
                }
            });            
        })        

        //загрузка точек из localStorage
        var dataCoords = JSON.parse(localStorage.getItem('dataStorage'));
        for(var key in dataCoords){
            var keyValue = dataCoords[key];
            console.log(`${keyValue}`);
            myMap.geoObjects.add(new ymaps.Placemark((key.split(',')), myBallon));
            console.log(key);
            
            myMap.geoObjects.events.add('click', function (e) {
                const placeMark = e.get('target');
                var coord = e.get('coords');
                placeMark.events.add('balloonopen', (event) => {
                        if (key === coord) {
                            for (let i = 0; i < keyValue.length; i++) {
                                const reviewValue = keyValue[i];
                                var reviews = document.querySelector('.reviews');
                                var review = document.createElement('div');
                                review.className = 'review';
                                review.innerHTML = reviewValue;
                                reviews.appendChild(review);
                            }
                        }                       
                    
                })                 
            })   
        }
        
    }