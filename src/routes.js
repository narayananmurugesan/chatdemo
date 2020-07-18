import React from 'react';
const User = React.lazy(() => import('./views/User'));
const Chat = React.lazy(() => import('./views/Chat'));
// const StaticLayout = React.lazy(() => import('./views/Static/StaticLayout'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/user', name: 'User', component: User },
  { path: '/chat', name: 'Chat', component: Chat },
  // { path: '/layout', exact: true, name: 'StaticLayout', component: StaticLayout },
];

export default routes;
