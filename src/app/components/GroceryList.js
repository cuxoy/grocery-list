"use client";

import React, { useState } from "react";
import { useQuery, useMutation, queryCache, useQueryClient } from "react-query";

const fetchItems = async () => {
  const response = await fetch("http://localhost:3001/items");
  return response.json();
};

const addItem = async (itemName) => {
  const response = await fetch("http://localhost:3001/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: itemName, isBought: false }),
  });
  return response.json();
};

const toggleIsBought = async (itemId, isBought) => {
  const response = await fetch(`http://localhost:3001/items/${itemId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isBought: !isBought }),
  });
  return response.json();
};

const deleteItem = async (itemId) => {
  const response = await fetch(`http://localhost:3001/items/${itemId}`, {
    method: "DELETE",
  });
  return response.json();
};

const GroceryList = () => {
  const queryClient = useQueryClient();
  const [text, setText] = useState("");
  const { data: items, status, error } = useQuery("items", fetchItems);

  const addItemMutation = useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const toggleIsBoughtMutation = useMutation({
    mutationFn: toggleIsBought,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleAddItem = () => {
    if (text) {
      addItemMutation.mutate(text);
      setText("");
    }
  };

  const handleToggleIsBought = (id, isBought) => {
    toggleIsBoughtMutation.mutate(id, isBought);
  };

  const handleDeleteItem = (id) => {
    deleteItemMutation.mutate(id);
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error: {error.message}</div>;

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
            {item.name}
            <button
              onClick={() => handleToggleIsBought(item.id, item.isBought)}
            >
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
