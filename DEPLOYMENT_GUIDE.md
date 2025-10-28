# GitとVercelへのデプロイ手順

このガイドでは、都道府県マスターアプリをGitHubに登録し、Vercelにデプロイする手順を説明します。

## 前提条件

- GitHubアカウントを持っていること
- Vercelアカウントを持っていること（GitHubアカウントで連携可能）

---

## ステップ1: Gitリポジトリの初期化

### 1-1. Gitの初期化

ターミナルで以下のコマンドを実行します：

```bash
# Gitリポジトリを初期化
git init

# 現在の状態を確認
git status
```

### 1-2. .gitignoreファイルの確認

プロジェクトに`.gitignore`ファイルが存在することを確認してください。以下の内容が含まれているはずです：

```
# Dependencies
node_modules/

# Build output
dist/
build/

# Environment variables
.env
.env.local
.env.production

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
```

### 1-3. すべてのファイルをステージング

```bash
# すべてのファイルをステージングエリアに追加
git add .

# ステージングされたファイルを確認
git status
```

### 1-4. 最初のコミット

```bash
# コミットメッセージを付けてコミット
git commit -m "Initial commit: 都道府県マスターアプリ"
```

---

## ステップ2: GitHubリポジトリの作成とプッシュ

### 2-1. GitHubで新しいリポジトリを作成

1. ブラウザで https://github.com にアクセス
2. 右上の「+」アイコンをクリック → 「New repository」を選択
3. リポジトリの設定：
   - **Repository name**: `prefecture-master`（任意の名前でOK）
   - **Description**: `都道府県学習アプリ - 中学受験対策`
   - **Public/Private**: お好みで選択（Publicなら誰でも閲覧可能）
   - **Initialize this repository with**: チェックを入れない
4. 「Create repository」をクリック

### 2-2. ローカルリポジトリとGitHubを接続

GitHubのリポジトリページに表示される指示に従います：

```bash
# GitHubリポジトリをリモートとして追加（URLは自分のものに置き換えてください）
git remote add origin https://github.com/tomota53/prefecture-master.git

# デフォルトブランチ名をmainに変更（必要な場合）
git branch -M main

# GitHubにプッシュ
git push -u origin main
```

**注意**: 初回プッシュ時にGitHubの認証が求められる場合があります。Personal Access Token (PAT) を使用してください。

### 2-3. プッシュの確認

ブラウザでGitHubリポジトリを開き、ファイルが正しくアップロードされていることを確認します。

---

## ステップ3: Vercelへのデプロイ

### 3-1. Vercelにログイン

1. ブラウザで https://vercel.com にアクセス
2. 「Sign Up」または「Log In」をクリック
3. 「Continue with GitHub」を選択してGitHubアカウントで連携

### 3-2. 新しいプロジェクトをインポート

1. Vercelダッシュボードで「Add New...」→「Project」をクリック
2. 「Import Git Repository」セクションで作成したリポジトリ（prefecture-master）を探す
3. 「Import」をクリック

### 3-3. プロジェクトの設定

以下の設定を確認・入力します：

#### Project Name
- デフォルトのままでOK（例: `prefecture-master`）

#### Framework Preset
- **自動検出**: Vercelは自動的に「Vite」を検出します
- 検出されない場合は手動で「Vite」を選択

#### Build and Output Settings
- **Build Command**: `npm run build`（デフォルト）
- **Output Directory**: `dist`（デフォルト）
- **Install Command**: `npm install`（デフォルト）

#### Environment Variables
- 現在は特に設定不要（環境変数を使用していないため）

### 3-4. デプロイ開始

1. 「Deploy」ボタンをクリック
2. ビルドプロセスが開始されます（1-3分程度）
3. 成功すると「Congratulations!」画面が表示されます

### 3-5. デプロイされたアプリの確認

- Vercelが自動的に生成したURL（例: `https://prefecture-master.vercel.app`）でアプリにアクセス
- 正常に動作することを確認

---

## ステップ4: 今後の更新方法

### 4-1. コードを修正した後の手順

```bash
# 変更されたファイルを確認
git status

# 変更をステージング
git add .

# コミット
git commit -m "修正内容の説明（例: 用語集を追加）"

# GitHubにプッシュ
git push origin main
```

### 4-2. 自動デプロイ

- GitHubにプッシュすると、**Vercelが自動的に**新しいバージョンをデプロイします
- 数分後に変更がVercelのURLに反映されます
- デプロイの進行状況はVercelダッシュボードで確認できます

---

## トラブルシューティング

### ビルドエラーが発生した場合

1. **ローカルでビルドを試す**:
   ```bash
   npm run build
   ```
   エラーが出る場合は、まずローカルで修正

2. **依存関係の問題**:
   ```bash
   # node_modulesを削除して再インストール
   rm -rf node_modules
   npm install
   ```

3. **Vercelのログを確認**:
   - Vercelダッシュボードでデプロイの詳細ログを確認

### プッシュできない場合

```bash
# リモートの最新状態を取得
git pull origin main --rebase

# 再度プッシュ
git push origin main
```

### Personal Access Token (PAT) の作成方法

GitHubで認証が必要な場合：

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 「Generate new token」をクリック
3. 権限: `repo`にチェック
4. トークンをコピーして、パスワードの代わりに使用

---

## カスタムドメインの設定（オプション）

### Vercelでカスタムドメインを設定

1. Vercelプロジェクトの「Settings」→「Domains」
2. 「Add Domain」でドメインを追加
3. DNSレコードの設定（Vercelが指示を表示）

---

## デプロイ完了後の確認事項

✅ アプリが正常に表示される
✅ すべての機能が動作する（学習モード、クイズモード、用語集など）
✅ レスポンシブデザインが機能する
✅ ローカルストレージが動作する（学習進捗の保存）

---

## 便利なコマンド集

```bash
# 現在のブランチとリモートの状態を確認
git status

# コミット履歴を確認
git log --oneline

# リモートリポジトリのURLを確認
git remote -v

# 最後のコミットを取り消す（コミット前に戻る）
git reset --soft HEAD~1

# 特定のファイルの変更を確認
git diff ファイル名
```

---

## まとめ

1. **Git初期化**: `git init` → `git add .` → `git commit`
2. **GitHubにプッシュ**: リポジトリ作成 → `git push`
3. **Vercelデプロイ**: リポジトリをインポート → Deploy
4. **更新**: コード修正 → `git push` → 自動デプロイ

これでGitとVercelへのデプロイが完了です！🎉
