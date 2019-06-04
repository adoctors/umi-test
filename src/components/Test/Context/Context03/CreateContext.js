
import React from 'react';
// Theme context，默认的 theme 是 “light” 值
export const ThemeContext = React.createContext('light');

// 用户登录 context
export const UserContext = React.createContext({name: 'Guest',});