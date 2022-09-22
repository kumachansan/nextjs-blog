import Head from "next/head";
import styles from "./layout.module.css"
import utilStyles from "../styles/utils.module.css"
import Link from "next/link";

const name = "BizNeet";
export const siteTitle = "エンジニア図解blog";

//共通のCSSコンポーネント
function Layouts({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <img src="/images/profile.png"
                            //`${utilStyles.borderCircle}`にすると変数として利用できる
                            className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`} />
                        <h1 className={utilStyles.heading2Xl}> {name} </h1>
                    </>
                ) : (
                    <>
                        <img src="/images/profile.png"
                            //`${utilStyles.borderCircle}`にすると変数として利用できる
                            className={utilStyles.borderCircle} />
                        <h1 className={utilStyles.heading2Xl}> {name} </h1>
                    </>
                )}

            </header>
            <main>{children}</main>
            {!home && (
                <div>
                    <Link href="/">←Homeへ戻る</Link>
                </div>
            )}
        </div>

    );
}

export default Layouts;
//{!home &&}=もしhomeでなければ
//{home ?() : ()}＝三項演算子　homeの記述があれば、左川の()が実行。なければ右側の()が実行
//<main>{children}</main>にmainコンテンツが入っていく
//cssモジュールを適用おするには拡張子を.module.css
//なぜlayout.module.cssと、utils.module.cssのスタイルのを分けるのか。共通のスタイル（サイトの骨格）と文字や画像などの部品スタイルを分けて管理する方が保守性が高いから。あとどのページでも使えるように。