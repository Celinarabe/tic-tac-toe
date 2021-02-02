// gameboard module
var gameBoard = (() => {
  var spaces = new Array(9).fill('');

  //cache DOM
  //NODE LIST OF ALL BLOCKS
  var blocks = document.querySelectorAll(".block")
  render()

  function render() {
    var blocks = document.getElementsByClassName("block");
    space_counter = 0
    for (var i = 0; i < blocks.length; i++) {
      blocks[i].innerHTML = spaces[space_counter];

      space_counter++;
    }

  }





  function getBlock(blockID){
    return document.getElementById(blockID)
  }

  function checkVacant(block) {
    return (block.classList.contains('occupied')? false : true);
  }

  function checkWinner(playerMark){
    //check columns
    for (var i=0; i<=3; i++){
      if (spaces[i]==playerMark){
        if (spaces[i+3]==playerMark){
          if (spaces[i+6]==playerMark){
            return true
          }
        }     
    }
  }

  //check rows
  for (var i=0; i<=7; i++){
    if (spaces[i]==playerMark){
      if (spaces[i+1]==playerMark){
        if (spaces[i+2]==playerMark){
          return true
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
  }

  function getFreeBlocks() {
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
    }
  }

  function endGame(){
    free_blocks = getFreeBlocks()
    for (var i=0; i<free_blocks.length; i++){
      free_blocks[i].classList.add('disabled');
    }
    
  }
  

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



  function playerMove(blockID, playerMark){
    if(turn == 'p1'){

    gameBoard.addMove(blockID, playerMark)
    if (gameBoard.checkWinner('X')) {
      gameBoard.endGame()
      winnerDisplay.innerHTML = "You Win"
      }
    
    else{
    turn = 'c1';
    compMove();
    }
  }
}

function displayWinner(winner){

} 

  function compMove(){
    const free_blocks = gameBoard.getFreeBlocks();
    var item = free_blocks[Math.floor(Math.random() * free_blocks.length)];
    gameBoard.addMove(item.id, 'O');
    if (gameBoard.checkWinner('O')){
      winnerDisplay.innerHTML = "Computer Wins"
    }
    else{
    turn = 'p1'
  }
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


