!function(){var e=function(e,t){var n=document.createElement("canvas");"undefined"!=typeof G_vmlCanvasManager&&G_vmlCanvasManager.initElement(n);var i=n.getContext("2d");if(n.width=n.height=t.size,e.appendChild(n),window.devicePixelRatio>1){var a=window.devicePixelRatio;n.style.width=n.style.height=[t.size,"px"].join(""),n.width=n.height=t.size*a,i.scale(a,a)}i.translate(t.size/2,t.size/2),i.rotate((t.rotate/180-.5)*Math.PI);var o=(t.size-t.lineWidth)/2;t.scaleColor&&t.scaleLength&&(o-=t.scaleLength+2);var r=function(e,t,n){n=Math.min(Math.max(0,n||1),1),i.beginPath(),i.arc(0,0,o,0,2*Math.PI*n,!1),i.strokeStyle=e,i.lineWidth=t,i.stroke()};Date.now=Date.now||function(){return+new Date};var s=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};this.clear=function(){i.clearRect(t.size/-2,t.size/-2,t.size,t.size)},this.draw=function(e){var n;this.clear(),t.scaleColor&&function(){var e,n,a=24;i.lineWidth=1,i.fillStyle=t.scaleColor,i.save();for(a=24;a>=0;--a)0==a%6?(n=t.scaleLength,e=0):(n=.6*t.scaleLength,e=t.scaleLength-n),i.fillRect(-t.size/2+e,0,n,1),i.rotate(Math.PI/12);i.restore()}(),t.trackColor&&r(t.trackColor,t.lineWidth),i.lineCap=t.lineCap,n="function"==typeof t.barColor?t.barColor(e):t.barColor,e>0&&r(n,t.lineWidth,e/100)}.bind(this),this.animate=function(e,n){var i=Date.now();t.onStart(e,n);var a=function(){var o=Math.min(Date.now()-i,t.animate),r=t.easing(this,o,e,n-e,t.animate);this.draw(r),t.onStep(e,n,r),o>=t.animate?t.onStop(e,n):s(a)}.bind(this);s(a)}.bind(this)};window.EasyPieChart=function(t,n){var i,a={barColor:"#ef1e25",trackColor:"#f9f9f9",scaleColor:"#dfe0e0",scaleLength:5,lineCap:"round",lineWidth:3,size:110,rotate:0,animate:1e3,renderer:e,easing:function(e,t,n,i,a){return(t/=a/2)<1?i/2*t*t+n:-i/2*(--t*(t-2)-1)+n},onStart:function(){},onStep:function(){},onStop:function(){}},o={},r=0,s=function(){this.el=t,this.options=o;for(var e in a)a.hasOwnProperty(e)&&(o[e]=n&&void 0!==n[e]?n[e]:a[e],"function"==typeof o[e]&&(o[e]=o[e].bind(this)));o.easing="string"==typeof o.easing&&"undefined"!=typeof jQuery&&jQuery.isFunction(jQuery.easing[o.easing])?jQuery.easing[o.easing]:a.easing,(i=new o.renderer(t,o)).draw(r),t.dataset&&t.dataset.percent&&this.update(parseInt(t.dataset.percent,10))}.bind(this);this.update=function(e){return e=parseInt(e,10),o.animate?i.animate(r,e):i.draw(e),r=e,this}.bind(this),s()}}();var options={scaleColor:!1,trackColor:"rgba(255,255,255,0.3)",barColor:"#E7F7F5",lineWidth:6,lineCap:"butt",size:95};window.addEventListener("DOMContentLoaded",function(){var e=[];[].forEach.call(document.querySelectorAll(".chart"),function(t){e.push(new EasyPieChart(t,options))})});