"use client";

import { PageNavigation } from "./components/PageNavigation";
import { FormContent } from "./components/FormContent";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [activePage, setActivePage] = useState("1");
  const [activeFormType, setActiveFormType] = useState("info");

  const handlePageChange = (pageId: string, formType: string) => {
    setActivePage(pageId);
    setActiveFormType(formType);
  };

  return (
    <main className="bg-gray-50 min-h-screen flex flex-col">
      <div className="container pt-4 sm:pt-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <Image
              src="/images/fillout-logo.png"
              alt="Fillout logo"
              width="100"
              height="0"
              className="w-20 sm:w-24 lg:w-28"
            />
            <div className="w-[1.2px] h-[20px] bg-gray-400 hidden sm:block"></div>
            <h1 className="font-bold text-lg sm:text-xl text-gray-500">
              Form Builder | Mike Joo
            </h1>
          </div>
          <p className="text-gray-500 text-sm sm:text-base mt-2 sm:mt-0 sm:ml-auto   ">
            Drag and drop to reorder pages, add new pages, and manage your form
            structure
          </p>
        </div>
      </div>
      <div className="container mx-auto py-4 sm:py-8 pb-0 px-4 sm:px-6 lg:px-8 flex flex-col flex-1">
        <div className="content-container flex justify-center items-center bg-navy-blue rounded-md grow p-4 sm:p-6 lg:p-8">
          <FormContent activePage={activePage} formType={activeFormType} />
        </div>
        <PageNavigation onPageChange={handlePageChange} />
      </div>
    </main>
  );
}
