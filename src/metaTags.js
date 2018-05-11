import React from 'react';
import MetaTags from 'react-meta-tags';
import tagImage from './assets/images/tagImage.png'


const metaTags = () => (

    <MetaTags>
      <title>IMITATION GAME</title>
      {/* <meta charset="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" /> */}
      {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
      {/* <meta name="format-detection" content="telephone=no" /> */}

      {/* // SEO編 */}
      <meta name="keywords" content="" />
      <meta name="description" content="ドヤ顔が楽しい新感覚パーティゲーム。でっち上げの真実で仲間を騙せ。" />
      <meta name="author" content="IMITATION GAME" />
      {/* <link rel="canonical" href="正規のURLを検索エンジンにしめす。" /> */}

      {/* // OGP編 */}
      <meta property="og:site_name" content="IMITATION GAME" />
      <meta property="og:title" content="IMITATION GAME" />
      <meta property="og:description" content="ドヤ顔が楽しい新感覚パーティゲーム。でっち上げの真実で仲間を騙せ。" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={"https://faker-be925.firebaseapp.com/"} />
      <meta property="og:image" content={tagImage} />
      {/* <meta property="fb:app_id" content="App-ID（15文字の半角数字）" /> */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="https://faker-be925.firebaseapp.com/" />
      
      <meta name="twitter:image" content={tagImage}  />
    </MetaTags>

);

export default metaTags;
