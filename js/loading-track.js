// Load the GPX file
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
