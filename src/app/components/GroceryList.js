import React, { useState } from "react";
import { useQuery, useMutation, queryCache, useQueryClient } from "react-query";
import {
  fetchItems,
  addItem,
  toggleIsBought,
  deleteItem,
  editItem,
} from "../../services/services.js";

const GroceryList = () => {
  const queryClient = useQueryClient();
  const [text, setText] = useState("");
  const [price, setPrice] = useState(0);
  const [isBought, setIsBought] = useState(false);

  const [modalText, setModalText] = useState("");
  const [modalPrice, setModalPrice] = useState(0);
  const [modalIsBought, setModalIsBought] = useState(false);

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { data: items, status, error } = useQuery("items", fetchItems);

  const sum = items
    ? items
        .filter((item) => item.isBought)
        .reduce((acc, item) => acc + item.price, 0)
    : 0;

  const potenialSum = items
    ? items.reduce((acc, item) => acc + item.price, 0)
    : 0;

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

  const editItemMutation = useMutation({
    mutationFn: editItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleModalInputChange = (e) => {
    setModalText(e.target.value);
  };

  const handleAddItem = () => {
    if (text) {
      addItemMutation.mutate({ itemName: text, itemPrice: price });
      setText("");
      setPrice(0);
    }
  };

  const handleToggleIsBought = (id) => {
    setIsBought(!isBought);
    toggleIsBoughtMutation.mutate({ id: id, isBought: isBought });
  };

  const handleDeleteItem = (id) => {
    deleteItemMutation.mutate(id);
  };

  const handleOpenPopup = (id) => {
    setSelectedItemId(id);
    const selectedItem = items.filter((item) => item.id === id);

    setModalText(selectedItem[0].name);
    setModalPrice(selectedItem[0].price);
    setModalIsBought(selectedItem[0].isBought);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedItemId(null);
    setModalText("");
  };

  const handleEditItem = () => {
    if (modalText) {
      editItemMutation.mutate({
        id: selectedItemId,
        isBought: modalIsBought,
        name: modalText,
        price: modalPrice,
      });
    }

    setIsPopupOpen(false);
    setModalText("");
    setModalPrice(0);
  };

  const handleDeleteSelectedItem = () => {
    if (selectedItemId) {
      deleteItemMutation.mutate(selectedItemId);
      setIsPopupOpen(false);
    }
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error: {error.message}</div>;

  return (
    <div>
      <input type="text" value={text} onChange={handleInputChange} />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button onClick={handleAddItem}> Add Item </button>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              textDecoration: item.isBought ? "line-through" : "none",
            }}
          >
            {item.name} {item.price && `${item.price} $`}
            <button
              onClick={() => handleToggleIsBought(item.id, item.isBought)}
            >
              {item.isBought ? "Mark Incomplete" : "Mark Complete"}
            </button>
            <button onClick={() => handleDeleteItem(item.id)}> Delete </button>
            <button onClick={() => handleOpenPopup(item.id)}>Edit</button>
          </li>
        ))}
      </ul>
      <div>{`sum: ${sum} $`}</div>
      <div>{`potencial sum: ${potenialSum} $`}</div>

      {isPopupOpen && (
        <div className="popup">
          <input
            type="text"
            value={modalText}
            onChange={handleModalInputChange}
          />
          <input
            type="number"
            value={modalPrice}
            onChange={(e) => setModalPrice(e.target.value)}
          />
          <input
            type="checkbox"
            checked={modalIsBought}
            onChange={(e) => setModalIsBought(e.target.checked)}
          />
          <button onClick={handleEditItem}>Save</button>
          <button onClick={handleDeleteSelectedItem}>Delete</button>
          <button onClick={handleClosePopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default GroceryList;
