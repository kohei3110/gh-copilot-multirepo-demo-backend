# ハンズオンチュートリアル: Copilot Orchestra で TODO アプリバックエンドを構築

このハンズオンガイドでは、GitHub Copilot Orchestra を使用して TODO アプリケーションのバックエンドを構築する手順を説明します。複数の AI エージェントを活用して開発ワークフローを効率化する方法を学びます。

## 🎯 学習目標

このチュートリアルを完了すると、以下ができるようになります:
- 必要なツールを備えた dev container 環境をセットアップ
- Copilot Orchestra ワークフローの理解
- TypeScript と Express で REST API を構築
- TODO アイテムの CRUD 操作を実装
- Web プッシュ通知サポートを追加
- テストを記述してコード品質を確保
- AI 支援ワークフローを使用してプルリクエストを作成

## 📚 前提条件

開始する前に、以下を確認してください:
- TypeScript/JavaScript の基本知識
- REST API の基本的な理解
- Docker Desktop がインストール済み
- Dev Containers 拡張機能を含む VS Code
- GitHub Copilot サブスクリプション
- GitHub アカウント

## 🏁 パート 1: 環境セットアップ

### ステップ 1.1: Dev Container でプロジェクトを開く

1. VS Code でこのプロジェクトを開く
2. "Reopen in Container" のプロンプトが表示されたら、**Reopen in Container** をクリック
   - または `F1` を押して `Dev Containers: Reopen in Container` を選択
3. コンテナのビルドを待つ(初回は約 2〜3 分)
4. 完了すると、以下を含む完全に構成された環境が利用可能になります:
   - Node.js 20
   - Git CLI
   - GitHub CLI (gh)
   - GitHub Copilot
   - Web Search for Copilot 拡張機能

### ステップ 1.2: 環境を確認

統合ターミナルを開いて実行:

```bash
# Node.js バージョンを確認
node --version  # v20.x.x が表示されるはず

# Git を確認
git --version

# GitHub CLI を確認
gh --version

# npm パッケージがインストールされているか確認
npm list
```

### ステップ 1.3: GitHub CLI を認証

```bash
gh auth login
```

プロンプトに従って GitHub アカウントで認証します。

## 🤖 パート 2: Copilot Orchestra を理解する

Copilot Orchestra は複数の専門化された AI エージェントを調整します:

```
ユーザーリクエスト
    ↓
[Orchestrator Agent] ← 現在ここ
    ↓
    ├─→ [Issue Agent] ────→ GitHub Issue を作成
    ↓
    ├─→ [Plan Agent] ─────→ 実装計画を設計
    ↓
    ├─→ [Impl Agent] ─────→ コードを記述
    ↓
    ├─→ [Review Agent] ───→ コードをレビューして改善
    ↓
    └─→ [PR Agent] ───────→ プルリクエストを作成
```

### 主要概念

1. **Orchestrator Agent**: 全体のワークフローを管理
2. **Issue Agent**: 要件を理解し、詳細なイシューを作成
3. **Plan Agent**: タスクを実行可能なステップに分解
4. **Implementation Agent**: 計画に従ってコードを記述
5. **Review Agent**: コード品質とベストプラクティスを確保
6. **PR Agent**: 包括的なプルリクエストを作成

## 🔨 パート 3: TODO API を構築

### ステップ 3.1: 既存のコード構造を探索

まず、現在の構成を理解しましょう:

```bash
# 現在の構造を表示
tree -L 2 src/
```

以下が表示されます:
- `server.ts` - エントリーポイント
- `config/` - 設定管理
- `services/` - ビジネスロジック
- `types/` - TypeScript 定義
- `utils/` - ヘルパー関数

### ステップ 3.2: 開発サーバーを起動

```bash
npm run dev
```

サーバーは `http://localhost:3000` で起動します。ターミナルにログが表示されます。

### ステップ 3.3: 現在の API をテスト

新しいターミナルを開いて既存のエンドポイントをテスト:

```bash
# ヘルスチェック
curl http://localhost:3000/health

# todo をリスト(初期状態では空のはず)
curl http://localhost:3000/api/todos
```

### ステップ 3.4: TODO 操作を理解する

API は以下の操作をサポートします:

