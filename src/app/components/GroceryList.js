import React, { useState } from "react";
import { useQuery, useMutation, queryCache, useQueryClient } from "react-query";
import FilterButtons from "./FilterButtons.js";
import Item from "./Item.js";
import PopUp from "./PopUp.js";
import {
  fetchItems,
  addItem,
  toggleIsBought,
  deleteItem,
  editItem,
} from "../../services/services.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  List,
} from "@mui/material";

const GroceryList = () => {
  // Створення обгортки MUI
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3d5eecde",
      },
      secondary: {
        main: "#b1bff9de",
      },
    },
  });

  //Створення змінної для інвалідації(для оновлення), отримання items та статусів запиту

  const queryClient = useQueryClient();
  const { data: items, status, error } = useQuery("items", fetchItems);

  // Стейт для контролю створення нового продукту

  const [text, setText] = useState("");
  const [price, setPrice] = useState(0);

  // Стейт для контролю зміни  продукту

  const [modalText, setModalText] = useState("");
  const [modalPrice, setModalPrice] = useState(0);
  const [modalIsBought, setModalIsBought] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState();

  // стейт фільтрації

  const [isBoughtList, setIsBoughtList] = useState(null);

  // Стейт для відкриття поп-ап

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Створення "мутацій" для додавання, зміни, видалення продуктів

  const addItemMutation = useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      setText("");
      setPrice(0);
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

  // функції виклику додавання, зміни, видалення продуктів

  const handleAddItem = () => {
    if (text) {
      addItemMutation.mutate({ itemName: text, itemPrice: price });
    }
  };

  const handleToggleIsBought = (id, isBought) => {
    toggleIsBoughtMutation.mutate({ id: id, isBought: !isBought });
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

  // фунції виклику змін фільтру і налаштування суми і потенційної суми

  const handleShowBoughtItems = () => {
    setIsBoughtList(true);
  };

  const handleShowNotBoughtItems = () => {
    setIsBoughtList(false);
  };

  const handleShowAllItems = () => {
    setIsBoughtList(null);
  };

  let filteredItems = items;
  if (isBoughtList !== null) {
    filteredItems = items.filter((item) => item.isBought === isBoughtList);
  }

  let filteredSum = 0;
  let filteredPotenialSum = 0;

  if (filteredItems && filteredItems.length > 0) {
    filteredSum = filteredItems
      .filter((item) => item.isBought)
      .reduce((acc, item) => acc + item.price, 0);

    filteredPotenialSum = filteredItems.reduce(
      (acc, item) => acc + item.price,
      0
    );
  }

  // встроєна в react query відмальовка загрузки і помилки загрузки

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error: {error.message}</div>;

  // Відмальовка нашого компоненту

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Grocery List</Typography>
          </Toolbar>
        </AppBar>
        <FilterButtons
          isBoughtList={isBoughtList}
          handleShowBoughtItems={handleShowBoughtItems}
          handleShowNotBoughtItems={handleShowNotBoughtItems}
          handleShowAllItems={handleShowAllItems}
        />
        <TextField
          label="Item Name"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          fullWidth
          style={{ marginBottom: 10 }}
        />
        <TextField
          label="Item Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          style={{ marginBottom: 10 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddItem}>
          Add Item
        </Button>
        <List style={{ marginTop: 20 }}>
          {filteredItems.map((item, i) => (
            <Item
              item={item}
              handleToggleIsBought={handleToggleIsBought}
              handleDeleteItem={handleDeleteItem}
              handleOpenPopup={handleOpenPopup}
              i={i}
            />
          ))}
        </List>
        <div style={{ marginTop: 20 }}>
          {(isBoughtList == null || isBoughtList) && (
            <Typography
              fontWeight={700}
              variant="body1"
            >{`Cost amount: ${filteredSum} $`}</Typography>
          )}
          {(isBoughtList == null || !isBoughtList) && (
            <Typography variant="body2">{`Potential cost amount: ${filteredPotenialSum} $`}</Typography>
          )}
        </div>
        <PopUp
          isPopupOpen={isPopupOpen}
          handleClosePopup={handleClosePopup}
          setModalText={setModalText}
          setModalPrice={setModalPrice}
          setModalIsBought={setModalIsBought}
          modalText={modalText}
          modalPrice={modalPrice}
          modalIsBought={modalIsBought}
          handleEditItem={handleEditItem}
          handleDeleteSelectedItem={handleDeleteSelectedItem}
        />
      </Container>
    </ThemeProvider>
  );
};

export default GroceryList;
