

// Lista de productos

let products = [
    { name: "Full Body Character", price: 35},
    { name: "Half Body Character", price: 25},
    { name: "Chibi Character", price: 20},
    { name: "Valorant Stickers Pack 1", price: 15},
    { name: "Valorant Stickers Pack 2", price: 15},
    { name: "Valorant Stickers Pack 3", price: 15}
];


let cart = [];

const CART_KEY = "cart";

// Guarda el carrito en el localStorage del navegador.
// Como localStorage solo guarda texto, convertimos el array a JSON.
function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Lee el carrito guardado (si existe) y lo vuelve a cargar en memoria.
function loadCart() {
    let saved = localStorage.getItem(CART_KEY);

    if (saved) {
        // JSON.parse convierte el texto de vuelta a un array de objetos.
        carrito = JSON.parse(saved);
    }
}

function addProduct(product) {
    cart.push(product);
    console.log(product.name + " added to cart");

    // Cada vez que agregamos algo, actualizamos lo que se ve en pantalla.
    updateCart();
}

function calculateTotal() {
    let total = 0;

    for (let product of cart) {
        total += product.price;
    }

    return total;
}

function viewCart() {
    console.log("Productos del carrito:");

    for (let product of cart) {
        console.log(product.name + " - $" + product.price);
    }
}


/* ----------- 3) Funciones para mostrar todo en la página ----------- */

// Dibuja la lista de productos disponibles con su botón "Agregar".
function viewProducts() {
    let list = document.getElementById("products-list");
    list.innerHTML = "";

    for (let i = 0; i < products.length; i++) {
        let product = products[i];

        let item = document.createElement("li");
        item.className = "product-item";

        item.innerHTML =
            "<span class='product-name'>" + product.name + "</span>" +
            "<span class='product-price'>$" + product.price + "</span>" +
            "<button class='btn-add' data-index='" + i + "'>Add</button>";

        list.appendChild(item);
    }

    // Le ponemos el evento click a cada botón "Agregar".
    let buttons = document.querySelectorAll(".btn-add");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            let index = button.getAttribute("data-index");
            addProduct(products[index]);
        });
    }
}

// Saca un producto del carrito según su posición.
function removeProduct(index) {
    let product = cart[index];
    cart.splice(index, 1);o
    console.log(product.name + " removed from cart");

    updateCart();
}

// Vacía el carrito completo.
function emptyCart() {
    cart = [];
    console.log("Emptied cart");

    updateCart();
}

// Refresca lo que se ve del carrito: items, total y cantidad.
function updateCart() {
    let cartList = document.getElementById("cart-items");
    let totalText = document.getElementById("cart-total");
    let amountText = document.getElementById("cart-amount");

    cartList.innerHTML = "";

    if (cart.length === 0) {
        cartList.innerHTML = "<li class='empty-cart'>Your cart is empty.</li>";
    } else {
        for (let i = 0; i < cart.length; i++) {
            let product = cart[i];

            let item = document.createElement("li");
            item.className = "cart-item";

            item.innerHTML =
                "<span>" + product.name + "</span>" +
                "<span class='cart-price'>$" + product.price + "</span>" +
                "<button class='btn-remove' data-index='" + i + "'>✕</button>";

            cartList.appendChild(item);
        }

        // Evento para los botones de quitar.
        let removeButton = document.querySelectorAll(".btn-remove");

        for (let button of removeButton) {
            button.addEventListener("click", function () {
                let index = button.getAttribute("data-index");
                removeProduct(index);
            });
        }
    }

    totalText.textContent = "$" + calculateTotal();
    amountText.textContent = cart.length;

    // Guardamos el estado actual del carrito para no perderlo al recargar.
    saveCart();

    // También lo mostramos en la consola, como en el ejemplo de clase.
    showCart();
}


/* ----------- 4) Pago (solo maquetado, sin funcionalidad real) ----------- */

function completePurchase() {
    if (cart.length === 0) {
        Swal.fire({
            icon: "info",
            title: "Your cart is empty.",
            text: "Add products before paying.",
            confirmButtonColor: "#ff9900"
        });
        return;
    }

    // Esta parte está SOLO maquetada: no procesa ningún pago real.
    Swal.fire({
        icon: "success",
        title: "Thank you for your purchase!",
        html:
            "Total: <strong>$" + calculateTotal() + "</strong><br><br>" +
            "<small>The payment is for demonstration purposes only, no charge is processed.</small>",
        confirmButtonText: "Close",
        confirmButtonColor: "#ff9900"
    });
}


/* ----------- 5) Arranque: cuando carga la página ----------- */

document.addEventListener("DOMContentLoaded", function () {
    // Primero recuperamos el carrito que el usuario tenía guardado.
    loadCart();

    viewProducts();
    updateCart();

    let emptyButton = document.getElementById("btn-empty");
    let payButton = document.getElementById("btn-pay");

    emptyButton.addEventListener("click", emptyCart);
    payButton.addEventListener("click", completePurchase);
});