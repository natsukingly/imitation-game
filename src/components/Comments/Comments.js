import React from 'react';

import Aux from '../../hoc/Aux/Aux';
import classes from './Comments.css';

const comments = (props) => {

  let comments = null;

  if(props.outcome === 'self'){
      comments = (
        <div className={classes.Comments}>
          <span className={classes.C1}>まじ無い</span>
          <span className={classes.C2}>ワロタ</span>
          <span className={classes.C3}>ちょっっおま</span>
          <span className={classes.C4}>ナルシスト</span>
          <span className={classes.C5}>#一人はこういう奴いる</span>
          <span className={classes.C6}>ふふふふ</span>
          <span className={classes.C7}>昔のオレを見てるようだっ！！！！</span>
          <span className={classes.C8}>SHAME ON YOU!!!SHAME ON YOU!!!</span>
          <span className={classes.C9}>やっぱりね</span>
          <span className={classes.C10}>あえて点数を下げる男前</span>
          <span className={classes.C11}>お前お前お前俺お前お前</span>
          <span className={classes.C12}>セイチョウシロヤ</span>
          <span className={classes.C13}>ゆとり世代か？そうなのか？</span>
          <span className={classes.C14}>自分一択</span>
          <span className={classes.C15}>みんな自分が大切</span>
          <span className={classes.C16}>謝ろうぜ、楽になるよ。</span>
          <span className={classes.C17}>ムハハハッハハハハハハハハハハハハハ</span>
          <span className={classes.C18}>( ´Д`)y━･~~</span>
          <span className={classes.C19}>イイヨそれで</span>
          <span className={classes.C20}>愛がすべて</span>
        </div>
      )
  }else {
    comments = (
      <div className={classes.Comments}>
        <span className={classes.C1}>ザマミロザマミロザマミロ</span>
        <span className={classes.C2}>ムハハハッハハハハハハハハハハハハハ</span>
        <span className={classes.C3}>ちょっっおま</span>
        <span className={classes.C4}>ガッカリシタヨ</span>
        <span className={classes.C5}>#イミテーションゲームのクジラ</span>
        <span className={classes.C6}>ザマー味噌漬け</span>
        <span className={classes.C7}>昔のお前はこんなもんじゃなかった！！！！</span>
        <span className={classes.C8}>SHAME ON YOU!!!SHAME ON YOU!!!</span>
        <span className={classes.C9}>こんなもんか</span>
        <span className={classes.C10}>あなたへのラブレター届いてよかった♡</span>
        <span className={classes.C11}>YOU LOSE YOU LOSE YOU LOSE I WIN</span>
        <span className={classes.C12}>そのIQどうにかしようぜ</span>
        <span className={classes.C13}>脳みそ検診行け！！</span>
        <span className={classes.C14}>これこそ君の人生の縮図</span>
        <span className={classes.C15}>オマエの母ちゃんデベソ</span>
        <span className={classes.C16}>オマエもデベソ</span>
        <span className={classes.C17}>ザマママママッマママママッママママッマ</span>
        <span className={classes.C18}>( ﾟ∀ﾟ)ｱﾊﾊ八八ﾉヽﾉヽﾉヽﾉ ＼ / ＼/ ＼</span>
        <span className={classes.C19}>私を選ぶなんてお前らしいよ</span>
        <span className={classes.C20}>服従せよ。</span>
      </div>
    )
  }

  return(
    <Aux>
      {comments}
    </Aux>
  );
}

export default comments;
