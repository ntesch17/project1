(function () {
  "use strict";
  const canvasWidth = 1040, canvasHeight = 780;

  let x = 0, y = 0, a = 0, r = 0;

  let color
  let ctx;
  let n = 0;
  let divergence;
  const c = 3;
  let hsl1 = false, rgb1 = false, linGrad = false, hsl2 = false, rgb2 = false, radGrad = false;
  let paused = true, clear = false;
  let small = false, medium = false, large = false, random=false;
  let createCircle = false, createRectangle = false, createLine = false, createRetangleOutline = false, createCircleOutline = false;
  let fps;
  let colorOutline;

  const drawParams = Object.freeze({
    "zero":0,
    "twenty":20,
    "sixty":60,
    "ten":10,
    "five":5,
    "thirtyFive":35,
    "fifty":50,
    "twentyFive":25,
    "fifteen":15,
    "two":2,
});

  window.onload = init;

  function init() {
    ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillRect(drawParams.zero, drawParams.zero, canvasWidth, canvasHeight);
    document.querySelector("#playButton").disabled = true;

    document.querySelector("#playButton").onclick = function () {
      paused = false;
      this.disabled = true;
      loop();
    };

    document.querySelector("#pauseButton").onclick = function () {
      paused = true;
      document.querySelector("#playButton").disabled = false;
    };

    document.querySelector("#clearButton").onclick = function () {
      clear = true;
      paused = true;
      document.querySelector("#playButton").disabled = false;
      cls(ctx);
    };

    document.querySelector("#circlesCB").onchange = function (e) {
      createCircle = e.target.checked;
    };
    document.querySelector("#rectanglesCB").onchange = function (e) {
      createRectangle = e.target.checked;
    };

    document.querySelector("#rectangleOutlineCB").onchange = function (e) {
      createRetangleOutline = e.target.checked;
    };
    document.querySelector("#circleOutlineCB").onchange = function (e) {
      createCircleOutline = e.target.checked;
    };

    document.querySelector("#lineCB").onchange = function (e) {
      createLine = e.target.checked;
    };

    document.querySelector("#small").onchange = function (e) {
      small = e.target.checked;
      medium=false;
      random=false;
      large=false;
      document.querySelector("#playButton").disabled = false;
    };

    document.querySelector("#medium").onchange = function (e) {
      medium = e.target.checked;
      small=false;
      random=false;
      large=false;
      document.querySelector("#playButton").disabled = false;
    };

    document.querySelector("#large").onchange = function (e) {
      large = e.target.checked;
      medium=false;
      random=false;
      small=false;
      document.querySelector("#playButton").disabled = false;
    };

    document.querySelector("#random").onchange = function (e) {
      random = e.target.checked;
      medium=false;
      small=false;
      large=false;
      document.querySelector("#playButton").disabled = false;
    };

    document.querySelector("#fpsRange").onchange = function (e) {
      fps = e.target.value;
      let output = document.querySelector("#fpsValue");
      let slider = document.querySelector("#fpsRange");
      output.innerHTML = slider.value; // Display the default slider value

      // Update the current slider value (each time you drag the slider handle)
      slider.oninput = function () {
        output.innerHTML = e.target.value;
      }
    };


    document.querySelector("#divRange").onchange = function (e) {
      divergence = e.target.value;
      let divOutput = document.querySelector("#divValue");
      let divSlider = document.querySelector("#divRange");
      divOutput.innerHTML = divSlider.value; // Display the default slider value

      // Update the current slider value (each time you drag the slider handle)
      divSlider.oninput = function () {
        divOutput.innerHTML = e.target.value;
      }
    };

    // document.querySelector("#xRange").onchange = function (e) {
    //   x = e.target.value;
    //   let xOutput = document.querySelector("#xValue");
    //   let xSlider = document.querySelector("#xRange");
    //   xOutput.innerHTML = divSlider.value; // Display the default slider value

    //   // Update the current slider value (each time you drag the slider handle)
    //   xSlider.oninput = function () {
    //     xOutput.innerHTML = e.target.value;
    //   }
    // };

    // document.querySelector("#yRange").onchange = function (e) {
    //   a = e.target.value;
    //   let yOutput = document.querySelector("#yValue");
    //   let ySlider = document.querySelector("#yRange");
    //   yOutput.innerHTML = divSlider.value; // Display the default slider value

    //   // Update the current slider value (each time you drag the slider handle)
    //   ySlider.oninput = function () {
    //     yOutput.innerHTML = e.target.value;
    //   }
    // };


    document.querySelector("#hslButton").onclick = function () {
      hsl1 = true;
      hsl2 = false;
      rgb1 = false;
      linGrad = false;
      radGrad = false;
    }

    document.querySelector("#hsl2Button").onclick = function () {
      hsl1 = false;
      hsl2 = true;
      rgb1 = false;
      linGrad = false;
      radGrad = false;
    }

    document.querySelector("#rgbButton").onclick = function () {
      hsl1 = false;
      hsl2 = false;
      rgb1 = true;
      linGrad = false;
      radGrad = false;
    }

    document.querySelector("#rgb2Button").onclick = function () {
      hsl1 = false;
      hsl2 = false;
      rgb1 = false;
      rgb2 = true;
      linGrad = false;
      radGrad = false;
    }

    document.querySelector("#linGradButton").onclick = function () {
      hsl1 = false;
      hsl2 = false;
      rgb1 = false;
      linGrad = true;
      radGrad = false;
    }

    document.querySelector("#radGradButton").onclick = function () {
      hsl1 = false;
      hsl2 = false;
      rgb1 = false;
      linGrad = false;
      radGrad = true;
    }
  }


  function loop() {

    if (paused) return;
    //if(clear) setTimeout(loop, fps / 2);
    setTimeout(loop, fps / drawParams.two);
    n++;
    // each frame draw a new dot
    // `a` is the angle
    // `r` is the radius from the center (e.g. "Pole") of the flower
    // `c` is the "padding/spacing" between the dots
    a = n * dtr(divergence);
    r = c * Math.sqrt(n);

    // now calculate the `x` and `y`
    x = r * Math.cos(a) + canvasWidth / drawParams.two;
    y = r * Math.sin(a) + canvasHeight / drawParams.two;
    console.log(x);
    console.log(y);
    //drawCircle(ctx, x, y, 6, "white");
    //let color = `rgb(${n % 256},0,255)`;
    // let aDegrees = (n * divergence) % 256;
    // let color = `rgb(${aDegrees},0,255)`;
    //let aDegrees = (n * divergence) % 361;
    // if(hsl1) let color = `hsl(${aDegrees * 5},100%,50%)`;
    if (hsl1) {
      color = `hsl(${n / drawParams.five % 361},100%,50%)`;
    }
    else if (hsl2) {
      color = `hsl(${n / getRandomInt(drawParams.two, drawParams.ten) % 361},100%,50%)`;
    }
    else if (rgb1) {
      color = `rgb(${n % 256},80,${getRandomInt(drawParams.zero, 255)})`;
    }
    else if (rgb2) {
      color = `rgb(${n / 30 % 256},${getRandomInt(drawParams.twenty, 150)},${getRandomInt(100, 255)})`;
    }
    else if (linGrad) {
      color = ctx.createLinearGradient(canvasHeight - 280, drawParams.twentyFive, canvasHeight - 380, drawParams.fifty);
      color.addColorStop(0, getRandomColor());
      color.addColorStop(1 / 6, getRandomColor());
      color.addColorStop(2 / 6, getRandomColor());
      color.addColorStop(3 / 6, getRandomColor());
      color.addColorStop(4 / 6, getRandomColor());
      color.addColorStop(5 / 6, getRandomColor());
    }
    else if (radGrad) {
      color = ctx.createRadialGradient(drawParams.fifteen, canvasHeight - 630, canvasHeight - 630, canvasHeight - 530, canvasHeight - 530, canvasHeight - 630);

      color.addColorStop(0, getRandomColor());
      color.addColorStop(1 / 6, getRandomColor());
      color.addColorStop(2 / 6, getRandomColor());
      color.addColorStop(3 / 6, getRandomColor());
      color.addColorStop(4 / 6, getRandomColor());
      color.addColorStop(5 / 6, getRandomColor());
      ctx.beginPath;
    }

    if (small) {
      if (createCircle) drawCircle(ctx, x + drawParams.ten, y + drawParams.twenty,  drawParams.five, color);
      if (createRectangle) drawRectangle(ctx, x + drawParams.twenty, y + drawParams.twenty,  drawParams.five, drawParams.five, color);
      if (createRetangleOutline) drawRectangleOutlines(ctx, x, y +  drawParams.ten, color);
      if (createCircleOutline) drawCircleOutlines(ctx, x + drawParams.twenty, y + drawParams.twenty,  drawParams.five, color);
      if (createLine) drawLine(ctx, x, y, drawParams.fifty, 0.5, color);
    }
    if (medium) {
      if (createCircle) drawCircle(ctx, x, y, drawParams.thirtyFive, color);
      if (createRectangle) drawRectangle(ctx, x, y, drawParams.thirtyFive, drawParams.thirtyFive, color);
      if (createRetangleOutline) drawRectangleOutlines(ctx, x, y, drawParams.thirtyFive, drawParams.thirtyFive, color);
      if (createCircleOutline) drawCircleOutlines(ctx, x + drawParams.twenty, y + drawParams.twenty, drawParams.thirtyFive, color);
      if (createLine) drawLine(ctx, x, y, canvasHeight - 705, 0.7, color);
    }
    if (large) {
      if (createCircle) drawCircle(ctx, x, y, drawParams.sixty, color);
      if (createRectangle) drawRectangle(ctx, x, y, drawParams.fifty, drawParams.sixty, color);
      if (createRetangleOutline) drawRectangleOutlines(ctx, x, y, drawParams.twentyFive, drawParams.sixty, color);
      if (createCircleOutline) drawCircleOutlines(ctx, x + drawParams.twenty, y + drawParams.twenty, drawParams.sixty, color);
      if (createLine) drawLine(ctx, x, y, canvasHeight-685, 0.9, color);
    }
    if(random){
      if (createCircle) drawCircle(ctx, x, y, getRandomInt(drawParams.five,drawParams.sixty), color);
      if (createRectangle) drawRectangle(ctx, x, y, getRandomInt(drawParams.five,drawParams.sixty), getRandomInt(drawParams.five,drawParams.sixty), color);
      if (createRetangleOutline) drawRectangleOutlines(ctx, x, y, getRandomInt(drawParams.five,drawParams.twentyFive), getRandomInt(drawParams.twentyFive,drawParams.sixty), color);
      if (createCircleOutline) drawCircleOutlines(ctx, x + drawParams.twenty, y + drawParams.twenty, getRandomInt(drawParams.five,drawParams.sixty), color);
      if (createLine) drawLine(ctx, x, y, getRandomInt(drawParams.fifty,canvasHeight-685), 0.9, color);
    }
  }

  // helpers
  function dtr(degrees) {
    return degrees * (Math.PI / 180);
  }
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 10)) + min;
  }

  function getRandomColor() {
    const getByte = _ => 55 + Math.round(Math.random() * 200);
    return `rgba(${getByte()},${getByte()},${getByte()},.8)`;
  }

  function cls() {

    x = 0, y = 0, r = 0, a = 0, n = 0;
    ctx.clearRect(drawParams.zero, drawParams.zero, canvasWidth, canvasHeight);
    ctx.fillRect(drawParams.zero, drawParams.zero, canvasWidth, canvasHeight);

  }


  function drawRectangle(ctx, x, y, width, height, color) {
    ctx.save();
    //if(hsl2) color = `hsl(${n / 5 % 361},100%,50%)`;



    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.closePath();
    ctx.fill();
    // if (lineWidth > 0) {
    //     ctx.lineWidth = lineWidth;
    //     ctx.strokeStyle = strokeStyle;
    //     ctx.stroke();
    // }
    //ctx.fillRect(20, 20, 200, 100);

    ctx.restore();


  }

  function drawRectangleOutlines(ctx, x, y, x2, y2, color) {

    ctx.save();
    colorOutline = color;
    ctx.strokeStyle = colorOutline;
    // See SG-2 for rest of code
    ctx.strokeRect(x, y, x2, y2);
    //ctx.lineTo(x1, y1);

    ctx.restore();



  }

  function drawCircleOutlines(ctx, x, y, radius, color) {

    ctx.save();
    // let color = `hsl(${n / 5 % 361},100%,50%)`;
    colorOutline = color;
    ctx.strokeStyle = colorOutline;
    ctx.beginPath();
    ctx.arc(x, y, radius, drawParams.zero, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();



  }

  function drawCircle(ctx, x, y, radius, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, drawParams.zero, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawLine(ctx, mX, mY, r, theta, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    // const r = 50;
    // const theta = 0.5;
    ctx.moveTo(mX, mY);
    ctx.lineTo(mX + r * Math.cos(theta), mY + r * Math.sin(theta));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // if (lineWidth > 0) {
    //   ctx.lineWidth = lineWidth;
    //   ctx.strokeStyle = strokeStyle;
    //   ctx.stroke();
    // }
    ctx.restore();
  }

})();