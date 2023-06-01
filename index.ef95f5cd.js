document.querySelector(".breed-select"),document.querySelector(".cat-info");var e;(e="beng",fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${e}&api_key=live_gMvLfc5Q1BBvM4bZ9764sbQq3tGdsdgN4rwcVPRHY1cX9R2iiV8TOUldepTICVtM`).then((e=>{if(!e.ok)throw new Error(e.status);return e.json()}))).then((e=>console.dir(e[0].breeds[0].temperament)));
//# sourceMappingURL=index.ef95f5cd.js.map
