import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { showCoffees } from "../features/coffeeSlice";

import Header from "./Header";

const Coffees = () => {
  const dispatch = useDispatch();
  const { coffees, coffee } = useSelector((state) => state.coffees);
  console.log("Coffees:", coffees[1]);
  console.log(coffee);

  useEffect(() => {
    dispatch(showCoffees());
  }, [dispatch]);

  const coffeeData = useSelector((state) => {
    return state.coffees.coffees;
  });

  console.log("load coffees data", coffeeData);

  return (
    <div>
      <Header />
      <div className="display">
        {coffeeData.map((coffee) => (
          <div className="card" key={coffee._id}>
            <h4>
              <b>{coffee.name}</b>
            </h4>
            <img src={coffee.image} style={{ width: "50%" }} />
            <div className="container">
              <h4>
                <br />
                <b>${coffee.price}</b>
              </h4>
              <div className="btn_display">
                <button className="btn_delete">Delete</button>
                <Link to={`/editcoffee/${coffee._id}`}>
                  <button className="btn_edit">Edit</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coffees;
