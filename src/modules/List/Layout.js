import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Icon } from 'antd';
import Main from '../../assembly/Main/index';
import Sider from '../../assembly/Sider/index';
import Content from '../../assembly/Content/index';
import Title from '../../assembly/Title/index';
import icon from '../../assembly/Icon/style.sass';
import Index from './Index/index';

/* 配置二、三级导航菜单 */
const options: {
  id: string,
  name: string,
  url: string,
  icon: ?(string | Object),   // 传入一个字符串或节点
  children: ?{
    id: string,
    name: string,
    url: string,
    icon: ?(string | Object)  // 传入一个字符串或节点
  }[]
}[] = [
  {
    id: 's1',
    name: '导航菜单1',
    url: '/List/S1',
    icon: <Icon type="area-chart" />
  },
  {
    id: 's2',
    name: '导航菜单2',
    url: '/List/S2',
    icon: icon.cog
  },
  {
    id: 's3',
    name: '导航菜单3',
    children: [
      {
        id: 'c31',
        name: '子导航1',
        url: '/List/S3/C1'
      },
      {
        id: 'c32',
        name: '子导航2',
        url: '/List/S3/C2'
      }
    ]
  }
];

class ModuleLayout extends Component{
  render(): Object{
    return (
      <Main>
        <Title>列表展示</Title>
        <Sider options={ options } />
        <Content>
          <Switch>
            <Route path="/List" component={ Index } exact />
            <Route path="/List/S1" component={ Index } exact />
            <Route path="/List/S2" component={ Index } exact />
            <Route path="/List/S3/C1" component={ Index } exact />
            <Route path="/List/S3/C2" component={ Index } exact />
          </Switch>
        </Content>
      </Main>
    );
  }
}

export default ModuleLayout;