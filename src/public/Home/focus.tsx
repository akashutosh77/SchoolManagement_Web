import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader } from "@mui/material";

export const Focus: React.FC = () => {
  return (
    <Card>
      <CardHeader title="Focus" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          At [Your School Name], our primary focus is on the holistic
          development of our students. We are dedicated to providing a rigorous
          and engaging curriculum that challenges students to achieve their
          highest academic potential while cultivating integrity, empathy, and
          resilience through programs that emphasize ethical behavior, social
          responsibility, and emotional intelligence. 
         
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};
