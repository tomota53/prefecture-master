/**
 * クイズ生成ユーティリティ関数
 */

/**
 * 配列からランダムに要素を取得
 */
export const getRandomItems = (array, count) => {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, array.length));
};

/**
 * 配列からランダムに1つの要素を取得（除外リスト付き）
 */
export const getRandomItem = (array, exclude = []) => {
  const filtered = array.filter(item => !exclude.includes(item));
  if (filtered.length === 0) return null;
  return filtered[Math.floor(Math.random() * filtered.length)];
};

/**
 * 都道府県当てクイズの問題を生成
 */
export const generateNameQuiz = (prefecturesData, count = 10) => {
  const selected = getRandomItems(prefecturesData, count);
  
  return selected.map(pref => {
    // 間違いの選択肢を3つ選ぶ
    const wrongOptions = getRandomItems(
      prefecturesData.filter(p => p.id !== pref.id),
      3
    );
    
    // 正解と間違いをシャッフル
    const options = [...wrongOptions.map(p => p.name), pref.name]
      .sort(() => Math.random() - 0.5);
    
    // 特産物からランダムに1つ選ぶ
    const specialty = pref.specialties?.[Math.floor(Math.random() * (pref.specialties?.length || 1))] || pref.achievements[0];
    
    return {
      type: 'name',
      question: `「${specialty}」が特産物なのはどこでしょう？`,
      options,
      correctAnswer: pref.name,
      primeMinister: pref
    };
  });
};

/**
 * 県庁所在地当てクイズの問題を生成
 */
export const generateAchievementQuiz = (prefecturesData, count = 10) => {
  const selected = getRandomItems(prefecturesData, count);
  
  return selected.map(pref => {
    // 間違いの選択肢を3つ選ぶ
    const wrongOptions = getRandomItems(
      prefecturesData.filter(p => p.id !== pref.id),
      3
    );
    
    // 正解と間違いをシャッフル
    const options = [...wrongOptions.map(p => p.capital), pref.capital]
      .sort(() => Math.random() - 0.5);
    
    return {
      type: 'achievement',
      question: `${pref.name}の県庁所在地はどこでしょう？`,
      options,
      correctAnswer: pref.capital,
      primeMinister: pref
    };
  });
};

/**
 * 順序当てクイズの問題を生成
 */
export const generateOrderQuiz = (primeMinistersData, count = 5) => {
  const quizzes = [];
  
  for (let i = 0; i < count; i++) {
    // 都道府県を選択
    const selected = getRandomItems(primeMinistersData, 3);
    
    // 人口順でソート（termStartが人口を表す）
    const correctOrder = [...selected].sort((a, b) => b.termStart - a.termStart);
    
    // シャッフルした選択肢
    const shuffledOptions = [...selected].sort(() => Math.random() - 0.5);
    
    quizzes.push({
      type: 'order',
      question: '次の都道府県を人口の多い順に並べてください',
      primeMinistersList: shuffledOptions,
      correctOrder: correctOrder.map(pm => pm.id)
    });
  }
  
  return quizzes;
};

/**
 * クイズセットを生成
 */
export const generateQuizSet = (primeMinistersData, quizType, questionCount, frequency = 'all') => {
  // 頻出度でフィルター
  let filtered = primeMinistersData;
  if (frequency === 'high') {
    filtered = primeMinistersData.filter(pm => pm.examFrequency === 'high');
  }
  
  // データが不足している場合は使用可能なデータで生成
  if (filtered.length === 0) {
    filtered = primeMinistersData;
  }
  
  switch (quizType) {
    case 'name':
      return generateNameQuiz(filtered, Math.min(questionCount, filtered.length));
    case 'achievement':
      return generateAchievementQuiz(filtered, Math.min(questionCount, filtered.length));
    case 'order':
      return generateOrderQuiz(filtered, Math.min(questionCount, 10)); // 順序問題は最大10問
    case 'mixed':
      // ミックス：各タイプから均等に
      const nameCount = Math.floor(questionCount / 3);
      const achievementCount = Math.floor(questionCount / 3);
      const orderCount = questionCount - nameCount - achievementCount;
      
      return [
        ...generateNameQuiz(filtered, Math.min(nameCount, filtered.length)),
        ...generateAchievementQuiz(filtered, Math.min(achievementCount, filtered.length)),
        ...generateOrderQuiz(filtered, Math.max(1, Math.floor(orderCount / 3)))
      ].sort(() => Math.random() - 0.5);
    default:
      return generateNameQuiz(filtered, Math.min(questionCount, filtered.length));
  }
};
