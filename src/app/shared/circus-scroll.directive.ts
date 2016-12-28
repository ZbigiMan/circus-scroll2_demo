// Circus Scroll 2
// December 2016
// Author: Zbigi Man Zbigniew Stepniewski, www.zbigiman.com, github.com/zbigiman

import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';

@Directive({
    selector: '[circus-scroll]'
})

export class CircusScrollDirective {

    @Input('csTweenBegin') begin;
    @Input('csTweenEnd') end;
    @Input('csTweenFrom') from;
    @Input('csTweenTo') to;
    @Input('csTweenEasing') easing;
    @Input('csTweenOnBegin') OnBegin;
    @Input('csTweenOnEnd') OnEnd;
    @Input('csTweenOnReverseBegin') OnReverseBegin;
    @Input('csTweenOnReverseEnd') OnReverseEnd;
    @Input('csTweenOnProgress') onProgress;


    private el;
    private tag;
    private beginParsed;
    private endParsed;
    private started = 0;
    private completed = 0;
    private revStarted = 0;
    private revCompleted = 0;

    private errors = {
        'error': "Circus Scroll Settings Error.",
        'formToDontMatch': "csTweenFrom and csTweenTo values don't match.",
        'beginEndDontMatch': "csTweenBegin and csTweenEnd values don't match."
    };


    constructor(elementRef: ElementRef, private renderer: Renderer) {
        this.el = elementRef;
        this.tag = this.el.nativeElement.tagName;

        console.log(this.tag);

    }



    @HostListener('click', ['$event']) private onClick(event: Event) {
        if(this.tag == 'A'){
           console.log(this.el.nativeElement.href); 
        }              
    }



