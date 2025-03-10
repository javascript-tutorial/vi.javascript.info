function Accumulator(startingValue) {
  this.value = startingValue;

  this.read = function() {
    this.value += +prompt('Cộng vào bao nhiêu?', 0);
  };

}
