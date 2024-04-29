/**
 * Initializes an imagery layer on the terrain with the specified URL and given opacity.
 * 
 * @param {string} url - The URL of the imagery service.
 * @param {number} opacity - The opacity of the imagery layer, a value between 0 and 1.
 * @returns {none}
 */
async function initImageryOnTerrain(url, opacity){

    let imagery = await new Cesium.UrlTemplateImageryProvider({
        url: url,
        subdomains: "9999",
        tilingScheme: new Cesium.GeographicTilingScheme({
            numberOfLevelZeroTilesX: 2,
            numberOfLevelZeroTilesY: 1,
        })
    })
    let added = viewer.imageryLayers.addImageryProvider(imagery);
    added.alpha = opacity // Définit la transparence de la couche de relief à 0.5

};


// 3DTiles TLM3d buildings
async function displayBuildings() {
    const buildings = await Cesium.Cesium3DTileset.fromUrl(
      "https://vectortiles.geo.admin.ch/3d-tiles/ch.swisstopo.swisstlm3d.3d/20201020/tileset.json", {
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


