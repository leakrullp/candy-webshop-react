import { useState } from "react";
import { ProductCard } from "../index";
import type { Product } from "../../types";
import "./ProductBanner.css";

type Props = {
  title: string;
  products: Product[];
  filter?: (item: Product) => boolean;
};

const VISIBLE = 4;
const CARD_WIDTH = 276 + 32; // width + gap

export default function ProductBanner({
  title,
  products,
  filter = () => true,
}: Props) {
  const filtered = products.filter(filter);
  const [index, setIndex] = useState(0);

  const maxIndex = Math.max(0, filtered.length - VISIBLE);

  function goLeft() {
    setIndex((i) => Math.max(0, i - 1));
  }

  function goRight() {
    setIndex((i) => Math.min(maxIndex, i + 1));
  }

  return (
    <div className="product-banner">
      <h2 className="product-banner-title">{title}</h2>

      <button
        className="banner-arrow left"
        onClick={goLeft}
        disabled={index === 0}
      >
        ❮
      </button>
      <button
        className="banner-arrow right"
        onClick={goRight}
        disabled={index === maxIndex}
      >
        ❯
      </button>

      <div className="product-banner-track-wrapper">
        <div
          className="product-banner-track"
          style={{ transform: `translateX(${-index * CARD_WIDTH}px)` }}
        >
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
