import React from 'react'
import axios from 'axios'
import { buttonLabel, placeholder } from '../constant'

import { Row,
         Col,
         message,
         Input,
         Button
       } from 'antd'

class Steps extends React.Component {
  constructor(props) {
    super(props)
    const { userId } = this.props

    this.state = {
      userId,

      steps_h: '',
      steps_sh1: '',
      steps_sh2: '',
      steps_sh3: '',

      steps_t1: '',
      steps_t2: '',
      steps_t3: ''
    }

    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount() {
    const { userId } = this.state
    axios.post(`/api/component-steps-from-id/${userId}`)
      .then(res => {
        if (typeof res.data === 'string') {          
          return message.error(res.data)
        }

        const { steps_h,
                steps_sh1,
                steps_sh2,
                steps_sh3,
                steps_t1,
                steps_t2,
                steps_t3 } = res.data[0]
                
        this.setState({ steps_h,
                        steps_sh1,
                        steps_sh2,
                        steps_sh3,
                        steps_t1,
                        steps_t2,
                        steps_t3 })
      })
      .catch(err => message.error(err))
  }

  handleUpdate() {
    const { userId,
            steps_h,
            steps_sh1,
            steps_sh2,
            steps_sh3,
            steps_t1,
            steps_t2,
            steps_t3 } = this.state

    const obj = { steps_h,
                  steps_sh1,
                  steps_sh2,
                  steps_sh3,
                  steps_t1,
                  steps_t2,
                  steps_t3
                }

    axios.post(`/api/update-component-from-id/${userId}`, obj)
      .then(res => message.success('Berhasil update!'))
      .catch(err => message.error('Update gagal :(. Harap ulangi lagi'))
  }

  render() {
    const { userId,
            steps_h,
            steps_sh1,
            steps_sh2,
            steps_sh3,
            steps_t1,
            steps_t2,
            steps_t3 } = this.state
    return (
      <React.Fragment>
        <h3>Steps</h3>

        { /* HEADING */}
        <h4>Steps heading:</h4>
        <h2>{steps_h}</h2>
        <Input
          placeholder = {placeholder.heading}
          onChange    = {e => this.setState({ steps_h: e.target.value })}
        />

        { /* INDIVIDUAL STEPS */}

        <Row gutter={[32, 12]}>
          <Col xs={24} sm={12}>
            <h4>#Langkah 1</h4>
            <h5>Title: {steps_sh1}</h5>
            <Input
              placeholder = {placeholder.title}
              onChange    = {e => this.setState({steps_sh1: e.target.value})}
            />
            <h5>Title: {steps_t1}</h5>
            <Input
              placeholder = {placeholder.desc}
              onChange    = {e => this.setState({steps_sh1: e.target.value})}
            />
          </Col>

          <Col xs={24} sm={12}>
            <h4>#Langkah 2</h4>
            <h5>Title: {steps_sh2}</h5>
            <Input
              placeholder = {placeholder.title}
              onChange    = {e => this.setState({steps_sh2: e.target.value})}
            />
            <h5>Title: {steps_t2}</h5>
            <Input
              placeholder = {placeholder.desc}
              onChange    = {e => this.setState({steps_sh2: e.target.value})}
            />
          </Col>

          <Col xs={24} sm={12}>
            <h4>#Langkah 3</h4>
            <h5>Title: {steps_sh3}</h5>
            <Input
              placeholder = {placeholder.title}
              onChange    = {e => this.setState({steps_sh3: e.target.value})}
            />
            <h5>Title: {steps_t3}</h5>
            <Input
              placeholder = {placeholder.desc}
              onChange    = {e => this.setState({steps_sh3: e.target.value})}
            />
          </Col>
        </Row>
        <Button onClick = {this.handleUpdate}>{ buttonLabel.save }</Button>
      </React.Fragment>
    )
  }
}

export default Steps