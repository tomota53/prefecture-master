# SEO対策ガイド - 都道府県マスター

このドキュメントでは、都道府県マスターアプリに実装されているSEO対策と、今後の改善提案をまとめています。

## 実装済みのSEO対策

### 1. 基本的なメタタグ ✅

**index.html**に以下を設定：

- **タイトルタグ**: キーワードを含む魅力的なタイトル
  ```html
  <title>都道府県マスター | 中学受験生向け都道府県学習アプリ 無料</title>
  ```

- **メタディスクリプション**: 検索結果に表示される説明文（160文字以内推奨）
  ```html
  <meta name="description" content="中学受験に特化した47都道府県学習アプリ。クイズ、暗記カード、用語集で効率的に学習。県庁所在地、特産物、地形を楽しく覚えられる無料ツール。スマホ・PC対応。" />
  ```

- **キーワード**: 主要な検索キーワード
  ```html
  <meta name="keywords" content="都道府県,中学受験,地理,学習アプリ,クイズ,暗記,県庁所在地,特産物,地形,無料,小学生" />
  ```

- **言語設定**: 日本語サイトであることを明示
  ```html
  <html lang="ja">
  <meta name="language" content="Japanese" />
  ```

### 2. OGP（Open Graph Protocol）✅

SNS（Facebook、LINE等）でシェアされた時の表示を最適化：

```html
<meta property="og:type" content="website" />
<meta property="og:title" content="都道府県マスター | 中学受験生向け都道府県学習アプリ" />
<meta property="og:description" content="中学受験に特化した47都道府県学習アプリ..." />
<meta property="og:image" content="https://prefecture-master.vercel.app/og-image.jpg" />
```

**⚠️ TODO**: `og-image.jpg`（1200x630px推奨）を作成してpublicフォルダに配置

### 3. Twitter Card ✅

Twitter上での表示を最適化：

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="都道府県マスター..." />
```

### 4. 構造化データ（JSON-LD）✅

Googleが理解しやすい形式でサイト情報を提供：

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "都道府県マスター",
  "applicationCategory": "EducationalApplication",
  ...
}
```

### 5. robots.txt ✅

検索エンジンのクローラーに指示を与えるファイル：

- 全ページをクロール許可
- サイトマップの場所を指定
- クロール頻度の推奨設定

### 6. sitemap.xml ✅

サイトの構造を検索エンジンに伝える：

- 全7ページ（モード）を登録
- 更新頻度と優先度を設定

### 7. Canonical URL ✅

正規URLを明示し、重複コンテンツを防止：

```html
<link rel="canonical" href="https://prefecture-master.vercel.app/" />
```

---

## 今後の改善提案

### 🎯 高優先度

#### 1. OG画像の作成
- **ファイル名**: `public/og-image.jpg`
- **推奨サイズ**: 1200x630px
- **内容**: アプリのスクリーンショットやロゴ、キャッチコピー
- **ツール**: Canvaなどのデザインツールで作成

#### 2. Google Search Consoleへの登録
1. https://search.google.com/search-console にアクセス
2. サイトを追加
3. 所有権を確認
4. サイトマップを送信（`/sitemap.xml`）

**メリット**:
- 検索パフォーマンスの分析
- インデックス状況の確認
- 検索クエリの把握

#### 3. Google Analyticsの設定
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**取得手順**:
1. https://analytics.google.com にアクセス
2. プロパティを作成
3. トラッキングIDを取得
4. `index.html`の`<head>`内に追加

#### 4. ページ読み込み速度の最適化
- Lighthouseでパフォーマンステスト
- 画像の最適化（WebP形式）
- 不要なJavaScriptの削除
- コード分割（React.lazy）

### ⚡ 中優先度

#### 5. コンテンツの充実
- ブログ記事の追加（都道府県の豆知識など）
- よくある質問（FAQ）ページ
- 学習のコツやノウハウ記事

#### 6. 内部リンクの最適化
- 関連ページへのリンク
- パンくずリストの追加
- アンカーテキストの最適化

#### 7. モバイルフレンドリー対応
現在は対応済みですが、以下を確認：
- タッチターゲットのサイズ
- フォントサイズの適切さ
- ビューポートの設定

#### 8. SSL/HTTPS
Vercelは自動でHTTPS化されるため対応済み ✅

### 💡 低優先度（将来的に）

#### 9. ブランディング
- ロゴの作成
- ファビコンの改善（現在はViteデフォルト）
- ブランドカラーの統一

#### 10. 外部リンク獲得
- 教育系サイトからのリンク
- SNSでの拡散
- プレスリリース

#### 11. ローカルSEO
特定の地域をターゲットにする場合：
- Googleマイビジネスへの登録
- 地域名を含むコンテンツ

---

## SEOチェックリスト

### デプロイ後に必ず確認

- [ ] Google Search Consoleに登録
- [ ] サイトマップを送信
- [ ] OG画像を作成・配置
- [ ] Google Analyticsを設定
- [ ] モバイルフレンドリーテスト実施
- [ ] ページ速度テスト（Lighthouse）実施
- [ ] 検索結果での表示を確認（site:prefecture-master.vercel.app）

### 定期的にチェック（月1回）

- [ ] Search Consoleでエラー確認
- [ ] アクセス解析の確認
- [ ] 検索順位のモニタリング
- [ ] コンテンツの更新
- [ ] ページ速度の確認

---

## 便利なSEOツール

### 無料ツール

1. **Google Search Console**
   - https://search.google.com/search-console
   - 検索パフォーマンス分析

2. **Google PageSpeed Insights**
   - https://pagespeed.web.dev/
   - ページ速度の測定

3. **Google Mobile-Friendly Test**
   - https://search.google.com/test/mobile-friendly
   - モバイル対応チェック

4. **Google Rich Results Test**
   - https://search.google.com/test/rich-results
   - 構造化データの検証

5. **Lighthouse**
   - Chrome DevToolsに内蔵
   - 総合的なパフォーマンス評価

### 有料ツール（オプション）

1. **Ahrefs** - 被リンク分析
2. **SEMrush** - キーワード調査
3. **Moz** - SEO総合ツール

---

## ターゲットキーワード

### 主要キーワード
- 都道府県 学習アプリ
- 都道府県 クイズ
- 中学受験 地理
- 県庁所在地 覚え方
- 特産物 暗記

### ロングテールキーワード
- 都道府県 中学受験 アプリ 無料
- 県庁所在地 クイズ 小学生
- 日本地図 学習 ゲーム
- 地理 暗記 アプリ おすすめ

---

## 参考資料

- [Google検索セントラル](https://developers.google.com/search)
- [Googleウェブマスター向けガイドライン](https://developers.google.com/search/docs/essentials)
- [Schema.org（構造化データ）](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)

---

## 更新履歴

- 2025-01-29: 初版作成
  - 基本的なSEO対策を実装
  - OGP、Twitter Card対応
  - robots.txt、sitemap.xml作成
  - 構造化データ追加

---

## お問い合わせ

SEO対策に関する質問や提案は、tomota53@yahoo.co.jp までお願いします。
