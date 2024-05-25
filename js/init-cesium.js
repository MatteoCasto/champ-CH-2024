/**
 * Initialize the Cesium viewer with specified configurations and options.
 * 
 * Sets up the Cesium viewer with a Swissgeol terrain provider and custom viewer settings.
 * Additional functionalities include removing default UI elements, setting depth testing 
 * against terrain, loading WMTS imagery, displaying buildings, and adding a start marker.
 */

// My access token at: https://ion.cesium.com/tokens
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNGY0Mjk4Ny1kYWMxLTQwZjMtOWM5YS0zZDY0Y2UyYTI5MTciLCJpZCI6MTk3MjAyLCJpYXQiOjE3MDg2MDY5MzN9.0zahHvP9QC7E_C0zRuIDDe_QTPEuUafXfgvRREVXAis";

const viewer = new Cesium.Viewer('cesium-container', {

    // Terrain Swissgeol 
    terrainProvider: new Cesium.CesiumTerrainProvider({
        url: "https://download.swissgeol.ch/cli_terrain/ch-2m/",
        availableLevels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19],
        rectangle: Cesium.Rectangle.fromDegrees(7.13725, 47.83080, 10.44270, 45.88465),
    }),
    maximumScreenSpaceError: 2,

    // delete buttons and things from Cesium
    timeline: false, 
    animation: false, 
    fullscreenButton: false,
    homeButton: false,
    sceneModePicker: false,
    geocoder: false,
    baseLayerPicker: false, 
    navigationHelpButton: true, 
    imageryProvider: false, 
    infoBox: false,
    selectionIndicator: false 
});

// current marker for profile localisation
currentMarkerOnMap = null

// flyto default
flyTo(DEFAULT_COORDINATES_AND_ROTATION);

// some other options
viewer.scene.globe.depthTestAgainstTerrain = true; // IMPORTANT: batiment invisble à travers le terrain
viewer.scene.globe.terrainExaggeration = 1.0;

// load WMTS
initImageryOnTerrain(IMAGERY_URLS['swissTLM3D'], 1.0);
initImageryOnTerrain(IMAGERY_URLS['swissALTI3Drelief'], 0.4);

// swissBUILDINGS3D
displayBuildings();

// "start" marker
addMarker(6.641234466, 46.63941975666666, START_MARKER, 0.07); // TODO eventually with GLTG of an arch


// Translate and configure the navigation help button texts
handleNavigationHelpButton();
