/**
 * Flies the camera to the specified coordinates and rotation.
 * 
 * This function moves the Cesium viewer's camera to the specified longitude, latitude, altitude,
 * heading, pitch, and roll. If 'fast' is true, the camera teleports directly to the location.
 * 
 * @param {object} coordinatesAndRotation - An object containing the coordinates and rotation values.
 * @param {number} coordinatesAndRotation.lon - The longitude of the destination.
 * @param {number} coordinatesAndRotation.lat - The latitude of the destination.
 * @param {number} coordinatesAndRotation.alt - The altitude of the destination.
 * @param {number} coordinatesAndRotation.heading - The heading angle in degrees.
 * @param {number} coordinatesAndRotation.pitch - The pitch angle in degrees.
 * @param {number} coordinatesAndRotation.roll - The roll angle in degrees.
 * @param {boolean} [fast=true] - If true, teleports the camera directly to the location.
 * @returns {none}
 */
function flyTo(coordinatesAndRotation, fast=true){

  // fly to from Cesium
  viewer.camera.flyTo({ 
      destination: Cesium.Cartesian3.fromDegrees(coordinatesAndRotation['lon'], coordinatesAndRotation['lat'], coordinatesAndRotation['alt']),
      orientation: {
        heading: Cesium.Math.toRadians(coordinatesAndRotation['heading']),  // ↔ -left / +right
        pitch: Cesium.Math.toRadians(coordinatesAndRotation['pitch']),   // ↕ -down / +up
        roll: Cesium.Math.toRadians(coordinatesAndRotation['roll'])      // +right tilt
      }
    });

    // teleport or not
    if (fast){
      viewer.camera.completeFlight(); // teleport directly
    }
}

/**
 * Flies the camera to the specified zone and updates aerial imagery based on the zone.
 * 
 * This function flies the camera to the specified coordinates and rotation, and activates or deactivates
 * aerial imagery based on whether the zone is the refuge or arrival zone.
 * 
 * @param {object} coordinatesAndRotation - An object containing the coordinates and rotation values.
 * @returns {none}
 */
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
    // uncheck aerial checkbox in all cases for other zones
    document.getElementById('checkboxAerialImage').checked = false; 
  };

  // fly to
  flyTo(coordinatesAndRotation, fast=false);
}

/**
 * Changes the visibility of aerial imagery based on the checkbox state.
 * 
 * This function activates or deactivates aerial imagery based on the state of the
 * 'checkboxAerialImage' checkbox.
 * 
 * @returns {none}
 */
function changeAerialVisibility(){

  // Trigger aerial image change or not, if it's forced
  if (document.getElementById('checkboxAerialImage').checked === true){
    activateAerial();
  } else{
    desactivateAerial();
  }
}

/**
 * Activates aerial imagery by initializing an imagery layer with the specified opacity.
 * 
 * This function adds an aerial imagery layer to the Cesium viewer with a specified opacity.
 * 
 * @returns {none}
 */
function activateAerial(){

  // add/init the aerial image simply
  initImageryOnTerrain(IMAGERY_URLS['swissIMAGE'], 0.7);
}

/**
 * Deactivates aerial imagery by removing the aerial imagery layer.
 * 
 * This function removes the aerial imagery layer from the Cesium viewer.
 * 
 * @returns {none}
 */
function desactivateAerial(){

  // remove imagery for aerial images
  let layers = viewer.imageryLayers;
  let baseLayers = layers._layers;  // access the base imagery layers
  let aerial = baseLayers[2]; // index 2 for aerial
  layers.remove(aerial);
}

/**
 * DEVELOPMENT: Logs the current camera coordinates and rotation to the console.
 * 
 * This function retrieves the current camera position and orientation in the Cesium viewer
 * and logs the longitude, latitude, altitude, heading, pitch, and roll to the console.
 * 
 * @returns {none}
 */
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

// DEVELOPMENT: GET COORDINATES AND ROTATION OF CAMERA with "c" key pressed
document.addEventListener('keydown', function(event) {
  if (event.key === 'c') {
      logCameraCoordinates();
  }
});
