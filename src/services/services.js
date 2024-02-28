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
      }),
    }
  );
  return response.json();
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
  return response.json();
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
  return response.json();
};

export const deleteItem = async (itemId) => {
  const response = await fetch(
    `https://grocery-server-100500-002e71001da6.herokuapp.com/items/${itemId}`,
    {
      method: "DELETE",
    }
  );
  return response.json();
};
