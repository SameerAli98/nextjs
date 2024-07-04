"use client";

import { useState, useEffect, useMemo } from "react";
import { columns } from "@/app/columns";
import { DataTable } from "@/components/ui/data-table";
import { Product } from "@/types";
import { Card } from "@/components/ui/card";
import userQueries from "@/data/user_queries.json";
import smartphones from "@/data/smartphones.json";
import curtains from "@/data/curtains.json";
import speakers from "@/data/speakers.json";
import PCs from "@/data/PCs.json";
import chairs from "@/data/chairs.json";
import beds from "@/data/beds.json";
import sofas from "@/data/sofas.json";
import laptops from "@/data/laptops.json";
import projectors from "@/data/projectors.json";
import headphones from "@/data/headphones.json";

const dataMap = {
  smartphones,
  curtains,
  speakers,
  PCs,
  chairs,
  beds,
  sofas,
  laptops,
  projectors,
  headphones,
};

export default function ProductsView() {
  const [selectedCard, setSelectedCard] = useState<keyof typeof dataMap | null>(
    null
  );
  const products = useMemo<Product[]>(() => {
    if (!selectedCard) return [];
    return dataMap[selectedCard].map((row) => ({
      title: row.title,
      price: row.price || "Not Mentioned",
      reviews: parseInt(row.reviews || "0"),
      imageUrl: row.image_url,
      scrapeDatetime: new Date(row.scrape_datetime),
    }));
  }, [selectedCard]);

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-r from-blue-50 to-sky-100 p-10 lg:p-24">
      <h1 className="text-4xl text-center font-bold mb-8 text-gray-800">
        Amazon Products Data
      </h1>
      <div className="flex flex-wrap gap-4">
        {userQueries.map((query) => (
          <Card
            key={query}
            title={query}
            onClick={() => setSelectedCard(query as keyof typeof dataMap)}
          />
        ))}
      </div>
      {selectedCard && products.length > 0 && (
        <div className="mt-8 w-full">
          <h2 className="text-2xl font-semibold mb-4">
            Products for {selectedCard}
          </h2>
          <DataTable columns={columns} data={products} />
        </div>
      )}
    </main>
  );
}
