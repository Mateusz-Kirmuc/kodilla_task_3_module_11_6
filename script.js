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
      var $columnDelete = $('<button>').addClass('btn-delete').text('- column');
      var $columnAddCard = $('<button>').addClass('add-card').text('+ card');

      // Attach event handlers
      $columnDelete.click(function() {
        self.removeColumn();
      });
      $columnAddCard.click(function() {
        self.addCard(new Card(prompt("Enter the name of the card")));
      });

      // Compose final column from elements
      $column.append($columnDelete)
        .append($columnAddCard)
        .append($columnTitle)
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
      var $cardDescription = $('<p>').addClass('card-description').text(self.description);
      var $cardDelete = $('<button>').addClass('btn-delete').text('-');

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
  /*
   * Function implements jQueryUIs drag'n'drop and sortable functionality
   */
  function initSortable() {
    $('.column-card-list').sortable({
      connectWith: '.column-card-list',
      placeholder: 'card-placeholder'
    }).disableSelection();
  }

  // Attach event handler to .create-column button
  $('.create-column')
    .click(function() {
      var name = prompt('Enter a column name');
      var column = new Column(name);
      board.addColumn(column);
    });

  // Creating columns
  var todoColumn = new Column('To do');
  var doingColumn = new Column('Doing');
  var doneColumn = new Column('Done');

  // Adding columns to the board
  board.addColumn(todoColumn);
  board.addColumn(doingColumn);
  board.addColumn(doneColumn);

  // Creating cards
  var card1 = new Card('New task');
  var card2 = new Card('Create kanban boards');

  // Adding cards to columns
  todoColumn.addCard(card1);
  doingColumn.addCard(card2);

})
