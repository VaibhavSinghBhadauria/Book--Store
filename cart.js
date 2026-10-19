function getCart() {
    return JSON.parse(localStorage.getItem("bookCart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("bookCart", JSON.stringify(cart));
}

function addToCart(id, name, price) {
    let cart = getCart();

    let book = cart.find(item => item.id === id);

    if (book) {
        book.quantity++;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart(cart);
    alert(name + " added to cart!");
}

function displayCart() {
    let cart = getCart();
    let table = document.getElementById("cartItems");

    if (!table) return;

    table.innerHTML = "";
    let total = 0;
    let totalBooks = 0;

    if (cart.length === 0) {
        table.innerHTML =
            '<tr><td colspan="5">Your cart is empty.</td></tr>';
    }

    cart.forEach(function(book) {
        let subtotal = book.price * book.quantity;

        total += subtotal;
        totalBooks += book.quantity;

        table.innerHTML += `
            <tr>
                <td>${book.name}</td>
                <td>₹${book.price}</td>
                <td>
                    <button onclick="changeQuantity('${book.id}', -1)">-</button>
                    ${book.quantity}
                    <button onclick="changeQuantity('${book.id}', 1)">+</button>
                </td>
                <td>₹${subtotal}</td>
                <td>
                    <button onclick="removeBook('${book.id}')">Remove</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("cartTotal").innerText = "₹" + total;
    document.getElementById("totalBooks").innerText = totalBooks;
    document.getElementById("summaryTotal").innerText = "₹" + total;
}

function changeQuantity(id, change) {
    let cart = getCart();
    let book = cart.find(item => item.id === id);

    if (book) {
        book.quantity += change;
    }

    cart = cart.filter(item => item.quantity > 0);

    saveCart(cart);
    displayCart();
}

function removeBook(id) {
    let cart = getCart();

    cart = cart.filter(item => item.id !== id);

    saveCart(cart);
    displayCart();
}

function clearCart() {
    if (confirm("Do you want to clear the entire cart?")) {
        localStorage.removeItem("bookCart");
        displayCart();
    }
}
