// gameboard module
var gameBoard = (() => {
  var spaces = new Array(9).fill('');

  //cache DOM
  var blocks = document.querySelectorAll(".block")   //Node list of all blocks
  var winnerDisplay = document.getElementById('winnerDisplay'); 

  function getBlock(blockID){
    return document.getElementById(blockID)
  }


  function checkVacant(block) {
    return (block.classList.contains('occupied')? false : true);
  }

  function checkWinner(playerMark){
    win = false
    //check columns
    for (var i=0; i<=3; i++){
      if (spaces[i]==playerMark){
        if (spaces[i+3]==playerMark){
          if (spaces[i+6]==playerMark){
            win = true
          }
        }     
    }
  }

  //check rows
  for (var i=0; i<=7; i++){
    if (spaces[i]==playerMark){
      if (spaces[i+1]==playerMark){
        if (spaces[i+2]==playerMark){
          win = true
        }
      }     
  }
}

  //check diagonals
  if (spaces[0] == playerMark && spaces[4] == playerMark && spaces[8] == playerMark){
    win = true
  }
  if (spaces[2] == playerMark && spaces[4] == playerMark && spaces[6] == playerMark){
    win = true
  }

  if (win){
    gameController.gameOver = true
  endGame(playerMark)
  }
  }

  function getFreeBlocks() {
    //convert nodelist to filterable array
    var free_blocks = Array.from(blocks).filter(element => !(element.classList.contains('occupied')));
    //returns array
    return free_blocks;
  }


  function addMove(blockID, playerMark) {
    blockElement = getBlock(blockID)
    if (checkVacant(blockElement)) {
      var str = blockID.split("_");
      spaces[str[1]] = playerMark;    
      blockElement.classList.add('occupied', 'disabled');
      render();
      checkWinner(playerMark)
    }
  }

  function endGame(playerMark){
    gameController.winner = playerMark == 'X'? "Player":"Computer"
    free_blocks = getFreeBlocks()
    for (var i=0; i<free_blocks.length; i++){
      free_blocks[i].classList.add('disabled');
    }
    winnerDisplay.innerHTML = `${gameController.winner} Wins`
  }

  function render() {
    space_counter = 0
    for (var i = 0; i < blocks.length; i++) {
      blocks[i].innerHTML = spaces[space_counter];
      space_counter++;
    }
  }
  
  render()
  return {
    addMove,
    getFreeBlocks
  }
})();




//gamecontroller module
var gameController = (() => {
  var turn = 'p1';
  var gameOver = false;
  var winner;


  function playerMove(blockID){
    if(turn == 'p1'){
    gameBoard.addMove(blockID, p1.getMark())
    turn = 'c1';
    if (!gameOver){
    compMove();  
    }
  }
}

  function compMove(){
    const free_blocks = gameBoard.getFreeBlocks();
    var item = free_blocks[Math.floor(Math.random() * free_blocks.length)];
    gameBoard.addMove(item.id, c1.getMark());
    turn = 'p1'
  }

  return {
    playerMove,
    winner
  }
})();




//player factory function
var Player = (name, mark) => {
  var name = name;
  var mark = mark;
  function getName() {
    return name;
  }
  function getMark() {
    return mark;
  }

  return {
    getName,
    getMark,
  }
};


p1 = Player('Player', 'X');
c1 = Player('Computer', 'O')



