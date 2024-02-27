"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, toggleIsBought, deleteItem } from "@/redux/slice";

const GroceryList = () => {
  const [text, setText] = useState("");
  const items = useSelector((state) => state.groceryList);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleAddItem = () => {
    if (text) {
      dispatch(addItem(text));
      setText("");
    }
  };

  const handleToggleIsBought = (id) => {
    dispatch(toggleIsBought(id));
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleInputChange} />
      <button onClick={handleAddItem}> Add Item </button>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              textDecoration: item.isBought ? "line-through" : "none",
            }}
          >
            {item.text}
            <button onClick={() => handleToggleIsBought(item.id)}>
              {item.isBought ? "Mark Incomplete" : "Mark Complete"}
            </button>
            <button onClick={() => handleDeleteItem(item.id)}> Delete </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroceryList;
