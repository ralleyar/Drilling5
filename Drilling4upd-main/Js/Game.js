class Game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    drill1 = createSprite(100, 200);
    drill1.addImage("drill1", drill1_img);
    drill1.scale = 3
    drill2 = createSprite(300, 200);
    drill2.addImage("drill2", drill2_img);
    drill2.scale = 3
    drill3 = createSprite(500, 200);
    drill3.addImage("drill3", drill3_img);
    drill3.scale = 3
    drills = [drill1, drill2, drill3];
  }

  play() {
    form.hide();

    Player.getPlayerInfo();

    if (allPlayers !== undefined) {
      background(rgb(255, 255, 255));
      image(soil, displayWidth / 15, 0, displayWidth * 1.0, displayHeight * 5);
      image(layer1_img, 350, 50, displayWidth * 0.5, displayHeight * 0.1);
      image(layer2_img, 350, 500, displayWidth * 0.5, displayHeight * 0.1);
      image(layer3_img, 350, 1000, displayWidth * 0.5, displayHeight * 0.3);
      image(layer4_img, 350, 2510, displayWidth * 0.5, displayHeight * 0.3);


      var display_position = 100;

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = allPlayers[plr].distance;
        drills[index - 1].x = x;
        drills[index - 1].y = y;
        // console.log(index, player.index)


        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);
          drills[index - 1].shapeColor = "red";
          camera.position.x = displayWidth / 2;
          camera.position.y = drills[index - 1].y;
        }

        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if (keyIsDown(DOWN_ARROW) && player.index !== null) {
      player.distance += 10
      player.update();
    }

    if (player.distance > 3860) {
      gameState = 2;
    }

    drawSprites();
  }

  end() {
    console.log("Game Ended");
    image(over_img, 100, 3790, displayWidth * 1, displayHeight * 0.4);


  }

}
