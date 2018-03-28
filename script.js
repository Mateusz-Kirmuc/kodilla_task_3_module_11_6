$(function() {
  /*
   * Function creates id string consists of 10 random chars in random order
   */
  function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }

  function Column(name) {
    var self = this; // useful for nested functions
    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

    function createColumn() {
      // here is the code for creating the column, which you will find
      // below
    }
  }
})
