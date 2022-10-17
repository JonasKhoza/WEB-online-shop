class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  addItemToCart(product) {
    let cartItem = {
      product: product,
      totalPrice: product.price,
      quantity: 1,
    };
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];

      if (item.product._id.toString() === product._id.toString()) {
        cartItem.totalPrice = item.totalPrice + product.price;
        cartItem.quantity = +item.quantity + 1;
        this.items[i] = cartItem;

        this.totalQuantity++;
        this.totalPrice += product.price;

        return;
      }
    }

    this.items.push(cartItem);
    this.totalQuantity++;
    this.totalPrice += product.price;
  }

  updateCartItem(productId, newQuantity) {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];

      if (
        item.product._id.toString() === productId.toString() &&
        newQuantity > 0
      ) {
        const cartItem = { ...item };

        const quantityChange = newQuantity - item.quantity;

        cartItem.quantity = newQuantity;
        cartItem.totalPrice = newQuantity * item.product.price;

        this.items[i] = cartItem;

        this.totalQuantity = this.totalQuantity + quantityChange;
        this.totalPrice += quantityChange * item.product.price;

        return { updatedItemPrice: cartItem.totalPrice };
      } else if (
        item.product._id.toString() === productId.toString() &&
        newQuantity <= 0
      ) {
        this.items.splice(i, 1);
        this.totalQuantity -= item.quantity;

        this.totalPrice =
          this.totalPrice.toFixed(2) - item.totalPrice.toFixed(2);

        return { updatedItemPrice: 0 };
      }
    }
  }
}

module.exports = Cart;