| メソッド | エンドポイント | 説明 |
|--------|--------------|------|
| GET | `/api/todos` | すべての todo をリスト |
| GET | `/api/todos/:id` | 特定の todo を取得 |
| POST | `/api/todos` | 新しい todo を作成 |
| PUT | `/api/todos/:id` | todo を更新 |
| DELETE | `/api/todos/:id` | todo を削除 |

## 🧪 パート 4: Copilot を使った作業

### ステップ 4.1: Copilot Chat を使用

1. Copilot Chat を開く (Mac では `Ctrl+Cmd+I`、Windows/Linux では `Ctrl+Shift+I`)
2. 試しに質問:
   ```
   @workspace この API に新しいエンドポイントを追加するにはどうすればよいですか?
   ```

3. Copilot がワークスペースを分析し、コンテキストに応じた提案を提供します

### ステップ 4.2: インライン提案

1. `src/server.ts` を開く
2. コメントを入力開始: `// todo を完了としてマークするエンドポイントを追加`
3. `Delegate to agent` を押して Copilot のコード提案を確認

### ステップ 4.3: タスクをオーケストレーターエージェントに依頼

1. Copilot Chat を開き、`orchestrator` を選択

![orchestrator](../assets/orchestrator.png)

2. `期限の1日前に Web Push をする機能を実装したい` と入力

3. 以下のような Todos が作成されることを確認

- issue エージェントで GitHub issue を作成
- plan エージェントで実装計画を立てる
- impl エージェントで実装を行う
- review エージェントでコードレビューを行う

![todos](../assets/todos.png)

**表記は異なることがある点にご留意ください。orchestrator エージェントが、各エージェントにタスクを分配していることが確認できればOKです。**

## 🎯 練習問題

### 演習 1: 「期限」機能を追加
検証付きで TODO アイテムに期限機能を追加します。

### 演習 2: フィルタリングを実装
ステータスまたは優先度で todo をフィルタリングするクエリパラメータを追加します。

### 演習 3: ページネーションを追加
todo リストエンドポイントにページネーションを実装します。

### 演習 4: 検索エンドポイントを作成
todo のタイトルと説明に全文検索機能を追加します。

## 🐛 パート 5: GitHub Copilot Coding Agent でバグを修正

このセクションでは、意図的に追加されたバグを GitHub Copilot Coding Agent を使って修正する方法を学びます。

### ステップ 5.1: バグの存在を確認

プロジェクトには2つの意図的なバグが含まれています:

1. **Bug 1: DELETE エンドポイント** - 存在しないIDを削除しても404エラーを返さない
2. **Bug 2: PUT エンドポイント** - 空文字列でTODOを更新できてしまう

まず、サーバーを起動してバグを確認しましょう:

```bash
# サーバーを起動
npm run dev
```

新しいターミナルを開いて、以下のコマンドでバグを確認:

```bash
# Bug 1のテスト: 存在しないIDを削除
curl -X DELETE http://localhost:3000/todos/nonexistent-id -v

# 期待: 404 Not Found
# 実際: 204 No Content (バグ！)
```

```bash
# Bug 2のテスト: 
# 1. まずTODOを作成
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"Test Todo"}'

# レスポンスのIDをメモ（例: "1733123456789"）

# 2. 空文字列で更新
curl -X PUT http://localhost:3000/todos/[上でメモしたID] \
  -H "Content-Type: application/json" \
  -d '{"text":""}'

# 期待: 400 Bad Request
# 実際: 200 OK (バグ！)
```

### ステップ 5.2: Copilot Coding Agent にバグ修正を依頼

1. GitHub で issue を作成します。リポジトリの Issues タブから「New issue」をクリックし、「Bug Report (Copilot Agent Optimized)」テンプレートを選択します。

2. ISSUE_TEMPLATE に従って、以下の内容で issue を記入します:

**Title:**
```
[Bug] DELETE と PUT エンドポイントのバリデーション不備
```

**Bug Summary:**
```
`src/server.ts` に2つのバグがあります:

1. **DELETE /todos/:id エンドポイント** - 存在しないIDに対して404を返さずに204を返してしまう
2. **PUT /todos/:id エンドポイント** - 空文字列のtextを許可してしまう
```

