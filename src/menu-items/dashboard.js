// assets
import { DashboardOutlined, FieldTimeOutlined, HeatMapOutlined, MoneyCollectOutlined, SettingOutlined, TableOutlined, UsergroupAddOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  FieldTimeOutlined,
  HeatMapOutlined,
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
      breadcrumbs: false,
      roles: ["EVENT_PLANNER", "SUPER_ADMIN"]
    },
    {
      id: 'categories',
      title: 'Categories',
      type: 'item',
      url: '/categories',
      icon: icons.TableOutlined,
      breadcrumbs: false,
      roles: ["SUPER_ADMIN"]
    },
    // {
    //   id: 'events',
    //   title: 'Events',
    //   type: 'item',
    //   url: '/events',
    //   icon: icons.FieldTimeOutlined,
    //   breadcrumbs: false,
    //   roles: ["EVENT_PLANNER", "SUPER_ADMIN"]
    // },
    {
      id: 'payments',
      title: 'Payments',
      type: 'item',
      url: '/payments',
      icon: icons.MoneyCollectOutlined,
      breadcrumbs: false,
      roles: ["EVENT_PLANNER", "SUPER_ADMIN"]
    },
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/users',
      icon: icons.UsergroupAddOutlined,
      breadcrumbs: false,
      roles: ["SUPER_ADMIN"]
    },
    // {
    //   id: 'dekania',
    //   title: 'Dekania',
    //   type: 'item',
    //   url: '/dekania',
    //   icon: icons.HeatMapOutlined,
    //   breadcrumbs: false,
    //   roles: ["SUPER_ADMIN"]
    // },
    // {
    //   id: 'wallet',
    //   title: 'Wallet',
    //   type: 'item',
    //   url: '/wallet',
    //   icon: icons.WalletOutlined,
    //   breadcrumbs: false,
    //   roles: ["EVENT_PLANNER"]
    // },
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/profile',
      icon: icons.UserOutlined,
      breadcrumbs: false,
      roles: ["EVENT_PLANNER", "SUPER_ADMIN"]
    },
  ]
};

export default dashboard;
