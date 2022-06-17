import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux';

import { storeLoggedUser } from '../redux/user/user.actions'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { message, Card, Form, Input, Button } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

const Styles = css({
  width: '30rem',
  margin: '10rem auto',

  '& h1': {
    textAlign: 'center'
  }
})

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.onFinish = this.onFinish.bind(this)

    this.state = {
      storeLoggedUser: this.props.storeLoggedUser,
      username: '',
      password: ''
    }
  }

  onFinish(value) {
    const { storeLoggedUser }              = this.state,
          { username, password } = value

    axios.post('api/find-user', {username, password})
      .then( res => {
        const {id, ut_id} = res.data[0]
        storeLoggedUser(id, ut_id)
      })
      .then( res => {
        message.loading('redirecting')
        window.location.href = '/utilities'
      })
      .catch( err => message.error(err))
  }

  render() {
    return (
      <Card css={Styles}>
      <h1>Login ke Admin</h1>
        <Form
          {...layout}
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>

        </Form>
      </Card>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  storeLoggedUser: (usID, utID) => dispatch(storeLoggedUser(usID, utID))
})

export default connect(null, mapDispatchToProps)(LoginForm)