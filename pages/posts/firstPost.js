import Head from 'next/head'
import Link from "next/link";

export default function FirstPost() {
    return (
        <div>
            <Head>
                <title>最初の投稿</title>
            </Head>
            <h1>最初の投稿</h1>
            <Link href="/"><a>ホームへ戻る</a></Link>
        </div>
    );
}

//Linkコンポーネントを利用することで、aタグを利用するのと違いページを再リロードせずに表示される
//SEOを気にする場合はLinkコンポーネントの中にaタグを挿入
//<Head>コンポーネントはメタデータを入れるコンポ