ymaps.ready(init);
    function init(){
        var myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 11,
            controls: []
        });

        var coords = {};
        var points = []
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
        var myPlacemark;    

        
        myMap.events.add('click', function(e) {
            var coord = e.get('coords');
            myPlacemark = new ymaps.Placemark((coord), myBallon);
            myMap.geoObjects.add(myPlacemark);

            points.push(coord);
            console.log(points);
            getClasterer();
           
            window.addEventListener('click', async event => {
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
                    //async function fn() {
                        const address = await getAddress(coord)
                        //getAddress(coord);
                        console.log(coords);
                        if (!coords[`${address}`]) {
                            coords[`${address}`] = new Array;
                            coords[`${address}`].push(`${review.innerHTML}`);
                        } else {
                            coords[`${address}`].push(`${review.innerText}`);
                        }     
                    //}
                    //fn()   
                    
 
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
            myMap.geoObjects.add(new ymaps.Placemark((key.split(',')), myBallon));
        }
            
        myMap.geoObjects.events.add('click', function (e) {
            const placeMark = e.get('target');
            var coord = e.get('coords').join(',');
            placeMark.events.add('balloonopen', (event) => {
                var coords = Object.keys(dataCoords)
                for (let i = 0; i < coords.length; i++) {
                    console.log(coords[i]);
                    console.log(coord);
                    if (coords[i] === coord) {
                        console.log('сработало');
                        for (let i = 0; i < keyValue.length; i++) {
                            const reviewValue = keyValue[i];
                            var reviews = document.querySelector('.reviews');
                            var review = document.createElement('div');
                            review.className = 'review';
                            review.innerHTML = reviewValue;
                            reviews.appendChild(review);
                        }
                    }
                }
                                     
            })   
        })   

        //Получаем адрес по координатам
        function getAddress(coord) {
            myPlacemark.properties.set('iconCaption', 'поиск...');
            ymaps.geocode(coord).then(function (res) {
                var firstGeoObject = res.geoObjects.get(0);
                

                myPlacemark.properties
                    .set({
                        // Формируем строку с данными об объекте.
                        iconCaption: [
                            // Название населенного пункта или вышестоящее административно-территориальное образование.
                            firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                            // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                        ].filter(Boolean).join(', '),
                        // В качестве контента балуна задаем строку с адресом объекта.
                        balloonContentHeader: firstGeoObject.getAddressLine()
                    });

                return res.geoObjects.get(0).properties.get('name');
            });
        }

        //Кластеризация
        var clusterer = new ymaps.Clusterer({
            preset: 'islands#invertedVioletClusterIcons',
            groupByCoordinates: true,
            clusterDisableClickZoom: true,
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false
        });

        var getPointData = function (index) {
            return {
                balloonContent: [
                '<div class="balloon">',
                    '<div class="reviews"></div>',
                    '<div class="title">Отзыв:</div>',
                    '<input class="name" placeholder="Укажите ваше имя">',
                    '<input class="place" placeholder="Укажите место">',
                    '<textarea class="comment" placeholder="Оставить отзыв"></textarea>',
                    '<button class="addButton">Добавить</button>',
                '</div>'].join(''),
                clusterCaption: 'отзыв <strong>' + index + '</strong>'
            };
        };

        getPointOptions = function () {
            return {
                preset: 'islands#violetIcon'
            };
        };

        

        function getClasterer(){
            geoObjects = [];
            for(var i = 0, len = points.length; i < len; i++) {
                geoObjects[i] = new ymaps.Placemark(points[i], getPointData(i), getPointOptions());
            } 
            clusterer.add(geoObjects);
            myMap.geoObjects.add(clusterer);
        }
               console.log(points);
    };