**Steps to Reproduce:**
```
### Bug 1: DELETE エンドポイント
# サーバーを起動
npm run dev

# 新しいターミナルで実行
curl -X DELETE http://localhost:3000/todos/nonexistent-id -v

### Bug 2: PUT エンドポイント
# 1. まずTODOを作成
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"Test Todo"}'

# 2. レスポンスのIDをメモして、空文字列で更新
curl -X PUT http://localhost:3000/todos/[ID] \
  -H "Content-Type: application/json" \
  -d '{"text":""}'
```

**Expected Behavior:**
```
### Bug 1
- 存在しないIDを削除しようとした場合: 404 Not Found を返し、エラーメッセージ {"error": "Todo not found"} を表示

### Bug 2
- 空文字列や空白のみのtextで更新しようとした場合: 400 Bad Request を返し、エラーメッセージ {"error": "Text cannot be empty"} を表示
```

**Actual Behavior:**
```
### Bug 1
- 存在しないIDを削除: 204 No Content を返してしまう（バグ！）

### Bug 2
- 空文字列で更新: 200 OK を返してしまう（バグ！）
```

**Suspected Files:**
```
- src/server.ts - DELETE と PUT エンドポイントの実装箇所
```

**Constraints:**
```
- 既存のAPIレスポンス形式は維持すること
- 他のエンドポイント（GET, POST）の動作に影響を与えないこと
```

**Acceptance Criteria:**
```
- [ ] DELETE /todos/:id が存在しないIDに対して404エラーを返す
- [ ] DELETE /todos/:id が適切なエラーメッセージ {"error": "Todo not found"} を返す
- [ ] PUT /todos/:id が空文字列のtextに対して400エラーを返す
- [ ] PUT /todos/:id が空白のみのtextに対しても400エラーを返す
- [ ] PUT /todos/:id が適切なエラーメッセージ {"error": "Text cannot be empty"} を返す
- [ ] 修正後、再現手順でバグが発生しなくなる
- [ ] 既存の正常系テストが引き続き通過する
```

3. Labels に `bug` を追加します。

4. Issue を作成したら、その Issue に対して Copilot Coding Agent をアサインします。

5. Copilot が修正案を提案したら、内容を確認して適用します。

### ステップ 5.3: 修正を検証

修正後、再度テストコマンドを実行して正しく動作することを確認:

```bash
# Bug 1の検証: 存在しないIDを削除
curl -X DELETE http://localhost:3000/todos/nonexistent-id -v
# 期待: 404 Not Found with {"error": "Todo not found"}

# Bug 2の検証: 空文字列で更新
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"Test Todo"}'

curl -X PUT http://localhost:3000/todos/[ID] \
  -H "Content-Type: application/json" \
  -d '{"text":""}'
# 期待: 400 Bad Request with {"error": "Text cannot be empty"}
```

### ステップ 5.4: 学んだこと

このエクササイズから学べること:

- **問題の明確化**: バグの内容と期待される動作を明確に伝えることで、Copilot がより正確な修正を提案
- **コンテキストの重要性**: ファイル名やエンドポイント名を具体的に指定することで、Copilot が正しい場所を特定
- **検証の重要性**: 修正後は必ずテストを実行して、意図した通りに動作することを確認

### ステップ 5.5: さらなる改善

Copilot に以下のような追加の改善を依頼することもできます:

```
修正したバグに対するユニットテストを追加してください
```

```
エラーメッセージをより詳細にして、ユーザーフレンドリーにしてください
```

## 🐛 トラブルシューティング

### コンテナがビルドされない
- Docker が実行中か確認
- 再ビルドを試す: `Dev Containers: Rebuild Container`

### Copilot が動作しない
- サブスクリプションがアクティブか確認
- 拡張機能が有効か確認
- VS Code の再読み込みを試す

### バグ修正が期待通りに動作しない
- サーバーを再起動してみる: `npm run dev`
- Copilot の提案を再度確認し、必要に応じて追加の指示を与える

## 📚 ご参考

- [GitHub Copilot ドキュメント](https://docs.github.com/ja/copilot)
- [GitHub Copilot Coding Agent](https://docs.github.com/ja/copilot/using-github-copilot/using-copilot-coding-agent-to-work-on-tasks)
- [copilot-orchestra](https://github.com/ShepAlderson/copilot-orchestra)