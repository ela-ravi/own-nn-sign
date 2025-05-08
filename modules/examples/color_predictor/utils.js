function initializeObjects() {
  bg = {
    r: Math.floor(random(255)),
    g: Math.floor(random(255)),
    b: Math.floor(random(255)),
  };
  trainingToggleObject = {
    x: 550,
    y: 40,
    label: {
      onLabel: "Training ON",
      offLabel: "Training OFF",
      x: 380,
      y: 45,
    },
  };
  trainOnMousePressedToggleObject = {
    x: 390,
    y: 100,
    //   x: 550,
    //   y: 100,
    label: {
      onLabel: "Train On \nMouse Pressed",
      offLabel: "Train On \nTimeout Slider",
      x: 380,
      y: 105,
    },
  };

  let refCircle = {
    x: 150,
    y: 400,
    w: 250,
    h: 250,
    text: {
      x: 100,
      y: 400,
      content: "BLACK",
      fillColor: 0,
    },
  };
  leftCircle = {
    ...refCircle,
  };
  rightCircle = {
    ...refCircle,
    x: refCircle.x + 300,
    text: {
      ...refCircle.text,
      x: 400,
      content: "WHITE",
      fillColor: 255,
    },
  };

  let outputCircleCommonDim = {
    x: refCircle.x,
    y: refCircle.y / 2,
    w: refCircle.w / 4,
    h: refCircle.w / 4,
  };

  outputCircleOnBlack = {
    ...outputCircleCommonDim,
    x: 150,
  };
  outputCircleOnWhite = {
    ...outputCircleCommonDim,
    x: 450,
  };
}

function createCustomSelect(tms) {
  tms = createRadio();
  tms.position(
    trainOnMousePressedToggleObject.x,
    trainOnMousePressedToggleObject.y
  );
  tms.size(100);

  const mousePressedRadio = tms.option(MOUSE_PRESSED_);
  mousePressedRadio.nextSibling.style.color = "white";
  mousePressedRadio.parentElement.style.display = "flex";
  mousePressedRadio.parentElement.style.flexDirection = "row";
  mousePressedRadio.parentElement.style.transform = "scale(1.5)";
  mousePressedRadio.parentElement.style.justifyContent = "space-evenly";
  mousePressedRadio.parentElement.style.marginLeft = "25px";
  mousePressedRadio.parentElement.style.width = "100%";

  const timeoutRadio = tms.option(TIMEOUT_);
  timeoutRadio.nextSibling.style.color = "white";
  timeoutRadio.parentElement.style.display = "flex";
  timeoutRadio.parentElement.style.flexDirection = "row";
  timeoutRadio.parentElement.style.transform = "scale(1.5)";
  timeoutRadio.parentElement.style.justifyContent = "space-evenly";
  timeoutRadio.parentElement.style.marginLeft = "15px";
  timeoutRadio.parentElement.style.width = "100%";

  timeoutRadio.parentElement.parentElement.style.display = "flex";
  timeoutRadio.parentElement.parentElement.style.flexDirection = "column";
  timeoutRadio.parentElement.parentElement.style.height = "100px";
  timeoutRadio.parentElement.parentElement.style.justifyContent =
    "space-evenly";

  tms.selected("MousePressed");
  return tms;
}
function createCustomCircle(ellipseO, background) {
  fill(background.r, background.g, background.b);
  ellipse(ellipseO.x, ellipseO.y, ellipseO.w, ellipseO.h);
}

function toggleButton(condition, toggleObject) {
    const btnX = toggleObject.x;
    const btnY = toggleObject.y;
    const { onLabel, offLabel, x: labelX, y: labelY } = toggleObject.label;
    // Outer circle
    noFill();
    if (condition) {
      stroke(255); // white
      strokeWeight(4);
    } else {
      stroke(128, 128, 128); // gray
      strokeWeight(2);
    }
    ellipse(btnX, btnY, 30, 30);
  
    //   Inner ellipse
    if (condition) {
      fill(128, 255, 0); // green
    } else {
      fill("Gray");
    }
    noStroke();
    ellipse(btnX, btnY, 20, 20);
  
    //   Text
    if (condition) {
      fill("Green");
      text(onLabel, labelX, labelY);
    } else {
      fill("white");
      text(offLabel, labelX, labelY);
    }
  }
  