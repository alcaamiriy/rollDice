(function(global) {
  function Player(props) {
    this.roundBoard = props.roundBoard;
    this.globalBoard = props.globalBoard;
    this.backcolor = props.backcolor
    this.indicator = props.indicator;
    this.turn = false;
    var roundScore = 0
    var globaScore = 0;

    this.addRoundScore = function(score) {
      roundScore += score;
    };
    this.onHold = function() {
      globaScore += this.getRoundScore();
      roundScore = 0;
    };
    this.resetRoundScore = function() {
      roundScore = 0;
    }
    this.setRoundBoard = function(board) {
      this.roundBoard = board;
    }
    this.setGlobalBoard = function(board) {
      this.globalBoard = board;
    };
    this.getRoundScore = function() {
      return roundScore;
    };
    this.getGlobalScore = function() {
      return globaScore;
    };
  }

  var Game = {
    fixer: 1,
    whoGoesFirst: function() {
      var first = Math.round(Math.random()) == 0 ? "player1" : "player2";

      if (first == "player1")
        this.switchTurn(this.player2, this.player1)
      else
        this.switchTurn(this.player1, this.player2)
      console.log(first);
      return this;
    },
    numbsOnDice: function() {
      return Math.round(Math.random() * 5) + 1;
    },
    removeClass: function(htmlNode, className) {
      htmlNode.classList.remove(className);
      return this;
    },
    AddClass: function(htmlNode, className) {
      htmlNode.classList.add(className);
      return this;
    },
    isFixerScore: function(score, fixer) {
      return score === fixer;
    },
    displayScore: function(board, score) {
      board.textContent = score;
      return this;
    },
    switchTurn: function(plLooseTurn, plGainTurn) {
      plLooseTurn.turn = false;
      plGainTurn.turn = true;
      this.removeClass(plLooseTurn.backcolor, "turn")
        .removeClass(plLooseTurn.indicator, "on")
        .AddClass(plGainTurn.backcolor, "turn")
        .AddClass(plGainTurn.indicator, "on");
      return this;
    },

    play: function() {
      var score = $this.numbsOnDice(),
        player1 = $this.player1,
        player2 = $this.player2;
      if (player1.turn) {
        if ($this.isFixerScore(score, $this.fixer)) {
          $this.switchTurn(player1, player2);
          player1.resetRoundScore();
        } else
          $this.player1.addRoundScore(score);
        if ($this.hasWon($this.player1)) {
          $this.AddClass(player1.backcolor, "won");
          player2.backcolor.style.opacity = 0.4;
        }
        $this.displayScore(player1.roundBoard, player1.getRoundScore());
      } else if (player2.turn) {
        if ($this.isFixerScore(score, $this.fixer)) {
          $this.switchTurn(player2, player1);
          player2.resetRoundScore();
        } else
          $this.player2.addRoundScore(score);

        if ($this.hasWon($this.player2)) {
          $this.AddClass(player2.backcolor, "won");
          player1.backcolor.style.opacity = 0.4;
        }
        $this.displayScore(player2.roundBoard, player2.getRoundScore());
      }
      rollBoard.setAttribute("src", "./images/dice-" + score + ".png");
    },
    hold: function() {
      var player1 = $this.player1,
        player2 = $this.player2;
      if (player1.turn === true) {
        player1.onHold();
        $this.displayScore(player1.globalBoard, player1.getGlobalScore())
          .switchTurn(player1, player2)
          .displayScore(player1.roundBoard, 0)
          .hasWon(player1);
      } else {
        player2.onHold();
        $this.displayScore(player2.globalBoard, player2.getGlobalScore())
          .switchTurn(player2, player1)
          .displayScore(player2.roundBoard, 0)
          .hasWon(player2);
      }
      rollBoard.setAttribute("src", "");
    },

    hasWon: function(player) {
      return  player.getGlobalScore() >= 100 ||
              (player.getGlobalScore() + player.getRoundScore()) >= 100;
    },

    init: function(config) {
      this.player1 = config.player1;
      this.player2 = config.player2;
      this.rollBoard = config.rollBoard;
      this.whoGoesFirst();
      $this = this;
      return this;
    }
  };
  Game.player = Player;
  global.$game = Game;
}(window));
