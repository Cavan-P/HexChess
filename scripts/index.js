function drawHexagon(ctx, x, y, size, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    for (let i = 0; i < 6; i++) {
      const angleRad = (60 * i) * Math.PI / 180;
      const x_i = x + size * Math.cos(angleRad);
      const y_i = y + size * Math.sin(angleRad);
      if (i === 0) {
        ctx.moveTo(x_i, y_i);
      } else {
        ctx.lineTo(x_i, y_i);
      }
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function drawHexagonalChessboard(canvasId, hexagonSize) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Pointy-top oriented hexagon pattern
    const rows = [1, 2, 3, 4, 5, 6, 5, 6, 5, 6, 5, 6, 5, 6, 5, 6, 5, 4, 3, 2, 1];

    const colOffset = hexagonSize * 3; // Horizontal distance between columns (approximately sqrt(3) * hexagonSize)
    const rowOffset = hexagonSize * Math.sqrt(3) / 2; // Vertical distance between rows

    // Base color (warm orange-brown)
    const baseHue = 30; // Brown-orange hue value (30 degrees on the color wheel)
    const saturation = 70; // Saturation value (70%)
    const baseLightness = 50; // Base lightness value

    // Slight variations in brightness for the darker and lighter colors
    const darkLightness = baseLightness - 10;
    const lightLightness = baseLightness + 10;

    let y = centerY - ((rows.length - 1) * rowOffset) / 2;
    let colorIndex = 0;

    for (let row = 0; row < rows.length; row++) {
      const numCols = rows[row];
      let x = centerX - ((numCols - 1) * colOffset) / 2;

      let lightness;
      switch (colorIndex) {
        case 0:
          lightness = baseLightness;
          break;
        case 1:
          lightness = darkLightness;
          break;
        case 2:
          lightness = lightLightness;
          break;
      }

      for (let col = 0; col < numCols; col++) {
        const color = `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
        drawHexagon(ctx, x, y, hexagonSize, color);
        x += colOffset;
      }

      y += rowOffset;
      // Update color index for the next row
      colorIndex = (colorIndex + 1) % 3;
    }
  }

  drawHexagonalChessboard('chessboard', 20);