// Assurez-vous d'avoir Cesium.js correctement importé dans votre projet
function addScaledModelToLatLon( modelUrl, latitude, longitude, scale) {

    // Vérifiez si le modèle est bien défini
    if (!modelUrl) {
        console.error("L'URL du modèle est requise.");
        return;
    }

    // Ajout d'un modèle 3D à Cesium
    var entity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
        model: {
            uri: modelUrl,
            scale: scale,
            minimumPixelSize: 128, // Taille minimum du modèle pour éviter qu'il disparaisse trop vite lors du zoom
            maximumScale: 20000 // Ajustez cette valeur en fonction de votre cas d'utilisation
        }
    });

    // Plaquer le modèle sur le terrain
    entity.position = Cesium.Cartesian3.fromDegrees(longitude, latitude);
    entity.model.heightReference = Cesium.HeightReference.CLAMP_TO_GROUND;

    return entity;
};




// addScaledModelToLatLon('../assets/starting_blocks.obj', ARRIVAL_COORDINATES_AND_ROTATION['lat'], ARRIVAL_COORDINATES_AND_ROTATION['lon'], 1.0);
