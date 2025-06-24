interface OwnProps {
  children: React.ReactNode;
}

// Cursor AI 참고 - 그리드 반응형으로 수정
export function RickmortyReactiveGrid({ children }: OwnProps) {
  return (
    <div className="p-4 gap-4 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {children}
    </div>
  );
}
