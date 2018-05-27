declare var async: any;
declare var jQuery: any;

(function ( $ ) {
    class SweetButton {
        private 'hasChildElem' = false;

        private 'on-load' = '';

        private 'scroll-in' = '';
        private 'scroll-in-animation-duration' = '';
        private 'scroll-in-animation-delay' = '';
        private 'scroll-in-animation-iteration-count' = '';

        private 'scroll-out' = '';
        private 'scroll-out-animation-duration' = '';
        private 'scroll-out-animation-delay' = '';
        private 'scroll-out-animation-iteration-count' = '';

        private 'glyph-size' = '';
        private 'glyph-color' = '';
        private 'glyph-classes' = '';

        private 'glyph-click' = '';
        private 'glyph-click-animation-duration' = '';
        private 'glyph-click-animation-delay' = '';
        private 'glyph-click-animation-iteration-count' = '';

        private 'glyph-mouse-enter' = '';
        private 'glyph-mouse-enter-animation-duration' = '';
        private 'glyph-mouse-enter-animation-delay' = '';
        private 'glyph-mouse-enter-animation-iteration-count' = '';

        private 'glyph-mouse-leave' = '';
        private 'glyph-mouse-leave-animation-duration' = '';
        private 'glyph-mouse-leave-animation-delay' = '';
        private 'glyph-mouse-leave-animation-iteration-count' = '';

        private 'element-events' = {
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

        private 'shape' = [{
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

        private shapeScale = {
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

        private createHexagon = (shapeConfig: Object, shapeLayerNum: number) : SVGElement => {
            // element size/centering
            const shapeSize:        string  = shapeConfig[`shape-${shapeLayerNum}-size`].length ? shapeConfig[`shape-${shapeLayerNum}-size`] : 'xs';
            const shapeScaleX:      number  = this.shapeScale[shapeSize]['width'];
            const shapeSpacingX:    number  = shapeScaleX / 10;
            const shapeScaleY:      number  = this.shapeScale[shapeSize]['height'];
            const shapeSpacingY:    number  = shapeScaleY / 10;
            const shapeWidth:       number  = shapeScaleX + (shapeSpacingX * 2);
            const shapeHeight:      number  = shapeScaleY + (shapeSpacingY * 2);
            // need to use negative margins here
            const shapeMarginLeft = `${((shapeScaleX / 2) + shapeSpacingX) * -1}`;
            const shapeMarginTop = `${((shapeScaleY / 2) + shapeSpacingY) * -1}`;
            // animation class names
            const clickAnimationName = shapeConfig[`shape-${shapeLayerNum}-click`];
            const mouseEnterAnimationName = shapeConfig[`shape-${shapeLayerNum}-mouse-enter`];
            const mouseLeaveAnimationName = shapeConfig[`shape-${shapeLayerNum}-mouse-leave`];

            // create the svg
            let svgHexagon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

            const clickClass = clickAnimationName.length ? `shape-${shapeLayerNum}-click-${clickAnimationName}` : '';
            const mouseEnterClass = mouseEnterAnimationName.length ? `shape-${shapeLayerNum}-mouse-enter-${mouseEnterAnimationName}` : '';
            const mouseLeaveClass = mouseLeaveAnimationName.length ? `shape-${shapeLayerNum}-mouse-leave-${mouseLeaveAnimationName}` : '';

            const svgHexagonClasses = `${clickClass} ${mouseEnterClass} ${mouseLeaveClass}`;

            // add svg classes
            svgHexagon.setAttribute('class', svgHexagonClasses);

            // set svg attributes
            svgHexagon.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
            
            svgHexagon.setAttribute('viewBox', `0 0 ${shapeScaleX/2} ${shapeScaleY/2}`);
            svgHexagon.setAttribute('fill', shapeConfig[`shape-${shapeLayerNum}-background`]);
            svgHexagon.setAttribute('stroke', 'black');
            svgHexagon.setAttribute('stroke-width', `${shapeScaleY/100}px`);

            // sizing/centering
            svgHexagon.setAttribute('z-index', shapeConfig[`shape-${shapeLayerNum}-zIndex`]);
            svgHexagon.setAttribute('width', `${(shapeScaleX) + (shapeSpacingX*2)}px`);
            svgHexagon.setAttribute('height', `${(shapeScaleY) + (shapeSpacingY*2)}px`);

            svgHexagon.setAttribute('style', `margin-left: ${shapeMarginLeft}px; margin-top: ${shapeMarginTop}px;`);
            
            // create the poly hexagon
            let polyHexagon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            const ptMultiplierX = shapeScaleX /100;
            const ptMultiplierY = shapeScaleY /100;
            const polyPts = [
                `${46 * ptMultiplierX} ${37.5 * ptMultiplierY}`,
                `${25 * ptMultiplierX} ${46 * ptMultiplierY}`,
                `${4 * ptMultiplierX} ${37.5 * ptMultiplierY}`,
                `${4 * ptMultiplierX} ${12.5 * ptMultiplierY}`,
                `${25 * ptMultiplierX} ${4 * ptMultiplierY}`,
                `${46 * ptMultiplierX} ${12.5 * ptMultiplierY}`
            ];

            polyHexagon.setAttributeNS(null, 'points', polyPts.join(', '));

            // rect polygon to svg
            svgHexagon.appendChild(polyHexagon);

            return svgHexagon;
        }

        private createCircle = (shapeConfig: Object, shapeLayerNum: number) : SVGElement => {
            // element size/centering
            const shapeSize:     string  = shapeConfig[`shape-${shapeLayerNum}-size`].length ? shapeConfig[`shape-${shapeLayerNum}-size`] : 'xs';
            const shapeScaleX:   number  = this.shapeScale[shapeSize]['width'] * 1.14; // adjusting size of circles by 15%
            const shapeSpacingX: number  = shapeScaleX / 10;
            const shapeScaleY:   number  = this.shapeScale[shapeSize]['height'] * 1.14; // adjusting size of circles by 15%
            const shapeSpacingY: number  = shapeScaleY / 10;
            const shapeWidth:    number  = shapeScaleX + (shapeSpacingX * 2);
            const shapeHeight:   number  = shapeScaleY + (shapeSpacingY * 2);
            // need to use negative margins here
            const shapeMarginLeft: number = ((shapeScaleX / 2) + shapeSpacingX) * -1;
            const shapeMarginTop:  number = ((shapeScaleY / 2) + shapeSpacingY) * -1;
            // animation class names
            const clickAnimationName = shapeConfig[`shape-${shapeLayerNum}-click`];
            const mouseEnterAnimationName = shapeConfig[`shape-${shapeLayerNum}-mouse-enter`];
            const mouseLeaveAnimationName = shapeConfig[`shape-${shapeLayerNum}-mouse-leave`];
            // create the svg
            let svgCicle = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

            const clickClass = clickAnimationName.length ? `shape-${shapeLayerNum}-click-${clickAnimationName}` : '';
            const mouseEnterClass = mouseEnterAnimationName.length ? `shape-${shapeLayerNum}-mouse-enter-${mouseEnterAnimationName}` : '';
            const mouseLeaveClass = mouseLeaveAnimationName.length ? `shape-${shapeLayerNum}-mouse-leave-${mouseLeaveAnimationName}` : '';

            const svgCicleClasses = `${clickClass} ${mouseEnterClass} ${mouseLeaveClass}`;

            // add svg classes
            svgCicle.setAttribute('class', svgCicleClasses);

            // set svg attributes
            svgCicle.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
            
            svgCicle.setAttribute('viewBox', `0 0 ${shapeScaleX/2} ${shapeScaleY/2}`);
            svgCicle.setAttribute('fill', shapeConfig[`shape-${shapeLayerNum}-background`]);
            svgCicle.setAttribute('stroke', 'black');
            svgCicle.setAttribute('stroke-width', `${shapeScaleY/100}px`);

            // sizing/centering
            svgCicle.setAttribute('z-index', shapeConfig[`shape-${shapeLayerNum}-zIndex`]);
            svgCicle.setAttribute('width', `${(shapeScaleX) + (shapeSpacingX*2)}px`);
            svgCicle.setAttribute('height', `${(shapeScaleY) + (shapeSpacingY*2)}px`);

            svgCicle.setAttribute('style', `margin-left: ${shapeMarginLeft}px; margin-top: ${shapeMarginTop}px;`);
            
            // create the square rect
            let polyCircle = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
            polyCircle.setAttribute('fill', shapeConfig[`shape-${shapeLayerNum}-background`]);
            const centeringMuliplier = 0.28; 
            polyCircle.setAttribute('cx', `${(shapeScaleX*centeringMuliplier) - (shapeSpacingX*centeringMuliplier)}`);
            polyCircle.setAttribute('cy', `${(shapeScaleY*centeringMuliplier) - (shapeSpacingY*centeringMuliplier)}`);
            polyCircle.setAttribute('rx', `${shapeScaleX / 5}`);
            polyCircle.setAttribute('ry', `${shapeScaleY / 5}`);

            // rect polygon to svg
            svgCicle.appendChild(polyCircle);

            return svgCicle;
        }
 
        private createSquare = (shapeConfig: Object, shapeLayerNum: number) : SVGElement => {
            // element size/centering
            const shapeSize:    string  = shapeConfig[`shape-${shapeLayerNum}-size`].length ? shapeConfig[`shape-${shapeLayerNum}-size`] : 'xs';
            const shapeScaleX:   number  = this.shapeScale[shapeSize]['width'];
            const shapeSpacingX: number  = shapeScaleX / 10;
            const shapeWidth:   number  = shapeScaleX + (shapeSpacingX * 2);
            const shapeScaleY:   number  = this.shapeScale[shapeSize]['height'];
            const shapeSpacingY: number  = shapeScaleY / 10;
            const shapeHeight:  number  = shapeScaleY + (shapeSpacingY * 2);
            // need to use negative margins here
            const shapeMarginLeft = `${((shapeScaleX / 2) + shapeSpacingX) * -1}`;
            const shapeMarginTop = `${((shapeScaleY / 2) + shapeSpacingY) * -1}`;
            // animation class names
            const clickAnimationName = shapeConfig[`shape-${shapeLayerNum}-click`];
            const mouseEnterAnimationName = shapeConfig[`shape-${shapeLayerNum}-mouse-enter`];
            const mouseLeaveAnimationName = shapeConfig[`shape-${shapeLayerNum}-mouse-leave`];
            // create the svg
            let svgSquare = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

            const clickClass = clickAnimationName.length ? `shape-${shapeLayerNum}-click-${clickAnimationName}` : '';
            const mouseEnterClass = mouseEnterAnimationName.length ? `shape-${shapeLayerNum}-mouse-enter-${mouseEnterAnimationName}` : '';
            const mouseLeaveClass = mouseLeaveAnimationName.length ? `shape-${shapeLayerNum}-mouse-leave-${mouseLeaveAnimationName}` : '';

            const svgSquareClasses = `${clickClass} ${mouseEnterClass} ${mouseLeaveClass}`;

            // add svg classes
            svgSquare.setAttribute('class', svgSquareClasses);

            // set svg attributes
            svgSquare.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
            
            svgSquare.setAttribute('viewBox', `0 0 ${shapeScaleX/2} ${shapeScaleY/2}`);
            svgSquare.setAttribute('fill', shapeConfig[`shape-${shapeLayerNum}-background`]);
            svgSquare.setAttribute('stroke', 'black');
            svgSquare.setAttribute('stroke-width', `${shapeScaleY/100}px`);

            // sizing/centering
            svgSquare.setAttribute('z-index', shapeConfig[`shape-${shapeLayerNum}-zIndex`]);
            svgSquare.setAttribute('width', `${(shapeScaleX) + (shapeSpacingX*2)}px`);
            svgSquare.setAttribute('height', `${(shapeScaleY) + (shapeSpacingY*2)}px`);

            svgSquare.setAttribute('style', `margin-left: ${shapeMarginLeft}px; margin-top: ${shapeMarginTop}px;`);
            
            // create the square rect
            let polySquare = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            polySquare.setAttribute('width', `${(shapeWidth/2) - (shapeSpacingX*2)}`);
            polySquare.setAttribute('height', `${(shapeHeight/2) - (shapeSpacingY*2)}`);
            polySquare.setAttribute('x', `${shapeSpacingX/2}`);
            polySquare.setAttribute('y', `${shapeSpacingY/2}`);

            // rect polygon to svg
            svgSquare.appendChild(polySquare);

            return svgSquare;
        }

        private parseBtnAttributes = (btnElement: Element, btnPrefix: string) : void => {
            const dataPrefix = 'data-';
            const btnAttribs = btnElement.attributes;
            let keyName;
            let hasDataPrefix;
            let hasBtnPrefix;
            let hasNumber;
            let indexOfNum;
            let keyNameOfShape;
            let indexOfShape;

            for(let keyIndex = 0; keyIndex < btnAttribs.length; keyIndex++) {
                keyName = btnAttribs[keyIndex].name;

                if (keyName == 'length') continue;

                hasDataPrefix = keyName.indexOf(dataPrefix);
                if (hasDataPrefix != -1) keyName = keyName.substring(dataPrefix.length, keyName.length);

                hasBtnPrefix = keyName.indexOf(btnPrefix);
                if (hasBtnPrefix != -1) keyName = keyName.substring(btnPrefix.length+1, keyName.length);
                
                hasNumber = keyName.match(/\d+/g);
                if (hasNumber) {
                    indexOfShape = parseFloat(hasNumber[0])-1;

                    if (this.shape[indexOfShape][keyName] != undefined) {
                        this.shape[indexOfShape][keyName] = btnAttribs[keyIndex].value;
                        this.shape[indexOfShape][`shape-${indexOfShape+1}-zIndex`] = indexOfShape+1;
                    } else if (this.shape[indexOfShape][keyName] == undefined && hasBtnPrefix != -1) {
                        console.debug('SweetButton: ', keyName, 'is not supported, the maximum number of layered shapes is 5.');
                    }
                } else if (this[keyName] != undefined) {
                    this[keyName] = btnAttribs[keyIndex].value;
                } else if (this[keyName] == undefined && hasBtnPrefix != -1) {
                    console.debug('SweetButton: ', keyName, 'is not supported, please visit the documentation for a complete list of valid attributes.');
                }

            }
        }

        public static AddStaticStyles(btnPrefix: string = 'sweet-btn') : void {
            const btnStyleSheetId = `${btnPrefix}-styles`;
            const pageHead = document.head || document.getElementsByTagName('head')[0];
            let btnStyleSheet = document.createElement('style');
            btnStyleSheet.setAttribute('rel', 'stylesheet');
            btnStyleSheet.setAttribute('media', 'only screen');
            btnStyleSheet.setAttribute('id', btnStyleSheetId);
            btnStyleSheet.setAttribute('type', 'text/css');

            // element styles
            let btnCssText = `          .${btnPrefix} {
                position: relative;
                display: inline-block;
                visibility: hidden;
                cursor: pointer;
                -webkit-touch-callout: text;
                user-select: text;
                -webkit-user-select: text;
                -moz-user-select: text;
                -ms-user-select: text;
                -o-user-select: text;
                vertical-align: middle;
                text-align: center;
            }
            
            .${btnPrefix} .${btnPrefix}-wrap svg {
                pointer-events: none;
                overflow: visible;
                -webkit-back-face-visibility: hidden;
                backface-visibility: hidden;
                z-index: 100;
                display: inline-block;
                position: absolute;
                left:50%;
                top: 50%;
                -webkit-animation-fill-mode: both;
                animation-fill-mode: both;
            }

            .${btnPrefix} .${btnPrefix}-wrap svg rect,
            .${btnPrefix} .${btnPrefix}-wrap svg circle,
            .${btnPrefix} .${btnPrefix}-wrap svg polygon,
            .${btnPrefix} .${btnPrefix}-wrap svg elipsis {
                pointer-events: none;
            }
            
            .${btnPrefix} .${btnPrefix}-wrap i {
                z-index: 150;
                display: inline-block;
                position: absolute;
                left: 50%;
                top: 50%;
                pointer-events: none;

                -webkit-text-stroke-color: black;
                -webkit-text-stroke-width: 0.5px;
                -webkit-tap-highlight-color: transparent;

            }

            .${btnPrefix} .${btnPrefix}-inner-text {
                    display: inline-block;
                    z-index: 150;
                    whiteSpace: pre;
                    margin: 0;
                    padding: 0;
                    
                    -webkit-touch-callout: text;
                    user-select: text;
                    -webkit-user-select: text;
                    -moz-user-select: text;
                    -ms-user-select: text;
                    -o-user-select: text;
            }
            `;

            btnStyleSheet.appendChild(document.createTextNode(btnCssText));
            
            //add <stle> elem to the page
            pageHead.appendChild(btnStyleSheet);

        }

        private createShapes = (divContainer: HTMLElement) : void => {
            // parse elem for events here
            const defEventAnimationClass:           string = '';
            const defEventAnimationDuration:        number = 1000; // 1s
            const defEventAnimationDelay:           number = 0; // no delay;
            const defEventAnimationIterationCount:  number = 1;
            let eventAnimationClass;
            let eventAnimationDuration;
            let eventAnimationDelay;
            let eventAnimationIterationCount;
            let activeClassCount;
            
            if (this['scroll-out']) {
                let eventItem:                  Object = { activeClassCount: {} };
                eventAnimationClass             = this[`scroll-out`];
                eventAnimationDuration          = this[`scroll-out-animation-duration`];
                eventAnimationDelay             = this[`scroll-out-animation-delay`];
                eventAnimationIterationCount    = this[`scroll-out-animation-iteration-count`];

                // set last scrolled to 0
                eventItem['scrollOutLastPos'] = 0;

                eventItem['selector']           = `scroll-out-${eventAnimationClass}`;

                // disable infinite animations as they are a pain to handle (like do we really want to allow infinite animations on a mouse-out event?)
                if (eventAnimationIterationCount == 'infinite') {
                    eventAnimationIterationCount = undefined;
                    console.debug('SweetButton: "infinite" is not supported as an animation-iteration-count property.');
                }

                eventItem[`animationIterationCount`]     = eventAnimationIterationCount    ? eventAnimationIterationCount      : defEventAnimationIterationCount;
                eventItem['animationClass']              = eventAnimationClass             ? eventAnimationClass               : defEventAnimationClass;
                eventItem['animationDuration']           = eventAnimationDuration          ? eventAnimationDuration            : defEventAnimationDuration;
                eventItem[`animationDelay`]              = eventAnimationDelay             ? eventAnimationDelay               : defEventAnimationDelay;

                this['element-events']['scroll-out'].push(eventItem);
            }
            // let's parse this for other events
            if (this['scroll-in']) {
                let eventItem:                  Object = { activeClassCount: {} };
                eventAnimationClass             = this[`scroll-in`];
                eventAnimationDuration          = this[`scroll-in-animation-duration`];
                eventAnimationDelay             = this[`scroll-in-animation-delay`];
                eventAnimationIterationCount    = this[`scroll-in-animation-iteration-count`];

                // set last scrolled to 0
                eventItem['scrollInLastPos'] = 0;

                eventItem['selector']           = `scroll-in-${eventAnimationClass}`;

                // disable infinite animations as they are a pain to handle (like do we really want to allow infinite animations on a mouse-out event?)
                if (eventAnimationIterationCount == 'infinite') {
                    eventAnimationIterationCount = undefined;
                    console.debug('SweetButton: "infinite" is not supported as an animation-iteration-count property.');
                }

                eventItem[`animationIterationCount`]     = eventAnimationIterationCount    ? eventAnimationIterationCount      : defEventAnimationIterationCount;
                eventItem['animationClass']              = eventAnimationClass             ? eventAnimationClass               : defEventAnimationClass;
                eventItem['animationDuration']           = eventAnimationDuration          ? eventAnimationDuration            : defEventAnimationDuration;
                eventItem[`animationDelay`]              = eventAnimationDelay             ? eventAnimationDelay               : defEventAnimationDelay;

                this['element-events']['scroll-in'].push(eventItem);
            }

            let shapeConfig;
            let shapeType;
            let shapeEvents;
            // track shape events
            for(let i = 0, j = this.shape.length; i < j; i++) {
                // goto next if no shape type
                if (!this.shape[i][`shape-${i+1}`]) continue;
                shapeConfig = this.shape[i];
                shapeType = shapeConfig[`shape-${i+1}`];
                
                // goto next if shape type is invalid
                if (!this.shapeDictionary[shapeType]) {
                    console.debug('SweetButton: ', shapeType, 'is not supported, view the documentation for the completelist of shape types.');
                    continue;
                }

                // create layered btn shape
                let svgShape = this.shapeDictionary[shapeType](shapeConfig, i+1);
                svgShape.setAttribute('class', (svgShape.getAttribute('class') + ' animated'));
                console.log('svg clases: ', svgShape.getAttribute('class'));

                if (shapeConfig[`shape-${i+1}-click`]) {
                    let eventItem:                  Object = { activeClassCount: {} };
                    eventAnimationClass             = shapeConfig[`shape-${i+1}-click`];
                    eventAnimationDuration          = shapeConfig[`shape-${i+1}-click-animation-duration`];
                    eventAnimationDelay             = shapeConfig[`shape-${i+1}-click-animation-delay`];
                    eventAnimationIterationCount    = shapeConfig[`shape-${i+1}-click-animation-iteration-count`];

                    eventItem['selector']           = `shape-${i+1}-click-${eventAnimationClass}`;

                    // disable infinite animations as they are a pain to handle (like do we really want to allow infinite animations on a mouse-out event?)
                    if (eventAnimationIterationCount == 'infinite') {
                        eventAnimationIterationCount = undefined;
                        console.debug('SweetButton: "infinite" is not supported as an animation-iteration-count property.');
                    }

                    eventItem[`animationIterationCount`]     = eventAnimationIterationCount    ? eventAnimationIterationCount      : defEventAnimationIterationCount;
                    eventItem['animationClass']              = eventAnimationClass             ? eventAnimationClass               : defEventAnimationClass;
                    eventItem['animationDuration']           = eventAnimationDuration          ? eventAnimationDuration            : defEventAnimationDuration;
                    eventItem[`animationDelay`]              = eventAnimationDelay             ? eventAnimationDelay               : defEventAnimationDelay;

                    this['element-events']['click'].push(eventItem);
                }

                if (shapeConfig[`shape-${i+1}-mouse-enter`]) {
                    let eventItem:                  Object = { activeClassCount: {} };
                    eventAnimationClass             = shapeConfig[`shape-${i+1}-mouse-enter`];
                    eventAnimationDuration          = shapeConfig[`shape-${i+1}-mouse-enter-animation-duration`];
                    eventAnimationDelay             = shapeConfig[`shape-${i+1}-mouse-enter-animation-delay`];
                    eventAnimationIterationCount    = shapeConfig[`shape-${i+1}-mouse-enter-animation-iteration-count`];

                    eventItem['selector']           = `shape-${i+1}-mouse-enter-${eventAnimationClass}`;

                    // disable infinite animations as they are a pain to handle (like do we really want to allow infinite animations on a mouse-out event?)
                    if (eventAnimationIterationCount == 'infinite') {
                        eventAnimationIterationCount = undefined;
                        console.debug('SweetButton: "infinite" is not supported as an animation-iteration-count property.');
                    }

                    eventItem['animationClass']              = eventAnimationClass             ? eventAnimationClass               : defEventAnimationClass;
                    eventItem['animationDuration']           = eventAnimationDuration          ? eventAnimationDuration            : defEventAnimationDuration;
                    eventItem[`animationDelay`]              = eventAnimationDelay             ? eventAnimationDelay               : defEventAnimationDelay;
                    eventItem[`animationIterationCount`]     = eventAnimationIterationCount    ? eventAnimationIterationCount      : defEventAnimationIterationCount;
                    
                    // keep track of number of events using this class
                    activeClassCount = this['element-events']['activeClassCount'][eventItem['animationClass']];
                    if (!activeClassCount) this['element-events']['activeClassCount'][eventItem['animationClass']] = 0;

                    this['element-events']['mouse-enter'].push(eventItem);
                }

                if (shapeConfig[`shape-${i+1}-mouse-leave`]) {
                    let eventItem:                  Object = { activeClassCount: {} };
                    eventAnimationClass             = shapeConfig[`shape-${i+1}-mouse-leave`];
                    eventAnimationDuration          = shapeConfig[`shape-${i+1}-mouse-leave-animation-duration`];
                    eventAnimationDelay             = shapeConfig[`shape-${i+1}-mouse-leave-animation-delay`];
                    eventAnimationIterationCount    = shapeConfig[`shape-${i+1}-mouse-leave-animation-iteration-count`];

                    // disable infinite animations as they are a pain to handle (like do we really want to allow infinite animations on a mouse-out event?)
                    if (eventAnimationIterationCount == 'infinite') {
                        eventAnimationIterationCount = undefined;
                        console.debug('SweetButton: "infinite" is not supported as an animation-iteration-count property.');
                    }

                    eventItem['selector']           = `shape-${i+1}-mouse-leave-${eventAnimationClass}`;
                    
                    eventItem[`animationIterationCount`]     = eventAnimationIterationCount    ? eventAnimationIterationCount      : defEventAnimationIterationCount;
                    eventItem['animationClass']              = eventAnimationClass             ? eventAnimationClass               : defEventAnimationClass;
                    eventItem['animationDuration']           = eventAnimationDuration          ? (eventAnimationDuration)            : (defEventAnimationDuration);
                    eventItem[`animationDelay`]              = eventAnimationDelay             ? eventAnimationDelay               : defEventAnimationDelay;

                    // keep track of number of events using this class
                    activeClassCount = this['element-events']['activeClassCount'][eventItem['animationClass']];
                    if (!activeClassCount) this['element-events']['activeClassCount'][eventItem['animationClass']] = 0;
                    
                    this['element-events']['mouse-leave'].push(eventItem);
                }

                divContainer.insertAdjacentElement('beforeend', svgShape);
            }
        }

        private createGlyphIcon = (divContainer: HTMLElement, btnPrefix: string) : void => {
            if (this['glyph-classes']) {
                let iconGlyph = document.createElement('i');

                // customize
                iconGlyph.className = this['glyph-classes'];
                const glyphSize     = this['glyph-size'].length ? this['glyph-size'] : 'xs';
                const glyphScaleX   = this.shapeScale[glyphSize]['width'];
                const glyphSpacingX = glyphScaleX / 10;
                const glyphScaleY   = this.shapeScale[glyphSize]['height'];
                const glyphSpacingY = glyphScaleY / 10;

                
                // font
                iconGlyph.style.fontSize = `${glyphScaleY/2}px`;
                iconGlyph.style.lineHeight = `${glyphScaleY/2}px`;
                iconGlyph.style.color = this['glyph-color'];

                // centering
                if (this['hasChildElem']) {
                    const fontSize = (glyphScaleY/2);
                    const childWidth = this['childWidth'];
                    const glyphWidth = this['shapeScale'][glyphSize]['width'];
                    const extraPadding = -2;
                    iconGlyph.style.marginTop = `-${fontSize/2}px`;
                    iconGlyph.style.marginLeft = `-${fontSize/2 + fontSize/8 + childWidth/2 +extraPadding}px`;
                } else {
                    const fontSize = (glyphScaleY/2);
                    iconGlyph.style.marginTop = `-${fontSize/2}px`;
                    iconGlyph.style.marginLeft = `-${fontSize/2 + fontSize/8}px`;
                }

                // parse elem for events here
                const defEventAnimationClass:           string = '';
                const defEventAnimationDuration:        number = 1000; // 1s
                const defEventAnimationDelay:           number = 0; // no delay;
                const defEventAnimationIterationCount:  number = 1;
                let eventAnimationClass;
                let eventAnimationDuration;
                let eventAnimationDelay;
                let eventAnimationIterationCount;
                let activeClassCount;

                if (this['glyph-click']) {
                    let eventItem:                  Object = {};
                    eventAnimationClass             = this[`glyph-click`];
                    eventAnimationDuration          = this[`glyph-click-animation-duration`];
                    eventAnimationDelay             = this[`glyph-click-animation-delay`];
                    eventAnimationIterationCount    = this[`glyph-click-animation-iteration-count`];

                    if (eventAnimationIterationCount == "infinite") {
                        console.debug('SweetButton: ', '"infinite" is not supported as an animation-iteration-count property.an animation-iteration-count');
                        eventAnimationIterationCount = undefined;
                    }

                    eventItem['selector']           = `glyph-click-${eventAnimationClass}`;
                    iconGlyph.className             += ` ${eventItem['selector']}`; 

                    eventItem['animationClass']              = eventAnimationClass                ? eventAnimationClass       : defEventAnimationClass;
                    eventItem['animationDuration']           = eventAnimationDuration             ? eventAnimationDuration    : defEventAnimationDuration;
                    eventItem[`animationDelay`]              = eventAnimationDelay                ? eventAnimationDelay       : defEventAnimationDelay;
                    eventItem[`animationIterationCount`]     = eventAnimationIterationCount       ? eventAnimationIterationCount       : defEventAnimationIterationCount;

                    this['element-events']['click'].push(eventItem);
                }

                if (this['glyph-click'] && this['hasChildElem']) {
                    let eventItem:                  Object = {};
                    eventAnimationClass             = this[`glyph-click`];
                    eventAnimationDuration          = this[`glyph-click-animation-duration`];
                    eventAnimationDelay             = this[`glyph-click-animation-delay`];
                    eventAnimationIterationCount    = this[`glyph-click-animation-iteration-count`];

                    if (eventAnimationIterationCount == "infinite") {
                        console.debug('SweetButton: ', '"infinite" is not supported as an animation-iteration-count property.an animation-iteration-count');
                        eventAnimationIterationCount = undefined;
                    }

                    eventItem['selector']           = `${btnPrefix}-inner-text`;

                    eventItem['animationClass']              = eventAnimationClass       ? eventAnimationClass       : defEventAnimationClass;
                    eventItem['animationDuration']           = eventAnimationDuration    ? eventAnimationDuration    : defEventAnimationDuration;
                    eventItem[`animationDelay`]              = eventAnimationDelay       ? eventAnimationDelay       : defEventAnimationDelay;
                    eventItem[`animationIterationCount`]     = eventAnimationIterationCount       ? eventAnimationIterationCount       : defEventAnimationIterationCount;

                    this['element-events']['click'].push(eventItem);
                }

                if (this[`glyph-mouse-enter`]) {
                    let eventItem:                  Object = {};
                    eventAnimationClass             = this[`glyph-mouse-enter`];
                    eventAnimationDuration          = this[`glyph-mouse-enter-animation-duration`];
                    eventAnimationDelay             = this[`glyph-mouse-enter-animation-delay`];
                    eventAnimationIterationCount    = this[`glyph-mouse-enter-animation-iteration-count`];

                    if (eventAnimationIterationCount == "infinite") {
                        console.debug('SweetButton: ', '"infinite" is not supported as an animation-iteration-count property.an animation-iteration-count');
                        eventAnimationIterationCount = undefined;
                    }

                    eventItem['selector']           = `glyph-mouse-enter-${eventAnimationClass}`;
                    iconGlyph.className             += ` ${eventItem['selector']}`;

                    eventItem['animationClass']     = eventAnimationClass       ? eventAnimationClass       : defEventAnimationClass;
                    eventItem['animationDuration']  = eventAnimationDuration    ? eventAnimationDuration    : defEventAnimationDuration;
                    eventItem[`animationDelay`]     = eventAnimationDelay       ? eventAnimationDelay       : defEventAnimationDelay;
                    eventItem[`animationIterationCount`]     = eventAnimationIterationCount       ? eventAnimationIterationCount       : defEventAnimationIterationCount;

                    // keep track of number of events using this class
                    activeClassCount = this['element-events']['activeClassCount'][eventItem['animationClass']];
                    if (!activeClassCount) this['element-events']['activeClassCount'][eventItem['animationClass']] = 0;

                    this['element-events']['mouse-enter'].push(eventItem);
                }

                if (this['glyph-mouse-enter'] && this['hasChildElem']) {
                    let eventItem:                  Object = {};
                    eventAnimationClass         = this[`glyph-mouse-enter`];
                    eventAnimationDuration      = this[`glyph-mouse-enter-animation-duration`];
                    eventAnimationDelay         = this[`glyph-mouse-enter-animation-delay`];
                    eventAnimationIterationCount    = this[`glyph-mouse-enter-animation-iteration-count`];

                    if (eventAnimationIterationCount == "infinite") {
                        console.debug('SweetButton: ', '"infinite" is not supported as an animation-iteration-count property.an animation-iteration-count');
                        eventAnimationIterationCount = undefined;
                    }

                    eventItem['selector']           = `${btnPrefix}-inner-text`;

                    eventItem['animationClass']     = eventAnimationClass       ? eventAnimationClass       : defEventAnimationClass;
                    eventItem['animationDuration']  = eventAnimationDuration    ? eventAnimationDuration    : defEventAnimationDuration;
                    eventItem[`animationDelay`]     = eventAnimationDelay       ? eventAnimationDelay       : defEventAnimationDelay;
                    eventItem[`animationIterationCount`]     = eventAnimationIterationCount       ? eventAnimationIterationCount       : defEventAnimationIterationCount;

                    // keep track of number of events using this class
                    activeClassCount = this['element-events']['activeClassCount'][eventItem['animationClass']];
                    if (!activeClassCount) this['element-events']['activeClassCount'][eventItem['animationClass']] = 0;
                    
                    this['element-events']['mouse-enter'].push(eventItem);
                }

                if (this[`glyph-mouse-leave`]) {
                    let eventItem:                  Object = {};
                    eventAnimationClass         = this[`glyph-mouse-leave`];
                    eventAnimationDuration      = this[`glyph-mouse-leave-animation-duration`];
                    eventAnimationDelay         = this[`glyph-mouse-leave-animation-delay`];
                    eventAnimationIterationCount    = this[`glyph-mouse-leave-animation-iteration-count`];

                    if (eventAnimationIterationCount == "infinite") {
                        console.debug('SweetButton: ', '"infinite" is not supported as an animation-iteration-count property.an animation-iteration-count');
                        eventAnimationIterationCount = undefined;
                    }

                    eventItem['selector']           = `glyph-mouse-leave-${eventAnimationClass}`;
                    iconGlyph.className             += ` ${eventItem['selector']}`;

                    eventItem['animationClass']     = eventAnimationClass    ? eventAnimationClass      : defEventAnimationClass;
                    eventItem['animationDuration']  = eventAnimationDuration ? eventAnimationDuration   : defEventAnimationDuration;
                    eventItem[`animationDelay`]     = eventAnimationDelay    ? eventAnimationDelay      : defEventAnimationDelay;
                    eventItem[`animationIterationCount`]     = eventAnimationIterationCount       ? eventAnimationIterationCount       : defEventAnimationIterationCount;

                    // keep track of number of events using this class
                    activeClassCount = this['element-events']['activeClassCount'][eventItem['animationClass']];
                    if (!activeClassCount) this['element-events']['activeClassCount'][eventItem['animationClass']] = 0;
                    
                    this['element-events']['mouse-leave'].push(eventItem);
                }

                if (this['glyph-mouse-leave'] && this['hasChildElem']) {
                    let eventItem:                  Object = {};
                    eventAnimationClass         = this[`glyph-mouse-leave`];
                    eventAnimationDuration      = this[`glyph-mouse-leave-animation-duration`];
                    eventAnimationDelay         = this[`glyph-mouse-leave-animation-delay`];
                    eventAnimationIterationCount    = this[`glyph-mouse-leave-animation-iteration-count`];

                    if (eventAnimationIterationCount == "infinite") {
                        console.debug('SweetButton: ', '"infinite" is not supported as an animation-iteration-count property.an animation-iteration-count');
                        eventAnimationIterationCount = undefined;
                    }

                    eventItem['selector']           = `${btnPrefix}-inner-text`;

                    eventItem['animationClass']     = eventAnimationClass       ? eventAnimationClass       : defEventAnimationClass;
                    eventItem['animationDuration']  = eventAnimationDuration    ? eventAnimationDuration    : defEventAnimationDuration;
                    eventItem[`animationDelay`]     = eventAnimationDelay       ? eventAnimationDelay       : defEventAnimationDelay;
                    eventItem[`animationIterationCount`]     = eventAnimationIterationCount       ? eventAnimationIterationCount       : defEventAnimationIterationCount;

                    // keep track of number of events using this class
                    activeClassCount = this['element-events']['activeClassCount'][eventItem['animationClass']];
                    if (!activeClassCount) this['element-events']['activeClassCount'][eventItem['animationClass']] = 0;
                    
                    this['element-events']['mouse-leave'].push(eventItem);
                }

                // append icon to divContainer
                divContainer.appendChild(iconGlyph);
            }
        }

        private static HandleMouseEnterEvent = (divContainer: HTMLElement, elementEvents: Object) : EventListenerOrEventListenerObject => {
            
            return () => {
                // don't start even if these are happening
                if (elementEvents['isOnLoadOccuring'] ||
                    elementEvents['isMouseEnterOccuring'] ||
                    elementEvents['isMouseLeaveOccuring'] ||
                    elementEvents['isClickOccuring'] ||
                    elementEvents['isScrollInOccuring'] ||
                    elementEvents['isScrollOutOccuring']) return false;

                elementEvents['isMouseEnterOccuring'] = true;

                let selectedElement;

                async.each(elementEvents['mouse-enter'], (mouseEnterEvent, mouseEnterEventCB) => {

                    async.waterfall([
                        (seriesCB) => {
                            selectedElement = $(divContainer).find(`.${mouseEnterEvent.selector}`);
                            // add css
                            selectedElement.css({
                                '-webkit-animation-duration': `${mouseEnterEvent.animationDuration}ms`,
                                'animation-duration': `${mouseEnterEvent.animationDuration}ms`,
                                '-webkit-animation-iteration-count': mouseEnterEvent.animationIterationCount,
                                'animation-iteration-count': mouseEnterEvent.animationIterationCount
                            });

                            return seriesCB(null, selectedElement);
                        },
                        (selectedElement, seriesCB) => {
                            // apply animation delay and then add class
                            setTimeout(() => {

                                selectedElement.addClass(`${mouseEnterEvent.animationClass}`);

                                return seriesCB(null, selectedElement);

                            }, mouseEnterEvent.animationDelay);
                        },
                        (selectedElement, seriesCB) => {
                            // remove classes  & css after animation has completed
                            setTimeout(() => {

                                selectedElement.removeClass(`${mouseEnterEvent.animationClass}`);

                                return seriesCB(null, selectedElement);

                            }, mouseEnterEvent.animationIterationCount * mouseEnterEvent.animationDuration);
                        }
                    ], mouseEnterEventCB);
                }, (err) => {
                    if (err) console.debug('err:', err);
                    
                    elementEvents['isMouseEnterOccuring'] = false;

                    
                });
            }
        }

        
        private static HandleMouseLeaveEvent = (divContainer: HTMLElement, elementEvents: Object) : EventListenerOrEventListenerObject => {
            
            return () => {
                // don't start even if these are happening
                if (elementEvents['isOnLoadOccuring'] ||
                    elementEvents['isMouseLeaveOccuring'] ||
                    elementEvents['isMouseEnterOccuring'] ||
                    elementEvents['isClickOccuring'] ||
                    elementEvents['isScrollInOccuring'] ||
                    elementEvents['isScrollOutOccuring']) return false;

                elementEvents['isMouseLeaveOccuring'] = true;

                let selectedElement;

                async.each(elementEvents['mouse-leave'], (mouseLeave, mouseLeaveCB) => {

                    async.waterfall([
                        (seriesCB) => {
                            selectedElement = $(divContainer).find(`.${mouseLeave.selector}`);
                            // add css
                            selectedElement.css({
                                '-webkit-animation-duration': `${mouseLeave.animationDuration}ms`,
                                'animation-duration': `${mouseLeave.animationDuration}ms`,
                                '-webkit-animation-iteration-count': mouseLeave.animationIterationCount,
                                'animation-iteration-count': mouseLeave.animationIterationCount
                            });

                            return seriesCB(null, selectedElement);
                        },
                        (selectedElement, seriesCB) => {
                            // apply animation delay and then add class
                            setTimeout(() => {
                                // increment number of active events using this class
                                elementEvents['activeClassCount'][`${mouseLeave.animationClass}`]++;

                                if (!selectedElement.hasClass(`${mouseLeave.animationClass}`)) {
                                    selectedElement.addClass(`${mouseLeave.animationClass}`);
                                }

                                return seriesCB(null, selectedElement);

                            }, mouseLeave.animationDelay);
                        },
                        (selectedElement, seriesCB) => {
                            // start the mouse in animation 100ms earlier than the class gets removed to avoid flicker
                            async.parallel([
                                (paraCB) => {
                                    setTimeout(() => {
                                        elementEvents['isMouseLeaveOccuring'] = false;
                                        // trigger mouse enter after a mouse leave if not already occuring
                                        SweetButton.HandleMouseEnterEvent(divContainer, elementEvents)();

                                        return paraCB();
                                    }, mouseLeave.animationDuration * mouseLeave.animationIterationCount - 100);
                                },
                                (paraCB) => {
                                    // remove classes  & css after animation has completed
                                    setTimeout(() => {

                                        // decrement the number of events using this class
                                        elementEvents['activeClassCount'][`${mouseLeave.animationClass}`]--;

                                        // only remove this class if there are no events needing it
                                        // console.log(elementEvents['activeClassCount']);
                                        // if (elementEvents['activeClassCount'][`${mouseLeave.animationClass}`] == 0) {
                                        //     selectedElement.removeClass(`${mouseLeave.animationClass}`);
                                        // }
                                        selectedElement.removeClass(`${mouseLeave.animationClass}`);

                                        return seriesCB(null, selectedElement);

                                    }, mouseLeave.animationDuration * mouseLeave.animationIterationCount);
                                }
                            ], seriesCB);
                            
                        }
                    ], mouseLeaveCB);
                }, (err) => {
                    if (err) console.debug('err:', err);

                });
            }
        }

        private static HandleScrollOutEvent = (divContainer: HTMLElement, elementEvents: Object) : EventListenerOrEventListenerObject => {
            return () => {
                const lastScrollAmount = elementEvents['scrollOutLastPos'];
                const scrollAmount = $(window).scrollTop();
                elementEvents['scrollOutLastPos'] =  scrollAmount;

                if (elementEvents['isOnLoadOccuring'] ||
                    elementEvents['isClickOccuring'] ||
                    elementEvents['isMouseEnterOccuring'] ||
                    elementEvents['isMouseLeaveOccuring'] ||
                    elementEvents['isScrollInOccuring'] ||
                    elementEvents['isScrollOutOccuring']) return false;

                const amountToScroll = $(divContainer).offset();
                const offset = $(divContainer).height();

                if (scrollAmount < lastScrollAmount) {
                    // element is in bottom portion of screen
                    if (scrollAmount + window.innerHeight > amountToScroll.top + offset - (offset/3) && 
                        scrollAmount + window.innerHeight < amountToScroll.top + offset + (offset/3)) {
                        triggerScrollOutEvent();
                    }
                    
                } else {
                // scrolling up
                    // element is in top portion of screen
                    if (scrollAmount > amountToScroll.top - offset - (offset/3) && 
                        scrollAmount < amountToScroll.top + (offset/3)) {
                        triggerScrollOutEvent();
                    }

                }

                function triggerScrollOutEvent() {
                    elementEvents['isScrollOutOccuring'] = true;

                    let selectedElement;

                    async.each(elementEvents['scroll-out'], (scrollOutEvent, scrollOutEventCB) => {
                        async.waterfall([
                            (seriesCB) => {
                                selectedElement = $(divContainer);
                                
                                selectedElement.css({
                                    '-webkit-animation-duration': `${scrollOutEvent.animationDuration}ms`,
                                    'animation-duration': `${scrollOutEvent.animationDuration}ms`,
                                    '-webkit-animation-iteration-count': scrollOutEvent.animationIterationCount,
                                    'animation-iteration-count': scrollOutEvent.animationIterationCount
                                });

                                return seriesCB(null, selectedElement);
                            },
                            (selectedElement, seriesCB) => {
                                // apply animation delay and then add class
                                setTimeout(() => {
                                    selectedElement.addClass(`${scrollOutEvent.animationClass}`);

                                    return seriesCB(null, selectedElement);

                                }, scrollOutEvent.animationDelay);
                            },
                            (selectedElement, seriesCB) => {
                                // start the mouse in animation 100ms earlier than the class gets removed to avoid flicker
                                async.parallel([
                                    (paraCB) => {
                                        setTimeout(() => {
                                            elementEvents['isScrollOutOccuring'] = false;
                                            // trigger mouse enter after a mouse leave if not already occuring
                                            SweetButton.HandleScrollInEvent(divContainer, elementEvents, true)();

                                            return paraCB();
                                        }, scrollOutEvent.animationDuration * scrollOutEvent.animationIterationCount - 100);
                                    },
                                    (paraCB) => {
                                        // remove classes  & css after animation has completed
                                        setTimeout(() => {
                                            selectedElement.removeClass(`${scrollOutEvent.animationClass}`);

                                            return seriesCB(null, selectedElement);

                                        }, scrollOutEvent.animationDuration * scrollOutEvent.animationIterationCount);
                                    }
                                ]);
                            }
                        ], scrollOutEventCB);
                    }, (err) => {
                        if (err) console.debug('err:', err);
                        
                    });
                }
            }
        }

        private static HandleScrollInEvent = (divContainer: HTMLElement, elementEvents: Object, forceEvent: Boolean) : EventListenerOrEventListenerObject => {
            return () => {
                if (forceEvent) return triggerScrollInEvent();

                const lastScrollAmount = elementEvents['scrollInLastPos'];
                const scrollAmount = $(window).scrollTop();
                elementEvents['scrollInLastPos'] =  scrollAmount;

                if (elementEvents['isOnLoadOccuring'] ||
                    elementEvents['isClickOccuring'] ||
                    elementEvents['isMouseEnterOccuring'] ||
                    elementEvents['isMouseLeaveOccuring'] ||
                    elementEvents['isScrollInOccuring'] ||
                    elementEvents['isScrollOutOccuring']) return false;

                const amountToScroll = $(divContainer).offset();
                const offset = $(divContainer).height();

                // scrolling down
                if (scrollAmount > lastScrollAmount) {
                    // element is in bottom portion of screen
                    if (scrollAmount + window.innerHeight > amountToScroll.top - (offset/3) && 
                        scrollAmount + window.innerHeight < amountToScroll.top + (offset/3)) {
                        triggerScrollInEvent();
                    }
                    
                } else {
                // scrolling up
                    // element is in top portion of screen
                    if (scrollAmount > amountToScroll.top + offset - (offset/3) && 
                        scrollAmount < amountToScroll.top + offset + (offset/3)) {
                            triggerScrollInEvent();
                    }

                }

                function triggerScrollInEvent() {
                    elementEvents['isScrollInOccuring'] = true;

                    let selectedElement;

                    async.each(elementEvents['scroll-in'], (scrollInEvent, scrollInEventCB) => {
                        async.waterfall([
                            (seriesCB) => {
                                selectedElement = $(divContainer);

                                selectedElement.css({
                                    '-webkit-animation-duration': `${scrollInEvent.animationDuration}ms`,
                                    'animation-duration': `${scrollInEvent.animationDuration}ms`,
                                    '-webkit-animation-iteration-count': scrollInEvent.animationIterationCount,
                                    'animation-iteration-count': scrollInEvent.animationIterationCount
                                });

                                return seriesCB(null, selectedElement);
                            },
                            (selectedElement, seriesCB) => {
                                // apply animation delay and then add class
                                setTimeout(() => {
                                    selectedElement.addClass(`${scrollInEvent.animationClass}`);

                                    return seriesCB(null, selectedElement);

                                }, scrollInEvent.animationDelay);
                            },
                            (selectedElement, seriesCB) => {
                                // remove classes  & css after animation has completed
                                setTimeout(() => {
                                    selectedElement.removeClass(`${scrollInEvent.animationClass}`);
                                    
                                    return seriesCB(null, selectedElement);

                                }, scrollInEvent.animationDuration * scrollInEvent.animationIterationCount);
                            }
                        ], scrollInEventCB);
                    }, (err) => {
                        if (err) console.debug('err:', err);
                        
                        elementEvents['isScrollInOccuring'] = false;
                        
                    });
                }
            }
        }

        private static HandleClickEvent = (divContainer: HTMLElement, elementEvents: Object) : EventListenerOrEventListenerObject => {
            
            return () => {

                if (elementEvents['isClickOccuring']) return false;

                elementEvents['isClickOccuring'] = true;

                let selectedElement;

                async.each(elementEvents['click'], (clickEvent, clickEventCB) => {
                    async.waterfall([
                        (seriesCB) => {
                            selectedElement = $(divContainer).find(`.${clickEvent.selector}`);
                            SweetButton.RemoveEventAnimationClasses(divContainer, elementEvents, [
                                'mouse-enter',
                                'mouse-leave',
                                'scroll-in',
                                'scroll-out'
                            ]);
                            // add css
                            selectedElement.css({
                                '-webkit-animation-duration': `${clickEvent.animationDuration}ms`,
                                'animation-duration': `${clickEvent.animationDuration}ms`,
                                '-webkit-animation-iteration-count': clickEvent.animationIterationCount,
                                'animation-iteration-count': clickEvent.animationIterationCount
                            });

                            return seriesCB(null, selectedElement);
                        },
                        (selectedElement, seriesCB) => {
                            // apply animation delay and then add class
                            setTimeout(() => {
                                selectedElement.addClass(`${clickEvent.animationClass}`);

                                return seriesCB(null, selectedElement);

                            }, clickEvent.animationDelay);
                        },
                        (selectedElement, seriesCB) => {
                            // remove classes  & css after animation has completed
                            setTimeout(() => {
                                selectedElement.removeClass(`${clickEvent.animationClass}`);
                                
                                return seriesCB(null, selectedElement);

                            }, clickEvent.animationDuration * clickEvent.animationIterationCount);
                        }
                    ], clickEventCB);
                }, (err) => {
                    if (err) console.debug('err:', err);
                    
                    elementEvents['isClickOccuring'] = false;
                    
                });
            }
        }

        private static RemoveEventAnimationClasses (divContainer: HTMLElement, elementEvents: Object, elementEventKeyNames: Array<string>) {
            let selectedElement;

            elementEventKeyNames.forEach((eventKeyName, index) => {
                if (!elementEvents[eventKeyName]) return;

                if (elementEvents[eventKeyName].length) {
                    elementEvents[eventKeyName].forEach((event, index) => {
                        selectedElement     = $(divContainer).find(`.${event.selector}`);

                        if (selectedElement.hasClass(event.animationClass)) {
                            selectedElement.removeClass(event.animationClass);
                            selectedElement.css({
                                '-webkit-animation-duration': ``,
                                'animation-duration': ``
                            });
                        }
                    });
                }

            });
        }

        private static AddEventAnimationClasses (divContainer: HTMLElement, elementEvents: Object, elementEventKeyNames: Array<string>) {
            let selectedElement;

            elementEventKeyNames.forEach((eventKeyName, index) => {
                if (!elementEvents[eventKeyName]) return;

                if (elementEvents[eventKeyName].length) {
                    elementEvents[eventKeyName].forEach((event, index) => {
                        selectedElement     = $(divContainer).find(`.${event.selector}`);

                        if (!selectedElement.hasClass(event.animationClass)) {
                            selectedElement.addClass(event.animationClass);
                            selectedElement.css({
                                '-webkit-animation-duration': `${event.animationDuration}ms`,
                                'animation-duration': `${event.animationDuration}ms`
                            });
                        }
                    });
                }

            });
        }

        private createEvents = (divContainer: HTMLElement) : void => {
            // add click event
            if (this['element-events']['click'].length) {
                divContainer.addEventListener('click', SweetButton.HandleClickEvent(divContainer, this['element-events']));
            }
            // add mouse-enter event
            if (this['element-events']['mouse-enter'].length) {
                divContainer.addEventListener('mouseenter', SweetButton.HandleMouseEnterEvent(divContainer, this['element-events']));
                divContainer.addEventListener('touchstart', SweetButton.HandleMouseEnterEvent(divContainer, this['element-events']));
            }
            // add mouse-leave event
            if (this['element-events']['mouse-leave'].length) {
                divContainer.addEventListener('mouseleave', SweetButton.HandleMouseLeaveEvent(divContainer, this['element-events']));
            }

            if (this['element-events']['scroll-in'].length) {
                window.addEventListener('scroll', SweetButton.HandleScrollInEvent(divContainer, this['element-events'], false));
            }

            if (this['element-events']['scroll-out'].length) {
                window.addEventListener('scroll', SweetButton.HandleScrollOutEvent(divContainer, this['element-events']));
            }
            
        }

        private parseBtnInnerHtml = (btnElement: HTMLElement, btnPrefix: string): HTMLElement => {
            const btnChildren = $(btnElement).children();
            if (btnChildren.length == 0) return;

            this['hasChildElem'] = true;
            const btnChild = btnChildren[0];
            $(btnChild).addClass(`${btnPrefix}-inner-text`);
            const childWidth = $(btnChild).width();
            this['childWidth'] = childWidth;
            const childHeight = $(btnChild).height();

            // modify shapeScales to fit the new element
            for(let key in this.shapeScale) {
                this.shapeScale[key]['width']    += (childWidth * 1.5);
                this.shapeScale[key]['height']   += (childHeight / 2);
            }

            
            if (this['glyph-classes']) {
                const glyphSize     = this['glyph-size'].length ? this['glyph-size'] : 'xs';
                const elemWidth     = this.shapeScale[glyphSize]['width'];
                const extraPadding  = -2;    
                // adjust position
                $(btnChild).css({
                    position: 'absolute',
                    top: "50%",
                    left: "50%",
                    marginTop: (childHeight / 2.25 * -1),
                    marginLeft: ((childWidth / 2 - (elemWidth/8) - extraPadding) * -1)
                });
            } else {
                const extraPadding  = 0;
                // adjust position
                $(btnChild).css({
                    position: 'absolute',
                    top: "50%",
                    left: "50%",
                    marginTop: (childHeight / 2.25 * -1),
                    marginLeft: (((childWidth / 3) + (btnChild.offsetWidth/6) - extraPadding) * -1)
                });

                console.log('btnchild.width', btnChild.offsetWidth / 8);
            }

            return btnChild;
        }

        private createDivContainer = (btnElement: HTMLElement, btnPrefix: string): HTMLElement => {
            // parse element classes for a size
            let btnScaleX;
            let btnSpacingX;
            let btnScaleY;
            let btnSpacingY;
            if ($(btnElement).hasClass(`${btnPrefix}-xl`)) {
                btnScaleX = this.shapeScale['xl']['width'];
                btnScaleY = this.shapeScale['xl']['height'];
            } else if ($(btnElement).hasClass(`${btnPrefix}-lg`)) {
                btnScaleX = this.shapeScale['lg']['width'];
                btnScaleY = this.shapeScale['lg']['height'];
            } else if ($(btnElement).hasClass(`${btnPrefix}-md`)) {
                btnScaleX = this.shapeScale['md']['width'];
                btnScaleY = this.shapeScale['md']['height'];
            } else if ($(btnElement).hasClass(`${btnPrefix}-sm`)) {
                btnScaleX = this.shapeScale['sm']['width'];
                btnScaleY = this.shapeScale['sm']['height'];
            } else if ($(btnElement).hasClass(`${btnPrefix}-xs`)) {
                btnScaleX = this.shapeScale['xs']['width'];
                btnScaleY = this.shapeScale['xs']['height'];
            } else {
                // default to xs
                btnScaleX = this.shapeScale['xs']['width'];
                btnScaleY = this.shapeScale['xs']['height'];
            }

            btnSpacingX = btnScaleX / 10;
            btnSpacingY = btnScaleY / 10;

            // set the on load classes
            if (this['on-load']) {
                $(btnElement).addClass(`animated ${this['on-load']}`);
                this['element-events']['isLoadOccuring'] = true;

                setTimeout(() => { 
                    $(btnElement).removeClass(`${this['on-load']}`);
                    // $(btnElement).removeClass('animated');
                    this['element-events']['isLoadOccuring'] = false;
                }, 1000);
            }

            // set btn elem width/height now that child elems have been parsed
            $(btnElement).css({
                height: `${btnScaleY + (btnSpacingY * 2)}px`,
                width: `${btnScaleX + (btnSpacingX * 2)}px`
            });

            let divContainer = document.createElement('div');
            divContainer.setAttribute('class', `${btnPrefix}-wrap`);
            divContainer.style.height = "100%";
            divContainer.style.width = "100%";

            return divContainer;
        }

        private shapeDictionary = {
            'hexagon': this.createHexagon,
            'square': this.createSquare,
            'circle': this.createCircle
        };

        constructor(btnElement: HTMLElement, btnPrefix: string) {
            // parse attribs for object config            
            this.parseBtnAttributes(btnElement, btnPrefix);
            // modify element scale based on inner text
            let childElem = this.parseBtnInnerHtml(btnElement, btnPrefix);

            // build our div wrapper
            let divContainer = this.createDivContainer(btnElement, btnPrefix);
            if (childElem) $(divContainer).append(childElem);

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
    }
    
    // add static styles asap.
    SweetButton.AddStaticStyles();

    // add the sweetButton fn to the global jQuery obj.
    $.fn.sweetButton = function(options = { className: 'sweet-btn' }) {
        // btn prefix
        const btnPrefix = options.className;
        
        // iterate through each button and manipulate
        return this.each(function () {
            let sweetBtn = new SweetButton(this, btnPrefix);
            console.log('sweetBtn: ', sweetBtn);
        });
    }

}( jQuery ));