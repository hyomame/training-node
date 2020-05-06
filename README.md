# training-node
node.jsの勉強で作成したコンソールアプリを置いておきます

# Description

cac, fs. inquirerを利用して、コンソールアプリを作りました

- 現在実装したコマンド
  - `expenses`: 自分用の家計簿を作成します

# Usage

```
git clone https://github.com/hyomame/training-node.git
cd training-node
npm run <command>
```

- `expenses` コマンドで表示される各モード(`npm run ***` で直接実行も可能)
  - initializeItems: 家計簿の初期項目を作成する
  - addItems: 項目を追加する
  - deleteItems: 項目を削除する
  - shodItems: 項目の一覧を表示する
  - createExpenses: 家計簿を作成する
