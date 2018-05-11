import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import Spinner from '../../components/UI/Spinner/Spinner';
// import Profile from '../../components/Profile/Profile';
import Aux from '../../hoc/Aux/Aux';
import classes from './Info.css';
// import * as actions from '../../store/actions/index';

class Terms extends Component {
    componentDidMount (){

    }



    render () {

        let backBtn = null;
        if(!(this.props.isAuthenticated)){
          backBtn = (
            <NavLink to="/"><p className={classes.ToTopLink}>認証画面に戻る</p></NavLink>
          )
        }

        return (
          <Aux>
            {backBtn}
            <h2 className={classes.InfoTitle}>利用規約</h2>
            <div className={classes.InfoWrapper}>
              <div className={classes.InfoBox}>
                <p>
                  本規約は、登録ユーザーの皆様が、運営グループ「NATSUKINGDOM」（以下「当運営グループ」）が運営するソーシャルゲームサービス「IMITATION GAME」（以下「本サービス」）をご利用頂く際の取扱いにつき定めるものです。本規約に同意した上で本サービスをご利用ください。
                </p>
                <p>
                  プライバシーポリシーは、利用規約の次に記載されています。
                </p>
              </div>
              {/* 1 */}
              <div className={classes.InfoBox}>
                <h3 className={classes.SectionTitle}>第１条　適用</h3>
                <ul>
                  <p>
                    本規約は、本サービスや本サービスに付随するすべてのサービスを利用する時に適用されます。
                  </p>
                </ul>
              </div>

              <div className={classes.InfoBox}>
                <h3 className={classes.SectionTitle}>第２条　定義</h3>
                <ul>
                  <p>
                    登録ユーザーとは本サービスの認証機能、又はtwitterの外部認証サービスを使ってユーザー登録に必要な情報を発信して、本サービスが承認した個人のことです。
                  </p>
                </ul>
              </div>

              <div className={classes.InfoBox}>
                <h3 className={classes.SectionTitle}>第３条　本規約への同意</h3>
                <ul>
                  <li>
                    利用者は、本利用規約に同意頂いた上で、本サービスを利用できるものとします。
                  </li>
                  <li>
                    利用者が、本サービスの認証機能、又はtwitter等の外部認証サービスを使ってユーザー登録に必要な情報を発信し、本サービスが承認した時点で利用者と本サービスとの間で、本規約の諸規定に従った利用契約が成立するものとします。
                  </li>
                  <li>
                    利用者が未成年者である場合には、親権者その他の法定代理人の同意を得たうえで、本サービスをご利用ください。
                  </li>
                </ul>
              </div>

              <div className={classes.InfoBox}>
                <h3 className={classes.SectionTitle}>第４条　規約の変更</h3>
                <ul>
                  <li>
                    本サービスは、利用者の承諾を得ることなく、いつでも、本規約の内容を改定することができるものとします。
                  </li>
                    当運営グループは、本規約を改定するときは、その内容について当運営グループ所定の方法により利用者に通知します。
                  <li>
                    改定後の本規約の効力は、当運営グループが前項により通知を行った時点から生じるものとします。
                  </li>
                  <li>
                    利用者は、本規約変更後、本サービスを利用した時点で、変更後の本利用規約に同意したものとみなされます。
                  </li>
                </ul>
              </div>

              <div className={classes.InfoBox}>
                <h3 className={classes.SectionTitle}>第５条　個人情報等の取り扱い</h3>
                <ul>
                  <p>
                    個人情報及び利用者情報については、当運営グループが別途定める「プライバシーポリシー」に則り、適正に取り扱うこととします。
                  </p>
                </ul>
              </div>

              <div className={classes.InfoBox}>
                <h3 className={classes.SectionTitle}>第６条　不適切な行為への措置</h3>
                <ul>
                  <p>
                    当運営グループが不適切だと判断する行為を利用者が行った場合、利用者のサービス利用停止、投稿削除等、当運営グループにおいて必要と判断した措置を取ることができるものとし、利用者はこれを異議なく同意するものとします。
                  </p>
                </ul>
              </div>

              <div className={classes.InfoBox}>
                <h3 className={classes.SectionTitle}>第７条　コンテンツの取り扱い</h3>
                <ul>
                  <li>
                    利用者は､本サービスのコンテンツを当運営グループの定める範囲内でのみ使用することができるものとします｡
                  </li>
                  <li>
                    本サービスで提供される全てのコンテンツに関する権利は当運営グループが有しており､利用者に対し､当運営グループが有する特許権､実用新案権､ 意匠権､商標権､著作権､その他知的財産権の実施または使用許諾をするものではありません｡
                  </li>
                  <li>
                    利用者は､当運営グループの定める使用範囲を超えていかなる方法によっても複製､送信､譲渡（利用者同士の売買も含みます）､貸与､翻訳､翻案、無断で転載、二次使用、営利目的の使用、改変、逆アセンブル、逆コンパイル、リバースエンジニアリング等を行う事を禁止します。
                  </li>
                  <li>
                    利用者が、本サービス上に投稿その他の方法で送信したコンテンツ（静止画、動画、文字情報その他一切の情報）に関する著作権（著作権法第21条ないし同第28条に規定する権利を含む全ての著作権を含む。）については利用者に帰属するものとします。ただし、利用者は、コンテンツの送信時に、当運営グループに対し、日本国内外において、当該コンテンツを無償かつ非独占的に使用することを許諾します。
                  </li>
                  <li>
                    利用者は本サービス内では、著作者人格権を行使しないものとします。
                  </li>
                </ul>
              </div>

              <div className={classes.InfoBox}>
                <h3 className={classes.SectionTitle}>第８条　免責</h3>
                <ul>
                  <li>
                    当運営グループは、本サービスの内容変更、中断、終了によって生じたいかなる損害についても、一切責任を負いません。
                  </li>
                  <li>
                    当運営グループは、利用者の本サービスの利用環境について一切関与せず、また一切の責任を負いません。
                  </li>
                  <li>
                    当運営グループは、本サービスが利用者の特定の目的に適合すること、期待する機能・商品的価値・正確性・有用性を有することを保証しません。
                  </li>
                  <li>
                    当運営グループは、本サービスが不具合を起こした場合に当該不具合が解消されることを保証しません。
                  </li>
                  <li>
                    当運営グループは、本サービスを利用したことにより直接的または間接的に利用者に発生した損害について、一切賠償責任を負いません。
                  </li>
                  <li>
                    当運営グループが何らかの理由で責任を負う場合も、当運営グループは、ユーザー損害につき、過去６ヶ月間に登録ユーザーが当運営グループに支払った対価の金額を超えて賠償する責任を負わないものとします。そして、付随的損害、間接損害、特別損害、将来の損害及び逸失利益にかかる損害については、賠償する責任を負いません。
                  </li>
                  <li>
                    他の利用者または第三者からコンテンツについての削除依頼があった時、当運営グループの判断で削除の可否を決定できるものとし、当該判断により生じた一切の責任について、当運営グループは責任を負わないものとします。
                  </li>
                  <li>
                    本サービスで表示される情報の正確性について、当運営グループは保証しません。当運営グループは、本サービスに掲載されている情報についての紛争及びトラブルについて一切の責任を負いません。
                  </li>
                </ul>
              </div>

              <div className={classes.InfoBox}>
                <h3 className={classes.SectionTitle}>第９条　広告の掲載について</h3>
                <ul>
                  <p>
                    利用者は、本サービス上にあらゆる広告が含まれる場合があること、当運営グループまたはその提携先があらゆる広告を掲載する場合があることを理解しこれを承諾したものとみなします。本サービス上の広告の形態や範囲は、当運営グループによって随時変更されます。
                  </p>

                </ul>
              </div>

              <div className={classes.InfoBox}>
                <h3 className={classes.SectionTitle}>第１０条　権利譲渡の禁止</h3>
                <ul>
                  <li>
                    利用者は、予め当運営グループの書面による承諾がない限り、本規約上の地位および本規約に基づく権利または義務の全部または一部を第三者に譲渡してはならないものとします。
                  </li>
                  <li>
                    当運営グループは、本サービスの全部または一部を当運営グループの裁量により第三者に譲渡することができ、その場合、譲渡された権利の範囲内で利用者のアカウントを含む、本サービスに係る利用者の一切の権利が譲渡先に移転するものとします。
                  </li>
                </ul>
              </div>

              <div className={classes.InfoBox}>
                <h3 className={classes.SectionTitle}>第１１条　分離可能性</h3>
                <ul>
                  <p>
                    本規約のいずれかの条項又はその一部が、消費者契約法その他の法令等により無効又は執行不能と判断された場合であっても、本規約の残りの規定及び一部が無効又は執行不能と判断された規定の残りの部分は、継続して完全に効力を有するものとします。
                  </p>
                </ul>
              </div>

              <div className={classes.InfoBox}>
                <h3 className={classes.SectionTitle}>第１２条　当運営グループへの連絡方法</h3>
                <ul>
                  <p>
                    本サービスに関する利用者の当運営グループへのご連絡・お問い合わせは、本サービスまたは当運営グループが運営するwebサイト内の適宜の場所に設置するお問い合わせフォームからの送信または当運営グループが別途指定する方法により行うものとします。
                  </p>
                </ul>
              </div>

              <div className={classes.InfoBox}>
                <h3 className={classes.SectionTitle}>第１３条　準拠法、管轄裁判所</h3>
                <ul>
                  <p>
                    本規約の有効性、解釈及び履行については、日本法に準拠し、日本法に従って解釈されるものとする。当運営グループと利用者等との間での論議・訴訟その他一切の紛争については、訴額に応じて、東京簡易裁判所又は東京地方裁判所を専属的合意管轄裁判所とします｡
                  </p>
                </ul>
              </div>
              <div className={classes.InfoBox}>
                <p className={classes.SubNote}>２０１８年４月２日　施行</p>
              </div>
            </div>


              <h2 className={classes.InfoTitle}>プライバシーポリシー</h2>
              <div className={classes.InfoWrapper}>
                <div className={classes.InfoBox}>
                  <p>
                    本プライバシーポリシー（以下「本ポリシー」）は運営グループ「paprika」（以下「当運営グループ」）が
          					運営するソーシャルニュースプラットフォーム「NEWSB!」（以下「本サービス」）における、
          					ユーザーについての個人情報を含むユーザー情報の取り扱いについて定めるものです。
          					本規約に同意した上で本サービスをご利用ください。
                  </p>
                </div>
                <div className={classes.InfoBox}>
                  <h3 className={classes.SectionTitle}>１.収集するユーザー情報と収集方法</h3>
                  <ul>
                    <li>
                      氏名・プロフィール写真の情報をサイトのフォーム内でユーザーから提供された範囲で収集します。
                    </li>
                    <li>
                      氏名・プロフィール写真の情報をTwitter等の外部サービスの認証機能を通じて取得します。
          						詳しい情報は、認証画面での項目や該当するサービスのプライバシーポリシーを参照してください。
          						すべての情報は認証画面でユーザーの了承を得た上でのみ収集されます。
                    </li>
                    <li>
                      位置情報や端末情報をcookieやIPアドレスを通じて取得します。
                    </li>

                  </ul>
                </div>

                <div className={classes.InfoBox}>
                  <h3 className={classes.SectionTitle}>２.ユーザーコンテンツ</h3>
                  <p>
                    ユーザーがプラットフォーム内で発信する情報や氏名・プロフィール写真は、ゲームに参加してるプレイヤー間で共有されます。
                  </p>
                </div>

                <div className={classes.InfoBox}>
                  <h3 className={classes.SectionTitle}>３.情報の利用目的</h3>
                  <p>取得する全てのユーザー情報は以下の目的で利用されます。</p>
                  <ul>
          					<li>
          						サイト内でのユーザー体験向上
                    </li>
          					<li>
          						ユーザーアカウントの認証
                    </li>
          				  <li>
          						継続的なサービス開発への参考データ
                    </li>
          					<li>
          						パーソナライズされたコンテンツや広告へのマッチング
                    </li>
          					<li>
          						個人を特定できなような形での統計データ販売
                    </li>
                  </ul>
                </div>

                <div className={classes.InfoBox}>
                  <h3 className={classes.SectionTitle}>４.免責</h3>
                  <p>以下の場合、ユーザーの個人情報に関し、当運営グループは何らの責任を負いません。</p>
                  <ul>
                    <li>
                      当サービス上で、ユーザーが自ら第三者に個人情報を公開した場合
                    </li>
                      当サービス上で、ユーザーが誤って第三者に個人情報を公開した場合
                    <li>
                      当サービス以外のウェブサイトやサービスを利用して、第三者がユーザーの情報を特定した場合
                    </li>
                    <li>
                      当運営グループが関与する範囲外で個人情報が漏洩した場合（ソーシャルエンジニアリング等）
                    </li>
                  </ul>
                </div>

                <div className={classes.InfoBox}>
                  <h3 className={classes.SectionTitle}>５.ポリシーの変更</h3>
                  <ul>
                    <p>
          						本ポリシーは、ユーザー情報の管理を継続的に改善する為、ポリシーの内容を随時変更することがあります。
          						ポリシーを変更した際は、サイトの規定する方法（IMITATION GAME Twitter公式アカウントでのアナウンス等）で公表させていただきます。
                    </p>
                  </ul>
                </div>

                <div className={classes.InfoBox}>
                  <h3 className={classes.SectionTitle}>６.お問い合わせ</h3>
                  <ul>
                    <p>
                      本ポリシーやその他個人情報の取り扱いについてのお問い合わせは、IMITATION GAME Twitter公式アカウントでお願いいたします。
                    </p>
                  </ul>
                </div>
                <div className={classes.InfoBox}>
                  <p className={classes.SubNote}>初版　２０１８年４月２日　制定</p>
                </div>
              </div>
          </Aux>
        );
    }
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.user.isAuthenticated,
    };
}

// const mapDispatchToProps = dispatch => {
//     return {
//
//     }
// }

export default connect(mapStateToProps, null)(Terms);
