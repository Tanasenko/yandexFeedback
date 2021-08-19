ymaps.ready(init);
    function init(){
        var myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 11,
            controls: []
        });
    
        var myCollection = new ymaps.GeoObjectCollection({}, {
            preset: 'islands#redIcon', //все метки красные
            draggable: false 
        });

        var coords = [];

        myMap.events.add('click', function(e) {
            var coord = e.get('coords');
            console.log(coord);
            coords.push(coord);
            console.log(coords);
        })
    
        for (var i = 0; i < coords.length; i++) {
            myCollection.add(new ymaps.Placemark(coords[i]));
        }
    
        myMap.geoObjects.add(myCollection);
    }