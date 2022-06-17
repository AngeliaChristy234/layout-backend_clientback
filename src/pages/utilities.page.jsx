import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { loggedUserIdSelector,
         loggedUtilsIdSelector
       } from '../redux/user/user.reducer.js'

import HeaderSidebar from '../components/header'

// CSS LIBRARIES
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { InboxOutlined } from '@ant-design/icons'

import { Layout,
         Row,
         Col,
         Button,
         Upload,
         message,
         Input,
         Select
       } from 'antd'
const { Dragger } = Upload,
      { Option } = Select

const Styles = css({
  padding: '24px',

  '& img': {
    width: '100%',
    height: 'auto',
    objectFit: 'contain'
  },

  '& h3': {
    marginTop: '4rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid gainsboro'
  },

  '& button': {
    margin: '1rem 0',
    float: 'right'
  },

  '& .select': {
    width: '100%'
  },

  '& .colorbox': {
    width: '5rem',
    height: '5rem'
  }
})

class UtilsPage extends React.Component {
  constructor(props) {
    super(props)
    const { userId, utilsId } = this.props

    this.state = {
      userId: Number(userId),
      utilsId: Number(utilsId),

      logo: '',
      c_pr: '',
      c_sc: '',
      f_fm: '',
      img_fit: ''
    }

    this.handleColorChange = this.handleColorChange.bind(this)
    this.handleOtherChange = this.handleOtherChange.bind(this)
  }

  componentDidMount() {
    const { userId, utilsId } = this.state
    
    if ((userId || utilsId) === 0) {
      window.location.href = '/'
    }

    axios.post('/api/get-utils-from-id', {id: utilsId})
    .then(res => {
      const { logo,
              c_pr,
              c_sc,
              f_fm,
              img_fit
            } = res.data[0] 

      this.setState({ logo,
                      c_pr,
                      c_sc,
                      f_fm,
                      img_fit
                    })
    })
    .catch(err => message.warn(err))
  }

  handleColorChange() {
    const { utilsId, c_pr, c_sc } = this.state

    axios.post(`/api/update-utilities-from-id/${utilsId}`, {c_pr, c_sc})
      .then(res => message.success('Berhasil diganti!'))
      .catch(err => message.warn('Gagal :( . Harap coba lagi'))
  }

  handleOtherChange() {
    const { utilsId, f_fm, img_fit } = this.state

    axios.post(`/api/update-utilities-from-id/${utilsId}`, {f_fm, img_fit})
      .then(res => message.success('Berhasil diganti!'))
      .catch(err => message.warn('Gagal :( . Harap coba lagi'))
  }


  handleRefresh() {
    window.location.reload(false);
  }

  render() {
    const { utilsId,
            logo,
            c_pr,
            c_sc,
            f_fm,
            img_fit
          } = this.state

    return (
      <HeaderSidebar>
        
        <Layout css={Styles}>
        <h2>Utilities</h2>
        <p>Jika belum ada perubahan, klik Refresh</p>
        <Button type='primary' onClick={this.handleRefresh} >REFRESH</Button>
        
        {/* UPLOAD LOGO */}
          <h3>Ubah Logo</h3>
          <Row gutter={32}>
            <Col xs={24} sm={12}><img src={logo}/></Col>
            <Col xs={24} sm={12}>
              <Dragger action={`/api/upload-logo/${utilsId}`}>
                <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                <p>Click or drag file to this area to upload</p>
              </Dragger>
            </Col>
          </Row>

        {/* CHANGE COLOR */}
          <h3>Ubah Warna</h3>
          <Row gutter={[32, 12]}>
            <Col xs={24} sm={12}>
              <h4>Primary color: {c_pr}</h4>
              <div className='colorbox' style={{backgroundColor: c_pr}}/>
            </Col>
            <Col xs={24} sm={12}>
              <h4>Secondary color: {c_sc}</h4>
              <div className='colorbox' style={{backgroundColor: c_sc}}/>
            </Col>

            <Col xs={24} sm={6}><h5>Warna baru</h5></Col>
            <Col xs={24} sm={6}>
              <Input
                addonBefore='#'
                maxLength='6'
                placeholder='C1A57B'
                onChange={e => this.setState({c_pr: `#${e.target.value}`})}
              />
              </Col>

            <Col xs={24} sm={6}><h5>Warna baru</h5></Col>
            <Col xs={24} sm={6}>
              <Input
                addonBefore='#'
                maxLength='6'
                placeholder='222831'
                onChange={e => this.setState({c_sc: `#${e.target.value}`})}
              />
            </Col>
          </Row>
          <Button onClick={this.handleColorChange}>Simpan perubahan warna</Button>
          <p>Anda bisa memilih warna HEX dari
            <a href='https://htmlcolorcodes.com/color-picker/'
               target="_blank"
               alt='color picker'
               rel="noopener noreferrer"
              > htmlcolorcodes.com</a>
          </p>

        {/* LAINNYA */}
          <h3>Lainnya</h3>
          <Row gutter={[32, 12]}>
            <Col xs={24} sm={12}><h4>Font Family: {f_fm}</h4></Col>
            <Col xs={24} sm={12}><h4>Posisi gambar: {
              (img_fit === '0')
              ? 'contain'
              : 'cover'
            }</h4></Col>

            <Col xs={24} sm={6}><h5>Ganti font</h5></Col>
            <Col xs={24} sm={6}>
              <Input
                placeholder='nama font baru'
                onChange={e => this.setState({f_fm: e})}
              />
            </Col>

            <Col xs={24} sm={6}><h5>Ganti posisi</h5></Col>
            <Col xs={24} sm={6}>
              <Select
                defaultValue={
                  (img_fit === '0')
                  ? 'contain'
                  : 'cover'
                }
                className='select'
                onSelect={e => this.setState({img_fit: e})}
              >
                <Option value={'0'}>contain</Option>
                <Option value={'1'}>cover</Option>
              </Select>
            </Col>
          </Row>

          <p>Kami sarankan menggunakan
            <a href='https://fonts.google.com/'
               target="_blank"
               alt='google fonts'
               rel="noopener noreferrer"
               > fonts.google.com</a>
          </p>
          <Button onClick={this.handleOtherChange}>Simpan perubahan lainnya</Button>

        </Layout>
      </HeaderSidebar>
    )
  }
}

const mapStateToProps = state => ({
  userId: loggedUserIdSelector(state),
  utilsId: loggedUtilsIdSelector(state)
})

export default connect(mapStateToProps)(UtilsPage)