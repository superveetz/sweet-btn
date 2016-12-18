declare var async: any;

(function ( $ ) {
    class SweetButton {
        private 'href' = '';
        private 'on-load' = '';

        private 'glyph-size' = '';
        private 'glyph-color' = '';
        private 'glyph-classes' = '';
        private 'glyph-click' = '';
        private 'glyph-click-animation-duration' = '';
        private 'glyph-click-animation-delay' = '';
        private 'glyph-mouse-enter' = '';
        private 'glyph-mouse-enter-animation-duration' = '';
        private 'glyph-mouse-enter-animation-delay' = '';
        private 'glyph-mouse-leave' = '';
        private 'glyph-mouse-leave-animation-duration' = '';
        private 'glyph-mouse-leave-animation-delay' = '';

        private 'element-events' = {
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

        private 'shape' = [{
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

        public static shapeDictionary = {
            'hexagon': SweetButton.CreateHexagon,
            'square': SweetButton.CreateSquare,
            'circle': SweetButton.CreateCircle
        };

        public static shapeScale = {
            'xs': 30,
            'sm': 45,
            'md': 60,
            'lg': 75,
            'xl': 90
        };

        private static CreateHexagon (shapeConfig: Object, shapeLayerNum: number) : SVGElement {
            // element size/centering
            const shapeSize:    string  = shapeConfig[`shape-${shapeLayerNum}-size`].length ? shapeConfig[`shape-${shapeLayerNum}-size`] : 'xs';
            const shapeScale:   number  = SweetButton.shapeScale[shapeSize];
            const shapeSpacing: number  = shapeScale / 10;
            const shapeWidth:   number  = shapeScale + (shapeSpacing * 2);
            const shapeHeight:  number  = shapeScale + (shapeSpacing * 2);
            // need to use negative margins here
            const shapeMarginLeft = `${((shapeScale / 2) + shapeSpacing) * -1}`;
            const shapeMarginTop = `${((shapeScale / 2) + shapeSpacing) * -1}`;
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
            
            svgHexagon.setAttribute('viewBox', `0 0 ${shapeScale/2} ${shapeScale/2}`);
            svgHexagon.setAttribute('fill', shapeConfig[`shape-${shapeLayerNum}-background`]);
            svgHexagon.setAttribute('stroke', 'black');
            svgHexagon.setAttribute('stroke-width', `${shapeScale/100}px`);

            // sizing/centering
            svgHexagon.setAttribute('z-index', shapeConfig[`shape-${shapeLayerNum}-zIndex`]);
            svgHexagon.setAttribute('width', `${(shapeScale) + (shapeSpacing*2)}px`);
            svgHexagon.setAttribute('height', `${(shapeScale) + (shapeSpacing*2)}px`);

            svgHexagon.setAttribute('style', `margin-left: ${shapeMarginLeft}px; margin-top: ${shapeMarginTop}px;`);
            
            // create the poly hexagon
            let polyHexagon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            const ptMultiplier = shapeScale /100;
            const polyPts = [
                `${47 * ptMultiplier}`,
                `${37.5 * ptMultiplier} ${25 * ptMultiplier}`,
                `${50 * ptMultiplier} ${3 * ptMultiplier}`,
                `${37.5 * ptMultiplier} ${3 * ptMultiplier}`,
                `${12.5 * ptMultiplier} ${25 * ptMultiplier}`,
                `0 ${47 * ptMultiplier}`,
                `${12.7 * ptMultiplier}`
            ];

            polyHexagon.setAttributeNS(null, 'points', polyPts.join(', '));

            // rect polygon to svg
            svgHexagon.appendChild(polyHexagon);

            return svgHexagon;
        }

        private static CreateCircle (shapeConfig: Object, shapeLayerNum: number) : SVGElement {
            // element size/centering
            const shapeSize:    string  = shapeConfig[`shape-${shapeLayerNum}-size`].length ? shapeConfig[`shape-${shapeLayerNum}-size`] : 'xs';
            const shapeScale:   number  = SweetButton.shapeScale[shapeSize] * 1.14; // adjusting size of circles by 15%
            const shapeSpacing: number  = shapeScale / 10;
            const shapeWidth:   number  = shapeScale + (shapeSpacing * 2);
            const shapeHeight:  number  = shapeScale + (shapeSpacing * 2);
            // need to use negative margins here
            const shapeMarginLeft: number = ((shapeScale / 2) + shapeSpacing) * -1;
            const shapeMarginTop:  number = ((shapeScale / 2) + shapeSpacing) * -1;
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
            
            svgCicle.setAttribute('viewBox', `0 0 ${shapeScale/2} ${shapeScale/2}`);
            svgCicle.setAttribute('fill', shapeConfig[`shape-${shapeLayerNum}-background`]);
            svgCicle.setAttribute('stroke', 'black');
            svgCicle.setAttribute('stroke-width', `${shapeScale/100}px`);

            // sizing/centering
            svgCicle.setAttribute('z-index', shapeConfig[`shape-${shapeLayerNum}-zIndex`]);
            svgCicle.setAttribute('width', `${(shapeScale) + (shapeSpacing*2)}px`);
            svgCicle.setAttribute('height', `${(shapeScale) + (shapeSpacing*2)}px`);

            svgCicle.setAttribute('style', `margin-left: ${shapeMarginLeft}px; margin-top: ${shapeMarginTop}px;`);
            
            // create the square rect
            let polyCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            polyCircle.setAttribute('fill', shapeConfig[`shape-${shapeLayerNum}-background`]);
            const centeringMuliplier = 0.28; 
            polyCircle.setAttribute('cx', `${(shapeScale*centeringMuliplier) - (shapeSpacing*centeringMuliplier)}`);
            polyCircle.setAttribute('cy', `${(shapeScale*centeringMuliplier) - (shapeSpacing*centeringMuliplier)}`);
            polyCircle.setAttribute('r', `${shapeScale / 5}`);

            // rect polygon to svg
            svgCicle.appendChild(polyCircle);

            return svgCicle;
        }
 
        private static CreateSquare (shapeConfig: Object, shapeLayerNum: number) : SVGElement {
            // element size/centering
            const shapeSize:    string  = shapeConfig[`shape-${shapeLayerNum}-size`].length ? shapeConfig[`shape-${shapeLayerNum}-size`] : 'xs';
            const shapeScale:   number  = SweetButton.shapeScale[shapeSize];
            const shapeSpacing: number  = shapeScale / 10;
            const shapeWidth:   number  = shapeScale + (shapeSpacing * 2);
            const shapeHeight:  number  = shapeScale + (shapeSpacing * 2);
            // need to use negative margins here
            const shapeMarginLeft = `${((shapeScale / 2) + shapeSpacing) * -1}`;
            const shapeMarginTop = `${((shapeScale / 2) + shapeSpacing) * -1}`;
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
            
            svgSquare.setAttribute('viewBox', `0 0 ${shapeScale/2} ${shapeScale/2}`);
            svgSquare.setAttribute('fill', shapeConfig[`shape-${shapeLayerNum}-background`]);
            svgSquare.setAttribute('stroke', 'black');
            svgSquare.setAttribute('stroke-width', `${shapeScale/100}px`);

            // sizing/centering
            svgSquare.setAttribute('z-index', shapeConfig[`shape-${shapeLayerNum}-zIndex`]);
            svgSquare.setAttribute('width', `${(shapeScale) + (shapeSpacing*2)}px`);
            svgSquare.setAttribute('height', `${(shapeScale) + (shapeSpacing*2)}px`);

            svgSquare.setAttribute('style', `margin-left: ${shapeMarginLeft}px; margin-top: ${shapeMarginTop}px;`);
            
            // create the square rect
            let polySquare = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            polySquare.setAttribute('width', `${(shapeWidth/2) - (shapeSpacing*2)}`);
            polySquare.setAttribute('height', `${(shapeHeight/2) - (shapeSpacing*2)}`);
            polySquare.setAttribute('x', `${shapeSpacing/2}`);
            polySquare.setAttribute('y', `${shapeSpacing/2}`);

            // rect polygon to svg
            svgSquare.appendChild(polySquare);

            return svgSquare;
        }

        private parseBtnAttributes = (btnElement: Element, btnPrefix: string) : void => {
            const dataPrefix = 'data-';
            const btnAttribs = btnElement.attributes;
            // console.log('btnElement.attributes: ', btnElement.attributes);
            let keyName;
            let hasDataPrefix;
            let hasBtnPrefix;
            let hasNumber;
            let indexOfNum;
            let keyNameOfShape;
            let indexOfShape;

            for(let keyIndex = 0; keyIndex < btnAttribs.length; keyIndex++) {
                // console.log('key: ', keyIndex);
                keyName = btnAttribs[keyIndex].name;

                if (keyName == 'length') continue;

                hasDataPrefix = keyName.indexOf(dataPrefix);
                if (hasDataPrefix != -1) keyName = keyName.substring(dataPrefix.length, keyName.length);

                hasBtnPrefix = keyName.indexOf(btnPrefix);
                if (hasBtnPrefix != -1) keyName = keyName.substring(btnPrefix.length+1, keyName.length);
                // console.log('keyName: ', keyName);
                hasNumber = keyName.match(/\d+/g);
                if (hasNumber) {
                    indexOfShape = parseFloat(hasNumber[0])-1;

                    if (this.shape[indexOfShape][keyName] != undefined) {
                        this.shape[indexOfShape][keyName] = btnAttribs[keyIndex].value;
                        this.shape[indexOfShape][`shape-${indexOfShape+1}-zIndex`] = indexOfShape+1;
                    } else if (this.shape[indexOfShape][keyName] == undefined && hasBtnPrefix != -1) {
                        console.error(keyName, 'is not supported, maximum number of layered shapes is 5.');
                    }
                } else if (this[keyName] != undefined) {
                    this[keyName] = btnAttribs[keyIndex].value;
                } else if (this[keyName] == undefined && hasBtnPrefix != -1) {
                    console.error(keyName, 'is not supported, make sure that you are using the prefix:', btnPrefix, 'for all of your attributes.');
                }

            }
        }

        public static AddStaticStyles(btnPrefix: string = 'sweet-btn') : void {
            const btnStyleSheetId = `${btnPrefix}-styles`;
            const pageHead = document.head || document.getElementsByTagName('head')[0];
            // const validStyleSheet = SweetButton.GetValidStyleSheet();
            let btnStyleSheet = document.createElement('style');
            btnStyleSheet.setAttribute('rel', 'stylesheet');
            btnStyleSheet.setAttribute('media', 'only screen');
            btnStyleSheet.setAttribute('id', btnStyleSheetId);
            btnStyleSheet.setAttribute('type', 'text/css');

            let btnScale;
            let btnSpacing;
            // element styles
            let btnCssText = `          .${btnPrefix} {
                position: relative;
                display: inline-block;
                cursor: pointer;
                -webkit-touch-callout: text;
                user-select: text;
                -webkit-user-select: text;
                -moz-user-select: text;
                -ms-user-select: text;
                -o-user-select: text;
                margin: 2% 2% 0% 2%;
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
            .${btnPrefix} .${btnPrefix}-wrap svg polygon {
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
            
            `;
            
            for(let btnSize in SweetButton.shapeScale) {
                btnScale = SweetButton.shapeScale[btnSize];
                btnSpacing = btnScale / 10;

                btnCssText +=   `.${btnPrefix}-${btnSize} { 
                height: ${btnScale + (btnSpacing * 2)}px;
                width: ${btnScale + (btnSpacing * 2)}px;
            }
            
            `;
            }

            btnStyleSheet.appendChild(document.createTextNode(btnCssText));
            
            //add <stle> elem to the page
            pageHead.appendChild(btnStyleSheet);

        }

        private createShapes = (divContainer: HTMLElement) : void => {
            // console.log('divContainer: ', divContainer);
            let shapeConfig;
            let shapeType;
            let shapeEvents;
            for(let i = 0, j = this.shape.length; i < j; i++) {
                // goto next if no shape type
                if (!this.shape[i][`shape-${i+1}`]) continue;
                shapeConfig = this.shape[i];
                shapeType = shapeConfig[`shape-${i+1}`];
                
                // goto next if shape type is invalid
                if (!SweetButton.shapeDictionary[shapeType]) {
                    console.error(shapeType, 'is not supported, view the documentation for the completelist of shape types.');
                    continue;
                }
                // create layered btn shape
                let svgShape = SweetButton.shapeDictionary[shapeType](shapeConfig, i+1);

                // parse elem for events here
                const defEventAnimationClass:        string = '';
                const defEventAnimationDuration:     number = 1000; // 1s
                const defEventAnimationDelay:        number = 0; // no delay;
                let eventAnimationClass;
                let eventAnimationDuration;
                let eventAnimationDelay;

                if (shapeConfig[`shape-${i+1}-click`]) {
                    let eventItem:                  Object = {};
                    eventAnimationClass         = shapeConfig[`shape-${i+1}-click`];
                    eventAnimationDuration      = shapeConfig[`shape-${i+1}-click-animation-duration`];
                    eventAnimationDelay         = shapeConfig[`shape-${i+1}-click-animation-delay`];

                    eventItem['selector']           = `shape-${i+1}-click-${eventAnimationClass}`;

                    eventItem['animationClass']     = eventAnimationClass       ? eventAnimationClass       : defEventAnimationClass;
                    eventItem['animationDuration']  = eventAnimationDuration    ? eventAnimationDuration    : defEventAnimationDuration;
                    eventItem[`animationDelay`]     = eventAnimationDelay       ? eventAnimationDelay       : defEventAnimationDelay;

                    this['element-events']['click'].push(eventItem);
                }

                if (shapeConfig[`shape-${i+1}-mouse-enter`]) {
                    let eventItem:                  Object = {};
                    eventAnimationClass         = shapeConfig[`shape-${i+1}-mouse-enter`];
                    eventAnimationDuration      = shapeConfig[`shape-${i+1}-mouse-enter-animation-duration`];
                    eventAnimationDelay         = shapeConfig[`shape-${i+1}-mouse-enter-animation-delay`];
                    // console.log('eventAnimationDuration: ', eventAnimationDuration);

                    eventItem['selector']           = `shape-${i+1}-mouse-enter-${eventAnimationClass}`;

                    eventItem['animationClass']     = eventAnimationClass       ? eventAnimationClass       : defEventAnimationClass;
                    eventItem['animationDuration']  = eventAnimationDuration    ? eventAnimationDuration    : defEventAnimationDuration;
                    eventItem[`animationDelay`]     = eventAnimationDelay       ? eventAnimationDelay       : defEventAnimationDelay;

                    this['element-events']['mouse-enter'].push(eventItem);
                }

                if (shapeConfig[`shape-${i+1}-mouse-leave`]) {
                    let eventItem:                  Object = {};
                    eventAnimationClass         = shapeConfig[`shape-${i+1}-mouse-leave`];
                    eventAnimationDuration      = shapeConfig[`shape-${i+1}-mouse-leave-animation-duration`];
                    eventAnimationDelay         = shapeConfig[`shape-${i+1}-mouse-leave-animation-delay`];

                    eventItem['selector']           = `shape-${i+1}-mouse-leave-${eventAnimationClass}`;

                    eventItem['animationClass']     = eventAnimationClass    ? eventAnimationClass      : defEventAnimationClass;
                    eventItem['animationDuration']  = eventAnimationDuration ? eventAnimationDuration   : defEventAnimationDuration;
                    eventItem[`animationDelay`]     = eventAnimationDelay    ? eventAnimationDelay      : defEventAnimationDelay;

                    this['element-events']['mouse-leave'].push(eventItem);
                }

                divContainer.insertAdjacentElement('beforeend', svgShape);
            }
        }

        private createGlyphIcon = (divContainer: HTMLElement) : void => {
            if (this['glyph-classes']) {
                let iconGlyph = document.createElement('i');

                // customize
                iconGlyph.className = this['glyph-classes'];
                const glyphSize = this['glyph-size'].length ? this['glyph-size'] : 'xs';
                const glyphScale = SweetButton.shapeScale[glyphSize];
                const glyphSpacing = glyphScale / 10;

                // centering
                let widthMultiplier = -7/19.25; // 75x - 7.5x = -24
                let heightMultiplier = -7/26; // 75y - 7.5y = -20
                iconGlyph.style.marginLeft = `${(widthMultiplier*glyphScale) - (widthMultiplier*glyphSpacing)}px`;
                iconGlyph.style.marginTop = `${(heightMultiplier*glyphScale) - (heightMultiplier*glyphSpacing)}px`;

                // font
                iconGlyph.style.fontSize = `${glyphScale/2}px`;
                iconGlyph.style.lineHeight = `${glyphScale/2}px`;
                iconGlyph.style.color = this['glyph-color'];

                // parse elem for events here
                const defEventAnimationClass:        string = '';
                const defEventAnimationDuration:     number = 1000; // 1s
                const defEventAnimationDelay:        number = 0; // no delay;
                let eventAnimationClass;
                let eventAnimationDuration;
                let eventAnimationDelay;

                if (this['glyph-click']) {
                    let eventItem:                  Object = {};
                    eventAnimationClass         = this[`glyph-click`];
                    eventAnimationDuration      = this[`glyph-click-animation-duration`];
                    eventAnimationDelay         = this[`glyph-click-animation-delay`];

                    eventItem['selector']           = `glyph-click-${eventAnimationClass}`;
                    iconGlyph.className             += ` ${eventItem['selector']}`; 

                    eventItem['animationClass']     = eventAnimationClass       ? eventAnimationClass       : defEventAnimationClass;
                    eventItem['animationDuration']  = eventAnimationDuration    ? eventAnimationDuration    : defEventAnimationDuration;
                    eventItem[`animationDelay`]     = eventAnimationDelay       ? eventAnimationDelay       : defEventAnimationDelay;
                    // console.log('eventItem: ', eventItem);
                    this['element-events']['click'].push(eventItem);
                }

                if (this[`glyph-mouse-enter`]) {
                    let eventItem:                  Object = {};
                    eventAnimationClass         = this[`glyph-mouse-enter`];
                    eventAnimationDuration      = this[`glyph-mouse-enter-animation-duration`];
                    eventAnimationDelay         = this[`glyph-mouse-enter-animation-delay`];

                    eventItem['selector']           = `glyph-mouse-enter-${eventAnimationClass}`;
                    iconGlyph.className             += ` ${eventItem['selector']}`;

                    eventItem['animationClass']     = eventAnimationClass       ? eventAnimationClass       : defEventAnimationClass;
                    eventItem['animationDuration']  = eventAnimationDuration    ? eventAnimationDuration    : defEventAnimationDuration;
                    eventItem[`animationDelay`]     = eventAnimationDelay       ? eventAnimationDelay       : defEventAnimationDelay;

                    this['element-events']['mouse-enter'].push(eventItem);
                }

                if (this[`glyph-mouse-leave`]) {
                    let eventItem:                  Object = {};
                    eventAnimationClass         = this[`glyph-mouse-leave`];
                    eventAnimationDuration      = this[`glyph-mouse-leave-animation-duration`];
                    eventAnimationDelay         = this[`glyph-mouse-leave-animation-delay`];

                    eventItem['selector']           = `glyph-mouse-leave-${eventAnimationClass}`;
                    iconGlyph.className             += ` ${eventItem['selector']}`;

                    eventItem['animationClass']     = eventAnimationClass    ? eventAnimationClass      : defEventAnimationClass;
                    eventItem['animationDuration']  = eventAnimationDuration ? eventAnimationDuration   : defEventAnimationDuration;
                    eventItem[`animationDelay`]     = eventAnimationDelay    ? eventAnimationDelay      : defEventAnimationDelay;

                    this['element-events']['mouse-leave'].push(eventItem);
                }

                // append icon to divContainer
                divContainer.appendChild(iconGlyph);
            }
        }

        private static HandleMouseEnterEvent = (divContainer: HTMLElement, elementEvents: Object) : EventListenerOrEventListenerObject => {
            
            return () => {
                // console.log('mouse enter');
                // don't start even if these are happening
                if (elementEvents['isMouseEnterOccuring'] ||
                    elementEvents['isClickOccuring']) return false;
                
                const cancelMouseLeave  = elementEvents['isMouseLeaveOccuring'];

                elementEvents['isMouseEnterOccuring'] = true;

                let selectedElement;

                async.each(elementEvents['mouse-enter'], (mouseEnterEvent, mouseEnterEventCB) => {

                    async.waterfall([
                        (seriesCB) => {
                            selectedElement = $(divContainer).find(`.${mouseEnterEvent.selector}`);
                            if (cancelMouseLeave) {
                                SweetButton.RemoveEventAnimationClasses(divContainer, elementEvents, [
                                    'mouse-leave'
                                ]);
                            }
                            // add css
                            selectedElement.css({
                                'webkit-animation-duration': `${mouseEnterEvent.animationDuration}ms`,
                                'animation-duration': `${mouseEnterEvent.animationDuration}ms`
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

                                if (selectedElement.hasClass(`${mouseEnterEvent.animationClass}`)) {
                                    selectedElement.removeClass(`${mouseEnterEvent.animationClass}`);

                                    selectedElement.css({
                                        'webkit-animation-duration': ``,
                                        'animation-duration': ``
                                    });
                                }

                                return seriesCB(null, selectedElement);

                            }, mouseEnterEvent.animationDuration);
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
                // console.log('mouse leave');
                // don't start even if these are happening
                if (elementEvents['isMouseLeaveOccuring'] ||
                    elementEvents['isClickOccuring']) return false;
                
                const cancelMouseEnter = elementEvents['isMouseEnterOccuring'];

                elementEvents['isMouseLeaveOccuring'] = true;

                let selectedElement;

                async.each(elementEvents['mouse-leave'], (mouseLeave, mouseLeaveCB) => {

                    async.waterfall([
                        (seriesCB) => {
                            selectedElement = $(divContainer).find(`.${mouseLeave.selector}`);
                            if (cancelMouseEnter) {
                                SweetButton.RemoveEventAnimationClasses(divContainer, elementEvents, [
                                    'mouse-enter'
                                ]);
                            }
                            // add css
                            selectedElement.css({
                                'webkit-animation-duration': `${mouseLeave.animationDuration}ms`,
                                'animation-duration': `${mouseLeave.animationDuration}ms`
                            });

                            return seriesCB(null, selectedElement);
                        },
                        (selectedElement, seriesCB) => {
                            // apply animation delay and then add class
                            setTimeout(() => {
                                // console.log('adding classes');
                                selectedElement.addClass(`${mouseLeave.animationClass}`);

                                return seriesCB(null, selectedElement);

                            }, mouseLeave.animationDelay);
                        },
                        (selectedElement, seriesCB) => {
                            // remove classes  & css after animation has completed
                            setTimeout(() => {

                                if (selectedElement.hasClass(`${mouseLeave.animationClass}`)) {
                                    selectedElement.removeClass(`${mouseLeave.animationClass}`);

                                    selectedElement.css({
                                        'webkit-animation-duration': ``,
                                        'animation-duration': ``
                                    });
                                }

                                return seriesCB(null, selectedElement);

                            }, mouseLeave.animationDuration);
                        }
                    ], mouseLeaveCB);
                }, (err) => {
                    if (err) console.debug('err:', err);
                    
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
                                'mouse-leave'
                            ]);
                            // add css
                            selectedElement.css({
                                'webkit-animation-duration': `${clickEvent.animationDuration}ms`,
                                'animation-duration': `${clickEvent.animationDuration}ms`
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

                                selectedElement.css({
                                    'webkit-animation-duration': ``,
                                    'animation-duration': ``
                                });

                                return seriesCB(null, selectedElement);

                            }, clickEvent.animationDuration);
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
                                'webkit-animation-duration': ``,
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
                                'webkit-animation-duration': `${event.animationDuration}ms`,
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

            divContainer.addEventListener('load', () => {
                console.log('loaded');
            });
            
        }

        constructor(btnElement: HTMLElement, btnPrefix: string) {
            // parse attribs for object config            
            this.parseBtnAttributes(btnElement, btnPrefix);

            // build our div wrapper
            let divContainer = document.createElement('div');
            divContainer.setAttribute('class', `${btnPrefix}-wrap`);
            divContainer.style.height = "100%";
            divContainer.style.width = "100%";

            if (this['on-load']) {
                divContainer.className += ` ${this['on-load']}`;
            }

            // create the shape elements
            this.createShapes(divContainer);

            // create the glyph icon
            this.createGlyphIcon(divContainer);

            // create the events
            this.createEvents(divContainer);

            btnElement.insertAdjacentElement('beforeend', divContainer);
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
        });
    }

}( jQuery ));