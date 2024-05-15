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

                pattern: { type: "int", group: "layout", defaultValue: 0 },

                width: { type: "int", group: "layout", defaultValue: 600 },

                height: { type: "int", group: "layout", defaultValue: 20 },

                minValue: { type: "int", group: "data", defaultValue: 0 },

                maxValue: { type: "int", group: "data", defaultValue: 10 }
            }
        },

        constructor: function(sId, mSettings) {
            Element.apply(this, arguments);
        },

        onBeforeRendering: function() {
            this.__legend = null;
        },

        onAfterRendering: function() {
            this.__legend = uia.maplegend(this.getId(), this.getPattern())
                .size(this.getWidth(), this.getHeight())
                .draw();
        },

        setMinValue: function(minValue) {
            if (!this.__legend) {
                return;
            }
            this.__legend.range(minValue, this.getMaxValue());
            this.setProperty("minValue", minValue);
        },

        setMaxValue: function(maxValue) {
            if (!this.__legend) {
                return;
            }
            this.__legend.range(this.getMinValue(), maxValue);
            this.setProperty("maxValue", maxValue);
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

        select: function(value) {
            if (!this.__legend) {
                return 0xffffff;
            }
            return this.__legend.select(value);
        }

    });

    return WaferMapLegend;

}, /* bExport= */ true);
