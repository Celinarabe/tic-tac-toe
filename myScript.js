// gameboard module
var gameBoard = (() => {
  var spaces = new Array(9).fill('');

  //cache DOM
  //Node list of all blocks
  var blocks = document.querySelectorAll(".block")

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
    return true
  }
  if (spaces[2] == playerMark && spaces[4] == playerMark && spaces[6] == playerMark){
    return true
  }

  if (win){
  gameBoard.endGame(playerMark)
      
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

  //TERNARY FUNCT
  function endGame(playerMark){
    if (playerMark == 'X'){
      winner = "Player"
    }
    else {
      winner = "Computer"
    }
    free_blocks = getFreeBlocks()
    for (var i=0; i<free_blocks.length; i++){
      free_blocks[i].classList.add('disabled');
    }
    winnerDisplay.innerHTML = `${winner} Wins`
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
    spaces,
    addMove,
    checkWinner,
    getFreeBlocks,
    endGame
  }
})();




//gamecontroller module
var gameController = (() => {
  var turn = 'p1';
  //cache DOM
  var winnerDisplay = document.getElementById('winnerDisplay'); 


  //TERNARY is there a way to have event listener?
  function playerMove(blockID, playerMark){
    if(turn == 'p1'){
    gameBoard.addMove(blockID, playerMark)
    turn = 'c1';
    compMove();  
  }
}


  function compMove(){
    const free_blocks = gameBoard.getFreeBlocks();
    var item = free_blocks[Math.floor(Math.random() * free_blocks.length)];
    gameBoard.addMove(item.id, 'O');
    turn = 'p1'
  }


  return {
    turn,
    playerMove,
    compMove
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
  function setName(newName) {
    name = newName;
  }

  return {
    getName,
    getMark,
    setName
  }
};


console.log(gameBoard.spaces)
p1 = Player('Player', 'X');
c1 = Player('Computer', 'O')
console.log(p1.getName());


