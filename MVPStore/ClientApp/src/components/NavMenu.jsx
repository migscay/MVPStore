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
          as={NavLink} to="/"
          name='MVPStore'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink} to="/customers"
          name='customers'
          active={activeItem === 'customers'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink} to="/products"
          name='products'
          active={activeItem === 'products'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink} to="/stores"
          name='stores'
          active={activeItem === 'stores'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink} to="/sales"
          name='sales'
          active={activeItem === 'sales'}
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
