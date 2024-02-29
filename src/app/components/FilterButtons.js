import { Button } from "@mui/material";

const FilterButtons = ({
  isBoughtList,
  handleShowBoughtItems,
  handleShowNotBoughtItems,
  handleShowAllItems,
}) => {
  return (
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
  );
};

export default FilterButtons;
