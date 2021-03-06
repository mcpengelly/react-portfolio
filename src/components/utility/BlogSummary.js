import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import moment from 'moment'

import { baseURL } from '../../helpers/globals'

const styles = theme => ({
  card: {
    minWidth: 275,
    maxWidth: 875,
    margin: 'auto',
    padding: 10
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  media: {
    height: 200
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary
  }
})

function BlogSummary (props) {
  const {
    classes,
    title,
    content,
    catchPhrase,
    lastUpdatedDate,
    id,
    img
  } = props

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={baseURL + img}
        title={title}
      />
      <CardContent>
        <Typography variant='headline'>{title}</Typography>
        <Typography variant='body2'>
          {moment(lastUpdatedDate).format('YYYY-MM-DD')}
        </Typography>
        <Typography className={classes.pos}>
          {catchPhrase || 'catchyPhrase'}
        </Typography>
        <Typography variant='body1'>{content}</Typography>
        <br />
      </CardContent>
      <CardActions>
        <Button size='small' component={Link} to={`/blog/${id}`}>
          See More...
        </Button>
      </CardActions>
    </Card>
  )
}

BlogSummary.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BlogSummary)
