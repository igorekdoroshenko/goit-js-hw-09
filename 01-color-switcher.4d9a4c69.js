const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");let n=null;function o(){const t=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;document.body.style.backgroundColor=t}t.addEventListener("click",(function(){n||(t.disabled=!0,n=setInterval(o,1e3))})),e.addEventListener("click",(function(){n&&(clearInterval(n),n=null,t.disabled=!1)}));
//# sourceMappingURL=01-color-switcher.4d9a4c69.js.map