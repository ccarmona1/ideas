
// clase javascript pura que simula el comportamiento de un propiedad privada
class Order {

  constructor(totalAmount) {
    let _totalAmount = totalAmount;
    
    this.getTotalAmount = function() {
      return _totalAmount;
    };

    this.addAmount = function(amount) {
      if (amount < 0) {
        throw new Error("Amount cannot be negative");
      }
      _totalAmount += amount;
    };

  }

    get _totalAmount() {
        return _totalAmount;
    }

}


const newOrder = new Order(100);
newOrder.addAmount(50);
console.log(newOrder.getTotalAmount()); // 150
console.log(newOrder._totalAmount)