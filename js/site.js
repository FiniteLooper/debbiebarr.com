(()=>{const h=document.querySelector("body"),$=document.querySelector("#header"),L=document.querySelector("#toggle-sidebar"),S=document.querySelector("#sidebar"),v=document.querySelector("#close-sidebar"),y=Array.from(document.querySelectorAll("#sidebar a, #sidebar button")),g=document.querySelector("#sidebar-backdrop"),k=document.querySelectorAll("#book-details-content .sub-navigation a"),d=location.pathname.toLowerCase().trim();y.forEach(e=>e.tabIndex=-1);let o=!1;function u(){h.classList.toggle("sidebar-open",o),o?S.focus():document.activeElement.blur(),y.forEach(e=>e.tabIndex=o?0:-1)}function b(e){e.preventDefault(),o=!1,u()}if(document.body.addEventListener("keyup",e=>{o&&e.key==="Escape"&&(o=!1,u())},!1),L.addEventListener("click",e=>{e.preventDefault(),o=!o,u()},!1),v.addEventListener("click",b,!1),g.addEventListener("click",b,!1),g.addEventListener("touchstart",b,!1),!d.includes("books-for-caregivers")&&/\/books\/.+$/i.test(d)){const m=document.querySelector("#book-details-wrapper"),t=document.querySelector("#book-details-titles"),f=document.querySelector("#book-details-links"),a=()=>{const r=300-(parseInt(getComputedStyle(m).paddingTop,10)+t.offsetHeight);f.style.marginTop=`${r}px`};let n=null;window.addEventListener("resize",()=>{clearTimeout(n),n=setTimeout(a,250)}),a(),k.forEach(c=>{c.addEventListener("click",i=>{i.preventDefault(),k.forEach(r=>{r.classList.remove("current"),document.querySelector(r.getAttribute("href")).classList.add("d-none")}),c.classList.add("current"),document.querySelector(c.getAttribute("href")).classList.remove("d-none")})})}if(d.includes("/contact")){const e=document.querySelector("#contact-form"),m=e.querySelectorAll("input,textarea"),t=document.querySelector("#form-status"),f="text-success",a="text-danger",n="Thanks! I'll be in contact with you soon!",c="Oops! There was a problem submitting your message, try again later!";e.addEventListener("submit",async function(s){if(s.preventDefault(),s.stopPropagation(),e.classList.add("was-validated"),e.checkValidity()){const E=new FormData(s.target);fetch(s.target.action,{method:e.method,body:E,headers:{Accept:"application/json"}}).then(l=>{l.ok?i():l.json().then(p=>{Object.hasOwn(p,"errors")?(t.classList.add(a),t.innerHTML=p.errors.map(q=>q.message).join(", ")):r(p)})}).catch(l=>r(l))}});const i=()=>{t.innerHTML=n,t.classList.remove(a),t.classList.add(f),m.forEach(s=>{s.setAttribute("readonly",""),s.classList.add("is-valid")}),e.querySelector("button").disabled=!0},r=s=>{t.classList.add(a),t.innerHTML=c,console.error(s)}}})();
