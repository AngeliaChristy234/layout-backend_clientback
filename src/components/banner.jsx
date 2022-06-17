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

class Banner extends React.Component {
  constructor(props) {
    super(props)
    const { userId } = this.props

    this.state = {
      userId,

      bnr_h: '',
      bnr_i: ''
    }

    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount() {
    const { userId } = this.state
    axios.post(`/api/component-banner-from-id/${userId}`)
      .then(res => {
        if (typeof res.data === 'string') {          
          return message.error(res.data)
        }
        
        const { bnr_h, bnr_i } = res.data[0]
        this.setState({ bnr_h, bnr_i })
      })
      .catch(err => message.error(err))
  }

  handleUpdate() {
    const { userId, bnr_h } = this.state

    axios.post(`/api/update-component-from-id/${userId}`, {bnr_h})
      .then(res => message.success('Berhasil update!'))
      .catch(err => message.error('Update gagal :(. Harap ulangi lagi'))
  }

  render() {
    const { userId, bnr_h, bnr_i } = this.state
    return (
      <React.Fragment>
        <h3>Banner</h3>
        <Row gutter={[32, 12]}>
          <Col xs={24} sm={12}>
            <h4>Banner heading:</h4>
            <h2>{bnr_h}</h2>
            <Input
              placeholder = {placeholder.heading}
              onChange    = {e => this.setState({ bnr_h: e.target.value })}
            />
            <Button onClick={this.handleUpdate}> {buttonLabel.save} </Button>
          </Col>

          <Col xs={24} sm={12}>
            <h4>Banner image:</h4>
            <img/>
            <Dragger action={`/api/upload-banner/${userId}`}>
              <p className="ant-upload-drag-icon"><InboxOutlined /></p>
              <p>Click or drag file to this area to upload</p>
            </Dragger>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default Banner