// Function to simply add a marker clamped on the ground. Icon's URL is given as input.
function addMarker(longitude, latitude, iconUrl, scale=1){

    let marker = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
        billboard: {
            image: iconUrl, // URL to the vertical line image
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // Align the bottom of the image with the position
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // Ensures the billboard clamps to the ground
            scale: scale, // scaling of icon
            disableDepthTestDistance: Number.POSITIVE_INFINITY // Ensures visibility against the terrain
        }
    });
    return marker;
};














