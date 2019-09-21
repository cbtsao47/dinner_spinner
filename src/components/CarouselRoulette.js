import React from "react";

export default function CarouselRoulette() {
    const array = ["1", "2", "3", "4"]

    return (
        <div>
            {array.map((item, i) => {
                return (
                    <div className="card" key={i} >
                        <p>{item}</p>
                    </div>
                )
            })}
        </div>
    )
}