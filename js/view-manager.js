// fly to (default view)
viewer.camera.flyTo({ 
    destination: Cesium.Cartesian3.fromDegrees(	6.63873, 46.64067,  1000),
    orientation: {
      heading: Cesium.Math.toRadians(-240),  // ↔ -gauche / +droite
      pitch: Cesium.Math.toRadians(-25),   // ↕ -sol / +ciel
      roll: Cesium.Math.toRadians(0)      // +penche droite
    }
  });
  viewer.camera.completeFlight(); // teleport directly