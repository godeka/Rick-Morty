// 이 컴포넌트는 AI 도구를 참고하여 작성
// 사용된 도구: OpenAI ChatGPT (GPT-4o)

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface OwnProps {
  page: number;
  totalPages: number;
  handlePageChange(newPage: number): void;
}

export function RickmortyPagination({
  page,
  totalPages,
  handlePageChange,
}: OwnProps) {
  const renderPageLinks = () => {
    const pagesToShow = 5;
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, start + pagesToShow - 1);

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={i === page}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (end < totalPages)
      pages.push(
        <PaginationItem key="ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(page - 1)}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        {renderPageLinks()}
        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(page + 1)}
            className={
              page === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
