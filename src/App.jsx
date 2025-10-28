import { useState } from 'react';
import { Star, Users } from 'lucide-react';
import Header from './components/Header';
import LearnMode from './components/LearnMode';
import QuizMode from './components/QuizMode';
import ListView from './components/ListView';
import DailyPM from './components/DailyPrefecture';
import GlossaryView from './components/GlossaryView';
import QuizHistoryView from './components/QuizHistoryView';
import geographyTerms from './data/geography-terms.json';
import prefecturesData from './data/prefectures.json';
import allPrefecturesData from './data/allprefectures.json';
import useLocalStorage from './hooks/useLocalStorage';

// 学習モード with タブ
function StudyModeWithTabs({ prefecturesData }) {
  const [dataMode, setDataMode] = useState('important');
  const currentData = dataMode === 'important' ? prefecturesData : allPrefecturesData;

  return (
    <>
      <DailyPM prefecturesData={currentData} />
      
      {/* データモード切替タブ */}
      <div className="bg-white border-b border-gray-200 sticky top-[72px] z-40">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-2 py-3">
            <button
              onClick={() => setDataMode('important')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                dataMode === 'important'
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Star size={16} />
              重要7都道府県
            </button>
            <button
              onClick={() => setDataMode('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                dataMode === 'all'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Users size={16} />
              47都道府県
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          カード学習モード
        </h2>
      </div>
      
      <LearnMode prefecturesData={currentData} />
    </>
  );
}

function App() {
  // 現在のモード（学習/クイズ/一覧）
  const [currentMode, setCurrentMode] = useState('study');

  // 学習済みIDをLocalStorageから取得
  const [learnedIds] = useLocalStorage('learnedPrimeMinisterIds', []);

  // 学習進捗
  const progress = {
    learned: learnedIds.length,
    total: prefecturesData.length
  };

  return (
    <div className="min-h-screen">
      {/* ヘッダー */}
      <Header
        currentMode={currentMode}
        onModeChange={setCurrentMode}
        progress={progress}
      />

      {/* メインコンテンツ */}
      <main className="pb-20">
        {currentMode === 'study' && (
          <StudyModeWithTabs prefecturesData={prefecturesData} />
        )}

        {currentMode === 'quiz' && (
          <QuizMode prefecturesData={prefecturesData} />
        )}

        {currentMode === 'list' && (
          <ListView prefecturesData={prefecturesData} />
        )}

        {currentMode === 'glossary' && (
          <GlossaryView terms={geographyTerms} />
        )}

        {currentMode === 'history' && (
          <QuizHistoryView />
        )}
      </main>
    </div>
  );
}

export default App;
