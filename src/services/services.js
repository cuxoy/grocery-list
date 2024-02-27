export const fetchItems = async () => {
  const response = await fetch("http://localhost:3001/items");
  return response.json();
};

export const addItem = async ({ itemName, itemPrice }) => {
  const response = await fetch("http://localhost:3001/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: itemName,
      isBought: false,
      price: +itemPrice,
    }),
  });
  return response.json();
};

export const toggleIsBought = async ({ id, isBought }) => {
  const response = await fetch(`http://localhost:3001/items/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isBought }),
  });
  return response.json();
};

export const editItem = async ({ id, isBought, name, price }) => {
  const response = await fetch(`http://localhost:3001/items/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isBought: isBought, name, price: +price }),
  });
  return response.json();
};

export const deleteItem = async (itemId) => {
  const response = await fetch(`http://localhost:3001/items/${itemId}`, {
    method: "DELETE",
  });
  return response.json();
};
