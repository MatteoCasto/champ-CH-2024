/**
 * Handles the customization and translation of the Cesium navigation help button.
 * 
 * This function customizes the Cesium navigation help button by setting its tooltip to French
 * and translating the text elements in the navigation help instructions to French. It updates
 * the DOM elements directly to provide localized instructions for both mouse and touch navigation.
 * 
 * The translations include:
 * - Tooltip text
 * - Headers for mouse and touch navigation
 * - Instructions for panning, zooming, rotating, and tilting with both mouse and touch inputs
 */
function handleNavigationHelpButton() {
    // Don't show it at landing on page
    viewer.navigationHelpButton.viewModel.showInstructions = false;

    // Set tooltip in French
    viewer.navigationHelpButton.viewModel.tooltip = 'Aide pour la navigation 3D';

    // Translation of elements (hard-coding and playing with DOM, sure there's a better way to do it)

    // --- Headers
    document.getElementsByClassName('cesium-navigation-button cesium-navigation-button-left cesium-navigation-button-selected')[0].innerHTML = `
        <img src="https://cesium.com/downloads/cesiumjs/releases/1.104/Build/Cesium/Widgets/Images/NavigationHelp/Mouse.svg" class="cesium-navigation-button-icon" style="width: 25px; height: 25px;">
        Souris
    `;
    document.getElementsByClassName('cesium-navigation-button cesium-navigation-button-right cesium-navigation-button-unselected')[0].innerHTML = `
        <img src="https://cesium.com/downloads/cesiumjs/releases/1.104/Build/Cesium/Widgets/Images/NavigationHelp/Touch.svg" class="cesium-navigation-button-icon" style="width: 25px; height: 25px;">
        Tactile
    `;

    // --- Pan
    document.getElementsByClassName('cesium-navigation-help-pan')[0].innerText = 'Déplacement';
    document.getElementsByClassName('cesium-navigation-help-details')[0].innerText = 'Clic gauche + glisser';

    // --- Zoom
    document.getElementsByClassName('cesium-navigation-help-zoom')[0].innerText = 'Zoom';
    document.getElementsByClassName('cesium-navigation-help-details')[1].innerText = 'Molette avant/arrière';
    document.getElementsByClassName('cesium-navigation-help-details')[2].innerText = 'ou clic droit + glisser';

    // --- Rotate
    document.getElementsByClassName('cesium-navigation-help-rotate')[0].innerText = 'Rotation';
    document.getElementsByClassName('cesium-navigation-help-details')[3].innerText = 'Clic molette + glisser';
    document.getElementsByClassName('cesium-navigation-help-details')[4].innerText = ''; // nothing here

    // --- Pan with fingers
    document.getElementsByClassName('cesium-navigation-help-pan')[1].innerText = 'Déplacement';
    document.getElementsByClassName('cesium-navigation-help-details')[5].innerText = 'Glisser le doigt';

    // --- Zoom with fingers
    document.getElementsByClassName('cesium-navigation-help-zoom')[1].innerText = 'Zoom';
    document.getElementsByClassName('cesium-navigation-help-details')[6].innerText = 'Écarter deux doigts';

    // --- Tilt with fingers
    document.getElementsByClassName('cesium-navigation-help-rotate')[1].innerText = 'Incliner';
    document.getElementsByClassName('cesium-navigation-help-details')[7].innerText = 'Deux doigts + glisser dans le même sens';

    // --- Rotate with fingers
    document.getElementsByClassName('cesium-navigation-help-tilt')[0].innerText = 'Rotation';
    document.getElementsByClassName('cesium-navigation-help-details')[8].innerText = 'Deux doigts + glisser dans la direction opposée';
}
