#!/bin/bash
# このスクリプトは、開発環境に初期のチャレンジデータを登録します。

# いずれかのコマンドが失敗したら、スクリプトを終了する
set -e

# 定数
API_URL="http://localhost:3000/challenges"
DATA_FILE="./challenges.json"

# APIにデータをPOSTする関数
post_challenge() {
  local data=$1
  echo "=> 登録: ${data}"
  curl -X POST "${API_URL}" \
       -H "Content-Type: application/json" \
       -d "${data}"
  echo -e "\n"
}

echo "チャレンジデータの登録を開始します..."
echo "---------------------------------"

# jqコマンドでJSONファイルをパースし、各データを登録
# jqがインストールされていない場合は、`brew install jq` または `sudo apt-get install jq` でインストールしてください。
# if ! command -v /usr/bin/jq &> /dev/null; then
#   echo "エラー: jqコマンドが見つかりません。インストールしてください。"
#   exit 1
# fi

/usr/bin/jq -c '.[]' "${DATA_FILE}" | while read -r line; do
  post_challenge "${line}"
done

echo "---------------------------------"
echo "すべてのチャレンジデータの登録が完了しました。"