import React from 'react'
import axios from 'axios'

import { Row,
         Col,
         message,
         Input,
         Button
       } from 'antd'

class Descs extends React.Component {
  constructor(props) {
    super(props)
    const { userId } = this.props

    this.state = {
      userId,

      desc_h1: '',
      allDescs: []
    }

    this.handleCmpUpdate = this.handleCmpUpdate.bind(this)
    this.renderCard = this.renderCard.bind(this)
  }

  componentDidMount() {
    const { userId } = this.state

    axios.post(`/api/component-descs-from-id/${userId}`)
      .then(res => {
        if (typeof res.data === 'string') {          
          return message.error(res.data)
        }

        const { desc_h1 } = res.data[0]
        console.log(desc_h1);
        
        this.setState({ desc_h1, allDescs: res.data })
      })
      .catch(err => message.error(err))
  }

  handleCmpUpdate() {
    const { userId, desc_h1 } = this.state

    axios.post(`/api/update-component-from-id/${userId}`, {desc_h1})
      .then(res => message.success('Berhasil diganti!'))
      .catch(err => message.warn('Gagal :( . Harap coba lagi'))
  }



  renderCard(desc) {
    const { allDescs } = this.state,
            descName   = `Desc #${allDescs.indexOf(desc) + 1}`
    let { d_sh, d_t, id } = desc

    const handleChange = () => {
      axios.post(`/api/update-table-from-id/${id}/descs`, {d_sh, d_t})
      .then(res => message.success('Berhasil diganti!'))
      .catch(err => message.warn('Gagal :( . Harap coba lagi'))
    }

    return (
      <React.Fragment>
        <Col xs={24} sm={12}>
          <h4>{descName}</h4>
          <h5>Title: {d_sh}</h5>
          <Input
            placeholder = 'masukan title baru'
            onChange    = {e => d_sh = e.target.value}
          />

          <h5>Description:</h5>
          <h5>{d_t}</h5>
          <Input
            placeholder = 'masukan deskripsi baru'
            onChange    = {e => d_t = e.target.value}
          />

          <Button onClick={handleChange}>Simpan</Button>
        </Col>
      </React.Fragment>
    )
  }

  render() {
    const { desc_h1, allDescs } = this.state

    return (
      <React.Fragment>
        <h3>Description</h3>
        <h2>{desc_h1}</h2>
        <Input
          placeholder = 'Beri judul / heading'
          onChange    = {e => this.setState({desc_h1: e.target.value})}
        />
        <Button onClick={this.handleCmpUpdate}>Simpan</Button>
        <Row gutter={[32, 12]}>
          {
            allDescs.map(e => this.renderCard(e))
          }
        </Row>
      </React.Fragment>
    )
  }
}

export default Descs