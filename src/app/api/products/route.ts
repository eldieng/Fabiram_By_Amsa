import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "products.json");

function readProducts() {
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data);
}

function writeProducts(products: unknown[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), "utf-8");
}

export async function GET() {
  try {
    const products = readProducts();
    return NextResponse.json(products);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const product = await request.json();
    const products = readProducts();
    products.push(product);
    writeProducts(products);
    return NextResponse.json(product, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedProduct = await request.json();
    let products = readProducts();
    products = products.map((p: { id: string }) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    writeProducts(products);
    return NextResponse.json(updatedProduct);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    let products = readProducts();
    products = products.filter((p: { id: string }) => p.id !== id);
    writeProducts(products);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
