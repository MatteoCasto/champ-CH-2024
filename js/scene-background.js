/**
 * Initializes an imagery layer on the terrain with the specified URL and given opacity.
 * 
 * This function adds an imagery layer to the Cesium viewer using a URL template imagery provider.
 * The opacity of the layer is set to the provided value.
 * 
 * @param {string} url - The URL of the imagery service.
 * @param {number} opacity - The opacity of the imagery layer, a value between 0 and 1.
 * @returns {none}
 */
async function initImageryOnTerrain(url, opacity){

    let imagery = await new Cesium.UrlTemplateImageryProvider({
        url: url,
        subdomains: "9999",
        maximumLevel: 18,
        tilingScheme: new Cesium.GeographicTilingScheme({
            numberOfLevelZeroTilesX: 2,
            numberOfLevelZeroTilesY: 1,
        })
    });
    let added = viewer.imageryLayers.addImageryProvider(imagery);
    added.alpha = opacity; // Sets the transparency of the relief layer to the specified opacity
}

/**
 * Loads and displays 3D buildings from a 3D Tileset.
 * 
 * This function loads a 3D Tileset of buildings and adds it to the Cesium viewer's scene.
 * Various options are configured for optimal loading and display of the 3D Tileset.
 * 
 * @returns {none}
 */
async function displayBuildings() {
    const buildings = await Cesium.Cesium3DTileset.fromUrl(
        BUILDINGS_URL, {
        skipLevelOfDetail: true,
        clampToGround: true,
        baseScreenSpaceError: 1024,
        skipScreenSpaceErrorFactor: 16,
        skipLevels: 1,
        immediatelyLoadDesiredLevelOfDetail: false,
        loadSiblings: false,
        cullWithChildrenBounds: true,
    });

    viewer.scene.primitives.add(buildings);
}
