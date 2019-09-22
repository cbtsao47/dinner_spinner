import React from "react";
import "./Roulette.scss";
import MDSpinner from "react-md-spinner";
export default function Roulette({
  updateSelected,
  spinning,
  handleClick,
  restaurants
}) {
  const data = restaurants.map(restaurant => restaurant.name);

  // We have a total time. We slowly subtract from this, and once we hit zero we stop our roulette.
  let spinTimeTotal = 0;

  // How many times we've spun
  let spinCount;

  // The variable that keeps our roulette going. When the roulette stops, we clearInterval(spinTimer)
  let spinTimer;

  // The parent element and the children elements
  let parent;
  let children;

  const spinStart = () => {
    // If we've spun before, this resets the "winner" styling
    const winner = document.getElementById("big-n-bold");
    winner.style.border = null;

    // Setting init variables
    spinCount = 0;
    handleClick(true);
    spinTimeTotal = Math.random() * 3000 + 8 * 1000;
    parent = document.getElementById("parent");
    children = Array.from(parent.children);
    spin();
  };

  const spin = () => {
    spinCount++;
    const slowDown =
      50 +
      Math.pow(1.3, spinCount - 15 - Math.random() * 10 - Math.random() * 5);
    spinTimeTotal -= slowDown;
    // If we hit our total time, we stop
    if (spinTimeTotal <= 0) {
      spinStop();
      return;
    }

    //Update our data
    data.push(data.shift());
    // Update our children with new data
    for (let i = 0; i < 3; i++) {
      const child = children[i];
      const grandchild = child.children[0];
      grandchild.textContent = data[i];
    }
    spinTimer = setTimeout(spin, spinCount > 30 ? slowDown : 50);
  };

  const spinStop = () => {
    // clear the interval so we stop spinning
    clearInterval(spinTimer);
    // Find the element in the middle, and that is our winner! :tada:
    const winner = document.getElementById("big-n-bold");
    winner.style.border = "2px solid yellow";
    handleClick(false);
    updateSelected(winner);
  };

  return data.length ? (
    <>
      <div className="grandparent">
        <div id="parent">
          {data.slice(0, 3).map((thing, i) => {
            // The middle container should look slightly larger than the others
            if (i === 1) {
              return (
                <div className="child big-n-bold" key={i}>
                  <p id="big-n-bold">{thing}</p>
                </div>
              );
              // Normal Container style
            } else {
              return (
                <div className="child" key={i}>
                  <p>{thing}</p>
                </div>
              );
            }
          })}
        </div>
      </div>
      <button onClick={() => !spinning && spinStart()}>SPIN</button>
    </>
  ) : (
    <MDSpinner size={160} />
  );
}
