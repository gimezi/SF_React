import { Button, SearchBar } from "@/components/ui";
import React from "react";

function page() {
  return (
    <div className="page">
      <aside className="page__aside">
        {/* 검색창 UI */}
        <SearchBar placeholder="검색어를 입력하세요"></SearchBar>
        {/* Add New Page 버튼 UI */}
        <Button className="text-[#E79057] bg-white border border-[#E79057] hover:bg-[#E79057] hover:text-white">
          Add New Page
        </Button>
        {/* TODO 목록 UI */}
        <p>하이</p>
      </aside>
      <main className="page__main"></main>
    </div>
  );
}

export default page;
