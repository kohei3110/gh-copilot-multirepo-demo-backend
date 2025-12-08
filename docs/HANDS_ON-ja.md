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
3. `Enter` を押して Copilot のコード提案を確認
4. `Tab` を押して提案を受け入れ

### ステップ 4.3: Web Search for Copilot を使用

最新情報が必要な場合:

1. Copilot Chat を開く
2. 質問: `@websearch Node.js で Web Push API を実装するための最新のベストプラクティスは何ですか?`
3. Copilot がウェブを検索して最新情報を提供します

## 🔔 パート 5: Web プッシュ通知を実装

### ステップ 5.1: Web Push を理解する

Web Push により、サーバーはユーザーがアプリをアクティブに使用していなくても通知を送信できます。

### ステップ 5.2: プッシュ通知サービスをレビュー

`src/services/pushNotificationService.ts` を開いてレビュー:
- VAPID キー生成
- サブスクリプション管理
- 通知送信

### ステップ 5.3: プッシュ通知をテスト

```bash
# VAPID キーを生成(既に完了していますが、再生成可能)
curl -X POST http://localhost:3000/api/push/vapid-public-key

# サブスクリプションを保存(例)
curl -X POST http://localhost:3000/api/push/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "endpoint": "https://fcm.googleapis.com/fcm/send/...",
    "keys": {
      "p256dh": "BKXk...",
      "auth": "abc123..."
    }
  }'

# テスト通知を送信
curl -X POST http://localhost:3000/api/push/send \
  -H "Content-Type: application/json" \
  -d '{
    "title": "テスト通知",
    "body": "これはテストです",
    "data": {"url": "/"}
  }'
```

## 🧪 パート 6: コードをテスト

### ステップ 6.1: テストを実行

```bash
# すべてのテストを実行
npm test

# カバレッジ付きで実行
npm run test:coverage

# カバレッジレポートを表示
open coverage/lcov-report/index.html  # macOS
```

### ステップ 6.2: テストカバレッジをレビュー

カバレッジレポートを開いて確認:
- 行カバレッジ: >80% であるべき
- 分岐カバレッジ: >70% であるべき
- 関数カバレッジ: >90% であるべき

### ステップ 6.3: 新しいテストを記述

`src/services/__tests__/todoService.test.ts` を開いて追加:

```typescript
describe('TodoService - Edge Cases', () => {
  test('should handle very long todo titles', () => {
    const longTitle = 'a'.repeat(1000);
    const todo = todoService.createTodo(longTitle, '説明');
    expect(todo.title).toBe(longTitle);
  });
});
```

テストを実行:
```bash
npm test -- todoService.test.ts
```

## 🚀 パート 7: Copilot Orchestra ワークフローを使用

### ステップ 7.1: 新機能リクエストを作成

todo に「優先度」フィールドを追加したいとします。Copilot Chat を使用:

```
@workspace TODO アイテムに優先度フィールド(低、中、高)を追加したいです。
実装計画を作成してください。
```

### ステップ 7.2: 計画をレビュー

Copilot が提案します:
1. TypeScript の型を更新
2. サービスレイヤーを変更
3. API エンドポイントを更新
4. バリデーションを追加
5. テストを記述
6. ドキュメントを更新

### ステップ 7.3: ガイダンスに従って実装

各ステップを実装するよう Copilot に依頼:

```
ステップ 1 を実装: 優先度フィールドの TypeScript 型を更新
```

提案をレビューし、必要に応じて受け入れまたは変更します。

### ステップ 7.4: 変更をコミット

```bash
# 変更をステージング
git add .

# 説明的なメッセージでコミット
git commit -m "feat: TODO アイテムに優先度フィールドを追加"

# ブランチにプッシュ
git push origin feature/add-priority
```

### ステップ 7.5: プルリクエストを作成

```bash
# GitHub CLI を使用
gh pr create --title "TODO に優先度フィールドを追加" \
  --body "TODO アイテムに優先度レベル(低、中、高)を実装"
```

## 🎓 パート 8: 高度なトピック

### ステップ 8.1: コンテキスト対応プロンプトを使用

