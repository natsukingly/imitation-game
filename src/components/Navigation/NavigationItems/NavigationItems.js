import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => {
  console.log(props.isGaming)
  if(props.isGaming){

    return (
      <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/game" exact>ゲームに戻る</NavigationItem>
        <NavigationItem link="/exit-game" exact>ゲームをやめる</NavigationItem>
        <NavigationItem link="/" exact>ルールを見る</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>

      </ul>
    );
  } else {
    return (
        <ul className={classes.NavigationItems}>
          <NavigationItem link="/" exact>Home</NavigationItem>
          <NavigationItem link="/" exact>ゲームを作成</NavigationItem>
          <NavigationItem link="/logout">Logout</NavigationItem>
        </ul>
    );
  }
}

export default navigationItems;
