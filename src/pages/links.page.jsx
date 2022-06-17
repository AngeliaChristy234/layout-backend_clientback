import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { loggedUserIdSelector,
         loggedUtilsIdSelector
       } from '../redux/user/user.reducer.js'

import HeaderSidebar from '../components/header'

// CSS LIBRARIES
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import { Layout,
         message,
         Row,
         Col,
         Button,
         Input   
       } from 'antd';

const Styles = css({
  padding: '24px',

  '& h3': {
    marginTop: '4rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid gainsboro'
  },

  '& button': {
    margin: '1rem 0',
    float: 'right'
  }
})

class LinksPage extends React.Component {
  constructor(props) {
    super(props)
    const { userId, utilsId } = this.props

    this.state = {
      userId: Number(userId),
      utilsId: Number(utilsId),

      instagram: '',
      phone: '',
      wa: '',
      location: '',
      maps: ''
    }

    this.handleSmChange = this.handleSmChange.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
  }

  componentDidMount() {
    const { userId, utilsId } = this.state
    
    if ((userId || utilsId) === 0) {
      window.location.href = '/'
    }

    axios.post('/api/get-utils-from-id', {id: utilsId})
    .then(res => {
      const { instagram,
              phone,
              wa,
              location,
              maps
            } = res.data[0] 

      this.setState({ instagram,
                      phone,
                      wa,
                      location,
                      maps
                    })
    })
    .catch(err => message.warn(err))
  }

  handleSmChange() {
    const { utilsId, instagram, phone, wa } = this.state

    axios.post(`/api/update-utilities-from-id/${utilsId}`, {instagram, phone, wa})
    .then(res => message.success('Berhasil diganti!'))
    .catch(err => message.warn('Gagal :( . Harap coba lagi'))
  }

  handleLocationChange() {
    const { utilsId, location, maps } = this.state

    axios.post(`/api/update-utilities-from-id/${utilsId}`, {location, maps})
    .then(res => message.success('Berhasil diganti!'))
    .catch(err => message.warn('Gagal :( . Harap coba lagi'))
  }

  handleRefresh() {
    window.location.reload(false);
  }

  render() {
    const { instagram, phone, wa, location, maps } = this.state
    return (
      <HeaderSidebar>
        <Layout css={Styles}>
          <h2>Link external</h2>
          <p>Jika belum ada perubahan, klik Refresh</p>
          <Button type='primary' onClick={this.handleRefresh}>REFRESH</Button>

          <h3>Social media</h3>
          <Row gutter={[32, 12]}>
            <Col xs={24} sm={12}>
              <h4>instagram: {instagram}</h4>
              <Input
                placeholder = 'username'
                onChange    = {e => this.setState({instagram: e.target.value})}
              />
            </Col>
            <Col xs={24} sm={12}>
              <h4>phone: {phone}</h4>
              <Input
                placeholder = '081961761822'
                onChange    = {e => this.setState({phone: e.target.value})}
              />
            </Col>
            <Col xs={24} sm={12}>
              <h4>whatsapp: {wa}</h4>
              <Input
                placeholder = '081961761822'
                onChange    = {e => this.setState({wa: e.target.value})}
              />
            </Col>
          </Row>
          <Button onClick={this.handleSmChange}>Simpan perubahan</Button>

          <h3>Location</h3>
          <Row gutter={[32, 12]}>
            <Col xs={24} sm={12}>
              <h4>Link Google Maps *optional</h4>
              <Input
                placeholder = 'paste your link here'
                onChange    = {e => this.setState({maps: e.target.value})}
              />
            </Col>
            <Col xs={24} sm={12}>
              <h4>alamat: {location}</h4>
              <Input
                placeholder = 'alamat baru'
                onChange    = {e => this.setState({location: e.target.value})}
              />
            </Col>
          </Row>
          <Button onClick={this.handleLocationChange}>Simpan lokasi</Button>
          <a
            href={maps}
            target="_blank"
            rel="noopener noreferrer"
          >Lihat lokasi anda sekarang</a>

        </Layout>
      </HeaderSidebar>
    )
  }
}

const mapStateToProps = state => ({
  userId: loggedUserIdSelector(state),
  utilsId: loggedUtilsIdSelector(state)
})

export default connect(mapStateToProps)(LinksPage)