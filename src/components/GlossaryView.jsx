import { useState, useMemo } from 'react';
import { Search, BookOpen, Calendar, Tag } from 'lucide-react';

const GlossaryView = ({ terms }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTerm, setSelectedTerm] = useState(null);

  // カテゴリー一覧を取得
  const categories = useMemo(() => {
    const cats = new Set(terms.map(item => item.category));
    return ['all', ...Array.from(cats)];
  }, [terms]);

  // カテゴリー表示名
  const categoryLabels = {
    'all': 'すべて',
    '法律・制度': '法律・制度',
    '戦争・外交': '戦争・外交',
    '社会運動': '社会運動',
    '事件・クーデター': '事件',
    '政治組織': '政治組織',
    '経済政策': '経済政策',
    '外交政策': '外交政策',
    '政治': '政治',
    '経済': '経済'
  };

  // フィルター&検索適用
  const filteredData = useMemo(() => {
    let result = terms;

    // カテゴリーフィルター
    if (selectedCategory !== 'all') {
      result = result.filter(item => item.category === selectedCategory);
    }

    // 検索フィルター
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item =>
        item.term.toLowerCase().includes(query) ||
        item.kana.toLowerCase().includes(query) ||
        item.definition.toLowerCase().includes(query) ||
        (item.relatedTerms && item.relatedTerms.some(term => term.toLowerCase().includes(query)))
      );
    }

    // ID順にソート
    return result.sort((a, b) => a.id - b.id);
  }, [searchQuery, selectedCategory, terms]);

  // カテゴリー色
  const getCategoryColor = (category) => {
    const colors = {
      '地形': 'bg-green-100 text-green-700',
      '気候': 'bg-blue-100 text-blue-700',
      '農業': 'bg-yellow-100 text-yellow-700',
      '水産業': 'bg-cyan-100 text-cyan-700',
      '産業': 'bg-purple-100 text-purple-700',
      '貿易': 'bg-indigo-100 text-indigo-700',
      '人口': 'bg-orange-100 text-orange-700',
      '行政': 'bg-red-100 text-red-700',
      '交通': 'bg-pink-100 text-pink-700',
      '環境': 'bg-teal-100 text-teal-700',
      '文化': 'bg-rose-100 text-rose-700',
      '都市': 'bg-violet-100 text-violet-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  // 詳細表示
  if (selectedTerm) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <button
          onClick={() => setSelectedTerm(null)}
          className="mb-4 text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2"
        >
          ← 一覧に戻る
        </button>

        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* ヘッダー */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2 py-1 rounded-md text-xs font-semibold ${getCategoryColor(selectedTerm.category)}`}>
                {selectedTerm.category}
              </span>
              <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                selectedTerm.examFrequency === 'high' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {selectedTerm.examFrequency === 'high' ? '頻出' : '重要'}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {selectedTerm.term}
            </h2>
            <p className="text-sm text-gray-600">（{selectedTerm.kana}）</p>
          </div>

          {/* 説明 */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">説明</h3>
            <p className="text-gray-700 leading-relaxed">
              {selectedTerm.definition}
            </p>
          </div>

          {/* 関連用語 */}
          {selectedTerm.relatedTerms && selectedTerm.relatedTerms.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Tag size={16} />
                関連用語
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedTerm.relatedTerms.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const relatedItem = terms.find(item => item.term === term);
                      if (relatedItem) setSelectedTerm(relatedItem);
                    }}
                    className="px-3 py-1 bg-primary-50 text-primary-700 rounded-md text-sm font-semibold hover:bg-primary-100 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 一覧表示
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* ヘッダー */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen size={32} className="text-primary-600" />
          <h1 className="text-2xl font-bold gradient-text">地理用語集</h1>
        </div>
        <p className="text-gray-600 text-sm">
          中学受験で出題される重要な地理用語を学習しよう
        </p>
      </div>

      {/* 検索バー */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="用語を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* カテゴリーフィルター */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {categoryLabels[category] || category}
            </button>
          ))}
        </div>
      </div>

      {/* 結果数 */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          {filteredData.length}件の用語が見つかりました
        </p>
      </div>

      {/* 用語リスト */}
      {filteredData.length > 0 ? (
        <div className="space-y-3">
          {filteredData.map(item => (
            <button
              key={item.id}
              onClick={() => setSelectedTerm(item)}
              className="w-full bg-white rounded-lg shadow-md p-4 text-left hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      item.examFrequency === 'high' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {item.examFrequency === 'high' ? '頻出' : '重要'}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {item.term}
                    <span className="text-xs text-gray-600 ml-2">（{item.kana}）</span>
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.definition}
                  </p>
                  {item.relatedTerms && item.relatedTerms.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.relatedTerms.slice(0, 3).map((term, index) => (
                        <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                          {term}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-500">該当する用語が見つかりませんでした</p>
        </div>
      )}
    </div>
  );
};

export default GlossaryView;
