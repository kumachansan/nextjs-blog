import path from "path";
import fs from "fs"; //モジュール
import matter from "gray-matter"; //mdのメタデータを分析しオブジェクトにしてくれるする関数　//https://www.npmjs.com/package/gray-matter
import { remark } from "remark";
import html from "remark-html";

//const fs = require('fs');
const postsDirectory = path.join(process.cwd(), "posts");
//process.cwd()は全てのディレクトリを指している
//"posts"は、"posts"ディレクトリの中を指定してる

//mdファイルのIDとデータを取り出す
export function getSortedPostsData() {

    const fileNames = fs.readdirSync(postsDirectory);
    //fileNamesにオブジェクト配列として返す

    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, "");
        //map() メソッドは、与えられた関数を,配列のすべての要素に対して呼び出し、その結果からなる新しい配列を生成します。
        //replaceメソッドで.mdを取り除く、第二引数は空にして取り除く。結果idはfile名のみ取得できる

        //マークダウンファイルを文字列として読み取る
        const fullPath = path.join(postsDirectory, fileName);
        //postsディレクトリのファイル一つ一つパスがfullPathに代入される

        const fileContents = fs.readFileSync(fullPath, "utf8");
        //パスの中身を文字列を取得してfileContentsに代入

        const matterResult = matter(fileContents);
        //mdのメタデータを分析
        //title data thumbrailがオブジェクトとしてmatterResultに代入されている

        //idとデータをallPostsDataへ代入
        return {
            id,
            ...matterResult.data,
            //それをスプレット構文というものでよりだす（...のこと）そのことで一つ一つ取り出すことができる
        }
    });
    //最後にgetPostsData()にallPostsDataを返す
    return allPostsData;
    //投稿を日付でソートする
    //   return allPostsData.sort((a, b) => {
    //     if (a.data < b.data) {
    //       return 1;
    //     } else {
    //       return -1;
    //     }
    //   });
}

//getStaticPathでreturnで利用するpathを取得する
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        //map関数で一つずつ取り出し,returnでfileNamesに返す
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
                //id:はpostsディレクトリの中のi[id].js/replaceでfilenameのいらない文字列削除
            },
        };
    });
    /*
   getAllPostIds()にreturnされるオブジェクト。オブジェクトでreturnしないと正常に動作しないので注意
   [
       {
           {
               params: {
                   id:"ssg-_ssr"
               }
           },
           {
               params: {
                   id:"pre-rendering"
               }
           },
           {
               params: {
                   id:"react-next"
               }
           },
       }
   ]
   */
}


//id(ファイル名)に基づいてブログ投稿データを返す関数
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, "utf-8");

    const matterResult = matter(fileContent);
    //メタデータ解析

    //matterResult.content
    //記事コンテンツを見る/単なる文字列
    const blogContent = await remark()
        .use(html)
        .process(matterResult.content);
    //HTMLへ変換

    const blogContentHTML = blogContent.toString();

    return {
        id,
        blogContentHTML,
        ...matterResult.data
    };
}

