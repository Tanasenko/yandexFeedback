ymaps.ready(init);
    function init(){
        var myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 11,
            controls: []
        });

        var coords = {};
        
        //var dataStorage = localStorage.data;
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
            myMap.geoObjects.add(new ymaps.Placemark((coord), myBallon));
           
            window.addEventListener('click', event => {
                if (event.target.className === 'addButton') {
                    var nameInput = document.querySelector('.name');
                    var placeInput = document.querySelector('.place');
                    var commentInput = document.querySelector('.comment');                    
                    var reviews = document.querySelector('.reviews');
                    
                    var review = document.createElement('div');
                    review.className = 'review';
                    review.innerHTML = `${nameInput.value}` + ' ' + `${placeInput.value}`  + ': ' + `${commentInput.value}`;
                    //coords.coord.review.push(review.innerText);
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
                    //myMap.balloon.close();
                    console.log(coords);
                    console.log(localStorage.dataStorage);
                    localStorage.setItem('dataStorage', JSON.stringify(coords));
                }
            });
            
        })
        var dataCoords = JSON.parse(localStorage.getItem('dataStorage'));
        //var dataCoords = {55.77103285527656,37.6513296508789: [ : ]};
        

        //загрузка точек из localStorage
        myMap.events.add('load', function(e){
            for(var key in dataCoords){
                var value = dataCoords[key];
                yMap.geoObjects.add(new ymaps.Placemark((key), myBallon));
            }
        })
    }