    @HostListener("window:scroll", []) private onscroll(el) {

        if (this.begin !== undefined) {

            if (this.end === undefined) {
                this.end = this.begin;
            }

            //Parse 'begin' and end 'values'   

            let vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
                beginVal = parseInt(this.begin),
                endVal = parseInt(this.end),
                beginUnit = this.begin.toString().split(beginVal).join(''),
                endUnit = this.end.toString().split(endVal).join('');

            if (beginUnit !== endUnit) {
                console.error(this.errors.error);
                console.error(this.errors.beginEndDontMatch);
                console.error(this.el);
                return;
            }

            if (beginUnit == 'vh' && endUnit == 'vh') {
                this.beginParsed = (beginVal / 100) * vh;
                this.endParsed = (endVal / 100) * vh;
            } else if (beginUnit == 'ovh' && endUnit == 'ovh') {
                if (this.el.nativeElement.offsetTop > vh) {
                    this.beginParsed = ((beginVal / 100) * vh) + this.el.nativeElement.offsetTop - vh;
                    this.endParsed = ((endVal / 100) * vh) + this.el.nativeElement.offsetTop - vh;
                } else {
                    this.beginParsed = (beginVal / 100) * vh;
                    this.endParsed = (endVal / 100) * vh;
                }

            } else {
                this.beginParsed = beginVal;
                this.endParsed = endVal;
            }


            let scrollTop = window.scrollY,
                p = (scrollTop - this.beginParsed) / (this.endParsed - this.beginParsed); //progress        

            if (p < 1) {
                if (this.completed > 0) {
                    this.revStarted++;
                }
                this.completed = 0;
            }

            if (p >= 1) {
                this.completed++;
                this.revStarted = 0;
            }

            if (p <= 0) {
                if (this.started > 0) {
                    this.revCompleted++;
                }
                this.started = 0;
            }

            if (p > 0) {
                this.started++;
                this.revCompleted = 0;
            }

            let that = this;

            //Tween function     

            if (this.to !== undefined && this.from !== undefined) {

                //Checking 'from' and 'to' objects length 

                if (Object.keys(this.from).length != Object.keys(this.to).length) {
                    console.error(this.errors.error);
                    console.error(this.errors.formToDontMatch);
                    console.error(this.el);
                    return;
                }

                //            

                Object.keys(this.to).forEach(function (prop, i) {

                    //Checking if 'from' and 'to' property match

                    if (prop != Object.keys(that.from)[i]) {
                        console.error(this.errors.error);
                        console.error(this.errors.formToDontMatch);
                        console.error(this.el);
                        return;
                    }

                    //Easing function parameters

                    let value = that.to[prop];

                    let e = that.parseValue(value), //End
                        b = that.parseValue(that.from[prop]), //Begin;
                        c = e - b, //Change
                        d = that.endParsed - that.beginParsed, //Duration
                        t = p * d, //Time,
                        unit = false; //px for example

                    if (that.completed == 1) {
                        t = d;
                    }

                    if (that.revCompleted == 1) {
                        t = 0;
                    }

                    if (e != value) {
                        unit = value.split(e).join('');
                    } else {
                        unit = false;
                    }

                    if (t >= 0 && t <= d) {

                        //Checking 'easing'       

                        if (that.Easing[that.easing] === undefined) {
                            that.easing = 'easeOutQuad';
                        }

                        //                    

                        let newIntVal = that.Easing[that.easing](null, t, b, c, d),
                            newVal;

                        if (unit !== false) {
                            newVal = newIntVal + unit;
                        } else {
                            newVal = newIntVal;
                        }

                        that.el.nativeElement.style[prop] = newVal;

                    }
                });
            }

            //Callbacks

            //OnBegin

            if (this.started == 1) {
                this.addClass(that.el.nativeElement, 'csTweenOnBegin');
                if (this.OnBegin !== undefined) {
                    this.OnBegin(this.el);
                }
            }

            //OnEnd

            if (this.completed == 1) {
                p = 1;
                this.addClass(that.el.nativeElement, 'csTweenOnEnd');
                if (this.OnEnd !== undefined) {
                    this.OnEnd(this.el);
                }
            }

            //OnReverseBegin

            if (this.revStarted == 1) {
                this.removeClass(that.el.nativeElement, 'csTweenOnEnd');
                if (this.OnReverseBegin !== undefined) {
                    this.OnReverseBegin(this.el);
                }
                this.revStarted++;
            }

            //onReverseEnd

            if (this.revCompleted == 1) {
                p = 0;
                this.removeClass(that.el.nativeElement, 'csTweenOnBegin');
                if (this.OnReverseEnd !== undefined) {
                    this.OnReverseEnd(this.el);
                }
                this.revCompleted++;
            }


            //onProgress

            if (p >= 0 && p <= 1) {
                if (this.onProgress !== undefined) {
                    this.onProgress(this.el, p);
                }
            }
        }
    }

    parseValue(val) {
        if (val.indexOf(".") > 0) {
            return parseFloat(val);
        } else {
            return parseInt(val);
        }
    };

    //addClass and removeClass methods

    //Thanks to: http://jaketrent.com/post/addremove-classes-raw-javascript/

    hasClass(el, className) {
        if (el.classList)
            return el.classList.contains(className)
        else
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
    }

    addClass(el, className) {
        if (el.classList)
            el.classList.add(className)
        else if (!this.hasClass(el, className)) el.className += " " + className
    }

