import { Card, CardContent, Typography, CardActions, Button } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { COLORS } from '../../utils/app_constants'
import classes from './style'

interface CardProps {
  routeName: string,
  title: string,
  total: number,
}

const Index = ({routeName, title, total} : CardProps) => {

  const router = useRouter()

  const handleGoTo = (route: string) => {
    router.push(`/homepage/${route}`)
  }

  return (
    <Card sx={{ minWidth: 275}} elevation={2}>
      <CardContent>
        <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h2" color={COLORS.ALPHA_RED}>
           {total}
        </Typography>

      </CardContent>
      <CardActions>
        <Button size="medium" variant='outlined' onClick={() => handleGoTo(routeName)}>View details</Button>
      </CardActions>
    </Card>
  )
}

export default Index