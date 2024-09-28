import * as React from "react"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { CardHeader } from "@mui/material"

export const Mission = () => {
  return (
    <Card>
      <CardHeader title="Mission" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Our mission is to nurture our students to realize their own potential
          and identify and achieve their goals in an environment of rich
          tutelage, joyful and harmonious learning while keeping alive the
          spirit of togetherness and ‘Service Before Self’. Our aim is to bring
          forth responsible citizens of the world who make a difference and who
          will make the school and nation proud of their achievements and
          stellar personal qualities
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}
