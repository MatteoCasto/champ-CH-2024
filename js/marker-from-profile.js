

// Function to add or update a clamped marker on the terrain
function updateClampedMarker(longitude, latitude) {

    // Remove the previous entity if it exists
    if (currentMarkerOnMap) {
        viewer.entities.remove(currentMarkerOnMap);
    };
    // Add a new entity with updated coordinates using a billboard
    currentMarkerOnMap = addMarker(longitude, latitude, LOCALISATION_MARKER, 0.1);
};






  
  