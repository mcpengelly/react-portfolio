import React, { Component } from 'react'
// eslint-disable-next-line
import { BrowserRouter as Router } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Card, { CardContent, CardMedia, CardActions } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  card: {
    minWidth: 275,
    maxWidth: 875,
    margin: 'auto',
    padding: 10
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

class BlogPost extends Component {
  constructor () {
    super()
    this.state = { title: '', content: '' }
  }

  componentDidMount () {
    fetch(`/api/posts/${this.props.id}`)
      .then(res => {
        return res.json()
      })
      .then(blogPost => {
        console.log('blogPost', blogPost)

        this.setState({
          title: blogPost.title,
          content: blogPost.content
        })
      })
  }

  render () {
    console.log(this.props.match.url)
    const { classes } = this.props

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image='/static/images/cards/contemplative-reptile.jpg'
          title='bang'
        />
        <CardContent>
          <Typography className={classes.title}>{this.state.title}</Typography>
          <Typography variant='headline'>{this.state.title}</Typography>
          <Typography className={classes.pos}>adjective</Typography>
          <Typography variant='body1'>{this.state.content}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size='small'
            component={Link}
            to={`${this.props.match.url}/edit`}
          >
            Edit
          </Button>
        </CardActions>
      </Card>
    )
  }
}

export default withStyles(styles)(BlogPost)
