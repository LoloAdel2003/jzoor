import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductSection from "../components/ProductSection";
import { ProductContext } from "../context/ProductContext";
import { MemoryRouter } from "react-router-dom"; // ⬅️ أضف هذا
import '@testing-library/jest-dom';

// منتج وهمي للاختبار
const mockProduct = {
  id: 1,
  name: "Olive Tree",
  prev_price: "25",
  new_price: "15",
  img: "olive.jpg"
};

describe("ProductSection", () => {
  it("adds product to cart and shows toast", async () => {
    const mockAddToCart = jest.fn();
    const mockAddToFavorite = jest.fn();
    const mockRemoveFromFavorite = jest.fn();
    const mockIsFavorite = jest.fn().mockReturnValue(false);
    const mockSetSelectedProduct = jest.fn();

    // ✅ لف المكون بـ MemoryRouter
    render(
      <ProductContext.Provider
        value={{
          products: [mockProduct],
          handleAddToCart: mockAddToCart,
          handleAddToFavorite: mockAddToFavorite,
          handleRemoveFromFavorite: mockRemoveFromFavorite,
          isFavorite: mockIsFavorite,
          setSelectedProduct: mockSetSelectedProduct,
        }}
      >
        <MemoryRouter>
          <ProductSection />
        </MemoryRouter>
      </ProductContext.Provider>
    );

    const addButton = screen.getByText("Add To Cart");
    fireEvent.click(addButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
    expect(await screen.findByText("✅ Added to cart!")).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByText("✅ Added to cart!")).not.toBeInTheDocument();
      },
      { timeout: 1500 }
    );
  });
});
