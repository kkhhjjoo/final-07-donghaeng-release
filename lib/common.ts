// 날짜 포맷 변환 함수 (예: 2026-01-31 -> 26.01.31)
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = String(date.getFullYear()).slice(2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

// 성별 표시 함수
export const getGenderText = (gender: string) => {
  if (gender === 'all') return '성별무관';
  if (gender === 'male') return '남성만';
  if (gender === 'female') return '여성만';
  return gender;
};

// 나이 표시 함수
export const getAgeText = (age: number) => {
  if (age === 0) return '나이무관';
  return `${age}세 이상`;
};