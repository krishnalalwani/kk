// 1. Plant Data Base (Knowledge, Price, Category, Images)
const plants = [
    {
        id: 1,
        name: "Snake Plant",
        category: "indoor",
        price: 399,
        petFriendly: false,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQda94ajRLcsOxPEQ-Xplu10vZBkpipOPCbXCkkx2O-TQ&s=10",
        desc: "Great air purifier, requires very little water and indirect light.",
        water: "Every 2 weeks",
        light: "Indirect Light"
    },
    {
        id: 2,
        name: "Peace Lily",
        category: "indoor",
        price: 499,
        petFriendly: false,
        image: "https://radhakrishnaagriculture.in/cdn/shop/files/peacelily..jpg?v=1709184309&width=1946",
        desc: "Known for elegant white flowers and humidity-loving nature.",
        water: "Once a week",
        light: "Low to Medium"
    },
    {
        id: 3,
        name: "Areca Palm",
        category: "outdoor",
        price: 799,
        petFriendly: true,
        image: "https://masonhome.in/cdn/shop/files/ChatGPT_Image_Jul_21_2026_03_56_47_PM.png?v=1784629999",
        desc: "Lush tropical palm that adds a vibrant feel to balconies and gardens.",
        water: "Twice a week",
        light: "Bright Sunlight"
    },
    {
        id: 4,
        name: "Spider Plant",
        category: "indoor",
        price: 299,
        petFriendly: true,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStKkMV39UFI5R7CAFzXMR0_LxC0MUwReEOqBQC5a1mag&s=10",
        desc: "Extremely resilient plant, safe for pets and produces baby plantlets.",
        water: "Once a week",
        light: "Indirect Light"
    },
    {
        id: 5,
        name: "Money Plant (Pothos)",
        category: "indoor",
        price: 249,
        petFriendly: true,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxHnp8TAlLXDvHeQOWcUr-xgGZPvsSJ74YmNfJ8fIpuGLPdPPionBSuos&s=10",
        desc: "Classic indoor climber, brings good luck and thrives in water or soil.",
        water: "Every 7-10 days",
        light: "Low to Bright"
    },
    {
        id: 6,
        name: "Rose Bush",
        category: "outdoor",
        price: 599,
        petFriendly: false,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl_3nv8M2-15LzLKsmEuTVpXxz4qEdcrCJOv5W1rnQSQ&s=10",
        desc: "Beautiful flowering garden plant that blooms stunning fragrant roses.",
        water: "Daily in summer",
        light: "Full Sunlight"
    },
    {
        id: 7,
        name: "Boston Fern",
        category: "pet",
        price: 450,
        petFriendly: true,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb2aZy5hlOXCUo0XBTcty4ERGfzkYxtIu4KDcwCzDi3A&s=10",
        desc: "Fluffy fronds that are completely non-toxic and safe for cats & dogs.",
        water: "Keep soil moist",
        light: "Indirect Light"
    },
    {
        id: 8,
        name: "Hibiscus",
        category: "outdoor",
        price: 350,
        petFriendly: true,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGLAVwrpbqtfXVR55PvicatQg7Z7nw544_ZrzoIkIbQg&s=10",
        desc: "Tropical shrub featuring large, gorgeous, colorful blooms.",
        water: "Regular watering",
        light: "Full Sunlight"
    }
];

let currentCategory = 'all';
let cart = [];

// 2. Display Plants in Grid
function displayPlants(plantsToDisplay) {
    const grid = document.getElementById('plantGrid');
    grid.innerHTML = '';

    if (plantsToDisplay.length === 0) {
        grid.innerHTML = `<div class="no-results"><i class="fa-solid fa-face-frown"></i> No plants found matching your criteria.</div>`;
        return;
    }

    plantsToDisplay.forEach(plant => {
        const card = document.createElement('div');
        card.className = 'plant-card';
        card.innerHTML = `
            <div class="plant-img-container">
                <img src="${plant.image}" alt="${plant.name}">
                <span class="plant-badge">${plant.category.toUpperCase()}</span>
            </div>
            <div class="plant-info">
                <h3 class="plant-name">${plant.name}</h3>
                <div class="plant-price">₹${plant.price}</div>
                <p class="plant-desc">${plant.desc}</p>
                
                <!-- Plant Knowledge Specs -->
                <div class="plant-specs">
                    <span class="spec-item"><i class="fa-solid fa-droplet"></i> ${plant.water}</span>
                    <span class="spec-item"><i class="fa-solid fa-sun"></i> ${plant.light}</span>
                </div>

                <button class="add-to-cart" onclick="addToCart(${plant.id})">
                    <i class="fa-solid fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// 3. Filtering Function (Search + Category + Price)
function filterPlants() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const maxPrice = document.getElementById('priceRange').value;
    
    // Update Price label text
    document.getElementById('priceValue').innerText = maxPrice;

    const filtered = plants.filter(plant => {
        // Category filter check
        let matchesCategory = true;
        if (currentCategory === 'indoor') matchesCategory = plant.category === 'indoor';
        else if (currentCategory === 'outdoor') matchesCategory = plant.category === 'outdoor';
        else if (currentCategory === 'pet') matchesCategory = plant.petFriendly === true;

        // Search query check
        const matchesSearch = plant.name.toLowerCase().includes(searchQuery);

        // Price range check
        const matchesPrice = plant.price <= Number(maxPrice);

        return matchesCategory && matchesSearch && matchesPrice;
    });

    displayPlants(filtered);
}

// 4. Change Category Tab
function setCategory(category, btnElement) {
    currentCategory = category;
    
    // Update active class on buttons
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    filterPlants();
}

// 5. Cart Logic
function addToCart(plantId) {
    const plant = plants.find(p => p.id === plantId);
    cart.push(plant);
    updateCartUI();
    
    alert(`${plant.name} added to cart successfully! 🌱`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const container = document.getElementById('cartItemsContainer');
    
    if (cart.length === 0) {
        container.innerHTML = `<p style="color: var(--gray); text-align: center; margin-top: 20px;">Your cart is empty.</p>`;
        document.getElementById('cartTotalPrice').innerText = '₹0';
        return;
    }

    container.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>₹${item.price}</p>
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})"><i class="fa-solid fa-trash"></i></button>
        `;
        container.appendChild(div);
    });

    document.getElementById('cartTotalPrice').innerText = `₹${total}`;
}

// Toggle Cart Drawer Visibility
function toggleCart() {
    const modal = document.getElementById('cartModal');
    if (modal.style.display === 'flex') {
        modal.classList.remove('open');
        setTimeout(() => modal.style.display = 'none', 300);
    } else {
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('open'), 10);
    }
}

function checkOutsideClick(event) {
    if (event.target.id === 'cartModal') {
        toggleCart();
    }
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Thank you for your order! Your plants will be delivered soon 🌿🚚");
    cart = [];
    updateCartUI();
    toggleCart();
}

// Initial Load on page startup
displayPlants(plants);