!function(){var e="api_key=live_gMvLfc5Q1BBvM4bZ9764sbQq3tGdsdgN4rwcVPRHY1cX9R2iiV8TOUldepTICVtM";var t;document.querySelector(".breed-select"),document.querySelector(".cat-info");(t="beng",fetch("".concat("https://api.thecatapi.com/v1/images/search","?breed_ids=").concat(t,"&").concat(e)).then((function(e){if(!e.ok)throw new Error(e.status);return e.json()}))).then((function(e){return console.dir(e[0].breeds[0].temperament)}))}();
//# sourceMappingURL=index.7c134123.js.map
