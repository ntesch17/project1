
(function () {
    const canvasHeight = 780;
    const drawParams = Object.freeze({
        "zero":0,
        "twenty":20,
        "ten":10,
        "fifty":50,
        "twentyFive":25,
        "fifteen":15,
        "two":2,
    });
    
    let nltLIB = {
        // helpers
        dtr(degrees) {
            return degrees * (Math.PI / 180);
        },
        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 10)) + min;
        },

        getRandomColor() {
            const getByte = _ => 55 + Math.round(Math.random() * 200);
            return `rgba(${getByte()},${getByte()},${getByte()},.8)`;
        },

        hsl1Type(ctx,color, n) {
            ctx.globalAlpha = 1;
            return color = `hsl(${n / 5 % 361},100%,50%)`;
        },

        hsl2Type(ctx,color, n) {
            ctx.globalAlpha = 1;
            return color = `hsl(${n / nltLIB.getRandomInt(drawParams.two, drawParams.ten) % 361},100%,50%)`;
        },

        rgb1Type(ctx,color, n) {
            ctx.globalAlpha = 1;
            return color = `rgb(${n % 256},80,${nltLIB.getRandomInt(drawParams.zero, 255)})`;
        },

        rgb2Type(ctx,color, n) {
            ctx.globalAlpha = 1;
            return color = `rgb(${n / 30 % 256},${nltLIB.getRandomInt(drawParams.twenty, 150)},${nltLIB.getRandomInt(100, 255)})`;
        },

        linGradType(ctx, color) {
            color = ctx.createLinearGradient(canvasHeight - 280, drawParams.twentyFive, canvasHeight - 380, 50);
            color.addColorStop(0, nltLIB.getRandomColor());
            color.addColorStop(1 / 6, nltLIB.getRandomColor());
            color.addColorStop(2 / 6, nltLIB.getRandomColor());
            color.addColorStop(3 / 6, nltLIB.getRandomColor());
            color.addColorStop(4 / 6, nltLIB.getRandomColor());
            color.addColorStop(5 / 6, nltLIB.getRandomColor());
            ctx.globalAlpha = 1;
            return color;
        },

        radGradType(ctx, color) {
            color = ctx.createRadialGradient(drawParams.fifteen, canvasHeight - 630, canvasHeight - 630, canvasHeight - 530, canvasHeight - 530, canvasHeight - 630);
            color.addColorStop(0, nltLIB.getRandomColor());
            color.addColorStop(1 / 6, nltLIB.getRandomColor());
            color.addColorStop(2 / 6, nltLIB.getRandomColor());
            color.addColorStop(3 / 6, nltLIB.getRandomColor());
            color.addColorStop(4 / 6, nltLIB.getRandomColor());
            color.addColorStop(5 / 6, nltLIB.getRandomColor());
            ctx.globalAlpha = nltLIB.getRandomInt(0.2,0.5);
            return color;
        },

        drawRectangle(ctx, x, y, width, height, color) {
            ctx.save();
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.rect(x, y, width, height);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        },

        drawRectangleOutlines(ctx, x, y, x2, y2, color) {

            ctx.save();
            ctx.strokeStyle = color;
            ctx.strokeRect(x, y, x2, y2);
            ctx.restore();
        },

        drawCircleOutlines(ctx, x, y, radius, color) {

            ctx.save();
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        },

        drawCircle(ctx, x, y, radius, color) {
            ctx.save();
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        },

        drawLine(ctx, mX, mY, r, theta, color) {
            ctx.save();
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(mX, mY);
            ctx.lineTo(mX + r * Math.cos(theta), mY + r * Math.sin(theta));
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }
    };
    if (window) {
        window["nltLIB"] = nltLIB;
    }
    else {
        throw "'Window is not Defined!'";
    }


})();