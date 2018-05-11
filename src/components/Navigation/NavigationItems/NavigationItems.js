import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => {

  if(props.isGaming){

    return (
      <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>ホーム</NavigationItem>
        <NavigationItem link="/game" exact>ゲームに戻る</NavigationItem>
        <NavigationItem btn clicked={props.modalOpened}>ゲームをやめる</NavigationItem>
        <NavigationItem link="/rules" exact>ルールを見る</NavigationItem>
        <NavigationItem link="/terms" exact>利用規約＆<br/>プライバシーポリシー</NavigationItem>
        <NavigationItem link="/logout">ログアウト</NavigationItem>
      </ul>
    );
  } else {
    return (
        <ul className={classes.NavigationItems}>
          <NavigationItem link="/" exact>ホーム</NavigationItem>
          <NavigationItem link="/game-menu" exact>ゲームを作成</NavigationItem>
          <NavigationItem link="/rules" exact>ルールを見る</NavigationItem>
          <NavigationItem link="/terms" exact>利用規約＆<br/>プライバシーポリシー</NavigationItem>
          <NavigationItem link="/logout">ログアウト</NavigationItem>
        </ul>
    );
  }
}

export default navigationItems;
