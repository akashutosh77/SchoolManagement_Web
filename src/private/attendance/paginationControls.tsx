import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Button, Typography } from "@mui/material";
import { PaginationControlsProps } from "components/IComponents";



const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <Button
        size="small"
        sx={{ minWidth: "20px", padding: "4px" }}
        variant="outlined"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        startIcon={<NavigateBeforeIcon />}
      ></Button>
      <Typography variant="body2" style={{ margin: "0 10px" }}>
        Page {currentPage} of {totalPages}
      </Typography>
      <Button
        size="small"
        sx={{ minWidth: "20px", padding: "4px" }}
        variant="outlined"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        endIcon={<NavigateNextIcon />}
      ></Button>
    </div>
  );
};

export default PaginationControls;
