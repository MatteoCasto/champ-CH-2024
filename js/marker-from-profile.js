/**
 * Adds or updates a clamped marker on the terrain at the specified coordinates.
 * 
 * This function removes the existing marker if it exists and then adds a new marker 
 * at the specified longitude and latitude using a billboard.
 * 
 * @param {number} longitude - The longitude where the marker will be placed.
 * @param {number} latitude - The latitude where the marker will be placed.
 */
function updateClampedMarker(longitude, latitude) {

    // Remove the previous entity if it exists
    if (currentMarkerOnMap) {
        viewer.entities.remove(currentMarkerOnMap);
    };
    // Add a new entity with updated coordinates using a billboard
    currentMarkerOnMap = addMarker(longitude, latitude, LOCALISATION_MARKER, 0.1);
};
