// import React, { useState } from "react";
// import { useQuery, useMutation, queryCache, useQueryClient } from "react-query";
// import {
//   fetchItems,
//   addItem,
//   toggleIsBought,
//   deleteItem,
//   editItem,
// } from "../../services/services.js";

// const GroceryList = () => {
//   const queryClient = useQueryClient();
//   const { data: items, status, error } = useQuery("items", fetchItems);

//   const [text, setText] = useState("");
//   const [price, setPrice] = useState(0);
//   const [isBought, setIsBought] = useState(false);

//   const [isBoughtList, setIsBoughtList] = useState(null);

//   const [modalText, setModalText] = useState("");
//   const [modalPrice, setModalPrice] = useState(0);
//   const [modalIsBought, setModalIsBought] = useState(false);

//   const [selectedItemId, setSelectedItemId] = useState(null);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   const sum = items
//     ? items
//         .filter((item) => item.isBought)
//         .reduce((acc, item) => acc + item.price, 0)
//     : 0;

//   const potenialSum = items
//     ? items.reduce((acc, item) => acc + item.price, 0)
//     : 0;

//   const addItemMutation = useMutation({
//     mutationFn: addItem,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["items"] });
//     },
//   });

//   const toggleIsBoughtMutation = useMutation({
//     mutationFn: toggleIsBought,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["items"] });
//     },
//   });

//   const deleteItemMutation = useMutation({
//     mutationFn: deleteItem,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["items"] });
//     },
//   });

//   const editItemMutation = useMutation({
//     mutationFn: editItem,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["items"] });
//     },
//   });

//   const handleInputChange = (e) => {
//     setText(e.target.value);
//   };

//   const handleModalInputChange = (e) => {
//     setModalText(e.target.value);
//   };

//   const handleAddItem = () => {
//     if (text) {
//       addItemMutation.mutate({ itemName: text, itemPrice: price });
//       setText("");
//       setPrice(0);
//     }
//   };

//   const handleToggleIsBought = (id) => {
//     setIsBought(!isBought);
//     toggleIsBoughtMutation.mutate({ id: id, isBought: isBought });
//   };

//   const handleDeleteItem = (id) => {
//     deleteItemMutation.mutate(id);
//   };

//   const handleOpenPopup = (id) => {
//     setSelectedItemId(id);
//     const selectedItem = items.filter((item) => item.id === id);

//     setModalText(selectedItem[0].name);
//     setModalPrice(selectedItem[0].price);
//     setModalIsBought(selectedItem[0].isBought);
//     setIsPopupOpen(true);
//   };

//   const handleClosePopup = () => {
//     setIsPopupOpen(false);
//     setSelectedItemId(null);
//     setModalText("");
//   };

//   const handleEditItem = () => {
//     if (modalText) {
//       editItemMutation.mutate({
//         id: selectedItemId,
//         isBought: modalIsBought,
//         name: modalText,
//         price: modalPrice,
//       });
//     }

//     setIsPopupOpen(false);
//     setModalText("");
//     setModalPrice(0);
//   };

//   const handleDeleteSelectedItem = () => {
//     if (selectedItemId) {
//       deleteItemMutation.mutate(selectedItemId);
//       setIsPopupOpen(false);
//     }
//   };

//   const handleShowBoughtItems = () => {
//     setIsBoughtList(true);
//   };

//   const handleShowNotBoughtItems = () => {
//     setIsBoughtList(false);
//   };

//   const handleShowAllItems = () => {
//     setIsBoughtList(null);
//   };

//   if (status === "loading") return <div>Loading...</div>;
//   if (status === "error") return <div>Error: {error.message}</div>;

//   let filteredItems = items;
//   if (isBoughtList !== null) {
//     filteredItems = items.filter((item) => item.isBought === isBoughtList);
//   }

//   let filteredSum = 0;
//   let filteredPotenialSum = 0;

//   if (filteredItems.length > 0) {
//     filteredSum = filteredItems
//       .filter((item) => item.isBought)
//       .reduce((acc, item) => acc + item.price, 0);

//     filteredPotenialSum = filteredItems.reduce(
//       (acc, item) => acc + item.price,
//       0
//     );
//   }

//   return (
//     <div>
//       <div>
//         <button onClick={handleShowBoughtItems}>Show Bought Items</button>
//         <button onClick={handleShowNotBoughtItems}>
//           Show Not Bought Items
//         </button>
//         <button onClick={handleShowAllItems}>Show All Items</button>
//       </div>
//       <input type="text" value={text} onChange={handleInputChange} />
//       <input
//         type="number"
//         value={price}
//         onChange={(e) => setPrice(e.target.value)}
//       />

