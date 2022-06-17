import React from 'react'
import axios from 'axios'
import { buttonLabel, placeholder } from '../constant'

import { InboxOutlined } from '@ant-design/icons'
import { Row,
         Col,
         message,
         Input,
         Upload,
         Button
       } from 'antd'
const { Dragger } = Upload

class Cards extends React.Component {
  constructor(props) {
    super(props)
    const { userId } = this.props

    this.state = {
      userId,

      card_h1: '',
      allCards: []
    }

    this.handleUpdate = this.handleUpdate.bind(this)
    this.renderCard = this.renderCard.bind(this)
  }

  componentDidMount() {
    const { userId } = this.state

    axios.post(`/api/component-cards-from-id/${userId}`)
      .then(res => {
        if (typeof res.data === 'string') {          
          return message.error(res.data)
        }

        const { card_h1 } = res.data[0]
        this.setState({ card_h1, allCards: res.data })
      })
      .catch(err => message.error(err))
  }

  handleUpdate() {
    const { userId, card_h1 } = this.state

    axios.post(`/api/update-component-from-id/${userId}`, {card_h1})
      .then(res => message.success('Berhasil diganti!'))
      .catch(err => message.warn('Gagal :( . Harap coba lagi'))
  }

  renderCard(card) {
    const { allCards } = this.state,
          cardName = `Card #${allCards.indexOf(card) + 1}`
    let { c_i, c_sh, c_t, id } = card

    const handleChange = () => {
      axios.post(`/api/update-table-from-id/${id}/cards`, {c_sh, c_t})
      .then(res => message.success('Berhasil diganti!'))
      .catch(err => message.warn('Gagal :( . Harap coba lagi'))
    }

    return (
      <React.Fragment>
        <Col xs={24} sm={12}>
          <h4>{cardName}</h4>
          <h5>Title: {c_sh}</h5>
          <Input
            placeholder= {placeholder.title}
            onChange={e => c_sh = e.target.value}
          />

          <h5>Description: {c_t}</h5>
          <Input
            placeholder= {placeholder.desc}
            onChange={e => c_t = e.target.value}
          />

          <h5>Image</h5>
          <img />
          <Dragger action={`/api/upload-card-img/${id}`}>
            <p className="ant-upload-drag-icon"><InboxOutlined /></p>
            <p>Click or drag file to this area to upload</p>
          </Dragger>

          <Button onClick={handleChange}>{ buttonLabel.save }</Button>
        </Col>
      </React.Fragment>
    )
  }

  render() {
    const { card_h1, allCards } = this.state

    return (
      <React.Fragment>
        <h3>Card's details</h3>
        <h2>{card_h1}</h2>
        <Input
          placeholder={placeholder.heading}
          onChange={e => this.setState({card_h1: e.target.value})}
        />
        <Button onClick={this.handleUpdate}>{ buttonLabel.save }</Button>
        <Row gutter={[32, 12]}>
          {
            allCards.map(e => this.renderCard(e))
          }
        </Row>
      </React.Fragment>
    )
  }
}

export default Cards