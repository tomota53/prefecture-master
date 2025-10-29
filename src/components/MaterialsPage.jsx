import { Star } from 'lucide-react';

const MaterialsPage = () => {
  const materials = [
    {
      category: "地図帳・地理教材",
      description: "日本の地理を視覚的に理解",
      icon: "🗾",
      items: [
        {
          title: "小学生のための日本地図ドリル【改訂版】",
          price: "2,500円",
          rating: 4.4,
          reviews: 3,
          image: "🗾",
          url: "https://amzn.to/4nomSa3",
          features: [
            "書き込んで覚える",
            "都道府県の位置と特産物",
            "テスト形式で実力チェック"
          ],
          recommended: [
            "手を動かして覚えたい人",
            "小3-小5",
            "基礎から学びたい人"
          ]
        }
      ]
    },
    {
      category: "参考書",
      description: "体系的に知識を整理",
      icon: "📖",
      items: [
        {
          title: "社会コアプラス（サピックスメソッド）",
          price: "1,572円",
          rating: 4.9,
          reviews: 750,
          image: "📖",
          url: "https://amzn.to/4nsYMLt",
          features: [
            "重要事項を厳選",
            "コンパクトで持ち運びやすい",
            "SAPIX監修"
          ],
          recommended: [
            "効率的に覚えたい人",
            "塾に通っている人",
            "小5-小6"
          ]
        },
        {
          title: "改訂版 中学入試にでる順 社会 地理",
          price: "1,430円",
          rating: 4.4,
          reviews: 35,
          image: "📖",
          url: "https://amzn.to/3L5vGo5",
          features: [
            "頻出順に整理",
            "重要ポイントを厳選",
            "暗記しやすい構成"
          ],
          recommended: [
            "効率的に覚えたい人",
            "塾に通っている人",
            "小5-小6"
          ]
        },
        {
          title: "小学総合的研究 わかる社会 改訂版",
          price: "2,970円",
          rating: 4.5,
          reviews: 66,
          image: "📖",
          url: "https://amzn.to/4hyhuzL",
          features: [
            "詳しい解説で理解が深まる",
            "豊富な図表とイラスト",
            "中学受験に完全対応"
          ],
          recommended: [
            "じっくり学びたい人",
            "難関校を目指す人",
            "小5-小6"
          ]
        }
      ]
    },
    {
      category: "問題集",
      description: "実践力を身につける",
      icon: "📝",
      items: [
        {
          title: "マンガとクイズでまるごと覚える! 47都道府県地理カード ",
          price: "2,178円",
          rating: 4.2,
          reviews: 9,
          image: "📝",
          url: "https://amzn.to/47htu5y",
          features: [
            "カード形式で楽しく暗記",
            "47都道府県を完全網羅",
            "持ち運びに便利"
          ],
          recommended: [
            "スキマ時間に学習したい人",
            "カードで覚えたい人",
            "小4-小6"
          ]
        },
        {
          title: "実力判定テスト10 【社会 偏差値65】",
          price: "1,100円",
          rating: 4.2,
          reviews: 14,
          image: "📝",
          url: "https://amzn.to/3JzgXRG",
          features: [
            "本番形式の問題集",
            "偏差値が分かる",
            "弱点を把握できる"
          ],
          recommended: [
            "実力を測りたい人",
            "受験直前",
            "小6"
          ]
        }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* ヘッダー */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          🎓 中学受験 地理学習おすすめ教材
        </h1>
        <p className="text-gray-600">
          都道府県学習に役立つ教材を厳選してご紹介
        </p>
      </div>

      {/* 目次 */}
      <div className="mb-12 p-6 bg-blue-50 rounded-lg">
        <h2 className="font-bold text-lg mb-4">📋 目次</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {materials.map((cat, idx) => (
            <a
              key={idx}
              href={`#${cat.category}`}
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <span className="text-xl">{cat.icon}</span>
              <span>{cat.category}</span>
            </a>
          ))}
        </div>
      </div>

      {/* 各カテゴリ */}
      {materials.map((category, catIdx) => (
        <section key={catIdx} id={category.category} className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span className="text-3xl">{category.icon}</span>
              {category.category}
            </h2>
            <p className="text-gray-600">{category.description}</p>
          </div>

          <div className="space-y-6">
            {category.items.map((item, itemIdx) => (
              <div
                key={itemIdx}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="md:flex gap-6">
                  {/* 商品画像エリア */}
                  <div className="md:w-48 mb-4 md:mb-0">
                    <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-6xl">
                      {item.image}
                    </div>
                  </div>

                  {/* 商品情報 */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>

                    {/* 評価 */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={i < Math.floor(item.rating) ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {item.rating} ({item.reviews}件のレビュー)
                      </span>
                    </div>

                    {/* 価格 */}
                    <div className="text-2xl font-bold text-red-600 mb-4">
                      {item.price}
                    </div>

                    {/* 特徴 */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        ✨ 特徴
                      </h4>
                      <ul className="space-y-1">
                        {item.features.map((feature, fIdx) => (
                          <li key={fIdx} className="text-sm text-gray-700">
                            • {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* おすすめな人 */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        👍 こんな人におすすめ
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {item.recommended.map((rec, rIdx) => (
                          <span
                            key={rIdx}
                            className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full"
                          >
                            {rec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 購入ボタン */}
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold px-8 py-3 rounded-lg hover:shadow-lg transition-all"
                    >
                      Amazonで詳細を見る →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* フッター */}
      <div className="mt-12 p-6 bg-gray-100 rounded-lg text-center">
        <p className="text-sm text-gray-600">
          ※価格は変動する場合があります<br />
          ※Amazonアソシエイトリンクです。購入により当サイトに収益が入ります
        </p>
      </div>
    </div>
  );
};

export default MaterialsPage;
