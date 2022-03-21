const loadPlaces = function(coords) {
    // COMMENT FOLLOWING LINE IF YOU WANT TO USE STATIC DATA AND ADD COORDINATES IN THE FOLLOWING 'PLACES' ARRAY
//    const method = 'api';

    const PLACES = [
        {
            name: "spiti",
            location: {
                lat: 39.36992, // add here latitude if using static data
                lng: 21.92796, // add here longitude if using static data

            }
        },
        {
            name: "spiti2",
            location: {
                lat: 39.36892, // add here latitude if using static data
                lng: 21.92696, // add here longitude if using static data

            }
        },
    ];

  //  if (method === 'api') {
  //      return loadPlaceFromAPIs(coords);
 //   }

    return Promise.resolve(PLACES);
};
<!--

function loadPlaceFromAPIs(position) {
    const params = {
        radius: 300,   
        clientId: 'HZIJGI4COHQ4AI45QXKCDFJWFJ1SFHYDFCCWKPIJDWHLVQVZ',
        clientSecret: '',
        version: '20300101',    
    };

   
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';

    // Foursquare API
    const endpoint = `${corsProxy}https://api.foursquare.com/v2/venues/search?intent=checkin
        &ll=${position.latitude},${position.longitude}
        &radius=${params.radius}
        &client_id=${params.clientId}
        &client_secret=${params.clientSecret}
        &limit=15
        &v=${params.version}`;
    return fetch(endpoint)
        .then((res) => {
            return res.json()
                .then((resp) => {
                    return resp.response.venues;
                })
        })
        .catch((err) => {
            console.error('Error with places API', err);
        })
};
-->

window.onload = () => {
    const scene = document.querySelector('a-scene');

    // first get current user location
    return navigator.geolocation.getCurrentPosition(function (position) {

        // then use it to load from remote APIs some places nearby
        loadPlaces(position.coords)
            .then((places) => {
                places.forEach((place) => {
                    const latitude = place.location.lat;
                    const longitude = place.location.lng;

                    
                    const entity = document.createElement('a-text');
                   <!-- entity.setAttribute('src', 'https://jgatzis.github.io/ar/assets/photos/1.png'); -->
                    entity.setAttribute('value', 'test');
                    
                    entity.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
                     entity.setAttribute('scale', '100, 100 100');
                      scene.appendChild(entity);
                    // add place icon
                    const icon = document.createElement('a-image');
                    icon.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
                    icon.setAttribute('name', place.name);
                    icon.setAttribute('src', './map-marker.png');

                    // for debug purposes, just show in a bigger scale, otherwise I have to personally go on places...
                    icon.setAttribute('scale', '1, 1');

                    icon.addEventListener('loaded', () => window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')));

                    const clickListener = function(ev) {
                        ev.stopPropagation();
                        ev.preventDefault();

                        const name = ev.target.getAttribute('name');

                        const el = ev.detail.intersection && ev.detail.intersection.object.el;

                        if (el && el === ev.target) {
                            const label = document.createElement('span');
                            const container = document.createElement('div');
                            container.setAttribute('id', 'place-label');
                            label.innerText = name;
                            container.appendChild(label);
                            document.body.appendChild(container);
                    <!--
                            setTimeout(() => {
                                container.parentElement.removeChild(container);
                            }, 1500);
                            -->
                        }
                    };

                    icon.addEventListener('click', clickListener);
                    
                    scene.appendChild(icon);
                    
                });
            })
    },
        (err) => console.error('Error in retrieving position', err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 27000,
        }
    );
};
