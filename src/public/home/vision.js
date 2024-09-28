import * as React from "react"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { CardHeader } from "@mui/material"

export const Vision = () => {
  return (
    <Card>
      <CardHeader title="Vision" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          At [Your School Name], our vision is to cultivate a nurturing and
          inclusive environment where every student is empowered to discover
          their full potential. We strive to inspire a lifelong passion for
          learning, foster critical thinking and creativity, and instill values
          of integrity, respect, and social responsibility. Our commitment is to
          provide an exceptional education that prepares our students to be
          innovative leaders and compassionate citizens in a diverse and dynamic
          world.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}
