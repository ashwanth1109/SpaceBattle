//------------------------------------------GETTING ELEMENTS BY ID------------------------------------------

let gameTitle = document.getElementById(`game-title`);
let gameTitleText = document.getElementById(`game-title-text`);

const makeTitleTextAppear = () => {
  gameTitleText.style.opacity = 1;
  gameTitleText.style.visibility = `visible`;
};
const makeTitleAppear = () => {
  gameTitle.style.width = "60vw";
  setTimeout(makeTitleTextAppear, 2000);
};

setTimeout(makeTitleAppear, 1000);

//------------------------------------------JS CORE CODE------------------------------------------
//------------------------------------------------------------------------------------

//------------------------------------------CLASS TO CREATE SHIP------------------------------------------
class Ship {
  constructor(name, hull = 0, firepower = 0, accuracy = 0) {
    this.name = name;
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
    this.healthBarElement = null;
    this.maxHP = hull;
    this.id = 0;
  }

  attack(opponent) {
    let random = Math.random();
    let isHitSuccesful = false;
    if (this.accuracy >= random && this.hull > 0) {
      isHitSuccesful = true;
    }
    if (isHitSuccesful) {
      console.log(`Attack from ${this.name} on ${opponent.name} was succesful`);
      opponent.hull -= this.firepower;
      console.log(`${opponent.name}'s health is now ${opponent.hull}`);
    } else {
      console.log(
        `Attack from ${this.name} on ${opponent.name} was unsuccesful`
      );
      console.log(`${opponent.name}'s health is still at ${opponent.hull}`);
    }
  }

  generateRandomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  generateRandomAccuracyFromRange(min, max) {
    min *= 10;
    max *= 10;
    let randomInt = this.generateRandomIntFromRange(min, max);
    return randomInt / 10;
  }

  randomizeHullValue(min, max) {
    this.hull = this.generateRandomIntFromRange(min, max);
    this.maxHP = this.hull;
  }

  randomizeFirepowerValue(min, max) {
    this.firepower = this.generateRandomIntFromRange(min, max);
  }

  randomizeAccuracy(min, max) {
    this.accuracy = this.generateRandomAccuracyFromRange(min, max);
  }

  consoleLogShipValues() {
    console.log(`${this.name}'s hull value is ${this.hull}`);
    console.log(`${this.name}'s firepower value is ${this.firepower}`);
    console.log(`${this.name}'s accuracy value is ${this.accuracy}`);
  }
}

//------------------------------------------GENERATE ALIEN SHIPS USING FACTORY------------------------------------------

const alienShipFactory = numberOfShips => {
  let alienShips = [];
  for (let i = 1; i <= numberOfShips; i++) {
    const shipName = `Alien Spaceship ${i}`;
    const alienShip = new Ship(shipName);
    alienShip.randomizeHullValue(3, 6);
    alienShip.randomizeFirepowerValue(2, 4);
    alienShip.randomizeAccuracy(0.6, 0.8);
    alienShip.consoleLogShipValues();
    alienShip.id = i;
    alienShips.push(alienShip);
  }
  return alienShips;
};

const alienShips = alienShipFactory(6);

//------------------------------------------GENERATE USS SCHWARZENEGGAR------------------------------------------

const uss = new Ship(`USS SCHWARZENEGGAR`, 20, 5, 0.7);
uss.consoleLogShipValues();

//------------------------------------------GETTING HEALTH BAR ELEMENTS------------------------------------------

const spaceshipHealth = document.getElementById(`spaceship-health`);
const alienHealth1 = document.getElementById(`alienship-health1`);
const alienHealth2 = document.getElementById(`alienship-health2`);
const alienHealth3 = document.getElementById(`alienship-health3`);
const alienHealth4 = document.getElementById(`alienship-health4`);
const alienHealth5 = document.getElementById(`alienship-health5`);
const alienHealth6 = document.getElementById(`alienship-health6`);
let healthBar = [
  spaceshipHealth,
  alienHealth1,
  alienHealth2,
  alienHealth3,
  alienHealth4,
  alienHealth5,
  alienHealth6
];

uss.healthBarElement = spaceshipHealth;
alienShips[0].healthBarElement = alienHealth1;
alienShips[1].healthBarElement = alienHealth2;
alienShips[2].healthBarElement = alienHealth3;
alienShips[3].healthBarElement = alienHealth4;
alienShips[4].healthBarElement = alienHealth5;
alienShips[5].healthBarElement = alienHealth6;

//------------------------------------------GETTING LOG ELEMENTS------------------------------------------
const logLine1 = document.getElementById(`log-line1`);
const logLine2 = document.getElementById(`log-line1`);
const logLine3 = document.getElementById(`log-line3`);

//------------------------------------------SIMULATE BATTLE------------------------------------------

// alert(
//   `You are now entering the battle with your ship to defend the earth against alien attack`
// );

let action = null;
let shipIndex = 0;
let isGameOver = false;

const checkIfGameIsOver = () => {
  let check = false;
  if (uss.hull <= 0) {
    check = true;
  } else {
    let flag = 1;
    for (let i = 0; i < alienShips.length; i++) {
      if (alienShips[i].hull > 0) {
        flag -= 1;
      }
    }
    if (flag === 1) {
      check = true;
    }
  }
  return check;
};

const incrementShipIndexInLoop = () => {
  shipIndex++;
  if (shipIndex === alienShips.length) {
    shipIndex = 0;
  }
};

const updateHealth = ship => {
  let healthValue = Math.round((ship.hull / ship.maxHP) * 10);
  if (healthValue < 0) {
    healthValue = 0;
  }
  console.log(healthBar[ship.id]);
  healthBar[ship.id].style.width = `${healthValue}vw`;
  // console.log(ship.healthBarElement.firstChild.nextSibling);
  // ship.healthBarElement.firstChild.nextSibling.style.width = `${healthValue}vw`;
};

const logGameOverMessage = () => {
  console.log(`Game Over`);
};

//------------------------------------------ADDING FUNCTIONS FOR BUTTONS------------------------------------------

const fight = () => {
  uss.attack(alienShips[shipIndex]);
  updateHealth(alienShips[shipIndex]);
  alienShips[shipIndex].attack(uss);
  updateHealth(uss);
  incrementShipIndexInLoop();
  if (checkIfGameIsOver()) {
    if (uss.hull <= 0) {
      console.log(`Oh no, the alien ships won. Earth is gonna be destroyed`);
    } else {
      console.log(
        `Congratulations, ${
          uss.name
        } has saved the day. The alien ships have all been destroyed`
      );
    }
    logGameOverMessage();
  }
};
const retreat = () => {
  console.log(`retreat`);
};
const shootLaser = () => {
  console.log(`laser`);
};
const createShield = () => {
  console.log(`shield`);
};

//------------------------------------------ADDING CONTROLS USING BUTTONS------------------------------------------

const fightButton = document.getElementById(`fight-button`);
const retreatButton = document.getElementById(`retreat-button`);
const laserButton = document.getElementById(`laser-button`);
const shieldButton = document.getElementById(`shield-button`);

fightButton.addEventListener(`click`, fight);
retreatButton.addEventListener(`click`, retreat);
laserButton.addEventListener(`click`, shootLaser);
shieldButton.addEventListener(`click`, createShield);
