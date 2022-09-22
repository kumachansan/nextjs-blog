import Layouts from "../../components/Layouts";
import { getAllPostIds, getPostData } from "../../lib/post";
import utilStyles from "../../styles/utils.module.css";
import Head from 'next/head'

//パスを静的生成させる,getStaticPathsはgetStaticPropsと同時に利用する決まり
export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
        //pathsに含まれてないものが返ってきた場合404表示
    };
}

//外部のデータをプレレンダリング時に一度取り込む機能
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    //urlに含まれる個別idを外部から取得

    return {
        props: {
            postData,
        },
    };
}

export default function Post({ postData }) {
    return (
        <Layouts>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingX1}>{postData.title}</h1>

                <div className={utilStyles.lightText}>{postData.date}</div>

                <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} />

            </article>
        </Layouts>
    );
}

//dangerouslySetInnerHTMLはサニタイズしないと危険、またはスクリプトが実行されないように訂正処理する必要あり