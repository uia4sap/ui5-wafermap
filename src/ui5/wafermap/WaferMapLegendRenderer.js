sap.ui.define([
    "jquery.sap.global",
    "sap/ui/core/Renderer"
], function(
    jQuery,
    Renderer
) {

    "use strict";

    var WaferMapLegendRenderer = {};

    /**
     * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
     *
     * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
     * @param {sap.ui.core.Control} oDiagram An object representation of the control that should be rendered.
     */
    WaferMapLegendRenderer.render = function(oRm, oDiagram) {
        oRm.write("<div ");
        oRm.writeControlData(oDiagram);
        oRm.write(">");
        oRm.write("</div>");
    };

    return WaferMapLegendRenderer;

}, /* bExport= */ true);
