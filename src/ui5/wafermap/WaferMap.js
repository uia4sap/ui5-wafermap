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

                dieRect: { type: "boolean", group: "layout", defaultValue: true },

                diePalette: { type: "function", group: "graph", defaultValue: undefined },

                dieMaxX: { type: "int", group: "layout", defaultValue: 100 },

                dieMaxY: { type: "int", group: "layout", defaultValue: 100 },

                dieMinX: { type: "int", group: "layout", defaultValue: 1 },

                dieMinY: { type: "int", group: "layout", defaultValue: 1 },

                flat: { type: "string", group: "layout", defaultValue: "d" },

                graphOffset: { type: "int", group: "graph", defaultValue: 1 },

                graphCoord: { type: "string", group: "layout", defaultValue: "LD" },

                testMode: { type: "any", group: "layout", defaultValue: "testing" },

                drag: { type: "boolean", group: "graph", defaultValue: false },

                wheel: { type: "boolean", group: "graph", defaultValue: false },

                checkBoundary: { type: "boolean", group: "graph", defaultValue: false },

                background: { type: "boolean", group: "graph", defaultValue: true },

                createNow: { type: "boolean", group: "graph", defaultValue: false }
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
            this.__shotmap = uia.shotmap(this.getId())
                .size(this.getSize(), this.getMargin())
                .wheel(this.getWheel())
                .dieRect(this.getDieRect())
                .circleBackground(this.getBackground())
                .drag(this.getDrag());
            if (this.getDiePalette()) {
                this.__shotmap.diePalette(this.getDiePalette());
            }
        },

        extract: function(type) {
            if (!this.__shotmap) {
                return null;
            }
            return this.__shotmap.extract(type || "base64");
        },

        blocking: function(blur, ignoreBgColor) {
            if (!this.__shotmap) {
                return null;
            }
            return this.__shotmap.blocking(blur, ignoreBgColor);
        },

        addLayer: function(layer) {
            // important: bSuppressInvalidate = true
            this.addAggregation("layers", layer, true);
        },

        setSize: function(size) {
            this.setProperty("size", size, true);
        },

        setMargin: function(margin) {
            this.setProperty("margin", margin, true);
        },

        setDieRect: function(enabled) {
            this.setProperty("dieRect", enabled, true);
            if (this.__shotmap) {
                this.__shotmap.dieRect(enabled);
            }
        },

        setDiePalette: function(diePalette) {
            this.setProperty("diePalette", diePalette, true);
            if (this.__shotmap) {
                this.__shotmap.diePalette(diePalette);
            }
        },

        setDieMaxX: function(dieMaxX) {
            this.setProperty("dieMaxX", dieMaxX, true);
        },

        setDieMaxY: function(dieMaxY) {
            this.setProperty("dieMaxY", dieMaxY, true);
        },

        setDieMinX: function(dieMinX) {
            this.setProperty("dieMinX", dieMinX, true);
        },

        setDieMinY: function(dieMinY) {
            this.setProperty("dieMinY", dieMinY, true);
        },

        setFlat: function(flat) {
            this.setProperty("flat", flat, true);
        },

        setGraphOffset: function(graphOffset) {
            this.setProperty("graphOffset", graphOffset, true);
        },

        setGraphCoord: function(graphCoord) {
            this.setProperty("graphCoord", graphCoord, true);
        },

        setTestMode: function(testMode) {
            this.setProperty("testMode", testMode, true);
        },

        setDrag: function(enabled) {
            this.setProperty("drag", enabled, true);
            if (this.__shotmap) {
                this.__shotmap.drag(enabled);
            }
        },

        setWheel: function(enabled) {
            this.setProperty("wheel", enabled, true);
            if (this.__shotmap) {
                this.__shotmap.wheel(enabled);
            }
        },

        setCheckBoundary: function(checkBoundary) {
            this.setProperty("checkBoundary", checkBoundary, true);
        },

        setBackground: function(enabled) {
            this.setProperty("background", enabled, true);
            if (this.__shotmap) {
                this.__shotmap.circleBackground(enabled);
            }
        },

        setCreateNow: function(createNow) {
            this.setProperty("createNow", createNow, true);
            if (createNow) {
                this.createMap();
            }
        },

        highlight: function(code, color) {
            this.__shotmap.highlight(code, color);
            this.__shotmap.draw();
        },

        selectDie: function(row, col, color) {
            this.__shotmap.selectDie(row, col, color);
        },

        reset: function() {
            if (this.__shotmap) {
                this.__shotmap.reset();
            }
        },

        scan: function() {
            return this.__shotmap.scan();
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

        showLayer: function(layerName, visible, redraw) {
            if (this.__data) {
                var layer = this.__data.layer(layerName);
                if (layer) {
                    layer.enabled(visible, redraw == undefined ? true : redraw);
                }
            }
        },

        redraw: function() {
            if (!this.__shotmap) {
                return;
            }
            this.__shotmap
                .size(this.getSize(), this.getMargin())
                .wheel(this.getWheel())
                .dieRect(this.getDieRect())
                .circleBackground(this.getBackground())
                .drag(this.getDrag());
            this.__shotmap.draw();
        },

        createMap: function() {
            if (!this.__shotmap) {
                this.__shotmap = uia.shotmap(this.getId());
            }
            if (!this.__shotmap) {
                return;
            }

            this.__shotmap
                .size(this.getSize(), this.getMargin())
                .wheel(this.getWheel())
                .dieRect(this.getDieRect())
                .circleBackground(this.getBackground())
                .drag(this.getDrag());
            if (this.getDiePalette()) {
                this.__shotmap.diePalette(this.getDiePalette());
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
                .notch(this.getFlat(), this.getGraphOffset())
                .data(
                    this.getDieMaxY(), // maxRow
                    this.getDieMaxX(), // maxCol
                    this.getDieMinY(), // minRow
                    this.getDieMinX(), // minCol
                    this.getGraphCoord(),
                    this.getTestMode());
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
