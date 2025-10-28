import { useState } from 'react';
import { Trophy, Calendar, TrendingUp, BarChart3, Award } from 'lucide-react';
import useLocalStorage from '../hooks/useLocalStorage';

const QuizHistoryView = () => {
  const [quizHistory] = useLocalStorage('quizHistory', []);
  const [selectedResult, setSelectedResult] = useState(null);

  // 統計情報を計算
  const statistics = {
    totalQuizzes: quizHistory.length,
    averageScore: quizHistory.length > 0 
      ? Math.min(100, Math.round(quizHistory.reduce((sum, quiz) => sum + quiz.score, 0) / quizHistory.length))
      : 0,
    highestScore: quizHistory.length > 0
      ? Math.min(100, Math.max(...quizHistory.map(quiz => Math.min(100, quiz.score))))
      : 0,
    totalQuestions: quizHistory.reduce((sum, quiz) => sum + quiz.questionCount, 0)
  };

  // クイズタイプの日本語名
  const getQuizTypeName = (type) => {
    const types = {
      'name': '都道府県当て',
      'achievement': '県庁所在地当て',
      'order': '順序当て',
      'mixed': 'ミックス'
    };
    return types[type] || type;
  };

  // スコアに応じた色
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-yellow-600 bg-yellow-50';
    if (score >= 70) return 'text-green-600 bg-green-50';
    if (score >= 50) return 'text-primary-600 bg-primary-50';
    return 'text-orange-600 bg-orange-50';
  };

  // 日付フォーマット
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return '今日';
    if (diffDays === 1) return '昨日';
    if (diffDays < 7) return `${diffDays}日前`;
    
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };

  // 詳細表示
  if (selectedResult) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <button
          onClick={() => setSelectedResult(null)}
          className="mb-4 text-primary-600 hover:text-primary-700 font-semibold"
        >
          ← 一覧に戻る
        </button>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">
              {selectedResult.score >= 90 ? '🎉' :
               selectedResult.score >= 70 ? '😊' :
               selectedResult.score >= 50 ? '👍' : '💪'}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {selectedResult.score}点
            </h2>
            <p className="text-gray-600">
              {selectedResult.correctCount} / {selectedResult.questionCount} 問正解
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">クイズタイプ</div>
              <div className="font-bold text-gray-900">
                {getQuizTypeName(selectedResult.type)}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">出題範囲</div>
              <div className="font-bold text-gray-900">
                {selectedResult.frequency === 'high' ? '頻出のみ' : 'すべて'}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">実施日時</div>
            <div className="font-bold text-gray-900">
              {new Date(selectedResult.date).toLocaleString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 履歴が空の場合
  if (quizHistory.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            まだクイズ成績がありません
          </h2>
          <p className="text-gray-600 mb-6">
            クイズに挑戦して、成績を記録しましょう！
          </p>
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
          <Trophy size={32} className="text-primary-600" />
          <h1 className="text-2xl font-bold gradient-text">クイズ成績</h1>
        </div>
        <p className="text-gray-600 text-sm">
          これまでのクイズ成績を確認しよう
        </p>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <div className="flex justify-center mb-2">
            <BarChart3 size={24} className="text-primary-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {statistics.totalQuizzes}
          </div>
          <div className="text-xs text-gray-600">挑戦回数</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <div className="flex justify-center mb-2">
            <TrendingUp size={24} className="text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {statistics.averageScore}点
          </div>
          <div className="text-xs text-gray-600">平均スコア</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <div className="flex justify-center mb-2">
            <Award size={24} className="text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {statistics.highestScore}点
          </div>
          <div className="text-xs text-gray-600">最高スコア</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <div className="flex justify-center mb-2">
            <Trophy size={24} className="text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {statistics.totalQuestions}
          </div>
          <div className="text-xs text-gray-600">累計問題数</div>
        </div>
      </div>

      {/* 履歴リスト */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900 mb-3">最近の成績</h2>
        {quizHistory.map((result, index) => (
          <button
            key={index}
            onClick={() => setSelectedResult(result)}
            className="w-full bg-white rounded-lg shadow-md p-4 text-left hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-gray-600 flex items-center gap-1">
                    <Calendar size={12} />
                    {formatDate(result.date)}
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-semibold">
                    {getQuizTypeName(result.type)}
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-semibold">
                    {result.questionCount}問
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`text-3xl font-bold ${getScoreColor(result.score).split(' ')[0]}`}>
                    {result.score}点
                  </div>
                  <div className="text-sm text-gray-600">
                    {result.correctCount} / {result.questionCount} 問正解
                  </div>
                </div>
              </div>
              <div className="text-4xl">
                {result.score >= 90 ? '🎉' :
                 result.score >= 70 ? '😊' :
                 result.score >= 50 ? '👍' : '💪'}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizHistoryView;
