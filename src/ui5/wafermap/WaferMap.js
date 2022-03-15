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
     * @extends ui5.wafermap.WaferMap
     * @alias ui5.wafermap.WaferMap
     * @version 0.1.0
     *
     * @constructor
     * @public
     * @since 1.40
     * @name ui5.wafermap.WaferMap
     */
    var WaferMap = Control.extend("ui5.wafermap.WaferMap", /** @lends ui5.wafermap.WaferMap.prototype */ {

        __shotmap: null,

        __data: null,

        metadata: {

            library: 'ui5.wafermap',

            properties: {

                size: { type: "int", group: "layout", defaultValue: 600 },

                margin: { type: "int", group: "layout", defaultValue: 10 },

                diePalette: { type: "function", group: "map", defaultValue: undefined },

                drag: { type: "boolean", group: "map", defaultValue: false },

                wheel: { type: "boolean", group: "map", defaultValue: false },

                checkBoundary: { type: "boolean", group: "map", defaultValue: false }

            },

            defaultAggregation: "layers",

            aggregations: {

                layers: {
                    type: "ui5.wafermap.Layer",
                    multiple: true,
                    singularName: "layer",
                    bindable: "bindable"
                }
            },

            events: {
                dieClicked: {
                    parameters: {
                        die: { type: "object" }
                    }
                },
                dieHoverIn: {
                    parameters: {
                        die: { type: "object" }
                    }
                },
                dieHoverOut: {
                    parameters: {
                        die: { type: "object" }
                    }
                },
            }
        },

        constructor: function(sId, mSettings) {
            Element.apply(this, arguments);
        },

        onBeforeRendering: function() {},

        onAfterRendering: function() {
            this.__shotmap = uia
                .shotmap(this.getId())
                .size(this.getSize(), this.getMargin())
                .wheel(this.getWheel())
                .drag(this.getDrag());
            if (this.getDiePalette()) {
                this.__shotmap.diePalette(this.getDiePalette());
            }
        },

        addLayer: function(layer) {
            // important: bSuppressInvalidate = true
            this.addAggregation("layers", layer, true);
        },

        setDrag: function(enabled) {
            this.setProperty("drag", enabled);
            if (this.__shotmap) {
                this.__shotmap.drag(enabled);
            }
        },

        setWheel: function(enabled) {
            this.setProperty("wheel", enabled);
            if (this.__shotmap) {
                this.__shotmap.wheel(enabled);
            }
        },

        reset: function() {
            if (this.__shotmap) {
                this.__shotmap.reset();
            }
        },

        zoomIn: function(offsetX, offsetY) {
            if (this.__shotmap) {
                this.__shotmap.zoomIn(offsetX, offsetY);
            }
        },

        zoomOut: function(offsetX, offsetY) {
            if (this.__shotmap) {
                this.__shotmap.zoomOut(offsetX, offsetY);
            }
        },

        showLayer: function(layerName, visible) {
            if (this.__data) {
                var layer = this.__data.layer(layerName);
                if (layer) {
                    layer.enabled(visible);
                }
            }
        },

        refreshMap: function(maxX, maxY, minX, minY, flat, offset, direction, testMode) {
            if (!this.__shotmap) {
                return;
            }

            this.__shotmap.attachClick((function(oEvent) {
                this.fireDieClicked({
                    "die": oEvent
                })
            }).bind(this));
            this.__shotmap.attachHoverIn((function(oEvent) {
                this.fireDieHoverIn({
                    "die": oEvent
                })
            }).bind(this));
            this.__shotmap.attachHoverOut((function(oEvent) {
                this.fireDieHoverOut({
                    "die": oEvent
                })
            }).bind(this));
            var data = this.__shotmap
                .notch(flat ? flat : "d", offset == undefined ? 1 : offset)
                .data(maxX, maxY, minX, minY, direction, testMode);
            this.getLayers().forEach(function(l) {
                data.layer(
                    l.getName(),
                    l.getTester(),
                    l.getPicker());
            });
            this.__data = data;
            this.__shotmap.create(this.getCheckBoundary());
        }

    });

    return WaferMap;

}, /* bExport= */ true);
