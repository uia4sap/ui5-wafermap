sap.ui.define([
    "sap/ui/core/Element"
], function(
    Element
) {
    "use strict";

    var Layer = Element.extend("ui5.wafermap.Layer", {

        metadata: {

            "library": "ui5.wafermap",

            "properties": {

                name: { type: "string", group: "data" },

                tester: { type: "function", group: "data" },

                picker: { type: "function", group: "data" }
            }
        },
    });


    return Layer;

}, /* bExport= */ true);
