import { v4 } from "uuid";

export const fetchItems = async () => {
  const response = await fetch(
    "https://grocery-server-100500-002e71001da6.herokuapp.com/items"
  );
  return response.json();
};

export const addItem = async ({ itemName, itemPrice }) => {
  const response = await fetch(
    "https://grocery-server-100500-002e71001da6.herokuapp.com/items",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: itemName,
        isBought: false,
        price: +itemPrice,
        id: v4(),
      }),
    }
  );
};

export const toggleIsBought = async ({ id, isBought }) => {
  const response = await fetch(
    `https://grocery-server-100500-002e71001da6.herokuapp.com/items/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isBought }),
    }
  );
};

export const editItem = async ({ id, isBought, name, price }) => {
  const response = await fetch(
    `https://grocery-server-100500-002e71001da6.herokuapp.com/items/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isBought: isBought, name, price: +price }),
    }
  );
};

export const deleteItem = async (id) => {
  const response = await fetch(
    `https://grocery-server-100500-002e71001da6.herokuapp.com/items/${id}`,
    {
      method: "DELETE",
    }
  );
};