    removeClass(el, className) {
        if (el.classList)
            el.classList.remove(className)
        else if (this.hasClass(el, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
            el.className = el.className.replace(reg, ' ')
        }
    }

    //

    //    Easing

    /*
     * This is based on jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/ by George McGinley Smith
     * His license is provided below.
    */

    /*
     * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
     *
     * Uses the built in easing capabilities added In jQuery 1.1
     * to offer multiple easing options
     *
     * TERMS OF USE - jQuery Easing
     *
     * Open source under the BSD License.
     *
     * Copyright 2008 George McGinley Smith
     * All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without modification,
     * are permitted provided that the following conditions are met:
     *
     * Redistributions of source code must retain the above copyright notice, this list of
     * conditions and the following disclaimer.
     * Redistributions in binary form must reproduce the above copyright notice, this list
     * of conditions and the following disclaimer in the documentation and/or other materials
     * provided with the distribution.
     *
     * Neither the name of the author nor the names of contributors may be used to endorse
     * or promote products derived from this software without specific prior written permission.
     *
     * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
     * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
     * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
     * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
     * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
     * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
     * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
     * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
     * OF THE POSSIBILITY OF SUCH DAMAGE.
     *
     */

    // t: current time, b: begInnIng value, c: change In value, d: duration

    public Easing = {
        def: 'easeOutQuad',
        linear: function (x, t, b, c, d) {
            return c * t / d + b;
        },
        swing: function (x, t, b, c, d) {
            return this[this.def](x, t, b, c, d);
        },
        easeInQuad: function (x, t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOutQuad: function (x, t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOutQuad: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },
        easeInCubic: function (x, t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOutCubic: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        },
        easeInQuart: function (x, t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        easeOutQuart: function (x, t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOutQuart: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        },
        easeInQuint: function (x, t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOutQuint: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOutQuint: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        },
        easeInSine: function (x, t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOutSine: function (x, t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOutSine: function (x, t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },
        easeInExpo: function (x, t, b, c, d) {
            return (t === 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeOutExpo: function (x, t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeInOutExpo: function (x, t, b, c, d) {
            if (t === 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        easeInCirc: function (x, t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOutCirc: function (x, t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOutCirc: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        },
        easeInElastic: function (x, t, b, c, d) {
            var s = 1.70158; var p = 0; var a = c;
            if (t === 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * 0.3;
            if (a < Math.abs(c)) { a = c; s = p / 4; }
            else s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOutElastic: function (x, t, b, c, d) {
            var s = 1.70158; var p = 0; var a = c;
            if (t === 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * 0.3;
            if (a < Math.abs(c)) { a = c; s = p / 4; }
            else s = p / (2 * Math.PI) * Math.asin(c / a);
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        },
        easeInOutElastic: function (x, t, b, c, d) {
            var s = 1.70158; var p = 0; var a = c;
            if (t === 0) return b; if ((t /= d / 2) == 2) return b + c; if (!p) p = d * (0.3 * 1.5);
            if (a < Math.abs(c)) { a = c; s = p / 4; }
            else s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1) return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
        },
        easeInBack: function (x, t, b, c, d, s) {
            if (s === undefined) s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOutBack: function (x, t, b, c, d, s) {
            if (s === undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOutBack: function (x, t, b, c, d, s) {
            if (s === undefined) s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        },
        easeInBounce: function (x, t, b, c, d) {
            return c - this.easeOutBounce(x, d - t, 0, c, d) + b;
        },
        easeOutBounce: function (x, t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
            }
        },
        easeInOutBounce: function (x, t, b, c, d) {
            if (t < d / 2) return this.easeInBounce(x, t * 2, 0, c, d) * 0.5 + b;
            return this.easeOutBounce(x, t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
        }
    }

    /*
     *
     * TERMS OF USE - EASING EQUATIONS
     *
     * Open source under the BSD License.
     *
     * Copyright 2001 Robert Penner
     * All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without modification,
     * are permitted provided that the following conditions are met:
     *
     * Redistributions of source code must retain the above copyright notice, this list of
     * conditions and the following disclaimer.
     * Redistributions in binary form must reproduce the above copyright notice, this list
     * of conditions and the following disclaimer in the documentation and/or other materials
     * provided with the distribution.
     *
     * Neither the name of the author nor the names of contributors may be used to endorse
     * or promote products derived from this software without specific prior written permission.
     *
     * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
     * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
     * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
     * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
     * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
     * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
     * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
     * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
     * OF THE POSSIBILITY OF SUCH DAMAGE.
     *
     */
}
