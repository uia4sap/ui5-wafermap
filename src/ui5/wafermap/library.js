/*!
 * ${copyright}
 */

/**
 * Initialization Code and shared classes of library ui5.wafermap.
 */
sap.ui.define([
    'jquery.sap.global',
    'sap/ui/core/library',
    "./3rdparty/uia-wafermap/uia-wafermap",
    "./3rdparty/pixi/browser/pixi"
], function(
    jQuery,
    library
) {
    "use strict";

    /**
     * An wafermap library.
     *
     * @namespace
     * @name ui5.wafermap
     * @public
     */

    // library dependencies

    // delegate further initialization of this library to the Core
    sap.ui.getCore().initLibrary({
        name: "ui5.wafermap",
        dependencies: ["sap.ui.core"],
        types: [],
        interfaces: [],
        controls: [
            "ui5.wafermap.WaferMap"
        ],
        elements: [
            "ui5.wafermap.Layer"
        ],
        noLibraryCSS: false,
        version: "0.1.0"
    });

    return ui5.wafermap;

});
