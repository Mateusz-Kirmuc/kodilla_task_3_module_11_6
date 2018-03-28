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
      // Create column elements
      var $column = $('<div>').addClass('column');
      var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
      var $columnCardList = $('<ul>').addClass('column-card-list');
      var $columnDelete = $('<button>').addClass('btn-delete').text('x');
      var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

      // Attach event handlers
      $columnDelete.click(function() {
        // self.removeColumn();
      });
      $columnAddCard.click(function() {
        // self.addCard(new Card(prompt("Enter the name of the card")));
      });

      // Compose final column from elements
      $column.append($columnTitle)
        .append($columnDelete)
        .append($columnAddCard)
        .append($columnCardList);

      return $column;
    }
  }

  Column.prototype = {
    addCard: function(card) {
      this.$element.children('ul').append(card.$element);
    },
    removeColumn: function() {
      this.$element.remove();
    }
  };

  function Card(description) {
    var self = this;
    this.id = randomString();
    this.description = description;
    this.$element = createCard();

    function createCard() {
      // Create DOM elements
      var $card = $('<li>').addClass('card');
      var $cardDescription = $('<p>').addClass('carddescription').text(self.description);
      var $cardDelete = $('<button>').addClass('btn-delete').text('x');

      // Attach event handler
      $cardDelete.click(function() {
        self.removeCard();
      });

      // Build tree from nodes
      $card.append($cardDelete).append($cardDescription);

      return $card;
    }
  }

  Card.prototype = {
    removeCard: function() {
      this.$element.remove();
    }
  }

  var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
      this.$element.append(column.$element);
      initSortable();
    },
    $element: $('#board .column-container')
  };

})
