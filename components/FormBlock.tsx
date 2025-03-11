import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";

const FormBlock = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography component="h6">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ gap: 2 }}>{children}</AccordionDetails>
    </Accordion>
  );
};

export default FormBlock;
