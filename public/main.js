async function load() {
    const response = await fetch("products/data.json");
    const data = await response.json();
    data.forEach(product => {
        const article = `
            <div class="card">
                <div class="card__imagewrapper">
                    <img src="${product.image}">
                </div>
                <div class="card__content">
                    <h2 class="card__title">${product.title}</h2>
                    <p class="card__text">${product.description}</p>
                    <p class="card__price">€ ${product.price}</p>
                </div>    
            </div>
        `;
        document.querySelector("#products").innerHTML += article;
    });
}

window.onload = load;