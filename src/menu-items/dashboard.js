// assets
import { DashboardOutlined, FieldTimeOutlined, MoneyCollectOutlined, SettingOutlined, TableOutlined, UsergroupAddOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  FieldTimeOutlined,
  MoneyCollectOutlined,
  SettingOutlined,
  TableOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  WalletOutlined,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: '',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'categories',
      title: 'Categories',
      type: 'item',
      url: '/categories',
      icon: icons.TableOutlined,
      breadcrumbs: false
    },
    {
      id: 'events',
      title: 'Events',
      type: 'item',
      url: '/events',
      icon: icons.FieldTimeOutlined,
      breadcrumbs: false
    },
    {
      id: 'payments',
      title: 'Payments',
      type: 'item',
      url: '/payments',
      icon: icons.MoneyCollectOutlined,
      breadcrumbs: false
    },
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/users',
      icon: icons.UsergroupAddOutlined,
      breadcrumbs: false
    },
    {
      id: 'wallet',
      title: 'Wallet',
      type: 'item',
      url: '/wallet',
      icon: icons.WalletOutlined,
      breadcrumbs: false
    },
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/profile',
      icon: icons.UserOutlined,
      breadcrumbs: false
    },
    {
      id: 'settings',
      title: 'Settings',
      type: 'item',
      url: '/settings',
      icon: icons.SettingOutlined,
      breadcrumbs: false
    },
  ]
};

export default dashboard;
