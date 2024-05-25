/**
 * Load and display a GPX file in the Cesium viewer.
 * 
 * This function loads a GPX file, clamps its data to the ground, and sets the style
 * of the polyline entities to have a red stroke with a width of 5 pixels. The data source
 * is then added to the viewer.
 * 
 * @param {string} GPX_FILE_XCO - The path to the GPX file to be loaded.
 */

Cesium.GpxDataSource.load(GPX_FILE_XCO, {
    clampToGround: true
})
.then(dataSource => {
    // Iterate over the entities (elements) of the GPX file
    dataSource.entities.values.forEach(entity => {
        // Set the width of the polyline stroke for each entity
        entity.polyline.width = 5; // Width of the red stroke, adjusted to 5 pixels
        // Set the color of the polyline stroke for each entity
        entity.polyline.material = new Cesium.ColorMaterialProperty(Cesium.Color.RED); // Red stroke color
    });
    // Add the data source to the view
    viewer.dataSources.add(dataSource);
})
.catch(error => {
    console.error('ERROR LOADING GPX FILE: ', error);
});
