(function ($) {
    var SweetButton = (function () {
        function SweetButton(btnElement, btnPrefix) {
            var _this = this;
            this['href'] = '';
            this['on-load'] = '';
            this['glyph-size'] = '';
            this['glyph-color'] = '';
            this['glyph-classes'] = '';
            this['glyph-click'] = '';
            this['glyph-click-animation-duration'] = '';
            this['glyph-click-animation-delay'] = '';
            this['glyph-mouse-enter'] = '';
            this['glyph-mouse-enter-animation-duration'] = '';
            this['glyph-mouse-enter-animation-delay'] = '';
            this['glyph-mouse-leave'] = '';
            this['glyph-mouse-leave-animation-duration'] = '';
            this['glyph-mouse-leave-animation-delay'] = '';
            this['element-events'] = {
                isClickOccuring: false,
                isMouseEnterOccuring: false,
                isMouseLeaveOccuring: false,
                click: [],
                'mouse-enter': [],
                'mouse-leave': []
            };
            // private 'default-shape' = {
            //     // 'shape-1': '',
            //     'shape-1-size': '',
            //     'shape-1-background': '',
            //     'shape-1-mouse-enter': '',
            //     'shape-1-mouse-leave': '',
            //     'shape-1-click': '',
            //     'shape-1-zIndex': ''
            // };
            this['shape'] = [{
                    'shape-1': '',
                    'shape-1-size': '',
                    'shape-1-background': '',
                    'shape-1-zIndex': '',
                    'shape-1-mouse-enter': '',
                    'shape-1-mouse-enter-animation-duration': '',
                    'shape-1-mouse-enter-animation-delay': '',
                    'shape-1-mouse-leave': '',
                    'shape-1-mouse-leave-animation-duration': '',
                    'shape-1-mouse-leave-animation-delay': '',
                    'shape-1-click': '',
                    'shape-1-click-animation-duration': '',
                    'shape-1-click-animation-delay': ''
                },
                {
                    'shape-2': '',
                    'shape-2-size': '',
                    'shape-2-background': '',
                    'shape-2-zIndex': '',
                    'shape-2-mouse-enter': '',
                    'shape-2-mouse-enter-animation-duration': '',
                    'shape-2-mouse-enter-animation-delay': '',
                    'shape-2-mouse-leave': '',
                    'shape-2-mouse-leave-animation-duration': '',
                    'shape-2-mouse-leave-animation-delay': '',
                    'shape-2-click': '',
                    'shape-2-click-animation-duration': '',
                    'shape-2-click-animation-delay': ''
                },
                {
                    'shape-3': '',
                    'shape-3-size': '',
                    'shape-3-background': '',
                    'shape-3-zIndex': '',
                    'shape-3-mouse-enter': '',
                    'shape-3-mouse-enter-animation-duration': '',
                    'shape-3-mouse-enter-animation-delay': '',
                    'shape-3-mouse-leave': '',
                    'shape-3-mouse-leave-animation-duration': '',
                    'shape-3-mouse-leave-animation-delay': '',
                    'shape-3-click': '',
                    'shape-3-click-animation-duration': '',
                    'shape-3-click-animation-delay': ''
                },
                {
                    'shape-4': '',
                    'shape-4-size': '',
                    'shape-4-background': '',
                    'shape-4-zIndex': '',
                    'shape-4-mouse-enter': '',
                    'shape-4-mouse-enter-animation-duration': '',
                    'shape-4-mouse-enter-animation-delay': '',
                    'shape-4-mouse-leave': '',
                    'shape-4-mouse-leave-animation-duration': '',
                    'shape-4-mouse-leave-animation-delay': '',
                    'shape-4-click': '',
                    'shape-4-click-animation-duration': '',
                    'shape-4-click-animation-delay': ''
                },
                {
                    'shape-5': '',
                    'shape-5-size': '',
                    'shape-5-background': '',
                    'shape-5-zIndex': '',
                    'shape-5-mouse-enter': '',
                    'shape-5-mouse-enter-animation-duration': '',
                    'shape-5-mouse-enter-animation-delay': '',
                    'shape-5-mouse-leave': '',
                    'shape-5-mouse-leave-animation-duration': '',
                    'shape-5-mouse-leave-animation-delay': '',
                    'shape-5-click': '',
                    'shape-5-click-animation-duration': '',
                    'shape-5-click-animation-delay': ''
                }];
            this.parseBtnAttributes = function (btnElement, btnPrefix) {
                var dataPrefix = 'data-';
                var btnAttribs = btnElement.attributes;
                // console.log('btnElement.attributes: ', btnElement.attributes);
                var keyName;
                var hasDataPrefix;
                var hasBtnPrefix;
                var hasNumber;
                var indexOfNum;
                var keyNameOfShape;
                var indexOfShape;
                for (var keyIndex = 0; keyIndex < btnAttribs.length; keyIndex++) {
                    // console.log('key: ', keyIndex);
                    keyName = btnAttribs[keyIndex].name;
                    if (keyName == 'length')
                        continue;
                    hasDataPrefix = keyName.indexOf(dataPrefix);
                    if (hasDataPrefix != -1)
                        keyName = keyName.substring(dataPrefix.length, keyName.length);
                    hasBtnPrefix = keyName.indexOf(btnPrefix);
                    if (hasBtnPrefix != -1)
                        keyName = keyName.substring(btnPrefix.length + 1, keyName.length);
                    // console.log('keyName: ', keyName);
                    hasNumber = keyName.match(/\d+/g);
                    if (hasNumber) {
                        indexOfShape = parseFloat(hasNumber[0]) - 1;
                        if (_this.shape[indexOfShape][keyName] != undefined) {
                            _this.shape[indexOfShape][keyName] = btnAttribs[keyIndex].value;
                            _this.shape[indexOfShape]["shape-" + (indexOfShape + 1) + "-zIndex"] = indexOfShape + 1;
                        }
                        else if (_this.shape[indexOfShape][keyName] == undefined && hasBtnPrefix != -1) {
                            console.error(keyName, 'is not supported, maximum number of layered shapes is 5.');
                        }
                    }
                    else if (_this[keyName] != undefined) {
                        _this[keyName] = btnAttribs[keyIndex].value;
                    }
                    else if (_this[keyName] == undefined && hasBtnPrefix != -1) {
                        console.error(keyName, 'is not supported, make sure that you are using the prefix:', btnPrefix, 'for all of your attributes.');
                    }
                }
            };
            this.createShapes = function (divContainer) {
                // console.log('divContainer: ', divContainer);
                var shapeConfig;
                var shapeType;
                var shapeEvents;
                for (var i = 0, j = _this.shape.length; i < j; i++) {
                    // goto next if no shape type
                    if (!_this.shape[i]["shape-" + (i + 1)])
                        continue;
                    shapeConfig = _this.shape[i];
                    shapeType = shapeConfig["shape-" + (i + 1)];
                    // goto next if shape type is invalid
                    if (!SweetButton.shapeDictionary[shapeType]) {
                        console.error(shapeType, 'is not supported, view the documentation for the completelist of shape types.');
                        continue;
                    }
                    // create layered btn shape
                    var svgShape = SweetButton.shapeDictionary[shapeType](shapeConfig, i + 1);
                    // parse elem for events here
                    var defEventAnimationClass = '';
                    var defEventAnimationDuration = 1000; // 1s
                    var defEventAnimationDelay = 0; // no delay;
                    var eventAnimationClass = void 0;
                    var eventAnimationDuration = void 0;
                    var eventAnimationDelay = void 0;
                    if (shapeConfig["shape-" + (i + 1) + "-click"]) {
                        var eventItem = {};
                        eventAnimationClass = shapeConfig["shape-" + (i + 1) + "-click"];
                        eventAnimationDuration = shapeConfig["shape-" + (i + 1) + "-click-animation-duration"];
                        eventAnimationDelay = shapeConfig["shape-" + (i + 1) + "-click-animation-delay"];
                        eventItem['selector'] = "shape-" + (i + 1) + "-click-" + eventAnimationClass;
                        eventItem['animationClass'] = eventAnimationClass ? eventAnimationClass : defEventAnimationClass;
                        eventItem['animationDuration'] = eventAnimationDuration ? eventAnimationDuration : defEventAnimationDuration;
                        eventItem["animationDelay"] = eventAnimationDelay ? eventAnimationDelay : defEventAnimationDelay;
                        _this['element-events']['click'].push(eventItem);
                    }
                    if (shapeConfig["shape-" + (i + 1) + "-mouse-enter"]) {
                        var eventItem = {};
                        eventAnimationClass = shapeConfig["shape-" + (i + 1) + "-mouse-enter"];
                        eventAnimationDuration = shapeConfig["shape-" + (i + 1) + "-mouse-enter-animation-duration"];
                        eventAnimationDelay = shapeConfig["shape-" + (i + 1) + "-mouse-enter-animation-delay"];
                        // console.log('eventAnimationDuration: ', eventAnimationDuration);
                        eventItem['selector'] = "shape-" + (i + 1) + "-mouse-enter-" + eventAnimationClass;
                        eventItem['animationClass'] = eventAnimationClass ? eventAnimationClass : defEventAnimationClass;
                        eventItem['animationDuration'] = eventAnimationDuration ? eventAnimationDuration : defEventAnimationDuration;
                        eventItem["animationDelay"] = eventAnimationDelay ? eventAnimationDelay : defEventAnimationDelay;
                        _this['element-events']['mouse-enter'].push(eventItem);
                    }
                    if (shapeConfig["shape-" + (i + 1) + "-mouse-leave"]) {
                        var eventItem = {};
                        eventAnimationClass = shapeConfig["shape-" + (i + 1) + "-mouse-leave"];
                        eventAnimationDuration = shapeConfig["shape-" + (i + 1) + "-mouse-leave-animation-duration"];
                        eventAnimationDelay = shapeConfig["shape-" + (i + 1) + "-mouse-leave-animation-delay"];
                        eventItem['selector'] = "shape-" + (i + 1) + "-mouse-leave-" + eventAnimationClass;
                        eventItem['animationClass'] = eventAnimationClass ? eventAnimationClass : defEventAnimationClass;
                        eventItem['animationDuration'] = eventAnimationDuration ? eventAnimationDuration : defEventAnimationDuration;
                        eventItem["animationDelay"] = eventAnimationDelay ? eventAnimationDelay : defEventAnimationDelay;
                        _this['element-events']['mouse-leave'].push(eventItem);
                    }
                    divContainer.insertAdjacentElement('beforeend', svgShape);
                }
            };
            this.createGlyphIcon = function (divContainer) {
                if (_this['glyph-classes']) {
                    var iconGlyph = document.createElement('i');
                    // customize
                    iconGlyph.className = _this['glyph-classes'];
                    var glyphSize = _this['glyph-size'].length ? _this['glyph-size'] : 'xs';
                    var glyphScale = SweetButton.shapeScale[glyphSize];
                    var glyphSpacing = glyphScale / 10;
                    // centering
                    var widthMultiplier = -7 / 19.25; // 75x - 7.5x = -24
                    var heightMultiplier = -7 / 26; // 75y - 7.5y = -20
                    iconGlyph.style.marginLeft = (widthMultiplier * glyphScale) - (widthMultiplier * glyphSpacing) + "px";
                    iconGlyph.style.marginTop = (heightMultiplier * glyphScale) - (heightMultiplier * glyphSpacing) + "px";
                    // font
                    iconGlyph.style.fontSize = glyphScale / 2 + "px";
                    iconGlyph.style.lineHeight = glyphScale / 2 + "px";
                    iconGlyph.style.color = _this['glyph-color'];
                    // parse elem for events here
                    var defEventAnimationClass = '';
                    var defEventAnimationDuration = 1000; // 1s
                    var defEventAnimationDelay = 0; // no delay;
                    var eventAnimationClass = void 0;
                    var eventAnimationDuration = void 0;
                    var eventAnimationDelay = void 0;
                    if (_this['glyph-click']) {
                        var eventItem = {};
                        eventAnimationClass = _this["glyph-click"];
                        eventAnimationDuration = _this["glyph-click-animation-duration"];
                        eventAnimationDelay = _this["glyph-click-animation-delay"];
                        eventItem['selector'] = "glyph-click-" + eventAnimationClass;
                        iconGlyph.className += " " + eventItem['selector'];
                        eventItem['animationClass'] = eventAnimationClass ? eventAnimationClass : defEventAnimationClass;
                        eventItem['animationDuration'] = eventAnimationDuration ? eventAnimationDuration : defEventAnimationDuration;
                        eventItem["animationDelay"] = eventAnimationDelay ? eventAnimationDelay : defEventAnimationDelay;
                        // console.log('eventItem: ', eventItem);
                        _this['element-events']['click'].push(eventItem);
                    }
                    if (_this["glyph-mouse-enter"]) {
                        var eventItem = {};
                        eventAnimationClass = _this["glyph-mouse-enter"];
                        eventAnimationDuration = _this["glyph-mouse-enter-animation-duration"];
                        eventAnimationDelay = _this["glyph-mouse-enter-animation-delay"];
                        eventItem['selector'] = "glyph-mouse-enter-" + eventAnimationClass;
                        iconGlyph.className += " " + eventItem['selector'];
                        eventItem['animationClass'] = eventAnimationClass ? eventAnimationClass : defEventAnimationClass;
                        eventItem['animationDuration'] = eventAnimationDuration ? eventAnimationDuration : defEventAnimationDuration;
                        eventItem["animationDelay"] = eventAnimationDelay ? eventAnimationDelay : defEventAnimationDelay;
                        _this['element-events']['mouse-enter'].push(eventItem);
                    }
                    if (_this["glyph-mouse-leave"]) {
                        var eventItem = {};
                        eventAnimationClass = _this["glyph-mouse-leave"];
                        eventAnimationDuration = _this["glyph-mouse-leave-animation-duration"];
                        eventAnimationDelay = _this["glyph-mouse-leave-animation-delay"];
                        eventItem['selector'] = "glyph-mouse-leave-" + eventAnimationClass;
                        iconGlyph.className += " " + eventItem['selector'];
                        eventItem['animationClass'] = eventAnimationClass ? eventAnimationClass : defEventAnimationClass;
                        eventItem['animationDuration'] = eventAnimationDuration ? eventAnimationDuration : defEventAnimationDuration;
                        eventItem["animationDelay"] = eventAnimationDelay ? eventAnimationDelay : defEventAnimationDelay;
                        _this['element-events']['mouse-leave'].push(eventItem);
                    }
                    // append icon to divContainer
                    divContainer.appendChild(iconGlyph);
                }
            };
            this.createEvents = function (divContainer) {
                // add click event
                if (_this['element-events']['click'].length) {
                    divContainer.addEventListener('click', SweetButton.HandleClickEvent(divContainer, _this['element-events']));
                }
                // add mouse-enter event
                if (_this['element-events']['mouse-enter'].length) {
                    divContainer.addEventListener('mouseenter', SweetButton.HandleMouseEnterEvent(divContainer, _this['element-events']));
                    divContainer.addEventListener('touchstart', SweetButton.HandleMouseEnterEvent(divContainer, _this['element-events']));
                }
                // add mouse-leave event
                if (_this['element-events']['mouse-leave'].length) {
                    divContainer.addEventListener('mouseleave', SweetButton.HandleMouseLeaveEvent(divContainer, _this['element-events']));
                }
                divContainer.addEventListener('load', function () {
                    console.log('loaded');
                });
            };
            // parse attribs for object config            
            this.parseBtnAttributes(btnElement, btnPrefix);
            // build our div wrapper
            var divContainer = document.createElement('div');
            divContainer.setAttribute('class', btnPrefix + "-wrap");
            divContainer.style.height = "100%";
            divContainer.style.width = "100%";
            if (this['on-load']) {
                divContainer.className += " " + this['on-load'];
            }
            // create the shape elements
            this.createShapes(divContainer);
            // create the glyph icon
            this.createGlyphIcon(divContainer);
            // create the events
            this.createEvents(divContainer);
            btnElement.insertAdjacentElement('beforeend', divContainer);
        }
        SweetButton.CreateHexagon = function (shapeConfig, shapeLayerNum) {
            // element size/centering
            var shapeSize = shapeConfig["shape-" + shapeLayerNum + "-size"].length ? shapeConfig["shape-" + shapeLayerNum + "-size"] : 'xs';
            var shapeScale = SweetButton.shapeScale[shapeSize];
            var shapeSpacing = shapeScale / 10;
            var shapeWidth = shapeScale + (shapeSpacing * 2);
            var shapeHeight = shapeScale + (shapeSpacing * 2);
            // need to use negative margins here
            var shapeMarginLeft = "" + ((shapeScale / 2) + shapeSpacing) * -1;
            var shapeMarginTop = "" + ((shapeScale / 2) + shapeSpacing) * -1;
            // animation class names
            var clickAnimationName = shapeConfig["shape-" + shapeLayerNum + "-click"];
            var mouseEnterAnimationName = shapeConfig["shape-" + shapeLayerNum + "-mouse-enter"];
            var mouseLeaveAnimationName = shapeConfig["shape-" + shapeLayerNum + "-mouse-leave"];
            // create the svg
            var svgHexagon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            var clickClass = clickAnimationName.length ? "shape-" + shapeLayerNum + "-click-" + clickAnimationName : '';
            var mouseEnterClass = mouseEnterAnimationName.length ? "shape-" + shapeLayerNum + "-mouse-enter-" + mouseEnterAnimationName : '';
            var mouseLeaveClass = mouseLeaveAnimationName.length ? "shape-" + shapeLayerNum + "-mouse-leave-" + mouseLeaveAnimationName : '';
            var svgHexagonClasses = clickClass + " " + mouseEnterClass + " " + mouseLeaveClass;
            // add svg classes
            svgHexagon.setAttribute('class', svgHexagonClasses);
            // set svg attributes
            svgHexagon.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
            svgHexagon.setAttribute('viewBox', "0 0 " + shapeScale / 2 + " " + shapeScale / 2);
            svgHexagon.setAttribute('fill', shapeConfig["shape-" + shapeLayerNum + "-background"]);
            svgHexagon.setAttribute('stroke', 'black');
            svgHexagon.setAttribute('stroke-width', shapeScale / 100 + "px");
            // sizing/centering
            svgHexagon.setAttribute('z-index', shapeConfig["shape-" + shapeLayerNum + "-zIndex"]);
            svgHexagon.setAttribute('width', (shapeScale) + (shapeSpacing * 2) + "px");
            svgHexagon.setAttribute('height', (shapeScale) + (shapeSpacing * 2) + "px");
            svgHexagon.setAttribute('style', "margin-left: " + shapeMarginLeft + "px; margin-top: " + shapeMarginTop + "px;");
            // create the poly hexagon
            var polyHexagon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            var ptMultiplier = shapeScale / 100;
            var polyPts = [
                "" + 47 * ptMultiplier,
                37.5 * ptMultiplier + " " + 25 * ptMultiplier,
                50 * ptMultiplier + " " + 3 * ptMultiplier,
                37.5 * ptMultiplier + " " + 3 * ptMultiplier,
                12.5 * ptMultiplier + " " + 25 * ptMultiplier,
                "0 " + 47 * ptMultiplier,
                "" + 12.7 * ptMultiplier
            ];
            polyHexagon.setAttributeNS(null, 'points', polyPts.join(', '));
            // rect polygon to svg
            svgHexagon.appendChild(polyHexagon);
            return svgHexagon;
        };
        SweetButton.CreateCircle = function (shapeConfig, shapeLayerNum) {
            // element size/centering
            var shapeSize = shapeConfig["shape-" + shapeLayerNum + "-size"].length ? shapeConfig["shape-" + shapeLayerNum + "-size"] : 'xs';
            var shapeScale = SweetButton.shapeScale[shapeSize] * 1.14; // adjusting size of circles by 15%
            var shapeSpacing = shapeScale / 10;
            var shapeWidth = shapeScale + (shapeSpacing * 2);
            var shapeHeight = shapeScale + (shapeSpacing * 2);
            // need to use negative margins here
            var shapeMarginLeft = ((shapeScale / 2) + shapeSpacing) * -1;
            var shapeMarginTop = ((shapeScale / 2) + shapeSpacing) * -1;
            // animation class names
            var clickAnimationName = shapeConfig["shape-" + shapeLayerNum + "-click"];
            var mouseEnterAnimationName = shapeConfig["shape-" + shapeLayerNum + "-mouse-enter"];
            var mouseLeaveAnimationName = shapeConfig["shape-" + shapeLayerNum + "-mouse-leave"];
            // create the svg
            var svgCicle = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            var clickClass = clickAnimationName.length ? "shape-" + shapeLayerNum + "-click-" + clickAnimationName : '';
            var mouseEnterClass = mouseEnterAnimationName.length ? "shape-" + shapeLayerNum + "-mouse-enter-" + mouseEnterAnimationName : '';
            var mouseLeaveClass = mouseLeaveAnimationName.length ? "shape-" + shapeLayerNum + "-mouse-leave-" + mouseLeaveAnimationName : '';
            var svgCicleClasses = clickClass + " " + mouseEnterClass + " " + mouseLeaveClass;
            // add svg classes
            svgCicle.setAttribute('class', svgCicleClasses);
            // set svg attributes
            svgCicle.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
            svgCicle.setAttribute('viewBox', "0 0 " + shapeScale / 2 + " " + shapeScale / 2);
            svgCicle.setAttribute('fill', shapeConfig["shape-" + shapeLayerNum + "-background"]);
            svgCicle.setAttribute('stroke', 'black');
            svgCicle.setAttribute('stroke-width', shapeScale / 100 + "px");
            // sizing/centering
            svgCicle.setAttribute('z-index', shapeConfig["shape-" + shapeLayerNum + "-zIndex"]);
            svgCicle.setAttribute('width', (shapeScale) + (shapeSpacing * 2) + "px");
            svgCicle.setAttribute('height', (shapeScale) + (shapeSpacing * 2) + "px");
            svgCicle.setAttribute('style', "margin-left: " + shapeMarginLeft + "px; margin-top: " + shapeMarginTop + "px;");
            // create the square rect
            var polyCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            polyCircle.setAttribute('fill', shapeConfig["shape-" + shapeLayerNum + "-background"]);
            var centeringMuliplier = 0.28;
            polyCircle.setAttribute('cx', "" + ((shapeScale * centeringMuliplier) - (shapeSpacing * centeringMuliplier)));
            polyCircle.setAttribute('cy', "" + ((shapeScale * centeringMuliplier) - (shapeSpacing * centeringMuliplier)));
            polyCircle.setAttribute('r', "" + shapeScale / 5);
            // rect polygon to svg
            svgCicle.appendChild(polyCircle);
            return svgCicle;
        };
        SweetButton.CreateSquare = function (shapeConfig, shapeLayerNum) {
            // element size/centering
            var shapeSize = shapeConfig["shape-" + shapeLayerNum + "-size"].length ? shapeConfig["shape-" + shapeLayerNum + "-size"] : 'xs';
            var shapeScale = SweetButton.shapeScale[shapeSize];
            var shapeSpacing = shapeScale / 10;
            var shapeWidth = shapeScale + (shapeSpacing * 2);
            var shapeHeight = shapeScale + (shapeSpacing * 2);
            // need to use negative margins here
            var shapeMarginLeft = "" + ((shapeScale / 2) + shapeSpacing) * -1;
            var shapeMarginTop = "" + ((shapeScale / 2) + shapeSpacing) * -1;
            // animation class names
            var clickAnimationName = shapeConfig["shape-" + shapeLayerNum + "-click"];
            var mouseEnterAnimationName = shapeConfig["shape-" + shapeLayerNum + "-mouse-enter"];
            var mouseLeaveAnimationName = shapeConfig["shape-" + shapeLayerNum + "-mouse-leave"];
            // create the svg
            var svgSquare = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            var clickClass = clickAnimationName.length ? "shape-" + shapeLayerNum + "-click-" + clickAnimationName : '';
            var mouseEnterClass = mouseEnterAnimationName.length ? "shape-" + shapeLayerNum + "-mouse-enter-" + mouseEnterAnimationName : '';
            var mouseLeaveClass = mouseLeaveAnimationName.length ? "shape-" + shapeLayerNum + "-mouse-leave-" + mouseLeaveAnimationName : '';
            var svgSquareClasses = clickClass + " " + mouseEnterClass + " " + mouseLeaveClass;
            // add svg classes
            svgSquare.setAttribute('class', svgSquareClasses);
            // set svg attributes
            svgSquare.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
            svgSquare.setAttribute('viewBox', "0 0 " + shapeScale / 2 + " " + shapeScale / 2);
            svgSquare.setAttribute('fill', shapeConfig["shape-" + shapeLayerNum + "-background"]);
            svgSquare.setAttribute('stroke', 'black');
            svgSquare.setAttribute('stroke-width', shapeScale / 100 + "px");
            // sizing/centering
            svgSquare.setAttribute('z-index', shapeConfig["shape-" + shapeLayerNum + "-zIndex"]);
            svgSquare.setAttribute('width', (shapeScale) + (shapeSpacing * 2) + "px");
            svgSquare.setAttribute('height', (shapeScale) + (shapeSpacing * 2) + "px");
            svgSquare.setAttribute('style', "margin-left: " + shapeMarginLeft + "px; margin-top: " + shapeMarginTop + "px;");
            // create the square rect
            var polySquare = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            polySquare.setAttribute('width', "" + ((shapeWidth / 2) - (shapeSpacing * 2)));
            polySquare.setAttribute('height', "" + ((shapeHeight / 2) - (shapeSpacing * 2)));
            polySquare.setAttribute('x', "" + shapeSpacing / 2);
            polySquare.setAttribute('y', "" + shapeSpacing / 2);
            // rect polygon to svg
            svgSquare.appendChild(polySquare);
            return svgSquare;
        };
        SweetButton.AddStaticStyles = function (btnPrefix) {
            if (btnPrefix === void 0) { btnPrefix = 'sweet-btn'; }
            var btnStyleSheetId = btnPrefix + "-styles";
            var pageHead = document.head || document.getElementsByTagName('head')[0];
            // const validStyleSheet = SweetButton.GetValidStyleSheet();
            var btnStyleSheet = document.createElement('style');
            btnStyleSheet.setAttribute('rel', 'stylesheet');
            btnStyleSheet.setAttribute('media', 'only screen');
            btnStyleSheet.setAttribute('id', btnStyleSheetId);
            btnStyleSheet.setAttribute('type', 'text/css');
            var btnScale;
            var btnSpacing;
            // element styles
            var btnCssText = "          ." + btnPrefix + " {\n                position: relative;\n                display: inline-block;\n                cursor: pointer;\n                -webkit-touch-callout: text;\n                user-select: text;\n                -webkit-user-select: text;\n                -moz-user-select: text;\n                -ms-user-select: text;\n                -o-user-select: text;\n                margin: 2% 2% 0% 2%;\n                vertical-align: middle;\n                text-align: center;\n            }\n            \n            ." + btnPrefix + " ." + btnPrefix + "-wrap svg {\n                pointer-events: none;\n                overflow: visible;\n                -webkit-back-face-visibility: hidden;\n                backface-visibility: hidden;\n                z-index: 100;\n                display: inline-block;\n                position: absolute;\n                left:50%;\n                top: 50%;\n                -webkit-animation-fill-mode: both;\n                animation-fill-mode: both;\n            }\n            ." + btnPrefix + " ." + btnPrefix + "-wrap svg rect,\n            ." + btnPrefix + " ." + btnPrefix + "-wrap svg circle,\n            ." + btnPrefix + " ." + btnPrefix + "-wrap svg polygon {\n                pointer-events: none;\n            }\n            \n            ." + btnPrefix + " ." + btnPrefix + "-wrap i {\n                z-index: 150;\n                display: inline-block;\n                position: absolute;\n                left: 50%;\n                top: 50%;\n                pointer-events: none;\n\n                -webkit-text-stroke-color: black;\n                -webkit-text-stroke-width: 0.5px;\n                -webkit-tap-highlight-color: transparent;\n\n            }\n            \n            ";
            for (var btnSize in SweetButton.shapeScale) {
                btnScale = SweetButton.shapeScale[btnSize];
                btnSpacing = btnScale / 10;
                btnCssText += "." + btnPrefix + "-" + btnSize + " { \n                height: " + (btnScale + (btnSpacing * 2)) + "px;\n                width: " + (btnScale + (btnSpacing * 2)) + "px;\n            }\n            \n            ";
            }
            btnStyleSheet.appendChild(document.createTextNode(btnCssText));
            //add <stle> elem to the page
            pageHead.appendChild(btnStyleSheet);
        };
        SweetButton.RemoveEventAnimationClasses = function (divContainer, elementEvents, elementEventKeyNames) {
            var selectedElement;
            elementEventKeyNames.forEach(function (eventKeyName, index) {
                if (!elementEvents[eventKeyName])
                    return;
                if (elementEvents[eventKeyName].length) {
                    elementEvents[eventKeyName].forEach(function (event, index) {
                        selectedElement = $(divContainer).find("." + event.selector);
                        if (selectedElement.hasClass(event.animationClass)) {
                            selectedElement.removeClass(event.animationClass);
                            selectedElement.css({
                                'webkit-animation-duration': "",
                                'animation-duration': ""
                            });
                        }
                    });
                }
            });
        };
        SweetButton.AddEventAnimationClasses = function (divContainer, elementEvents, elementEventKeyNames) {
            var selectedElement;
            elementEventKeyNames.forEach(function (eventKeyName, index) {
                if (!elementEvents[eventKeyName])
                    return;
                if (elementEvents[eventKeyName].length) {
                    elementEvents[eventKeyName].forEach(function (event, index) {
                        selectedElement = $(divContainer).find("." + event.selector);
                        if (!selectedElement.hasClass(event.animationClass)) {
                            selectedElement.addClass(event.animationClass);
                            selectedElement.css({
                                'webkit-animation-duration': event.animationDuration + "ms",
                                'animation-duration': event.animationDuration + "ms"
                            });
                        }
                    });
                }
            });
        };
        return SweetButton;
    }());
    SweetButton.shapeDictionary = {
        'hexagon': SweetButton.CreateHexagon,
        'square': SweetButton.CreateSquare,
        'circle': SweetButton.CreateCircle
    };
    SweetButton.shapeScale = {
        'xs': 30,
        'sm': 45,
        'md': 60,
        'lg': 75,
        'xl': 90
    };
    SweetButton.HandleMouseEnterEvent = function (divContainer, elementEvents) {
        return function () {
            // console.log('mouse enter');
            // don't start even if these are happening
            if (elementEvents['isMouseEnterOccuring'] ||
                elementEvents['isClickOccuring'])
                return false;
            var cancelMouseLeave = elementEvents['isMouseLeaveOccuring'];
            elementEvents['isMouseEnterOccuring'] = true;
            var selectedElement;
            async.each(elementEvents['mouse-enter'], function (mouseEnterEvent, mouseEnterEventCB) {
                async.waterfall([
                    function (seriesCB) {
                        selectedElement = $(divContainer).find("." + mouseEnterEvent.selector);
                        if (cancelMouseLeave) {
                            SweetButton.RemoveEventAnimationClasses(divContainer, elementEvents, [
                                'mouse-leave'
                            ]);
                        }
                        // add css
                        selectedElement.css({
                            'webkit-animation-duration': mouseEnterEvent.animationDuration + "ms",
                            'animation-duration': mouseEnterEvent.animationDuration + "ms"
                        });
                        return seriesCB(null, selectedElement);
                    },
                    function (selectedElement, seriesCB) {
                        // apply animation delay and then add class
                        setTimeout(function () {
                            selectedElement.addClass("" + mouseEnterEvent.animationClass);
                            return seriesCB(null, selectedElement);
                        }, mouseEnterEvent.animationDelay);
                    },
                    function (selectedElement, seriesCB) {
                        // remove classes  & css after animation has completed
                        setTimeout(function () {
                            if (selectedElement.hasClass("" + mouseEnterEvent.animationClass)) {
                                selectedElement.removeClass("" + mouseEnterEvent.animationClass);
                                selectedElement.css({
                                    'webkit-animation-duration': "",
                                    'animation-duration': ""
                                });
                            }
                            return seriesCB(null, selectedElement);
                        }, mouseEnterEvent.animationDuration);
                    }
                ], mouseEnterEventCB);
            }, function (err) {
                if (err)
                    console.debug('err:', err);
                elementEvents['isMouseEnterOccuring'] = false;
            });
        };
    };
    SweetButton.HandleMouseLeaveEvent = function (divContainer, elementEvents) {
        return function () {
            // console.log('mouse leave');
            // don't start even if these are happening
            if (elementEvents['isMouseLeaveOccuring'] ||
                elementEvents['isClickOccuring'])
                return false;
            var cancelMouseEnter = elementEvents['isMouseEnterOccuring'];
            elementEvents['isMouseLeaveOccuring'] = true;
            var selectedElement;
            async.each(elementEvents['mouse-leave'], function (mouseLeave, mouseLeaveCB) {
                async.waterfall([
                    function (seriesCB) {
                        selectedElement = $(divContainer).find("." + mouseLeave.selector);
                        if (cancelMouseEnter) {
                            SweetButton.RemoveEventAnimationClasses(divContainer, elementEvents, [
                                'mouse-enter'
                            ]);
                        }
                        // add css
                        selectedElement.css({
                            'webkit-animation-duration': mouseLeave.animationDuration + "ms",
                            'animation-duration': mouseLeave.animationDuration + "ms"
                        });
                        return seriesCB(null, selectedElement);
                    },
                    function (selectedElement, seriesCB) {
                        // apply animation delay and then add class
                        setTimeout(function () {
                            // console.log('adding classes');
                            selectedElement.addClass("" + mouseLeave.animationClass);
                            return seriesCB(null, selectedElement);
                        }, mouseLeave.animationDelay);
                    },
                    function (selectedElement, seriesCB) {
                        // remove classes  & css after animation has completed
                        setTimeout(function () {
                            if (selectedElement.hasClass("" + mouseLeave.animationClass)) {
                                selectedElement.removeClass("" + mouseLeave.animationClass);
                                selectedElement.css({
                                    'webkit-animation-duration': "",
                                    'animation-duration': ""
                                });
                            }
                            return seriesCB(null, selectedElement);
                        }, mouseLeave.animationDuration);
                    }
                ], mouseLeaveCB);
            }, function (err) {
                if (err)
                    console.debug('err:', err);
                elementEvents['isMouseLeaveOccuring'] = false;
                // trigger mouse enter after a mouse leave if not already occuring
                // if (!elementEvents['isMouseEnterOccuring']) {
                //     console.log('trigger mouse enter');
                //     console.log('divContainer: ', divContainer);
                //     console.log('$(divContainer): ', $(divContainer));
                //     $(divContainer).trigger('mouseenter');
                //     $(divContainer).trigger('mousemove');
                // }
            });
        };
    };
    SweetButton.HandleClickEvent = function (divContainer, elementEvents) {
        return function () {
            if (elementEvents['isClickOccuring'])
                return false;
            elementEvents['isClickOccuring'] = true;
            var selectedElement;
            async.each(elementEvents['click'], function (clickEvent, clickEventCB) {
                async.waterfall([
                    function (seriesCB) {
                        selectedElement = $(divContainer).find("." + clickEvent.selector);
                        SweetButton.RemoveEventAnimationClasses(divContainer, elementEvents, [
                            'mouse-enter',
                            'mouse-leave'
                        ]);
                        // add css
                        selectedElement.css({
                            'webkit-animation-duration': clickEvent.animationDuration + "ms",
                            'animation-duration': clickEvent.animationDuration + "ms"
                        });
                        return seriesCB(null, selectedElement);
                    },
                    function (selectedElement, seriesCB) {
                        // apply animation delay and then add class
                        setTimeout(function () {
                            selectedElement.addClass("" + clickEvent.animationClass);
                            return seriesCB(null, selectedElement);
                        }, clickEvent.animationDelay);
                    },
                    function (selectedElement, seriesCB) {
                        // remove classes  & css after animation has completed
                        setTimeout(function () {
                            selectedElement.removeClass("" + clickEvent.animationClass);
                            selectedElement.css({
                                'webkit-animation-duration': "",
                                'animation-duration': ""
                            });
                            return seriesCB(null, selectedElement);
                        }, clickEvent.animationDuration);
                    }
                ], clickEventCB);
            }, function (err) {
                if (err)
                    console.debug('err:', err);
                elementEvents['isClickOccuring'] = false;
            });
        };
    };
    // add static styles asap.
    SweetButton.AddStaticStyles();
    // add the sweetButton fn to the global jQuery obj.
    $.fn.sweetButton = function (options) {
        if (options === void 0) { options = { className: 'sweet-btn' }; }
        // btn prefix
        var btnPrefix = options.className;
        // iterate through each button and manipulate
        return this.each(function () {
            var sweetBtn = new SweetButton(this, btnPrefix);
        });
    };
}(jQuery));
