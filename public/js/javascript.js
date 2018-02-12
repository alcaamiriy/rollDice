(function () {
  var roll = document.querySelector(".roll");
  var rollBoard = document.querySelector(".board img");
  var hold = document.querySelector(".hold");

  function Player() {
    this.globalScore = 0;
    this.roundScore = 0;
    this.turn = false;

    this.addRoundScore = function (score) {
      this.roundScore += score;
    };
    this.onHold = function () {
      this.globalScore += this.roundScore;
      this.roundScore = 0;
    };
    this.resetRoundScore = function () {
      this.roundScore = 0;
      this.turn = false;
    };
  }
  var player1 = new Player();
  player1.roundBoard = document.querySelector(".pl1roundScore h6");
  player1.globalBoard = document.querySelector(".pl1globalScore");
  player1.backcolor = document.querySelector(".playerOne");
  player1.indicator= document.querySelector(".playerOne h3 span");

  var player2 = new Player();
  player2.roundBoard = document.querySelector(".pl2roundScore h6");
  player2.globalBoard = document.querySelector(".pl2globalScore");
  player2.backcolor = document.querySelector(".playerTwo");
  player2.indicator = document.querySelector(".playerTwo h3 span");

  var Game = {
    whoGoesFirst: function () {
      var first =  Math.round(Math.random()) == 0 ? "player1" : "player2";

      if (first == "player1")
        this.switchTurn(this.player2, this.player1)
      else
        this.switchTurn(this.player1, this.player2)
      console.log(first);
      return this;
    },
    numbsOnDice: function () {
      return Math.round(Math.random() * 5) + 1;
    },
    removeClass:function (htmlNode, className){
      htmlNode.classList.remove(className);
      return this;
    },
    AddClass: function (htmlNode, className){
      htmlNode.classList.add(className);
      return this;
    },
    isScore1: function (score, player) {
      var check = false;
      if (score === 1) {
        player.turn = false;
        player.roundScore  = 0;
        check = true;
      }
      return check;
    },
    displayScore: function (board, score) {
      board.textContent = score;
      return this;
    },
    play: function () {
      var score = $this.numbsOnDice(),
          player1 =  $this.player1,
          player2 =  $this.player2;
      if (player1.turn) {
        if ($this.isScore1(score, player1)) {
            $this.switchTurn(player1, player2);
            $this.player1.roundScore = 0;
        }
        else
          $this.player1.addRoundScore(score);

        $this.displayScore(player1.roundBoard ,player1.roundScore);
      }
      else if (player2.turn) {
        if ($this.isScore1(score, player2)) {
          $this.switchTurn(player2, player1);
          $this.player2.roundScore = 0;
        }
        else
            $this.player2.addRoundScore(score);

        $this.displayScore(player2.roundBoard, player2.roundScore);
      }
      rollBoard.setAttribute("src", "./images/dice-" + score + ".png");
    },
    switchTurn: function (plLooseTurn, plGainTurn) {
      plLooseTurn.turn = false;
      plGainTurn.turn = true;
      this.removeClass(plLooseTurn.backcolor, "turn")
              .removeClass(plLooseTurn.indicator, "on")
              .AddClass(plGainTurn.backcolor, "turn")
              .AddClass(plGainTurn.indicator, "on");
      return this;
    },

    hold: function() {
      var player1 = $this.player1,
          player2 = $this.player2;
      if (player1.turn === true) {
        player1.onHold();
        $this.displayScore(player1.globalBoard, player1.globalScore)
             .switchTurn(player1, player2)
             .displayScore(player1.roundBoard, 0);
      }
      else {
        player2.onHold();
        $this.displayScore(player2.globalBoard, player2.globalScore)
              .switchTurn(player2, player1)
              .displayScore(player2.roundBoard, 0);
      }
    },
    init: function (config) {
      this.player1 = config.player1;
      this.player2 = config.player2;
      $this = this;
      this.whoGoesFirst()
      return this;
    }
  };
  Game.init({
    player1: player1,
    player2: player2,
    rollBoard: rollBoard,
  });

    roll.addEventListener("click", Game.play);
    hold.addEventListener("click", Game.hold);
}());
