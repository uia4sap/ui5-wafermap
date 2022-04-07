sap.ui.define([
    "sap/ui/core/Control",
    "sap/ui/core/Element",
    "./library"
], function(
    Control,
    Element,
    library
) {
    "use strict";

    /**
     *
     * @param {string} [sId] id for the new control, generated automatically if no id is given
     * @param {object} [mSettings] initial settings for the new control
     *
     * @class
     * CartesianChart constructor
     * @extends ui5.wafermap.WaferMapLegend
     * @alias ui5.wafermap.WaferMapLegend
     * @version 0.1.0
     *
     * @constructor
     * @public
     * @since 1.40
     * @name ui5.wafermap.WaferMapLegend
     */
    var WaferMapLegend = Control.extend("ui5.wafermap.WaferMapLegend", /** @lends ui5.wafermap.WaferMapLegend.prototype */ {

        __legend: null,

        metadata: {

            library: 'ui5.wafermap',

            properties: {

                width: { type: "int", group: "layout", defaultValue: 600 },

                height: { type: "int", group: "layout", defaultValue: 20 },

                layerCount: { type: "int", group: "data", defaultValue: 1 }
            }
        },

        constructor: function(sId, mSettings) {
            Element.apply(this, arguments);
        },

        onBeforeRendering: function() {},

        onAfterRendering: function() {
            this.__legend = uia.maplegend(this.getId())
                .size(this.getWidth(), this.getHeight())
                .draw();
        },

        setLayerCount: function(layerCount) {
            if (!this.__legend) {
                return;
            }
            this.__legend.layerCount(layerCount);
            this.setProperty("layerCount", layerCount);
        },

        instance: function() {
            return this.__legend;
        },

        redraw: function() {
            if (!this.__legend) {
                this.__legend = uia.maplegend(this.getId());
            }
            this.__legend
                .size(this.getWidth(), this.getHeight())
                .draw();
        },

        select: function(count) {
            if (!this.__legend) {
                return 0xffffff;
            }
            return this.__legend.select(count);
        }

    });

    return WaferMapLegend;

}, /* bExport= */ true);
