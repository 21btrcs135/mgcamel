
'use client';
import React, { useState } from "react";
import { collection, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useCollection } from "react-firebase-hooks/firestore";
import Image from 'next/image';

console.log("Firestore snapshot: page loaded");

type Product = {
  name: string;
  price: number;
  image: string;
  button: string;
  id: string;
};

const PLACEHOLDER_IMAGE = "/file.svg";

function parseProduct(doc: QueryDocumentSnapshot<DocumentData>): Product | null {
  const data = doc.data();
  // fallback: show all data for debugging
  return {
    id: doc.id,
    name: typeof data.name === 'string' ? data.name : JSON.stringify(data),
    price: typeof data.price === 'number' ? data.price : (typeof data.price === 'string' ? parseFloat(data.price) : 0),
    image: typeof data.image === 'string' ? data.image : PLACEHOLDER_IMAGE,
    button: typeof data.button === 'string' ? data.button : 'N/A',
  };
}


function ErrorBoundary({ children }: { children: React.ReactNode }) {
  // Removed setError as it was unused
  return <>{children}</>;
}


export default function OurProductsPage() {
  // Use root-level collection path
  const colRef = collection(db, "our-products");
  const [snapshot, loading, error] = useCollection(colRef);
  let products: Product[] = [];
  if (error) {
    // Log error for debugging
    console.error("Firestore error:", error);
  }
  if (snapshot) {
    // Debug: log snapshot
    console.log("Firestore snapshot:", snapshot);
    console.log("Document IDs:", snapshot.docs.map(doc => doc.id));
    console.log("Docs data:", snapshot.docs.map(doc => doc.data()));
    products = snapshot.docs.map(parseProduct).filter(Boolean) as Product[];
    console.log("Parsed products:", products);
  } else {
    console.log("No Firestore snapshot (not loaded yet or error)");
  }

  // ... rest of your component code remains the same ...
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-6 text-black tracking-tight">YANTRAS</h1>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex gap-2 items-center">
              <span className="font-semibold">Filter:</span>
              <select className="border rounded px-2 py-1 text-sm">
                <option>Availability</option>
              </select>
              <select className="border rounded px-2 py-1 text-sm">
                <option>Price</option>
              </select>
            </div>
            <div className="ml-auto flex gap-2 items-center">
              <span className="text-sm">Sort by:</span>
              <select className="border rounded px-2 py-1 text-sm">
                <option>Date, new to old</option>
              </select>
              <span className="text-sm text-gray-500">{products.length} products</span>
            </div>
          </div>
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading products...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">
              Error loading products.<br />
              <span style={{fontSize:12}}>{error.message || String(error)}</span>
            </div>
          ) : products.length === 0 && snapshot ? (
            <div className="text-center py-12 text-red-500">
              No products found.<br />
              Raw Firestore data:<br />
              <pre style={{textAlign:'left',fontSize:12,overflow:'auto',background:'#eee',padding:8}}>{JSON.stringify(snapshot.docs.map(doc => doc.data()), null, 2)}</pre>
              <br />
              <span style={{fontSize:12, color:'#888'}}>If you see an empty array above, your Firestore query is returning no documents. Check your Firestore rules and collection name.</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="border rounded-xl p-4 flex flex-col items-center bg-white shadow-sm hover:shadow-md transition">
                  <div className="w-32 h-32 mb-4 flex items-center justify-center">
                    <Image
                      src={product.image || PLACEHOLDER_IMAGE}
                      alt={product.name}
                      width={128}
                      height={128}
                      className="object-contain rounded"
                      onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE; }}
                    />
                  </div>
                  <div className="font-semibold text-center mb-1">{product.name}</div>
                  <div className="text-gray-700 text-center mb-2">₹{product.price}</div>
                  <button className="border border-black rounded-full px-4 py-1 text-sm font-medium hover:bg-black hover:text-white transition">
                    {product.button}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}