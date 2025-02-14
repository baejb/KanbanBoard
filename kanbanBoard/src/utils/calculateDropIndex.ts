export const calculateDropIndex = (
  issues: { id: number }[],
  offset: { x: number; y: number },
  containerRef: React.RefObject<HTMLDivElement>,
) => {
  if (!containerRef.current) return 0; // 컨테이너가 없으면 첫 번째 위치 반환
  if (!issues || issues.length === 0) return 0; // 이슈가 없으면 첫 번째 위치 반환

  const issueElements = containerRef.current.children; // 모든 이슈 요소 가져오기
  let dropIndex = issues.length; // 기본적으로 마지막 위치

  console.log('📌 현재 보드 내의 이슈 요소들:', issueElements);

  // 🔥 드롭된 위치를 기준으로 가장 가까운 이슈의 인덱스 찾기
  for (let i = 0; i < issueElements.length; i++) {
    const rect = issueElements[i].getBoundingClientRect();
    console.log(`📌 이슈 ${i} 위치 정보:`, rect);

    if (offset.y >= rect.top && offset.y <= rect.bottom) {
      dropIndex = i;
      break;
    }
  }

  console.log('📍 계산된 dropIndex:', dropIndex);
  return Math.min(Math.max(dropIndex, 0), issues.length); // 최대 인덱스를 넘지 않도록 제한
};
