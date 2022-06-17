import React from 'react'
import { connect } from 'react-redux'
import { loggedUserIdSelector,
         loggedUtilsIdSelector
       } from '../redux/user/user.reducer.js'

import HeaderSidebar from '../components/header'
import Banner from '../components/banner'
import Cards from '../components/cards'
import Descs from '../components/descs'
import Steps from '../components/steps'

// CSS LIBRARIES
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import { Layout,
         Button   
       } from 'antd';

       
const Styles = css({
  padding: '24px',

  '& h3': {
    marginTop: '4rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid gainsboro'
  },

  '& h4': {
    margin: '1rem 0 0.5rem 0'
  },

  '& h5': {
    margin: '0.5rem 0'
  },

  '& button': {
    margin: '1rem 0',
    width: '100%',
    backgroundColor: '#13c2c2',
    color: 'white'
  },

  '& .ant-upload': {
    height: 'auto'
  }
})

class AdminPage extends React.Component {
  constructor(props) {
    super(props)
    const { userId, utilsId } = this.props

    this.state = {
      userId: Number(userId),
      utilsId: Number(utilsId)
    }
  }

  componentDidMount() {
    const { userId, utilsId } = this.state
    
    if ((userId || utilsId) === 0) {
      window.location.href = '/'
    }
  }

  render() {
    const { userId } = this.state
    return (
      <HeaderSidebar>
        <Layout css={Styles} >
          <h2>Utilities</h2>
          <p>Jika belum ada perubahan, klik Refresh</p>
          <Button
            style   = {{backgroundColor: '#1890ff'}}
            onClick = {this.handleRefresh}
          >REFRESH</Button>
          
          <Banner userId={userId} />
          <Cards  userId={userId} />
          <Descs  userId={userId} />
          <Steps  userId={userId} />
        </Layout>
      </HeaderSidebar>
    )
  }
}

const mapStateToProps = state => ({
  userId: loggedUserIdSelector(state),
  utilsId: loggedUtilsIdSelector(state)
})

export default connect(mapStateToProps)(AdminPage)