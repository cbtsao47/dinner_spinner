import React, { useEffect } from "react";

export default function VanillaWheel() {
  // To get good sizing for the roulette wheel
  const size = document.body.clientWidth * 0.6;

  // If spinning === true, then the spinner will not spin again. Keeps the user from continuously spinning
  let spinning = false;

  // options will contain the restaurant names
  const options = [
    "McDonald's", "Wendy's", "Starbucks", "The greatest thing ever", "w", "w", "w", "Pal's Pizza Emporioum"
  ];

  let startAngle = 0;
  let arc = Math.PI / (options.length / 2);
  let spinTimeout = null;

//   let spinArcStart = 10; // This variable was included from the Codepen, but is never used
  let spinTime = 0;
  let spinTimeTotal = 0;

  let ctx;

  // Takes a decimal value and converts it to hexidecimal
  function byte2Hex(n) {
    const nybHexString = "0123456789ABCDEF";
    return (
      String(nybHexString.substr((n >> 4) & 0x0f, 1)) +
      nybHexString.substr(n & 0x0f, 1)
    );
  }

  // calls the function above and creates a full hex string for color
  function RGB2Color(r, g, b) {
    return "#" + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
  }

  // Funky math to create a color gradient
  function getColor(item, maxitem) {
    const phase = 0;
    const center = 128;
    const width = 127;
    const frequency = (Math.PI * 2) / maxitem;

    const red = Math.sin(frequency * item + 2 + phase) * width + center;
    const green = Math.sin(frequency * item + 0 + phase) * width + center;
    const blue = Math.sin(frequency * item + 4 + phase) * width + center;

    return RGB2Color(red, green, blue);
  }

  // Drawing the initial roulette wheel
  function drawRouletteWheel() {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
      const outsideRadius = size / 2.5;
      const textRadius = outsideRadius/1.7;
      const insideRadius = 40;

      ctx = canvas.getContext("2d");
      canvas.height = canvas.width;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;

      ctx.font = "bold 12px Helvetica, Arial";

      for (let i = 0; i < options.length; i++) {
        const angle = startAngle + i * arc;
        //ctx.fillStyle = colors[i];
        ctx.fillStyle = getColor(i, options.length);

        // Creating the borders and colors for the wheel
        ctx.beginPath();
        ctx.arc(size/2, size/2, outsideRadius, angle, angle + arc, false);
        ctx.arc(size/2, size/2, insideRadius, angle + arc, angle, true);
        ctx.stroke();
        ctx.fill();

        // Creating the text in the wheel
        ctx.save();
        ctx.shadowOffsetX = -1;
        ctx.shadowOffsetY = -1;
        ctx.shadowBlur = 0;
        ctx.shadowColor = "#AAAAAA";
        ctx.fillStyle = "black";
        const text = options[i];
        console.log(text.length)
        ctx.translate(
          (size/2) + Math.cos(angle + arc / 2) * textRadius,
          (size/2) + Math.sin(angle + arc / 2) * textRadius
        );
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        ctx.rotate(-Math.PI / 2);
        // ctx.translate(-text.length*3, 0);
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
      }

      //Arrow
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
      ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
      ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
      ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
      ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
      ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
      ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
      ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
      ctx.fill();
    }
  }

  let spinAngleStart = Math.random() * 10 + 10;
  function spin() {
    spinning = true;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 1000;
    rotateWheel();
  }

  function rotateWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
      stopRotateWheel();
      return;
    }
    let spinAngle =
      spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI) / 180;
    drawRouletteWheel();
    spinTimeout = setTimeout(rotateWheel, 30);
  }

  function stopRotateWheel() {
    clearTimeout(spinTimeout);
    const degrees = (startAngle * 180) / Math.PI + 90;
    const arcd = (arc * 180) / Math.PI;
    const index = Math.floor((360 - (degrees % 360)) / arcd);

    // SEND THIS BACK TO APP FOR RESTAURANT INFO
    ctx.save();
    ctx.font = "bold 30px Helvetica, Arial";
    const text = options[index];
    ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
    ctx.restore();
    spinning = false;
  }

  function easeOut(t, b, c, d) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  }

  useEffect(() => {
    drawRouletteWheel();
  }, []);

  return (
    <div>
      <canvas id="canvas" width={`${size}`} height={`${size}`} />
      <button id="spin" onClick={() => !spinning && spin()}>SPIN</button>
    </div>
  );
}
