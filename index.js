import{i as u,S as f}from"./assets/vendor-5ObWk2rO.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const m=document.querySelector(".feedback-form"),d=document.querySelector(".gallery");document.querySelector(".but-sub");const h="47413156-c8c9abea8f6d88937b7892740";let s,c;m.addEventListener("submit",g);function g(o){o.preventDefault(),s=o.currentTarget.elements.photo.value.trim(),console.log(o.currentTarget.elements.photo.value),p(`${s}`)}function p(o=""){if(o===""){u.show({color:"red",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});return}const a=new URLSearchParams({key:h,q:`${s}`,image_type:"photo",orientation:"horizontal",safesearch:"true"});fetch(`https://pixabay.com/api/?${a}`).then(t=>{if(!t.ok)throw new Error(t.statusText);return t.json()}).then(t=>{c=t.hits.length,console.log(t.hits),console.log(c),d.insertAdjacentHTML("afterbegin",n(t.hits))}).catch(t=>{console.log(t)});function n(t){return t.map(({id:e,webformatURL:r,largeImageURL:i,tags:l,likes:y,views:b,comments:L,downloads:S})=>`<li data-id="${e}" class="gallery-item">
    <a href=${i} class="gallery-link" ><img src=${r} class="gallery-image" alt=${l}></a> </li>`).join("")}}new f(".gallery a",{captionDelay:250,captionsData:"alt"});
//# sourceMappingURL=index.js.map