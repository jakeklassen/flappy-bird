export const circleRectangleIntersects = (
  circleX: number,
  circleY: number,
  radius: number,
  rectangleX: number,
  rectangleY: number,
  rectangleWidth: number,
  rectangleHeight: number,
) => {
  // our test point, start with the circle's position
  let testX = circleX;
  let testY = circleY;

  // which edge is closest?

  if (circleX < rectangleX) {
    // left edge
    testX = rectangleX;
  } else if (circleX > rectangleX + rectangleWidth) {
    // right edge
    testX = rectangleX + rectangleWidth;
  }

  if (circleY < rectangleY) {
    // top edge
    testY = rectangleY;
  } else if (circleY > rectangleY + rectangleHeight) {
    // bottom edge
    testY = rectangleY + rectangleHeight;
  }

  // get distance from closest edges

  // length of side a
  const distX = circleX - testX;
  // length of side b
  const distY = circleY - testY;
  // hypotenuse
  const distance = Math.sqrt(distX * distX + distY * distY);

  // if the distance is less than the radius, collision!
  if (distance <= radius) {
    return true;
  }

  return false;
};
