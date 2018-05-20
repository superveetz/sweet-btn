(function ($) {
    var SweetButton = (function () {
        function SweetButton(btnElement, btnPrefix) {
            var _this = this;
            this['hasChildElem'] = false;
            this['on-load'] = '';
            this['scroll-in'] = '';
            this['scroll-in-animation-duration'] = '';
            this['scroll-in-animation-delay'] = '';
            this['scroll-in-animation-iteration-count'] = '';
            this['scroll-out'] = '';
            this['scroll-out-animation-duration'] = '';
            this['scroll-out-animation-delay'] = '';
            this['scroll-out-animation-iteration-count'] = '';
            this['glyph-size'] = '';
            this['glyph-color'] = '';
            this['glyph-classes'] = '';
            this['glyph-click'] = '';
            this['glyph-click-animation-duration'] = '';
            this['glyph-click-animation-delay'] = '';
            this['glyph-click-animation-iteration-count'] = '';
            this['glyph-mouse-enter'] = '';
            this['glyph-mouse-enter-animation-duration'] = '';
            this['glyph-mouse-enter-animation-delay'] = '';
            this['glyph-mouse-enter-animation-iteration-count'] = '';
            this['glyph-mouse-leave'] = '';
            this['glyph-mouse-leave-animation-duration'] = '';
            this['glyph-mouse-leave-animation-delay'] = '';
            this['glyph-mouse-leave-animation-iteration-count'] = '';
            this['element-events'] = {
                activeClassCount: {},
                isClickOccuring: false,
                isMouseEnterOccuring: false,
                isMouseLeaveOccuring: false,
                isScrollInOccuring: false,
                isScrollOutOccuring: false,
                click: [],
                'mouse-enter': [],
                'mouse-leave': [],
                'scroll-in': [],
                'scroll-out': []
            };
            this['shape'] = [{
                    'shape-1': '',
                    'shape-1-size': '',
                    'shape-1-background': '',
                    'shape-1-zIndex': '',
                    'shape-1-mouse-enter': '',
                    'shape-1-mouse-enter-animation-duration': '',
                    'shape-1-mouse-enter-animation-delay': '',
                    'shape-1-mouse-enter-animation-iteration-count': '',
                    'shape-1-mouse-leave': '',
                    'shape-1-mouse-leave-animation-duration': '',
                    'shape-1-mouse-leave-animation-delay': '',
                    'shape-1-mouse-leave-animation-iteration-count': '',
                    'shape-1-click': '',
                    'shape-1-click-animation-duration': '',
                    'shape-1-click-animation-delay': '',
                    'shape-1-click-animation-iteration-count': ''
                },
                {
                    'shape-2': '',
                    'shape-2-size': '',
                    'shape-2-background': '',
                    'shape-2-zIndex': '',
                    'shape-2-mouse-enter': '',
                    'shape-2-mouse-enter-animation-duration': '',
                    'shape-2-mouse-enter-animation-delay': '',
                    'shape-2-mouse-enter-animation-iteration-count': '',
                    'shape-2-mouse-leave': '',
                    'shape-2-mouse-leave-animation-duration': '',
                    'shape-2-mouse-leave-animation-delay': '',
                    'shape-2-mouse-leave-animation-iteration-count': '',
                    'shape-2-click': '',
                    'shape-2-click-animation-duration': '',
                    'shape-2-click-animation-delay': '',
                    'shape-2-click-animation-iteration-count': '',
                },
                {
                    'shape-3': '',
                    'shape-3-size': '',
                    'shape-3-background': '',
                    'shape-3-zIndex': '',
                    'shape-3-mouse-enter': '',
                    'shape-3-mouse-enter-animation-duration': '',
                    'shape-3-mouse-enter-animation-delay': '',
                    'shape-3-mouse-enter-animation-iteration-count': '',
                    'shape-3-mouse-leave': '',
                    'shape-3-mouse-leave-animation-duration': '',
                    'shape-3-mouse-leave-animation-delay': '',
                    'shape-3-mouse-leave-animation-iteration-count': '',
                    'shape-3-click': '',
                    'shape-3-click-animation-duration': '',
                    'shape-3-click-animation-delay': '',
                    'shape-3-click-animation-iteration-count': ''
                },
                {
                    'shape-4': '',
                    'shape-4-size': '',
                    'shape-4-background': '',
                    'shape-4-zIndex': '',
                    'shape-4-mouse-enter': '',
                    'shape-4-mouse-enter-animation-duration': '',
                    'shape-4-mouse-enter-animation-delay': '',
                    'shape-4-mouse-enter-animation-iteration-count': '',
                    'shape-4-mouse-leave': '',
                    'shape-4-mouse-leave-animation-duration': '',
                    'shape-4-mouse-leave-animation-delay': '',
                    'shape-4-mouse-leave-animation-iteration-count': '',
                    'shape-4-click': '',
                    'shape-4-click-animation-duration': '',
                    'shape-4-click-animation-delay': '',
                    'shape-4-click-animation-iteration-count': ''
                },
                {
                    'shape-5': '',
                    'shape-5-size': '',
                    'shape-5-background': '',
                    'shape-5-zIndex': '',
                    'shape-5-mouse-enter': '',
                    'shape-5-mouse-enter-animation-duration': '',
                    'shape-5-mouse-enter-animation-delay': '',
                    'shape-5-mouse-enter-animation-iteration-count': '',
                    'shape-5-mouse-leave': '',
                    'shape-5-mouse-leave-animation-duration': '',
                    'shape-5-mouse-leave-animation-delay': '',
                    'shape-5-mouse-leave-animation-iteration-count': '',
                    'shape-5-click': '',
                    'shape-5-click-animation-duration': '',
                    'shape-5-click-animation-delay': '',
                    'shape-4-click-animation-iteration-count': ''
                }];
            this.shapeScale = {
                'xs': {
                    width: 30,
                    height: 30
                },
                'sm': {
                    width: 45,
                    height: 45
                },
                'md': {
                    width: 60,
                    height: 60
                },
                'lg': {
                    width: 75,
                    height: 75
                },
                'xl': {
                    width: 90,
                    height: 90
                }
            };
            this.createHexagon = function (shapeConfig, shapeLayerNum) {
                // element size/centering
                var shapeSize = shapeConfig["shape-" + shapeLayerNum + "-size"].length ? shapeConfig["shape-" + shapeLayerNum + "-size"] : 'xs';
                var shapeScaleX = _this.shapeScale[shapeSize]['width'];
                var shapeSpacingX = shapeScaleX / 10;
                var shapeScaleY = _this.shapeScale[shapeSize]['height'];
                var shapeSpacingY = shapeScaleY / 10;
                var shapeWidth = shapeScaleX + (shapeSpacingX * 2);
                var shapeHeight = shapeScaleY + (shapeSpacingY * 2);
                // need to use negative margins here
                var shapeMarginLeft = "" + ((shapeScaleX / 2) + shapeSpacingX) * -1;
                var shapeMarginTop = "" + ((shapeScaleY / 2) + shapeSpacingY) * -1;
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
                svgHexagon.setAttribute('viewBox', "0 0 " + shapeScaleX / 2 + " " + shapeScaleY / 2);
                svgHexagon.setAttribute('fill', shapeConfig["shape-" + shapeLayerNum + "-background"]);
                svgHexagon.setAttribute('stroke', 'black');
                svgHexagon.setAttribute('stroke-width', shapeScaleY / 100 + "px");
                // sizing/centering
                svgHexagon.setAttribute('z-index', shapeConfig["shape-" + shapeLayerNum + "-zIndex"]);
                svgHexagon.setAttribute('width', (shapeScaleX) + (shapeSpacingX * 2) + "px");
                svgHexagon.setAttribute('height', (shapeScaleY) + (shapeSpacingY * 2) + "px");
                svgHexagon.setAttribute('style', "margin-left: " + shapeMarginLeft + "px; margin-top: " + shapeMarginTop + "px;");
                // create the poly hexagon
                var polyHexagon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                var ptMultiplierX = shapeScaleX / 100;
                var ptMultiplierY = shapeScaleY / 100;
                var polyPts = [
                    46 * ptMultiplierX + " " + 37.5 * ptMultiplierY,
                    25 * ptMultiplierX + " " + 46 * ptMultiplierY,
                    4 * ptMultiplierX + " " + 37.5 * ptMultiplierY,
                    4 * ptMultiplierX + " " + 12.5 * ptMultiplierY,
                    25 * ptMultiplierX + " " + 4 * ptMultiplierY,
                    46 * ptMultiplierX + " " + 12.5 * ptMultiplierY
                ];
                polyHexagon.setAttributeNS(null, 'points', polyPts.join(', '));
                // rect polygon to svg
                svgHexagon.appendChild(polyHexagon);
                return svgHexagon;
            };
            this.createCircle = function (shapeConfig, shapeLayerNum) {
                // element size/centering
                var shapeSize = shapeConfig["shape-" + shapeLayerNum + "-size"].length ? shapeConfig["shape-" + shapeLayerNum + "-size"] : 'xs';
                var shapeScaleX = _this.shapeScale[shapeSize]['width'] * 1.14; // adjusting size of circles by 15%
                var shapeSpacingX = shapeScaleX / 10;
                var shapeScaleY = _this.shapeScale[shapeSize]['height'] * 1.14; // adjusting size of circles by 15%
                var shapeSpacingY = shapeScaleY / 10;
                var shapeWidth = shapeScaleX + (shapeSpacingX * 2);
                var shapeHeight = shapeScaleY + (shapeSpacingY * 2);
                // need to use negative margins here
                var shapeMarginLeft = ((shapeScaleX / 2) + shapeSpacingX) * -1;
                var shapeMarginTop = ((shapeScaleY / 2) + shapeSpacingY) * -1;
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
                svgCicle.setAttribute('viewBox', "0 0 " + shapeScaleX / 2 + " " + shapeScaleY / 2);
                svgCicle.setAttribute('fill', shapeConfig["shape-" + shapeLayerNum + "-background"]);
                svgCicle.setAttribute('stroke', 'black');
                svgCicle.setAttribute('stroke-width', shapeScaleY / 100 + "px");
                // sizing/centering
                svgCicle.setAttribute('z-index', shapeConfig["shape-" + shapeLayerNum + "-zIndex"]);
                svgCicle.setAttribute('width', (shapeScaleX) + (shapeSpacingX * 2) + "px");
                svgCicle.setAttribute('height', (shapeScaleY) + (shapeSpacingY * 2) + "px");
                svgCicle.setAttribute('style', "margin-left: " + shapeMarginLeft + "px; margin-top: " + shapeMarginTop + "px;");
                // create the square rect
                var polyCircle = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
                polyCircle.setAttribute('fill', shapeConfig["shape-" + shapeLayerNum + "-background"]);
                var centeringMuliplier = 0.28;
                polyCircle.setAttribute('cx', "" + ((shapeScaleX * centeringMuliplier) - (shapeSpacingX * centeringMuliplier)));
                polyCircle.setAttribute('cy', "" + ((shapeScaleY * centeringMuliplier) - (shapeSpacingY * centeringMuliplier)));
                polyCircle.setAttribute('rx', "" + shapeScaleX / 5);
                polyCircle.setAttribute('ry', "" + shapeScaleY / 5);
                // rect polygon to svg
                svgCicle.appendChild(polyCircle);
                return svgCicle;
            };
            this.createSquare = function (shapeConfig, shapeLayerNum) {
                // element size/centering
                var shapeSize = shapeConfig["shape-" + shapeLayerNum + "-size"].length ? shapeConfig["shape-" + shapeLayerNum + "-size"] : 'xs';
                var shapeScaleX = _this.shapeScale[shapeSize]['width'];
                var shapeSpacingX = shapeScaleX / 10;
                var shapeWidth = shapeScaleX + (shapeSpacingX * 2);
                var shapeScaleY = _this.shapeScale[shapeSize]['height'];
                var shapeSpacingY = shapeScaleY / 10;
                var shapeHeight = shapeScaleY + (shapeSpacingY * 2);
                // need to use negative margins here
                var shapeMarginLeft = "" + ((shapeScaleX / 2) + shapeSpacingX) * -1;
                var shapeMarginTop = "" + ((shapeScaleY / 2) + shapeSpacingY) * -1;
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
                svgSquare.setAttribute('viewBox', "0 0 " + shapeScaleX / 2 + " " + shapeScaleY / 2);
                svgSquare.setAttribute('fill', shapeConfig["shape-" + shapeLayerNum + "-background"]);
                svgSquare.setAttribute('stroke', 'black');
                svgSquare.setAttribute('stroke-width', shapeScaleY / 100 + "px");
                // sizing/centering
                svgSquare.setAttribute('z-index', shapeConfig["shape-" + shapeLayerNum + "-zIndex"]);
                svgSquare.setAttribute('width', (shapeScaleX) + (shapeSpacingX * 2) + "px");
                svgSquare.setAttribute('height', (shapeScaleY) + (shapeSpacingY * 2) + "px");
                svgSquare.setAttribute('style', "margin-left: " + shapeMarginLeft + "px; margin-top: " + shapeMarginTop + "px;");
                // create the square rect
                var polySquare = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                polySquare.setAttribute('width', "" + ((shapeWidth / 2) - (shapeSpacingX * 2)));
                polySquare.setAttribute('height', "" + ((shapeHeight / 2) - (shapeSpacingY * 2)));
                polySquare.setAttribute('x', "" + shapeSpacingX / 2);
                polySquare.setAttribute('y', "" + shapeSpacingY / 2);
                // rect polygon to svg
                svgSquare.appendChild(polySquare);
                return svgSquare;
            };
            this.parseBtnAttributes = function (btnElement, btnPrefix) {
                var dataPrefix = 'data-';
                var btnAttribs = btnElement.attributes;
                var keyName;
                var hasDataPrefix;
                var hasBtnPrefix;
                var hasNumber;
                var indexOfNum;
                var keyNameOfShape;
                var indexOfShape;
                for (var keyIndex = 0; keyIndex < btnAttribs.length; keyIndex++) {
                    keyName = btnAttribs[keyIndex].name;
                    if (keyName == 'length')
                        continue;
                    hasDataPrefix = keyName.indexOf(dataPrefix);
                    if (hasDataPrefix != -1)
                        keyName = keyName.substring(dataPrefix.length, keyName.length);
                    hasBtnPrefix = keyName.indexOf(btnPrefix);
                    if (hasBtnPrefix != -1)
                        keyName = keyName.substring(btnPrefix.length + 1, keyName.length);
                    hasNumber = keyName.match(/\d+/g);
                    if (hasNumber) {
                        indexOfShape = parseFloat(hasNumber[0]) - 1;
                        if (_this.shape[indexOfShape][keyName] != undefined) {
                            _this.shape[indexOfShape][keyName] = btnAttribs[keyIndex].value;
                            _this.shape[indexOfShape]["shape-" + (indexOfShape + 1) + "-zIndex"] = indexOfShape + 1;
                        }
                        else if (_this.shape[indexOfShape][keyName] == undefined && hasBtnPrefix != -1) {
                            console.debug('SweetButton: ', keyName, 'is not supported, the maximum number of layered shapes is 5.');
                        }
                    }
                    else if (_this[keyName] != undefined) {
                        _this[keyName] = btnAttribs[keyIndex].value;
                    }
                    else if (_this[keyName] == undefined && hasBtnPrefix != -1) {
                        console.debug('SweetButton: ', keyName, 'is not supported, please visit the documentation for a complete list of valid attributes.');
                    }
                }
            };
            this.createShapes = function (divContainer) {
                // parse elem for events here
                var defEventAnimationClass = '';
                var defEventAnimationDuration = 1000; // 1s
                var defEventAnimationDelay = 0; // no delay;
                var defEventAnimationIterationCount = 1;
                var eventAnimationClass;
                var eventAnimationDuration;
                var eventAnimationDelay;
                var eventAnimationIterationCount;
                var activeClassCount;
                if (_this['scroll-out']) {
                    var eventItem = { activeClassCount: {} };
                    eventAnimationClass = _this["scroll-out"];
                    eventAnimationDuration = _this["scroll-out-animation-duration"];
                    eventAnimationDelay = _this["scroll-out-animation-delay"];
                    eventAnimationIterationCount = _this["scroll-out-animation-iteration-count"];
                    // set last scrolled to 0
                    eventItem['scrollOutLastPos'] = 0;
                    eventItem['selector'] = "scroll-out-" + eventAnimationClass;
                    // disable infinite animations as they are a pain to handle (like do we really want to allow infinite animations on a mouse-out event?)
                    if (eventAnimationIterationCount == 'infinite') {
                        eventAnimationIterationCount = undefined;
                        console.debug('SweetButton: "infinite" is not supported as an animation-iteration-count property.');
                    }
                    eventItem["animationIterationCount"] = eventAnimationIterationCount ? eventAnimationIterationCount : defEventAnimationIterationCount;
                    eventItem['animationClass'] = eventAnimationClass ? eventAnimationClass : defEventAnimationClass;
                    eventItem['animationDuration'] = eventAnimationDuration ? eventAnimationDuration : defEventAnimationDuration;
                    eventItem["animationDelay"] = eventAnimationDelay ? eventAnimationDelay : defEventAnimationDelay;
                    _this['element-events']['scroll-out'].push(eventItem);
                }
                // let's parse this for other events
                if (_this['scroll-in']) {
                    var eventItem = { activeClassCount: {} };
                    eventAnimationClass = _this["scroll-in"];
                    eventAnimationDuration = _this["scroll-in-animation-duration"];
                    eventAnimationDelay = _this["scroll-in-animation-delay"];
                    eventAnimationIterationCount = _this["scroll-in-animation-iteration-count"];
                    // set last scrolled to 0
                    eventItem['scrollInLastPos'] = 0;
                    eventItem['selector'] = "scroll-in-" + eventAnimationClass;
                    // disable infinite animations as they are a pain to handle (like do we really want to allow infinite animations on a mouse-out event?)
                    if (eventAnimationIterationCount == 'infinite') {
                        eventAnimationIterationCount = undefined;
                        console.debug('SweetButton: "infinite" is not supported as an animation-iteration-count property.');
                    }
                    eventItem["animationIterationCount"] = eventAnimationIterationCount ? eventAnimationIterationCount : defEventAnimationIterationCount;
                    eventItem['animationClass'] = eventAnimationClass ? eventAnimationClass : defEventAnimationClass;
                    eventItem['animationDuration'] = eventAnimationDuration ? eventAnimationDuration : defEventAnimationDuration;
                    eventItem["animationDelay"] = eventAnimationDelay ? eventAnimationDelay : defEventAnimationDelay;
                    _this['element-events']['scroll-in'].push(eventItem);
                }
                var shapeConfig;
                var shapeType;
                var shapeEvents;
                // track shape events
                for (var i = 0, j = _this.shape.length; i < j; i++) {
                    // goto next if no shape type
                    if (!_this.shape[i]["shape-" + (i + 1)])
                        continue;
                    shapeConfig = _this.shape[i];
                    shapeType = shapeConfig["shape-" + (i + 1)];
                    // goto next if shape type is invalid
                    if (!_this.shapeDictionary[shapeType]) {
                        console.debug('SweetButton: ', shapeType, 'is not supported, view the documentation for the completelist of shape types.');
                        continue;
                    }
                    // create layered btn shape
                    var svgShape = _this.shapeDictionary[shapeType](shapeConfig, i + 1);
                    svgShape.className += ' animated';
                    if (shapeConfig["shape-" + (i + 1) + "-click"]) {
                        var eventItem = { activeClassCount: {} };
                        eventAnimationClass = shapeConfig["shape-" + (i + 1) + "-click"];
                        eventAnimationDuration = shapeConfig["shape-" + (i + 1) + "-click-animation-duration"];
                        eventAnimationDelay = shapeConfig["shape-" + (i + 1) + "-click-animation-delay"];
                        eventAnimationIterationCount = shapeConfig["shape-" + (i + 1) + "-click-animation-iteration-count"];
                        eventItem['selector'] = "shape-" + (i + 1) + "-click-" + eventAnimationClass;
                        // disable infinite animations as they are a pain to handle (like do we really want to allow infinite animations on a mouse-out event?)
                        if (eventAnimationIterationCount == 'infinite') {
                            eventAnimationIterationCount = undefined;
                            console.debug('SweetButton: "infinite" is not supported as an animation-iteration-count property.');
                        }
                        eventItem["animationIterationCount"] = eventAnimationIterationCount ? eventAnimationIterationCount : defEventAnimationIterationCount;
                        eventItem['animationClass'] = eventAnimationClass ? eventAnimationClass : defEventAnimationClass;
                        eventItem['animationDuration'] = eventAnimationDuration ? eventAnimationDuration : defEventAnimationDuration;
                        eventItem["animationDelay"] = eventAnimationDelay ? eventAnimationDelay : defEventAnimationDelay;
                        _this['element-events']['click'].push(eventItem);
                    }
                    if (shapeConfig["shape-" + (i + 1) + "-mouse-enter"]) {
                        var eventItem = { activeClassCount: {} };
                        eventAnimationClass = shapeConfig["shape-" + (i + 1) + "-mouse-enter"];
                        eventAnimationDuration = shapeConfig["shape-" + (i + 1) + "-mouse-enter-animation-duration"];
                        eventAnimationDelay = shapeConfig["shape-" + (i + 1) + "-mouse-enter-animation-delay"];
                        eventAnimationIterationCount = shapeConfig["shape-" + (i + 1) + "-mouse-enter-animation-iteration-count"];
                        eventItem['selector'] = "shape-" + (i + 1) + "-mouse-enter-" + eventAnimationClass;
                        // disable infinite animations as they are a pain to handle (like do we really want to allow infinite animations on a mouse-out event?)
                        if (eventAnimationIterationCount == 'infinite') {
                            eventAnimationIterationCount = undefined;
                            console.debug('SweetButton: "infinite" is not supported as an animation-iteration-count property.');
                        }
                        eventItem['animationClass'] = eventAnimationClass ? eventAnimationClass : defEventAnimationClass;
                        eventItem['animationDuration'] = eventAnimationDuration ? eventAnimationDuration : defEventAnimationDuration;
                        eventItem["animationDelay"] = eventAnimationDelay ? eventAnimationDelay : defEventAnimationDelay;
                        eventItem["animationIterationCount"] = eventAnimationIterationCount ? eventAnimationIterationCount : defEventAnimationIterationCount;
                        // keep track of number of events using this class
                        activeClassCount = _this['element-events']['activeClassCount'][eventItem['animationClass']];
                        if (!activeClassCount)
                            _this['element-events']['activeClassCount'][eventItem['animationClass']] = 0;
                        _this['element-events']['mouse-enter'].push(eventItem);
                    }
                    if (shapeConfig["shape-" + (i + 1) + "-mouse-leave"]) {
                        var eventItem = { activeClassCount: {} };
                        eventAnimationClass = shapeConfig["shape-" + (i + 1) + "-mouse-leave"];
                        eventAnimationDuration = shapeConfig["shape-" + (i + 1) + "-mouse-leave-animation-duration"];
                        eventAnimationDelay = shapeConfig["shape-" + (i + 1) + "-mouse-leave-animation-delay"];
                        eventAnimationIterationCount = shapeConfig["shape-" + (i + 1) + "-mouse-leave-animation-iteration-count"];
                        // disable infinite animations as they are a pain to handle (like do we really want to allow infinite animations on a mouse-out event?)
                        if (eventAnimationIterationCount == 'infinite') {
                            eventAnimationIterationCount = undefined;
                            console.debug('SweetButton: "infinite" is not supported as an animation-iteration-count property.');
                        }
                        eventItem['selector'] = "shape-" + (i + 1) + "-mouse-leave-" + eventAnimationClass;
                        eventItem["animationIterationCount"] = eventAnimationIterationCount ? eventAnimationIterationCount : defEventAnimationIterationCount;
                        eventItem['animationClass'] = eventAnimationClass ? eventAnimationClass : defEventAnimationClass;
                        eventItem['animationDuration'] = eventAnimationDuration ? (eventAnimationDuration) : (defEventAnimationDuration);
                        eventItem["animationDelay"] = eventAnimationDelay ? eventAnimationDelay : defEventAnimationDelay;
                        // keep track of number of events using this class
                        activeClassCount = _this['element-events']['activeClassCount'][eventItem['animationClass']];
                        if (!activeClassCount)
                            _this['element-events']['activeClassCount'][eventItem['animationClass']] = 0;
                        _this['element-events']['mouse-leave'].push(eventItem);
                    }
                    divContainer.insertAdjacentElement('beforeend', svgShape);
                }
            };
            this.createGlyphIcon = function (divContainer, btnPrefix) {
                if (_this['glyph-classes']) {
                    var iconGlyph = document.createElement('i');
                    // customize
                    iconGlyph.className = _this['glyph-classes'];
                    var glyphSize = _this['glyph-size'].length ? _this['glyph-size'] : 'xs';
                    var glyphScaleX = _this.shapeScale[glyphSize]['width'];
                    var glyphSpacingX = glyphScaleX / 10;
                    var glyphScaleY = _this.shapeScale[glyphSize]['height'];
                    var glyphSpacingY = glyphScaleY / 10;
                    // font
                    iconGlyph.style.fontSize = glyphScaleY / 2 + "px";
                    iconGlyph.style.lineHeight = glyphScaleY / 2 + "px";
                    iconGlyph.style.color = _this['glyph-color'];
                    // centering
                    if (_this['hasChildElem']) {
                        var fontSize = (glyphScaleY / 2);
                        var childWidth = _this['childWidth'];
                        var glyphWidth = _this['shapeScale'][glyphSize]['width'];
                        var extraPadding = 2;
                        iconGlyph.style.marginTop = "-" + fontSize / 2 + "px";
                        iconGlyph.style.marginLeft = "-" + (fontSize / 2 + fontSize / 8 + childWidth / 2 + extraPadding) + "px";
                    }
                    else {
                        var fontSize = (glyphScaleY / 2);
                        iconGlyph.style.marginTop = "-" + fontSize / 2 + "px";
                        iconGlyph.style.marginLeft = "-" + (fontSize / 2 + fontSize / 8) + "px";
                    }
                    // parse elem for events here
                    var defEventAnimationClass = '';
                    var defEventAnimationDuration = 1000; // 1s
                    var defEventAnimationDelay = 0; // no delay;
                    var defEventAnimationIterationCount = 1;
                    var eventAnimationClass = void 0;
                    var eventAnimationDuration = void 0;
                    var eventAnimationDelay = void 0;
                    var eventAnimationIterationCount = void 0;
                    var activeClassCount = void 0;
                    if (_this['glyph-click']) {
                        var eventItem = {};
                        eventAnimationClass = _this["glyph-click"];
                        eventAnimationDuration = _this["glyph-click-animation-duration"];
                        eventAnimationDelay = _this["glyph-click-animation-delay"];
                        eventAnimationIterationCount = _this["glyph-click-animation-iteration-count"];
                        if (eventAnimationIterationCount == "infinite") {
                            console.debug('SweetButton: ', '"infinite" is not supported as an animation-iteration-count property.an animation-iteration-count');
                            eventAnimationIterationCount = undefined;
                        }
                        eventItem['selector'] = "glyph-click-" + eventAnimationClass;
                        iconGlyph.className += " " + eventItem['selector'];
                        eventItem['animationClass'] = eventAnimationClass ? eventAnimationClass : defEventAnimationClass;
                        eventItem['animationDuration'] = eventAnimationDuration ? eventAnimationDuration : defEventAnimationDuration;
                        eventItem["animationDelay"] = eventAnimationDelay ? eventAnimationDelay : defEventAnimationDelay;
                        eventItem["animationIterationCount"] = eventAnimationIterationCount ? eventAnimationIterationCount : defEventAnimationIterationCount;
                        _this['element-events']['click'].push(eventItem);
                    }
                    if (_this['glyph-click'] && _this['hasChildElem']) {
                        var eventItem = {};
                        eventAnimationClass = _this["glyph-click"];
                        eventAnimationDuration = _this["glyph-click-animation-duration"];
                        eventAnimationDelay = _this["glyph-click-animation-delay"];
                        eventAnimationIterationCount = _this["glyph-click-animation-iteration-count"];
                        if (eventAnimationIterationCount == "infinite") {
                            console.debug('SweetButton: ', '"infinite" is not supported as an animation-iteration-count property.an animation-iteration-count');
                            eventAnimationIterationCount = undefined;
                        }
                        eventItem['selector'] = btnPrefix + "-inner-text";
                        eventItem['animationClass'] = eventAnimationClass ? eventAnimationClass : defEventAnimationClass;
                        eventItem['animationDuration'] = eventAnimationDuration ? eventAnimationDuration : defEventAnimationDuration;
                        eventItem["animationDelay"] = eventAnimationDelay ? eventAnimationDelay : defEventAnimationDelay;
                        eventItem["animationIterationCount"] = eventAnimationIterationCount ? eventAnimationIterationCount : defEventAnimationIterationCount;
                        _this['element-events']['click'].push(eventItem);
                    }
                    if (_this["glyph-mouse-enter"]) {
                        var eventItem = {};
                        eventAnimationClass = _this["glyph-mouse-enter"];
                        eventAnimationDuration = _this["glyph-mouse-enter-animation-duration"];
                        eventAnimationDelay = _this["glyph-mouse-enter-animation-delay"];
                        eventAnimationIterationCount = _this["glyph-mouse-enter-animation-iteration-count"];
                        if (eventAnimationIterationCount == "infinite") {
                            console.debug('SweetButton: ', '"infinite" is not supported as an animation-iteration-count property.an animation-iteration-count');
                            eventAnimationIterationCount = undefined;
                        }
                        eventItem['selector'] = "glyph-mouse-enter-" + eventAnimationClass;
                        iconGlyph.className += " " + eventItem['selector'];
                        eventItem['animationClass'] = eventAnimationClass ? eventAnimationClass : defEventAnimationClass;
                        eventItem['animationDuration'] = eventAnimationDuration ? eventAnimationDuration : defEventAnimationDuration;
                        eventItem["animationDelay"] = eventAnimationDelay ? eventAnimationDelay : defEventAnimationDelay;
                        eventItem["animationIterationCount"] = eventAnimationIterationCount ? eventAnimationIterationCount : defEventAnimationIterationCount;
                        // keep track of number of events using this class
                        activeClassCount = _this['element-events']['activeClassCount'][eventItem['animationClass']];
                        if (!activeClassCount)
                            _this['element-events']['activeClassCount'][eventItem['animationClass']] = 0;
                        _this['element-events']['mouse-enter'].push(eventItem);
                    }
                    if (_this['glyph-mouse-enter'] && _this['hasChildElem']) {
                        var eventItem = {};
                        eventAnimationClass = _this["glyph-mouse-enter"];
                        eventAnimationDuration = _this["glyph-mouse-enter-animation-duration"];
                        eventAnimationDelay = _this["glyph-mouse-enter-animation-delay"];
                        eventAnimationIterationCount = _this["glyph-mouse-enter-animation-iteration-count"];
                        if (eventAnimationIterationCount == "infinite") {
                            console.debug('SweetButton: ', '"infinite" is not supported as an animation-iteration-count property.an animation-iteration-count');
                            eventAnimationIterationCount = undefined;
                        }
                        eventItem['selector'] = btnPrefix + "-inner-text";
                        eventItem['animationClass'] = eventAnimationClass ? eventAnimationClass : defEventAnimationClass;
                        eventItem['animationDuration'] = eventAnimationDuration ? eventAnimationDuration : defEventAnimationDuration;
                        eventItem["animationDelay"] = eventAnimationDelay ? eventAnimationDelay : defEventAnimationDelay;
                        eventItem["animationIterationCount"] = eventAnimationIterationCount ? eventAnimationIterationCount : defEventAnimationIterationCount;
                        // keep track of number of events using this class
                        activeClassCount = _this['element-events']['activeClassCount'][eventItem['animationClass']];
                        if (!activeClassCount)
                            _this['element-events']['activeClassCount'][eventItem['animationClass']] = 0;
                        _this['element-events']['mouse-enter'].push(eventItem);
                    }
                    if (_this["glyph-mouse-leave"]) {
                        var eventItem = {};
                        eventAnimationClass = _this["glyph-mouse-leave"];
                        eventAnimationDuration = _this["glyph-mouse-leave-animation-duration"];
                        eventAnimationDelay = _this["glyph-mouse-leave-animation-delay"];
                        eventAnimationIterationCount = _this["glyph-mouse-leave-animation-iteration-count"];
                        if (eventAnimationIterationCount == "infinite") {
                            console.debug('SweetButton: ', '"infinite" is not supported as an animation-iteration-count property.an animation-iteration-count');
                            eventAnimationIterationCount = undefined;
                        }
                        eventItem['selector'] = "glyph-mouse-leave-" + eventAnimationClass;
                        iconGlyph.className += " " + eventItem['selector'];
                        eventItem['animationClass'] = eventAnimationClass ? eventAnimationClass : defEventAnimationClass;
                        eventItem['animationDuration'] = eventAnimationDuration ? eventAnimationDuration : defEventAnimationDuration;
                        eventItem["animationDelay"] = eventAnimationDelay ? eventAnimationDelay : defEventAnimationDelay;
                        eventItem["animationIterationCount"] = eventAnimationIterationCount ? eventAnimationIterationCount : defEventAnimationIterationCount;
                        // keep track of number of events using this class
                        activeClassCount = _this['element-events']['activeClassCount'][eventItem['animationClass']];
                        if (!activeClassCount)
                            _this['element-events']['activeClassCount'][eventItem['animationClass']] = 0;
                        _this['element-events']['mouse-leave'].push(eventItem);
                    }
                    if (_this['glyph-mouse-leave'] && _this['hasChildElem']) {
                        var eventItem = {};
                        eventAnimationClass = _this["glyph-mouse-leave"];
                        eventAnimationDuration = _this["glyph-mouse-leave-animation-duration"];
                        eventAnimationDelay = _this["glyph-mouse-leave-animation-delay"];
                        eventAnimationIterationCount = _this["glyph-mouse-leave-animation-iteration-count"];
                        if (eventAnimationIterationCount == "infinite") {
                            console.debug('SweetButton: ', '"infinite" is not supported as an animation-iteration-count property.an animation-iteration-count');
                            eventAnimationIterationCount = undefined;
                        }
                        eventItem['selector'] = btnPrefix + "-inner-text";
                        eventItem['animationClass'] = eventAnimationClass ? eventAnimationClass : defEventAnimationClass;
                        eventItem['animationDuration'] = eventAnimationDuration ? eventAnimationDuration : defEventAnimationDuration;
                        eventItem["animationDelay"] = eventAnimationDelay ? eventAnimationDelay : defEventAnimationDelay;
                        eventItem["animationIterationCount"] = eventAnimationIterationCount ? eventAnimationIterationCount : defEventAnimationIterationCount;
                        // keep track of number of events using this class
                        activeClassCount = _this['element-events']['activeClassCount'][eventItem['animationClass']];
                        if (!activeClassCount)
                            _this['element-events']['activeClassCount'][eventItem['animationClass']] = 0;
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
                if (_this['element-events']['scroll-in'].length) {
                    window.addEventListener('scroll', SweetButton.HandleScrollInEvent(divContainer, _this['element-events'], false));
                }
                if (_this['element-events']['scroll-out'].length) {
                    window.addEventListener('scroll', SweetButton.HandleScrollOutEvent(divContainer, _this['element-events']));
                }
            };
            this.parseBtnInnerHtml = function (btnElement, btnPrefix) {
                var btnChildren = $(btnElement).children();
                if (btnChildren.length == 0)
                    return;
                _this['hasChildElem'] = true;
                var btnChild = btnChildren[0];
                $(btnChild).addClass(btnPrefix + "-inner-text");
                var childWidth = $(btnChild).width();
                _this['childWidth'] = childWidth;
                var childHeight = $(btnChild).height();
                // modify shapeScales to fit the new element
                for (var key in _this.shapeScale) {
                    _this.shapeScale[key]['width'] += (childWidth * 1.5);
                    _this.shapeScale[key]['height'] += (childHeight / 2);
                }
                if (_this['glyph-classes']) {
                    var glyphSize = _this['glyph-size'].length ? _this['glyph-size'] : 'xs';
                    var elemWidth = _this.shapeScale[glyphSize]['width'];
                    var extraPadding = 2;
                    // adjust position
                    $(btnChild).css({
                        position: 'absolute',
                        top: "50%",
                        left: "50%",
                        marginTop: (childHeight / 2.25 * -1),
                        marginLeft: ((childWidth / 2 - (elemWidth / 8) - extraPadding) * -1)
                    });
                }
                else {
                    // adjust position
                    $(btnChild).css({
                        position: 'absolute',
                        top: "50%",
                        left: "50%",
                        marginTop: (childHeight / 2.25 * -1),
                        marginLeft: (childWidth / 2 * -1)
                    });
                }
                return btnChild;
            };
            this.createDivContainer = function (btnElement, btnPrefix) {
                // parse element classes for a size
                var btnScaleX;
                var btnSpacingX;
                var btnScaleY;
                var btnSpacingY;
                if ($(btnElement).hasClass(btnPrefix + "-xl")) {
                    btnScaleX = _this.shapeScale['xl']['width'];
                    btnScaleY = _this.shapeScale['xl']['height'];
                }
                else if ($(btnElement).hasClass(btnPrefix + "-lg")) {
                    btnScaleX = _this.shapeScale['lg']['width'];
                    btnScaleY = _this.shapeScale['lg']['height'];
                }
                else if ($(btnElement).hasClass(btnPrefix + "-md")) {
                    btnScaleX = _this.shapeScale['md']['width'];
                    btnScaleY = _this.shapeScale['md']['height'];
                }
                else if ($(btnElement).hasClass(btnPrefix + "-sm")) {
                    btnScaleX = _this.shapeScale['sm']['width'];
                    btnScaleY = _this.shapeScale['sm']['height'];
                }
                else if ($(btnElement).hasClass(btnPrefix + "-xs")) {
                    btnScaleX = _this.shapeScale['xs']['width'];
                    btnScaleY = _this.shapeScale['xs']['height'];
                }
                else {
                    // default to xs
                    btnScaleX = _this.shapeScale['xs']['width'];
                    btnScaleY = _this.shapeScale['xs']['height'];
                }
                btnSpacingX = btnScaleX / 10;
                btnSpacingY = btnScaleY / 10;
                // set the on load classes
                if (_this['on-load']) {
                    $(btnElement).addClass("animated " + _this['on-load']);
                    _this['element-events']['isLoadOccuring'] = true;
                    setTimeout(function () {
                        $(btnElement).removeClass("" + _this['on-load']);
                        $(btnElement).removeClass('animated');
                        _this['element-events']['isLoadOccuring'] = false;
                    }, 1000);
                }
                // set btn elem width/height now that child elems have been parsed
                $(btnElement).css({
                    height: btnScaleY + (btnSpacingY * 2) + "px",
                    width: btnScaleX + (btnSpacingX * 2) + "px"
                });
                var divContainer = document.createElement('div');
                divContainer.setAttribute('class', btnPrefix + "-wrap");
                divContainer.style.height = "100%";
                divContainer.style.width = "100%";
                return divContainer;
            };
            this.shapeDictionary = {
                'hexagon': this.createHexagon,
                'square': this.createSquare,
                'circle': this.createCircle
            };
            // parse attribs for object config            
            this.parseBtnAttributes(btnElement, btnPrefix);
            // modify element scale based on inner text
            var childElem = this.parseBtnInnerHtml(btnElement, btnPrefix);
            // build our div wrapper
            var divContainer = this.createDivContainer(btnElement, btnPrefix);
            if (childElem)
                $(divContainer).append(childElem);
            // create the shape elements
            this.createShapes(divContainer);
            // create the glyph icon
            this.createGlyphIcon(divContainer, btnPrefix);
            // create the events
            this.createEvents(divContainer);
            // append div container to btn element
            btnElement.insertAdjacentElement('beforeend', divContainer);
            // make btn visible
            $(btnElement).css({
                visibility: 'visible'
            });
        }
        SweetButton.AddStaticStyles = function (btnPrefix) {
            if (btnPrefix === void 0) { btnPrefix = 'sweet-btn'; }
            var btnStyleSheetId = btnPrefix + "-styles";
            var pageHead = document.head || document.getElementsByTagName('head')[0];
            var btnStyleSheet = document.createElement('style');
            btnStyleSheet.setAttribute('rel', 'stylesheet');
            btnStyleSheet.setAttribute('media', 'only screen');
            btnStyleSheet.setAttribute('id', btnStyleSheetId);
            btnStyleSheet.setAttribute('type', 'text/css');
            // element styles
            var btnCssText = "          ." + btnPrefix + " {\n                position: relative;\n                display: inline-block;\n                visibility: hidden;\n                cursor: pointer;\n                -webkit-touch-callout: text;\n                user-select: text;\n                -webkit-user-select: text;\n                -moz-user-select: text;\n                -ms-user-select: text;\n                -o-user-select: text;\n                vertical-align: middle;\n                text-align: center;\n            }\n            \n            ." + btnPrefix + " ." + btnPrefix + "-wrap svg {\n                pointer-events: none;\n                overflow: visible;\n                -webkit-back-face-visibility: hidden;\n                backface-visibility: hidden;\n                z-index: 100;\n                display: inline-block;\n                position: absolute;\n                left:50%;\n                top: 50%;\n                -webkit-animation-fill-mode: both;\n                animation-fill-mode: both;\n            }\n\n            ." + btnPrefix + " ." + btnPrefix + "-wrap svg rect,\n            ." + btnPrefix + " ." + btnPrefix + "-wrap svg circle,\n            ." + btnPrefix + " ." + btnPrefix + "-wrap svg polygon,\n            ." + btnPrefix + " ." + btnPrefix + "-wrap svg elipsis {\n                pointer-events: none;\n            }\n            \n            ." + btnPrefix + " ." + btnPrefix + "-wrap i {\n                z-index: 150;\n                display: inline-block;\n                position: absolute;\n                left: 50%;\n                top: 50%;\n                pointer-events: none;\n\n                -webkit-text-stroke-color: black;\n                -webkit-text-stroke-width: 0.5px;\n                -webkit-tap-highlight-color: transparent;\n\n            }\n\n            ." + btnPrefix + " ." + btnPrefix + "-inner-text {\n                    display: inline-block;\n                    z-index: 150;\n                    whiteSpace: pre;\n                    margin: 0;\n                    padding: 0;\n                    \n                    -webkit-touch-callout: text;\n                    user-select: text;\n                    -webkit-user-select: text;\n                    -moz-user-select: text;\n                    -ms-user-select: text;\n                    -o-user-select: text;\n            }\n            ";
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
                                '-webkit-animation-duration': "",
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
                                '-webkit-animation-duration': event.animationDuration + "ms",
                                'animation-duration': event.animationDuration + "ms"
                            });
                        }
                    });
                }
            });
        };
        return SweetButton;
    }());
    SweetButton.HandleMouseEnterEvent = function (divContainer, elementEvents) {
        return function () {
            // don't start even if these are happening
            if (elementEvents['isOnLoadOccuring'] ||
                elementEvents['isMouseEnterOccuring'] ||
                elementEvents['isMouseLeaveOccuring'] ||
                elementEvents['isClickOccuring'] ||
                elementEvents['isScrollInOccuring'] ||
                elementEvents['isScrollOutOccuring'])
                return false;
            elementEvents['isMouseEnterOccuring'] = true;
            var selectedElement;
            async.each(elementEvents['mouse-enter'], function (mouseEnterEvent, mouseEnterEventCB) {
                async.waterfall([
                    function (seriesCB) {
                        selectedElement = $(divContainer).find("." + mouseEnterEvent.selector);
                        // add css
                        selectedElement.css({
                            '-webkit-animation-duration': mouseEnterEvent.animationDuration + "ms",
                            'animation-duration': mouseEnterEvent.animationDuration + "ms",
                            '-webkit-animation-iteration-count': mouseEnterEvent.animationIterationCount,
                            'animation-iteration-count': mouseEnterEvent.animationIterationCount
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
                            selectedElement.removeClass("" + mouseEnterEvent.animationClass);
                            return seriesCB(null, selectedElement);
                        }, mouseEnterEvent.animationIterationCount * mouseEnterEvent.animationDuration);
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
            // don't start even if these are happening
            if (elementEvents['isOnLoadOccuring'] ||
                elementEvents['isMouseLeaveOccuring'] ||
                elementEvents['isMouseEnterOccuring'] ||
                elementEvents['isClickOccuring'] ||
                elementEvents['isScrollInOccuring'] ||
                elementEvents['isScrollOutOccuring'])
                return false;
            elementEvents['isMouseLeaveOccuring'] = true;
            var selectedElement;
            async.each(elementEvents['mouse-leave'], function (mouseLeave, mouseLeaveCB) {
                async.waterfall([
                    function (seriesCB) {
                        selectedElement = $(divContainer).find("." + mouseLeave.selector);
                        // add css
                        selectedElement.css({
                            '-webkit-animation-duration': mouseLeave.animationDuration + "ms",
                            'animation-duration': mouseLeave.animationDuration + "ms",
                            '-webkit-animation-iteration-count': mouseLeave.animationIterationCount,
                            'animation-iteration-count': mouseLeave.animationIterationCount
                        });
                        return seriesCB(null, selectedElement);
                    },
                    function (selectedElement, seriesCB) {
                        // apply animation delay and then add class
                        setTimeout(function () {
                            // increment number of active events using this class
                            elementEvents['activeClassCount']["" + mouseLeave.animationClass]++;
                            if (!selectedElement.hasClass("" + mouseLeave.animationClass)) {
                                selectedElement.addClass("" + mouseLeave.animationClass);
                            }
                            return seriesCB(null, selectedElement);
                        }, mouseLeave.animationDelay);
                    },
                    function (selectedElement, seriesCB) {
                        // start the mouse in animation 100ms earlier than the class gets removed to avoid flicker
                        async.parallel([
                            function (paraCB) {
                                setTimeout(function () {
                                    elementEvents['isMouseLeaveOccuring'] = false;
                                    // trigger mouse enter after a mouse leave if not already occuring
                                    SweetButton.HandleMouseEnterEvent(divContainer, elementEvents)();
                                    return paraCB();
                                }, mouseLeave.animationDuration * mouseLeave.animationIterationCount - 100);
                            },
                            function (paraCB) {
                                // remove classes  & css after animation has completed
                                setTimeout(function () {
                                    // decrement the number of events using this class
                                    elementEvents['activeClassCount']["" + mouseLeave.animationClass]--;
                                    // only remove this class if there are no events needing it
                                    if (elementEvents['activeClassCount']["" + mouseLeave.animationClass] == 0) {
                                        selectedElement.removeClass("" + mouseLeave.animationClass);
                                    }
                                    return seriesCB(null, selectedElement);
                                }, mouseLeave.animationDuration * mouseLeave.animationIterationCount);
                            }
                        ], seriesCB);
                    }
                ], mouseLeaveCB);
            }, function (err) {
                if (err)
                    console.debug('err:', err);
            });
        };
    };
    SweetButton.HandleScrollOutEvent = function (divContainer, elementEvents) {
        return function () {
            var lastScrollAmount = elementEvents['scrollOutLastPos'];
            var scrollAmount = $(window).scrollTop();
            elementEvents['scrollOutLastPos'] = scrollAmount;
            if (elementEvents['isOnLoadOccuring'] ||
                elementEvents['isClickOccuring'] ||
                elementEvents['isMouseEnterOccuring'] ||
                elementEvents['isMouseLeaveOccuring'] ||
                elementEvents['isScrollInOccuring'] ||
                elementEvents['isScrollOutOccuring'])
                return false;
            var amountToScroll = $(divContainer).offset();
            var offset = $(divContainer).height();
            if (scrollAmount < lastScrollAmount) {
                // element is in bottom portion of screen
                if (scrollAmount + window.innerHeight > amountToScroll.top + offset - (offset / 3) &&
                    scrollAmount + window.innerHeight < amountToScroll.top + offset + (offset / 3)) {
                    triggerScrollOutEvent();
                }
            }
            else {
                // scrolling up
                // element is in top portion of screen
                if (scrollAmount > amountToScroll.top - offset - (offset / 3) &&
                    scrollAmount < amountToScroll.top + (offset / 3)) {
                    triggerScrollOutEvent();
                }
            }
            function triggerScrollOutEvent() {
                elementEvents['isScrollOutOccuring'] = true;
                var selectedElement;
                async.each(elementEvents['scroll-out'], function (scrollOutEvent, scrollOutEventCB) {
                    async.waterfall([
                        function (seriesCB) {
                            selectedElement = $(divContainer);
                            selectedElement.css({
                                '-webkit-animation-duration': scrollOutEvent.animationDuration + "ms",
                                'animation-duration': scrollOutEvent.animationDuration + "ms",
                                '-webkit-animation-iteration-count': scrollOutEvent.animationIterationCount,
                                'animation-iteration-count': scrollOutEvent.animationIterationCount
                            });
                            return seriesCB(null, selectedElement);
                        },
                        function (selectedElement, seriesCB) {
                            // apply animation delay and then add class
                            setTimeout(function () {
                                selectedElement.addClass("" + scrollOutEvent.animationClass);
                                return seriesCB(null, selectedElement);
                            }, scrollOutEvent.animationDelay);
                        },
                        function (selectedElement, seriesCB) {
                            // start the mouse in animation 100ms earlier than the class gets removed to avoid flicker
                            async.parallel([
                                function (paraCB) {
                                    setTimeout(function () {
                                        elementEvents['isScrollOutOccuring'] = false;
                                        // trigger mouse enter after a mouse leave if not already occuring
                                        SweetButton.HandleScrollInEvent(divContainer, elementEvents, true)();
                                        return paraCB();
                                    }, scrollOutEvent.animationDuration * scrollOutEvent.animationIterationCount - 100);
                                },
                                function (paraCB) {
                                    // remove classes  & css after animation has completed
                                    setTimeout(function () {
                                        selectedElement.removeClass("" + scrollOutEvent.animationClass);
                                        return seriesCB(null, selectedElement);
                                    }, scrollOutEvent.animationDuration * scrollOutEvent.animationIterationCount);
                                }
                            ]);
                        }
                    ], scrollOutEventCB);
                }, function (err) {
                    if (err)
                        console.debug('err:', err);
                });
            }
        };
    };
    SweetButton.HandleScrollInEvent = function (divContainer, elementEvents, forceEvent) {
        return function () {
            if (forceEvent)
                return triggerScrollInEvent();
            var lastScrollAmount = elementEvents['scrollInLastPos'];
            var scrollAmount = $(window).scrollTop();
            elementEvents['scrollInLastPos'] = scrollAmount;
            if (elementEvents['isOnLoadOccuring'] ||
                elementEvents['isClickOccuring'] ||
                elementEvents['isMouseEnterOccuring'] ||
                elementEvents['isMouseLeaveOccuring'] ||
                elementEvents['isScrollInOccuring'] ||
                elementEvents['isScrollOutOccuring'])
                return false;
            var amountToScroll = $(divContainer).offset();
            var offset = $(divContainer).height();
            // scrolling down
            if (scrollAmount > lastScrollAmount) {
                // element is in bottom portion of screen
                if (scrollAmount + window.innerHeight > amountToScroll.top - (offset / 3) &&
                    scrollAmount + window.innerHeight < amountToScroll.top + (offset / 3)) {
                    triggerScrollInEvent();
                }
            }
            else {
                // scrolling up
                // element is in top portion of screen
                if (scrollAmount > amountToScroll.top + offset - (offset / 3) &&
                    scrollAmount < amountToScroll.top + offset + (offset / 3)) {
                    triggerScrollInEvent();
                }
            }
            function triggerScrollInEvent() {
                elementEvents['isScrollInOccuring'] = true;
                var selectedElement;
                async.each(elementEvents['scroll-in'], function (scrollInEvent, scrollInEventCB) {
                    async.waterfall([
                        function (seriesCB) {
                            selectedElement = $(divContainer);
                            selectedElement.css({
                                '-webkit-animation-duration': scrollInEvent.animationDuration + "ms",
                                'animation-duration': scrollInEvent.animationDuration + "ms",
                                '-webkit-animation-iteration-count': scrollInEvent.animationIterationCount,
                                'animation-iteration-count': scrollInEvent.animationIterationCount
                            });
                            return seriesCB(null, selectedElement);
                        },
                        function (selectedElement, seriesCB) {
                            // apply animation delay and then add class
                            setTimeout(function () {
                                selectedElement.addClass("" + scrollInEvent.animationClass);
                                return seriesCB(null, selectedElement);
                            }, scrollInEvent.animationDelay);
                        },
                        function (selectedElement, seriesCB) {
                            // remove classes  & css after animation has completed
                            setTimeout(function () {
                                selectedElement.removeClass("" + scrollInEvent.animationClass);
                                return seriesCB(null, selectedElement);
                            }, scrollInEvent.animationDuration * scrollInEvent.animationIterationCount);
                        }
                    ], scrollInEventCB);
                }, function (err) {
                    if (err)
                        console.debug('err:', err);
                    elementEvents['isScrollInOccuring'] = false;
                });
            }
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
                            'mouse-leave',
                            'scroll-in',
                            'scroll-out'
                        ]);
                        // add css
                        selectedElement.css({
                            '-webkit-animation-duration': clickEvent.animationDuration + "ms",
                            'animation-duration': clickEvent.animationDuration + "ms",
                            '-webkit-animation-iteration-count': clickEvent.animationIterationCount,
                            'animation-iteration-count': clickEvent.animationIterationCount
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
                            return seriesCB(null, selectedElement);
                        }, clickEvent.animationDuration * clickEvent.animationIterationCount);
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
            console.log('sweetBtn: ', sweetBtn);
        });
    };
}(jQuery));
