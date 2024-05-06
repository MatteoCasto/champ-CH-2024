
function flyTo(lon, lat, alt, heading, pitch, roll){
  // fly to from Cesium
  viewer.camera.flyTo({ 
      destination: Cesium.Cartesian3.fromDegrees(	lon, lat,  alt),
      orientation: {
        heading: Cesium.Math.toRadians(heading),  // ↔ -gauche / +droite
        pitch: Cesium.Math.toRadians(pitch),   // ↕ -sol / +ciel
        roll: Cesium.Math.toRadians(roll)      // +penche droite
      }
    });
    viewer.camera.completeFlight(); // teleport directly
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
  initImageryOnTerrain(IMAGERY_URLS['swissIMAGE'], 1.0);
};

function desactivateAerial(){
  // remove imagery for aerial images
  let layers = viewer.imageryLayers;
  let baseLayers = layers._layers;  // acess the base imagery layers
  let aerial = baseLayers[2]; // indice 2 for aerial
  layers.remove(aerial);
};