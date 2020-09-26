(function() {
    "use strict";
    //Global variables
    const canvasWidth = 1040,
        canvasHeight = 780;

    let x = 0,
        y = 0,
        a = 0,
        r = 0;

    let color
    let ctx;
    let n = 0;
    let divergence;
    const c = 3;
    let hsl1 = false,
        rgb1 = false,
        linGrad = false,
        hsl2 = false,
        rgb2 = false,
        radGrad = false,
        div = false,
        fp = false,
        col = false,
        shape = false,
        pre1 = false,
        pre2 = false,
        pre3 = false,
        pre4 = false;
    let paused = true,
        clear = false;
    let small = false,
        medium = false,
        large = false,
        random = false;
    let createCircle = false,
        createRectangle = false,
        createLine = false,
        createRetangleOutline = false,
        createCircleOutline = false;
    let fps;

    const drawParams = Object.freeze({
        "zero": 0,
        "twenty": 20,
        "sixty": 60,
        "ten": 10,
        "five": 5,
        "thirtyFive": 35,
        "fifty": 50,
        "twentyFive": 25,
        "fifteen": 15,
        "two": 2,
        "Div1": -137.5,
        "Div2": -137.6,
        "Div3": -137.3,
        "Div4": 192,
    });

    window.onload = init;

    //Event handlers for controls and sets up canvas
    function init() {
        ctx = canvas.getContext("2d");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        ctx.fillRect(drawParams.zero, drawParams.zero, canvasWidth, canvasHeight);


        document.querySelector("#playButton").onclick = function() {
            paused = false;
            this.disabled = true;
            loop();
        };

        document.querySelector("#pauseButton").onclick = function() {
            paused = true;
            document.querySelector("#playButton").disabled = false;
        };

        document.querySelector("#clearButton").onclick = function() {
            clear = true;
            paused = true;
            document.querySelector("#playButton").disabled = false;
            cls(ctx);
        };

        let button = document.querySelector("#btn-download");
        button.addEventListener('click', function() {
            var dataURL = canvas.toDataURL('image/png');
            button.href = dataURL;
        });

        document.querySelector("#circlesCB").onchange = function(e) {
            createCircle = e.target.checked;
            shape = true;
        };
        document.querySelector("#rectanglesCB").onchange = function(e) {
            createRectangle = e.target.checked;
            shape = true;
        };

        document.querySelector("#rectangleOutlineCB").onchange = function(e) {
            createRetangleOutline = e.target.checked;
            shape = true;
        };
        document.querySelector("#circleOutlineCB").onchange = function(e) {
            createCircleOutline = e.target.checked;
            shape = true;
        };

        document.querySelector("#lineCB").onchange = function(e) {
            createLine = e.target.checked;
            shape = true;
        };

        document.querySelector("#small").onchange = function(e) {
            small = e.target.checked;
            medium = false;
            random = false;
            large = false;

        };

        document.querySelector("#medium").onchange = function(e) {
            medium = e.target.checked;
            small = false;
            random = false;
            large = false;

        };

        document.querySelector("#large").onchange = function(e) {
            large = e.target.checked;
            medium = false;
            random = false;
            small = false;

        };

        document.querySelector("#random").onchange = function(e) {
            random = e.target.checked;
            medium = false;
            small = false;
            large = false;

        };

        document.querySelector("#fpsRange").onchange = function(e) {
            fp = true;
            fps = e.target.value;
            let output = document.querySelector("#fpsValue");
            let slider = document.querySelector("#fpsRange");
            output.innerHTML = slider.value;

            slider.oninput = function() {
                output.innerHTML = e.target.value;
            }
        };


        document.querySelector("#divRange").onchange = function(e) {
            div = true;
            divergence = e.target.value;
            let divOutput = document.querySelector("#divValue");
            let divSlider = document.querySelector("#divRange");
            divOutput.innerHTML = divSlider.value;

            divSlider.oninput = function() {
                divOutput.innerHTML = e.target.value;
            }
        };

        document.querySelector("#hslButton").onclick = function() {
            col = true;
            hsl1 = true;
            hsl2 = false;
            rgb1 = false;
            linGrad = false;
            radGrad = false;
        }

        document.querySelector("#hsl2Button").onclick = function() {
            col = true;
            hsl1 = false;
            hsl2 = true;
            rgb1 = false;
            linGrad = false;
            radGrad = false;
        }

        document.querySelector("#rgbButton").onclick = function() {
            col = true;
            hsl1 = false;
            hsl2 = false;
            rgb1 = true;
            linGrad = false;
            radGrad = false;
        }

        document.querySelector("#rgb2Button").onclick = function() {
            col = true;
            hsl1 = false;
            hsl2 = false;
            rgb1 = false;
            rgb2 = true;
            linGrad = false;
            radGrad = false;
        }

        document.querySelector("#linGradButton").onclick = function() {
            col = true;
            hsl1 = false;
            hsl2 = false;
            rgb1 = false;
            rgb2 = false;
            linGrad = true;
            radGrad = false;
        }

        document.querySelector("#radGradButton").onclick = function() {
            col = true;
            hsl1 = false;
            hsl2 = false;
            rgb1 = false;
            rgb2 = false;
            linGrad = false;
            radGrad = true;
        }

        document.querySelector("#Preset1").onclick = function() {
            div = false;
            pre1 = true;
            pre2 = false;
            pre3 = false;
            pre4 = false;
        }

        document.querySelector("#Preset2").onclick = function() {
            div = false;
            pre1 = false;
            pre2 = true;
            pre3 = false;
            pre4 = false;
        }

        document.querySelector("#Preset3").onclick = function() {
            div = false;
            pre1 = false;
            pre2 = false;
            pre3 = true;
            pre4 = false;
        }

        document.querySelector("#Preset4").onclick = function() {
                div = false;
                pre1 = false;
                pre2 = false;
                pre3 = false;
                pre4 = true;
            }
            //Handles mouse click events
        canvas.onclick = canvasClicked;
    }

    //Loop to create phyllotaxis and sets user controls to edit design (color, shape, size, fps)
    function loop(x, y) {
        if (paused) return;

        setTimeout(loop, fps / drawParams.two);
        n++;

        if (div == false || pre1 == true) divergence = drawParams.Div1;;
        if (pre2) divergence = drawParams.Div2;
        if (pre3) divergence = drawParams.Div3;
        if (pre4) divergence = drawParams.Div4;
        if (fp == false) fps = drawParams.fifty;
        if (col == false) {
            color = `hsl(${n / 5 % 361},100%,50%)`;
        } else if (col) {
            if (hsl1) {
                color = nltLIB.hsl1Type(ctx, color, n);
            } else if (hsl2) {
                color = nltLIB.hsl2Type(ctx, color, n);
            } else if (rgb1) {
                color = nltLIB.rgb1Type(ctx, color, n);
            } else if (rgb2) {
                color = nltLIB.rgb2Type(ctx, color, n);
            } else if (linGrad) {
                color = nltLIB.linGradType(ctx, color);
            } else if (radGrad) {
                color = nltLIB.radGradType(ctx, color);
            }
        }
        if (shape == false) createRectangle = true;
        a = n * nltLIB.dtr(divergence);
        r = c * Math.sqrt(n);

        x = r * Math.cos(a) + canvasWidth / drawParams.two;
        y = r * Math.sin(a) + canvasHeight / drawParams.two;

        small = true;

        if (small) {
            if (createCircle) nltLIB.drawCircle(ctx, x + drawParams.ten, y + drawParams.twenty, drawParams.five, color);
            if (createRectangle) nltLIB.drawRectangle(ctx, x + drawParams.fifteen, y + drawParams.twenty, drawParams.five, drawParams.five, color);
            if (createRetangleOutline) nltLIB.drawRectangleOutlines(ctx, x, y + drawParams.ten, drawParams.ten, drawParams.ten, color);
            if (createCircleOutline) nltLIB.drawCircleOutlines(ctx, x + drawParams.fifteen, y + drawParams.twenty, drawParams.five, color);
            if (createLine) nltLIB.drawLine(ctx, x, y, drawParams.fifty, 0.5, color);
        }
        if (medium) {
            if (createCircle) nltLIB.drawCircle(ctx, x + drawParams.twentyFive, y, drawParams.thirtyFive, color);
            if (createRectangle) nltLIB.drawRectangle(ctx, x + drawParams.ten, y, drawParams.thirtyFive, drawParams.thirtyFive, color);
            if (createRetangleOutline) nltLIB.drawRectangleOutlines(ctx, x + drawParams.ten, y, drawParams.thirtyFive, drawParams.thirtyFive, color);
            if (createCircleOutline) nltLIB.drawCircleOutlines(ctx, x + drawParams.twenty, y + drawParams.twenty, drawParams.thirtyFive, color);
            if (createLine) nltLIB.drawLine(ctx, x - drawParams.ten, y, canvasHeight - 705, 0.7, color);
        }
        if (large) {
            if (createCircle) nltLIB.drawCircle(ctx, x, y, drawParams.sixty, color);
            if (createRectangle) nltLIB.drawRectangle(ctx, x, y, drawParams.fifty, drawParams.sixty, color);
            if (createRetangleOutline) nltLIB.drawRectangleOutlines(ctx, x + drawParams.fifty, y, drawParams.twentyFive, drawParams.sixty, color);
            if (createCircleOutline) nltLIB.drawCircleOutlines(ctx, x + drawParams.twenty, y + drawParams.twenty, drawParams.sixty, color);
            if (createLine) nltLIB.drawLine(ctx, x + 10, y, canvasHeight - 685, 0.9, color);
        }
        if (random) {
            if (createCircle) nltLIB.drawCircle(ctx, x, y, nltLIB.getRandomInt(drawParams.five, drawParams.sixty), color);
            if (createRectangle) nltLIB.drawRectangle(ctx, x, y, nltLIB.getRandomInt(drawParams.five, drawParams.sixty), nltLIB.getRandomInt(drawParams.five, drawParams.sixty), color);
            if (createRetangleOutline) nltLIB.drawRectangleOutlines(ctx, x, y, nltLIB.getRandomInt(drawParams.five, drawParams.twentyFive), nltLIB.getRandomInt(drawParams.twentyFive, drawParams.sixty), color);
            if (createCircleOutline) nltLIB.drawCircleOutlines(ctx, x + drawParams.twenty, y + drawParams.twenty, nltLIB.getRandomInt(drawParams.five, drawParams.sixty), color);
            if (createLine) nltLIB.drawLine(ctx, x, y, nltLIB.getRandomInt(drawParams.fifty, canvasHeight - 685), 0.9, color);
        }
    }

    //Handles mouse click events to further edit the design
    function canvasClicked(e) {
        setTimeout(canvasClicked, fps / drawParams.two);
        n++
        let rect = e.target.getBoundingClientRect();
        let mouseX = e.clientX - rect.x;
        let mouseY = e.clientY - rect.y;

        a = n * nltLIB.dtr(divergence);
        r = c * Math.sqrt(n);

        x = mouseX + r * Math.cos(a) + canvasWidth / drawParams.two;
        y = mouseY + r * Math.sin(a) + canvasHeight / drawParams.two;

        loop(x, y)
    }

    //Clears canavas and resets all values
    function cls(ctx) {
        x = 0, y = 0, r = 0, a = 0, n = 0;
        hsl1 = false, rgb1 = false, linGrad = false, hsl2 = false, rgb2 = false, radGrad = false, div = false, fp = false, col = false, shape = false, pre1 = false, pre2 = false, pre3 = false, pre4 = false;
        ctx.clearRect(drawParams.zero, drawParams.zero, canvasWidth, canvasHeight);
        ctx.fillRect(drawParams.zero, drawParams.zero, canvasWidth, canvasHeight);
    }

})();