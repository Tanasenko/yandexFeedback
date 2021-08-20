ymaps.ready(init);
    function init(){
        var myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 11,
            controls: []
        });

        var coords = {};
        var dataStorage = localStorage.data;
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
        var nameInput = document.querySelector('.name');
        var placeInput = document.querySelector('.place');
        var commentInput = document.querySelector('.comment');
        

        myMap.events.add('click', function(e) {
            var coord = e.get('coords');
            coords.coord = coord;
            myMap.geoObjects.add(new ymaps.Placemark((coord), myBallon));
            addButton.addEventListener('click', function(){
                var review = document.createElement('div');
                review.classList.add = 'review';
                review.innerHTML = `${nameInput.value}` + ' ' + `${placeInput.value}`  + ' ' + `${commentInput.value}`;
                reviews.append(review);
            });
            dataStorage = JSON.stringify(coords);
            console.log('Добавляем координаты ', dataStorage);
        })

        //загрузка точек из localStorage
        /*window.addEventListener('load', function () {
            var dataCoords = JSON.parse(dataStorage);
            dataCoords.forEach(element => {
                myMap.geoObjects.add(new ymaps.Placemark(element));
            });
            console.log('Добавляем плейсмарки ', dataCoords);
        });*/
    }