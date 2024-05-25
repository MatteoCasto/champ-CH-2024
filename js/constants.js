/**
 * URL paths to web-services and APIs for imagery on terrain.
 * 
 * Contains URLs for various imagery services including swissIMAGE, swissALTI3Drelief,
 * and swissTLM3D, with placeholders for {z}, {x}, and {y} tile coordinates.
 */
const IMAGERY_URLS = {
    'swissIMAGE': 'https://wmts{s}.geo.admin.ch/1.0.0/ch.swisstopo.swissimage-product/default/current/4326/{z}/{x}/{y}.jpeg',
    'swissALTI3Drelief': 'https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swissalti3d-reliefschattierung/default/current/4326/{z}/{x}/{y}.png',
    'swissTLM3D': 'https://wmts100.geo.admin.ch/1.0.0/ch.swisstopo.swisstlm3d-karte-farbe.3d/default/current/4326/{z}/{x}/{y}.jpeg'
};

/**
 * URL path to 3D-buildings API.
 */
const BUILDINGS_URL = 'https://vectortiles.geo.admin.ch/3d-tiles/ch.swisstopo.swisstlm3d.3d/20201020/tileset.json';

/**
 * Path to the .gpx file in the "assets" folder.
 */
const GPX_FILE_XCO = '../assets/track_XCO_6.gpx';

/**
 * Path to CSV of profile.
 * Uncomment the alternative line for the non-smoothed version.
 */
const CSV_FILE = '../assets/reduced_profile_and_distances.csv';
// const CSV_FILE = '../assets/profile_and_distances.csv' // not smoothed

/**
 * Path to localisation marker (from profile).
 */
const LOCALISATION_MARKER = '../assets/localisation.png';

/**
 * Path to start/arrival marker.
 */
const START_MARKER = '../assets/start_icon.png';

/**
 * Coordinates and rotation presets for zones of interest.
 * 
 * Contains default coordinates and rotations for various points of interest including 
 * default, refuge, forest, uphill, and arrival zones.
 */
const DEFAULT_COORDINATES_AND_ROTATION = {
    'lon': 6.631484, 
    'lat': 46.640338,
    'alt': 1162.93,
    'heading': -250,
    'pitch': -31.47,
    'roll': 0
};

const REFUGE_COORDINATES_AND_ROTATION = {
    'lon': 6.646302, 
    'lat': 46.636393,
    'alt': 734.10,
    'heading': 28.10,
    'pitch': -40.0,
    'roll': 0
};

const FOREST_COORDINATES_AND_ROTATION = {
    'lon': 6.649294, 
    'lat': 46.633513,
    'alt': 817.83,
    'heading': 25.17,
    'pitch': -37.55,
    'roll': 0
};

const UPHILL_COORDINATES_AND_ROTATION = {
    'lon': 6.655471, 
    'lat': 46.632754,
    'alt': 797.60,
    'heading': 301.68,
    'pitch': -24.44,
    'roll': 0
};

const ARRIVAL_COORDINATES_AND_ROTATION = {
    'lon': 6.643189, 
    'lat': 46.632078,
    'alt': 1066.60,
    'heading': 355.68,
    'pitch': -43.66,
    'roll': 0
};
