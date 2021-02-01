// gameboard module
var gameBoard = (() => {
  var spaces = new Array(9).fill(0);

  return {
    spaces
  }
})();


//gamecontroller module
var gameController = (() => {
  function compMove() {
    gameBoard.spaces.push(2);
  }

  return {
    compMove
  }
})();


//player factory function
var Player = (name) => {
  var getName = () => name;

  return {
    getName
  }
};


console.log(gameBoard.spaces)
p1 = Player('celina');
console.log(p1.getName());

