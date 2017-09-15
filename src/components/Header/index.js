// @flow
/**
 * layout - header
 * 顶部header布局
 * 显示logo、导航、登录人信息等
 */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import style from './style.sass';
import commonStyle from '../../common.sass';
import icon from '../Icon/style.sass';
import ErrorBoundary from '../ErrorBoundary/index';
import HumanInformation from './HumanInformation';

type options = {
  id: string,
  name: string,
  href: string,
  icon: string
};

export const navOptions: options[] = [
  {
    id: 'home',
    name: '主页',
    href: '/Home',
    icon: icon.home
  },
  {
    id: 'list',
    name: '列表',
    href: '/List',
    icon: icon.cog
  },
  {
    id: 'form',
    name: '表单',
    href: '/Form',
    icon: icon.users
  }
];

const len: boolean = navOptions.length > 0;

class Header extends Component{
  // 判断首页home
  oddEvent(item: options, match: Object, location: Object): boolean {
    const { pathname }: { pathname: string } = location;
    const { href }: { pathname: string } = item;
    const reg: RegExp = new RegExp(`^${ href }.*$`, 'ig');
    if(len && pathname === '/' && href === navOptions[0].href){
      return true;
    }
    return match && reg.test(pathname);
  }
  navList(options: options[]): Object{
    return options.map((item: options, index: number): Object=>{
      return(
        <li key={ item.id }>
          <NavLink to={ item.href } activeClassName={ style.navActive } isActive={ this.oddEvent.bind(this, item) }>
            <i className={ item.icon } />
            <span>{ item.name }</span>
          </NavLink>
        </li>
      );
    });
  }
  render(): Object{
    return (
      <ErrorBoundary>
        <div>
          <img className={ style.logo } src={ require('./logo.png') } alt="管理平台 demo" title="管理平台 demo" />
          <nav className={ style.nav }>
            <ul className={ commonStyle.clearfix }>
              { this.navList(navOptions) }
            </ul>
          </nav>
          <HumanInformation />
        </div>
      </ErrorBoundary>
    );
  }
}

export default Header;