//       <button onClick={handleAddItem}> Add Item </button>
//       <ul>
//         {filteredItems.map((item) => (
//           <li
//             key={item.id}
//             style={{
//               textDecoration: item.isBought ? "line-through" : "none",
//             }}
//           >
//             {item.name} {item.price && `${item.price} $`}
//             <button
//               onClick={() => handleToggleIsBought(item.id, item.isBought)}
//             >
//               {item.isBought ? "Mark Incomplete" : "Mark Complete"}
//             </button>
//             <button onClick={() => handleDeleteItem(item.id)}> Delete </button>
//             <button onClick={() => handleOpenPopup(item.id)}>Edit</button>
//           </li>
//         ))}
//       </ul>
//       {(isBoughtList == null || isBoughtList) && (
//         <div>{`sum: ${filteredSum} $`}</div>
//       )}
//       {(isBoughtList == null || !isBoughtList) && (
//         <div>{`potencial sum: ${filteredPotenialSum} $`}</div>
//       )}

//       {isPopupOpen && (
//         <div className="popup">
//           <input
//             type="text"
//             value={modalText}
//             onChange={handleModalInputChange}
//           />
//           <input
//             type="number"
//             value={modalPrice}
//             onChange={(e) => setModalPrice(e.target.value)}
//           />
//           <input
//             type="checkbox"
//             checked={modalIsBought}
//             onChange={(e) => setModalIsBought(e.target.checked)}
//           />
//           <button onClick={handleEditItem}>Save</button>
//           <button onClick={handleDeleteSelectedItem}>Delete</button>
//           <button onClick={handleClosePopup}>Close</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GroceryList;
import React, { useState } from "react";
import { v4 } from "uuid";
import { useQuery, useMutation, queryCache, useQueryClient } from "react-query";
import {
  fetchItems,
  addItem,
  toggleIsBought,
  deleteItem,
  editItem,
} from "../../services/services.js";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const GroceryList = () => {
  const queryClient = useQueryClient();
  const [text, setText] = useState("");
  const [price, setPrice] = useState(0);
  const [isBought, setIsBought] = useState(false);
  const [isBoughtList, setIsBoughtList] = useState(null);
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

  const handleShowBoughtItems = () => {
    setIsBoughtList(true);
  };

  const handleShowNotBoughtItems = () => {
    setIsBoughtList(false);
  };

  const handleShowAllItems = () => {
    setIsBoughtList(null);
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error: {error.message}</div>;

  let filteredItems = items;
  if (isBoughtList !== null) {
    filteredItems = items.filter((item) => item.isBought === isBoughtList);
  }

  let filteredSum = 0;
  let filteredPotenialSum = 0;

  if (filteredItems.length > 0) {
    filteredSum = filteredItems
      .filter((item) => item.isBought)
      .reduce((acc, item) => acc + item.price, 0);

    filteredPotenialSum = filteredItems.reduce(
      (acc, item) => acc + item.price,
      0
    );
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Grocery List</Typography>
        </Toolbar>
      </AppBar>
      <div style={{ margin: "20px 0" }}>
        <Button
          variant="contained"
          color={isBoughtList === true ? "secondary" : "primary"}
          style={{
            margin: 10,
          }}
          onClick={handleShowBoughtItems}
        >
          Show Bought Items
        </Button>
        <Button
          variant="contained"
          color={isBoughtList === false ? "secondary" : "primary"}
          style={{
            margin: 10,
          }}
          onClick={handleShowNotBoughtItems}
        >
          Show Not Bought Items
        </Button>
        <Button
          variant="contained"
          color={isBoughtList === null ? "secondary" : "primary"}
          style={{
            margin: 10,
          }}
          onClick={handleShowAllItems}
        >
          Show All Items
        </Button>
      </div>
      <TextField
        label="Item Name"
        value={text}
        onChange={handleInputChange}
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
          <ListItem key={() => v4()}>
            <ListItemText
              primary={`${i + 1}) ${item.name}`}
              secondary={item.price && `${item.price} $`}
              style={{
                textDecoration: item.isBought ? "line-through" : "none",
              }}
            />
            <Checkbox
              checked={item.isBought}
              onChange={() => handleToggleIsBought(item.id)}
            />
            <Button onClick={() => handleDeleteItem(item.id)}>Delete</Button>
            <Button onClick={() => handleOpenPopup(item.id)}>Edit</Button>
          </ListItem>
        ))}
      </List>
      <div style={{ marginTop: 20 }}>
        {(isBoughtList == null || isBoughtList) && (
          <Typography variant="body1">{`Sum: ${filteredSum} $`}</Typography>
        )}
        {(isBoughtList == null || !isBoughtList) && (
          <Typography variant="body1">{`Potential Sum: ${filteredPotenialSum} $`}</Typography>
        )}
      </div>
      <Dialog open={isPopupOpen} onClose={handleClosePopup}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <TextField
            label="Item Name"
            value={modalText}
            onChange={handleModalInputChange}
            fullWidth
          />
          <TextField
            label="Item Price"
            type="number"
            value={modalPrice}
            onChange={(e) => setModalPrice(e.target.value)}
            fullWidth
            style={{ marginTop: 10 }}
          />
          <Checkbox
            checked={modalIsBought}
            onChange={(e) => setModalIsBought(e.target.checked)}
            color="primary"
          />
          <Typography variant="body1">Is Bought</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditItem} color="primary">
            Save
          </Button>
          <Button onClick={handleDeleteSelectedItem} color="primary">
            Delete
          </Button>
          <Button onClick={handleClosePopup} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GroceryList;
