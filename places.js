const loadPlaces = function(coords) {
    // COMMENT FOLLOWING LINE IF YOU WANT TO USE STATIC DATA AND ADD COORDINATES IN THE FOLLOWING 'PLACES' ARRAY
//    const method = 'api';

    const PLACES = [
        {
            name: "z",
            location: {
                lat: 39.36992, // add here latitude if using static data
                lng: 21.92796, // add here longitude if using static data              
            },
              src: "https://jgatzis.github.io/ar/assets/photos/1.png"
        },
        {
            name: "zz",
            location: {
                lat: 39.36892, // add here latitude if using static data
                lng: 21.92696, // add here longitude if using static data             
            },
              src: "https://jgatzis.github.io/ar/assets/photos/1.png"
        },
    ];

  //  if (method === 'api') {
  //      return loadPlaceFromAPIs(coords);
 //   }

    return Promise.resolve(PLACES);
};


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
                           
                            window.open( place.src);
                        
                       //     const img = document.createElement('span');
                         //     const container2 = document.createElement('div');
                          //    container2.setAttribute('id', 'img');
                       //     img.setAttribute('src', 'https://jgatzis.github.io/ar/assets/photos/1.png');
                          
                     // img.src ='https://jgatzis.github.io/ar/assets/photos/1.png';
                        
                       //     document.body.appendChild(img);
                         //   document.body.appendChild(container2);
                    <!--
                     setTimeout(() => {
                                container.parentElement.removeChild(container);
                          }, 1500);
                            -->
                        }
                    };

                    icon.addEventListener('click', clickListener);
                 //  const entity = document.createElement('a-image');
                
              //     entity.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`); 
                //   entity.setAttribute('src', 'https://jgatzis.github.io/ar/assets/photos/1.png'); 
                //   entity.setAttribute('scale', '1, 1');           
                 //  scene.appendChild(entity); 
                    
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
