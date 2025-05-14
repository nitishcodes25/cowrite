"use client"

import { usePaginatedQuery, useQuery } from "convex/react";
import { Navbar } from "./navbar";
import { TemplatesGallery } from "./templates-gallery";
import { api } from "../../../convex/_generated/api";
import { DocumentTable } from "./document-table";
import { useSearchParams } from "@/hooks/use-search-params";

export default function Home() {
  const [search] = useSearchParams()
  const {results,loadMore,status} = usePaginatedQuery(api.documents.getDocuments,{search},{initialNumItems: 5})

  return (
    <div className="min-h-screen flex flex-col">
      <div  className="fixed top-0 left-0 right-0 z-10 h-16 p-4 bg-white">
        <Navbar />
      </div>
      <div className="mt-16">
       <TemplatesGallery/>
      <DocumentTable
        documents={results}
        loadMore={loadMore}
        status={status}
      />
      </div>
    </div>
  );
}
