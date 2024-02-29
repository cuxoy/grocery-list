import { ListItem, ListItemText, Checkbox, Button } from "@mui/material";

const Item = ({
  i,
  item,
  handleToggleIsBought,
  handleDeleteItem,
  handleOpenPopup,
}) => {
  return (
    <>
      <ListItem key={item.id}>
        <ListItemText
          primary={`${i + 1}) ${item.name}`}
          secondary={item.price && `${item.price} $`}
          style={{
            textDecoration: item.isBought ? "line-through" : "none",
            maxWidth: "600px",
            wordWrap: "break-word",
          }}
        />
        <Checkbox
          checked={item.isBought}
          onChange={() => handleToggleIsBought(item.id, item.isBought)}
        />
        <Button onClick={() => handleDeleteItem(item.id)}>Delete</Button>
        <Button onClick={() => handleOpenPopup(item.id)}>Edit</Button>
      </ListItem>
    </>
  );
};

export default Item;
