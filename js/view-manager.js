
function flyTo(coordinatesAndRotation, fast=true){

  // fly to from Cesium
  viewer.camera.flyTo({ 
      destination: Cesium.Cartesian3.fromDegrees(coordinatesAndRotation['lon'], coordinatesAndRotation['lat'], coordinatesAndRotation['alt']),
      orientation: {
        heading: Cesium.Math.toRadians(coordinatesAndRotation['heading']),  // ↔ -gauche / +droite
        pitch: Cesium.Math.toRadians(coordinatesAndRotation['pitch']),   // ↕ -sol / +ciel
        roll: Cesium.Math.toRadians(coordinatesAndRotation['roll'])      // +penche droite
      }
    });

    // teleport or not
    if (fast){
      viewer.camera.completeFlight(); // teleport directly
    }
    
};



function goToZone(coordinatesAndRotation){

  // if it's the refuge, activate aerial image
  if (coordinatesAndRotation === REFUGE_COORDINATES_AND_ROTATION || coordinatesAndRotation === ARRIVAL_COORDINATES_AND_ROTATION){
    
    // do not re-init if already aerial images
    if (document.getElementById('checkboxAerialImage').checked === false){
      activateAerial();
    }; 
    // check aerial checkbox in all cases for refuge
    document.getElementById('checkboxAerialImage').checked = true; 

  // other than refuge or arrival zone, no aerial
  } else { 

    // do not re-init if already aerial images
    if (document.getElementById('checkboxAerialImage').checked === true){
      desactivateAerial();
    }; 
    // check aerial checkbox in all cases for refuge
    document.getElementById('checkboxAerialImage').checked = false; 
  };

  // fly to
  flyTo(coordinatesAndRotation, fast=false);

};




function changeAerialVisibility(){

  // Trigger aerial image change or not, if it's forced
  if (document.getElementById('checkboxAerialImage').checked === true){
    activateAerial();
  } else{
    desactivateAerial();
  }
};


function activateAerial(){

  // add/init the aerial image simply
  initImageryOnTerrain(IMAGERY_URLS['swissIMAGE'], 0.7);

};

function desactivateAerial(){

  // remove imagery for aerial images
  let layers = viewer.imageryLayers;
  let baseLayers = layers._layers;  // acess the base imagery layers
  let aerial = baseLayers[2]; // indice 2 for aerial
  layers.remove(aerial);
};



// Function to add or update a clamped marker on the terrain
function updateClampedMarker(longitude, latitude) {
  // Remove the previous entity if it exists
  if (currentMarkerOnMap) {
      viewer.entities.remove(currentMarkerOnMap);
  };

  // Define the URL to the vertical line image
  let verticalLineIconUrl = '../assets/localisation.png'; // Change this to the path of your image

  // Add a new entity with updated coordinates using a billboard
  currentMarkerOnMap = viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
      billboard: {
          image: verticalLineIconUrl, // URL to the vertical line image
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // Align the bottom of the image with the position
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // Ensures the billboard clamps to the ground
          scale: 0.05, // Adjust the scale as needed
          disableDepthTestDistance: Number.POSITIVE_INFINITY // Ensures visibility against the terrain
      }
  });

  // let offset = new Cesium.HeadingPitchRange(
  //   viewer.camera.heading, // Heading - facing north
  //   viewer.camera.pitch, // Pitch - looking slightly downwards
  //   1000  // Range - distance from the target in meters
  // );

  // // Fly to the entity with the specified offset
  // viewer.flyTo(currentMarkerOnMap, {
  //     offset: offset,
  //     duration: 0.01 // Duration in seconds, adjust as needed for speed of movement
  // });
 
}





// FOR DEVELOPMENT ONLY
function logCameraCoordinates() {
  var camera = viewer.camera;
  var positionCartographic = Cesium.Cartographic.fromCartesian(camera.position);
  var lon = Cesium.Math.toDegrees(positionCartographic.longitude).toFixed(6);
  var lat = Cesium.Math.toDegrees(positionCartographic.latitude).toFixed(6);
  var alt = positionCartographic.height.toFixed(2);
  var heading = Cesium.Math.toDegrees(camera.heading).toFixed(2);
  var pitch = Cesium.Math.toDegrees(camera.pitch).toFixed(2);
  var roll = Cesium.Math.toDegrees(camera.roll).toFixed(2);

  console.log(`Longitude: ${lon}, Latitude: ${lat}, Altitude: ${alt}, Heading: ${heading}, Pitch: ${pitch}, Roll: ${roll}`);
}

// DEVELOPMENT: GET COORDINATES AND ROATATION OF CAMERA with "c" key pressed
document.addEventListener('keydown', function(event) {
  if (event.key === 'c') {
      logCameraCoordinates();
  }
});




