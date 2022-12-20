//перевіряємо хто першим обрав елемент
module.exports.whoSelectedElement = function (arr) {
  //якщо повертає 1 - значить другий юзер зробив вибір, і навпаки
  if (arr.indexOf(undefined) + 1) return arr.indexOf(undefined) + 1;
  return 0;
};

//перевіряємо хто виграв
module.exports.checkWinner = function (arr) {
  if (arr[0] === "rock") {
    switch (arr[1]) {
      case "rock":
        return "draw";
      case "paper":
        return "player 2";
      case "scissors":
        return "player 1";
    }
  }

  if (arr[0] === "paper") {
    switch (arr[1]) {
      case "rock":
        return "player 1";
      case "paper":
        return "draw";
      case "scissors":
        return "player 2";
    }
  }

  if (arr[0] === "scissors") {
    switch (arr[1]) {
      case "rock":
        return "player 2";
      case "paper":
        return "player 1";
      case "scissors":
        return "draw";
    }
  }
};
