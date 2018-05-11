import React from 'react';

import classes from './Rule.css';
import Button from '../../components/UI/Button/Button';
import questionImage from '../../assets/images/questionImage.png';
import optionsImage from '../../assets/images/optionsImage.png';
// import noImage from '../../assets/images/no-image.png';

const rule = (props) => {

  return (
    <div className={classes.Rules} id='Rules'>
      <div className={classes.Rule}>
        <h2 className={classes.RuleSectionTitle}>
          「IMITATION GAME」は, グループで盛り上がる新感覚パーティゲーム。
          でっち上げの真実でお互いを騙しあおう！
        </h2>

        ２人以上のプレーヤーとインターネットさえあれば、<br/>どこでもできるよ。<br/>
        飲み会の場でも家庭でも楽しめる！
      </div>
      <div className={classes.Rule}>
        <h2 className={classes.RuleSectionTitle}>
          ゲームの流れ[真実のデッキ]
        </h2>
        <ul>
          <li>
            <h4>１. 問題に答える</h4>
            <img src={questionImage} alt="question_image"/>
            <p>
              他のクイズゲームと違って答えを知っている必要はないよ。<br/>
              答えを調べるのはマナー違反。<br/>
              他のプレーヤーが選びそうな「それっぽい答え」を自分で考えよう。
            </p>
          </li>
          <li>
            <h4>２. 選択肢から正解だと思うカードを選ぶ。</h4>
            <img src={optionsImage} alt="options_image"/>
            <p>
              みんなの入力した答えが選択肢にシャッフルされて提示されるよ。
            </p>
          </li>
          <li>
            <strong>３. 選んだ答えに対応したポイントをゲット</strong><br/>
            他のプレーヤーをたくさん騙せたプレーヤーが勝ち。
          </li>
        </ul>
      </div>
      <div className={classes.Rule}>
        <h2 className={classes.RuleSectionTitle}>
          参加の仕方
        </h2>
        <ul>
          <li>
            <strong>１. ゲームを作成してホストになる</strong><br/>
            ホーム画面のゲーム作成ボタンから簡単にゲームを作成できるよ。<br/>
            ホストになるとゲームの長さを決めたり、ゲームの進行を仕切ることになるよ。
          </li>
          <li>
            <strong>２. 友達から挑戦状を受け取る</strong><br/>
            QRコードやURLで友達から挑戦状が届くとゲームに参加できるよ。
          </li>

        </ul>
      </div>
      <Button btnType="BackToTopBtn" clicked={props.clicked}>TOPに戻る</Button>
    </div>
  );
};

export default rule;