一般的なプロンプトではなく、コンテキストを提供:

**一般的:**
```
認証を追加するにはどうすればよいですか?
```

**コンテキスト対応:**
```
@workspace 現在の Express アプリの構造を見て、既存のミドルウェアと統合される 
JWT ベースの認証をどのように追加すべきですか?
```

### ステップ 8.2: 反復的な改善

最初の提案を盲目的に受け入れないでください:

1. 実装を依頼
2. レビューして問題を特定
3. 改善を依頼: "エラーハンドリングを改善するために最適化できますか?"
4. 満足するまで繰り返し

### ステップ 8.3: エージェントファイルを探索

プロジェクトにエージェント定義があるか確認:

```bash
ls -la .github/copilot-agents/
```

これらのファイルをレビューして、エージェントがどのように構成されているかを理解します。

## 📝 パート 9: ベストプラクティス

### 9.1 コード品質

- ✅ 型安全性のために TypeScript を使用
- ✅ すべてのビジネスロジックにテストを記述
- ✅ 一貫した命名規則に従う
- ✅ 複雑なロジックにコメントを追加
- ✅ ESLint と Prettier を使用

### 9.2 Copilot の使用

- ✅ 明確で具体的なプロンプトを提供
- ✅ すべての提案を受け入れる前にレビュー
- ✅ コンテキスト対応のヘルプに `@workspace` を使用
- ✅ 最新情報には Web Search を活用
- ✅ 複雑なタスクを小さなステップに分解

### 9.3 セキュリティ

- ✅ シークレットや API キーをコミットしない
- ✅ すべてのユーザー入力を検証
- ✅ 設定には環境変数を使用
- ✅ 依存関係を最新に保つ

## 🎯 練習問題

### 演習 1: 「期限」機能を追加
検証付きで TODO アイテムに期限機能を追加します。

### 演習 2: フィルタリングを実装
ステータスまたは優先度で todo をフィルタリングするクエリパラメータを追加します。

### 演習 3: ページネーションを追加
todo リストエンドポイントにページネーションを実装します。

### 演習 4: 検索エンドポイントを作成
todo のタイトルと説明に全文検索機能を追加します。

## 🐛 トラブルシューティング

### コンテナがビルドされない
- Docker が実行中か確認
- 再ビルドを試す: `Dev Containers: Rebuild Container`

### Copilot が動作しない
- サブスクリプションがアクティブか確認
- 拡張機能が有効か確認
- VS Code の再読み込みを試す

### テストが失敗する
- すべての依存関係がインストールされているか確認: `npm install`
- 構文エラーをチェック
- テスト出力を注意深くレビュー

## 📚 追加リソース

- [GitHub Copilot ドキュメント](https://docs.github.com/ja/copilot)
- [Express.js ガイド](https://expressjs.com/ja/guide/routing.html)
- [TypeScript ハンドブック](https://www.typescriptlang.org/ja/docs/handbook/intro.html)
- [Web Push API](https://developer.mozilla.org/ja/docs/Web/API/Push_API)

## ✅ 完了チェックリスト

- [ ] dev container 環境をセットアップ
- [ ] 開発サーバーの起動に成功
- [ ] すべての TODO API エンドポイントをテスト
- [ ] 支援のために Copilot Chat を使用
- [ ] Copilot で新機能を実装
- [ ] テストを記述して実行
- [ ] プルリクエストを作成
- [ ] 少なくとも 1 つの練習問題を完了

## 🎉 次のステップ

このハンズオンチュートリアルの完了おめでとうございます! 以下を理解しました:
- Copilot Orchestra ワークフローの使用方法
- TypeScript と Express で API を構築
- Web プッシュ通知の実装
- テストの記述とコード品質の維持

検討事項:
- フロントエンドリポジトリを探索して完全なフルスタックアプリを構築
- より高度な Copilot 機能
- カスタムエージェント構成
- GitHub Actions との CI/CD 統合

---

**質問やフィードバック?** このリポジトリでイシューを開くか、メンテナーに連絡してください。

Copilot Orchestra で楽しくコーディング! 🚀
