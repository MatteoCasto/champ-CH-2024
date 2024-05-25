/**
 * Adds a marker clamped on the ground at the specified longitude and latitude.
 *
 * This function creates a billboard entity in Cesium and positions it at the 
 * specified coordinates. The billboard image URL and scale are customizable.
 *
 * @param {number} longitude - The longitude where the marker will be placed.
 * @param {number} latitude - The latitude where the marker will be placed.
 * @param {string} iconUrl - The URL of the icon image to be used for the marker.
 * @param {number} [scale=1] - The scale factor for the icon image. Defaults to 1.
 * @returns {object} The created marker entity.
 */
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
