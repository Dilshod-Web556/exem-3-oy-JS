document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const loader = document.getElementById("loader");
    const searchInput = document.getElementById("search");
    const categoryFilter = document.getElementById("category-filter");
    const sortPrice = document.getElementById("sort-price");

    let products = [];

   
    async function fetchProducts() {
        loader.style.display = "block";
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            products = await response.json();
            displayProducts(products);
            populateCategories(products);
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
        } finally {
            loader.style.display = "none";
        }
    }

 
    function displayProducts(items) {
        productList.innerHTML = "";
        items.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product");
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.category}</p>
                <p>${product.price} ₽</p>
            `;
            productList.appendChild(productCard);
        });
    }

  
    function populateCategories(items) {
        const categories = [...new Set(items.map(item => item.category))];
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

   
    categoryFilter.addEventListener("change", () => {
        const selectedCategory = categoryFilter.value;
        const filteredProducts = selectedCategory === "all" ? products : products.filter(product => product.category === selectedCategory);
        displayProducts(filteredProducts);
    });

  
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product => product.title.toLowerCase().includes(query));
        displayProducts(filteredProducts);
    });


    sortPrice.addEventListener("change", () => {
        const sortedProducts = [...products];
        if (sortPrice.value === "asc") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else {
            sortedProducts.sort((a, b) => b.price - a.price);
        }
        displayProducts(sortedProducts);
    });

    fetchProducts();
});
