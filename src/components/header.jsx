import React from 'react'

import { Layout, Menu } from 'antd';
const { Header, Sider } = Layout;

class HeaderSidebar extends React.Component {
  render() {
    const newElements = [];
    React.Children.forEach(this.props.children, 
              child => newElements.push(
                 React.cloneElement(
                   child, 
                   {...this.props}
                )
              )
    )

    return (
      <React.Fragment>

      {/* HEADER */}
        <Header>
          <div className='logo'>
          </div>
        </Header>


        <Layout>
          <Sider width={200}>
            <Menu
              mode='inline'
              defaultSelectedKeys={['1']}
              style={{height: '100%', borderRight: 0}}
            >
              <Menu.Item onClick={() => window.location.href = '/pagehome' }>Homepage</Menu.Item>
              <Menu.Item onClick={() => window.location.href = '/utilities'}>Utils</Menu.Item>
              <Menu.Item onClick={() => window.location.href = '/links'    }>links</Menu.Item>
            </Menu>
          </Sider>

          {newElements}

        </Layout>
      </React.Fragment>
    )
  }
}

export default HeaderSidebar;