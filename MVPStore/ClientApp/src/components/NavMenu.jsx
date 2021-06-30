import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export class NavMenu extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu secondary>
        <Menu.Item
          as={NavLink} to="/customers"
          name='customers'
          active={activeItem === 'customers'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink} to="/about"
          name='about'
          active={activeItem === 'about'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink} to="/profile"
          name='my profile'
          active={activeItem === 'profile'}
          onClick={this.handleItemClick}
        />
        {/* </Menu.Menu> */}
      </Menu>
    )
  }
}
