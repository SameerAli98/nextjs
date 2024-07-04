"use client";

import { useState, useEffect, useMemo } from "react";
import { columns } from "@/app/columns";
import { DataTable } from "@/components/ui/data-table";
import { readJsonFile, readProductsFromJson } from "@/services";
import { Product } from "@/types";
import { Card } from "@/components/ui/card";

export default function ProductsView() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const [queries, setQueries] = useState<string[]>([]);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const userQueries: string[] = await readJsonFile("user_queries.json");
        setQueries(userQueries);
      } catch (err) {
        console.error(`Failed to load user queries. ${err}`);
      }
    };

    fetchQueries();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (selectedCard) {
        const fetchedProducts = await readProductsFromJson(
          `${selectedCard}.json`
        );
        setProducts(fetchedProducts);
      }
    };

    fetchProducts();
  }, [selectedCard]);

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-r from-blue-50 to-sky-100 p-10 lg:p-24">
      <h1 className="text-4xl text-center font-bold mb-8 text-gray-800">
        Amazon Products Data
      </h1>
      <div className="flex flex-wrap gap-4">
        {queries.map((query) => (
          <Card
            key={query}
            title={query}
            onClick={() => setSelectedCard(query)}
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
