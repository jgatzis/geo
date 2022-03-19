window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {  name: 'Pokèmon', location: {      lat:39.369915,  lng: 21.927914, },
           url: 'https://jgatzis.github.io/ar/assets/plane/scene.gltf',
            scale: '1.5 1.5 1.5',
             info: 'Magnemite, Lv. 5, HP 10/10', rotation: '0 180 0',
        },
        { name: 'Pokèmon2', location: {     lat:39.369715,      lng: 21.927714,  },
           url: 'https://jgatzis.github.io/ar/assets/plane/scene.gltf',
        scale: '1.5 1.5 1.5',
        info: 'Magnemite, Lv. 5, HP 10/10',rotation: '0 180 0',
        },
       { name: 'Spiti', location: {     lat:39.37000,      lng: 21.98032,  },
           url: 'https://jgatzis.github.io/ar/assets/plane/scene.gltf',
        scale: '1.5 1.5 1.5',
        info: 'Magnemite, Lv. 5, HP 10/10',rotation: '0 180 0',
        },
    ];
}

var models = [
    {
     <!--   url: 'https://jgatzis.github.io/ar/assets/plane/scene.gltf', -->
        scale: '1.5 1.5 1.5',
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 180 0',
    },
    {
  <!--      url: 'https://jgatzis.github.io/ar/assets/jaguar/scene.gltf',-->
        scale: '1.5 1.5 1.5',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
   
];

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }
    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;
        let url =place.url;
        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
         model.setAttribute('url', `url: ${latitude};`);
        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}
