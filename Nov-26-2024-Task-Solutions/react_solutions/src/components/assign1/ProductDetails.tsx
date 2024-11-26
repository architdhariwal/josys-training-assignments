import React, { useState } from "react";

interface ProductDetailsProps {}

const ProductDetails: React.FC<ProductDetailsProps> = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quant, setQuant] = useState("");
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  const calculateTotalAmount = () => {
    const parsedPrice = parseFloat(price);
    const parsedQty = parseInt(quant);

    if (!isNaN(parsedPrice) && !isNaN(parsedQty)) {
      setTotalAmount(parsedPrice * parsedQty);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 id="header" className="text-xl font-bold mb-4">Product Details</h2>

      <div className="mb-4">
        <label htmlFor="productName" className="block text-gray-700 mb-2">
          Product Name
        </label>
        <input
          id="productName"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter product name"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 mb-2">Price</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter price"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="quantity" className="block text-gray-700 mb-2">
          Quantity
        </label>
        <input
          id="quantity"
          type="number"
          value={quant}
          onChange={(e) => setQuant(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter quantity"
        />
      </div>

      <div className="mb-4">
        <button
          id="calculateButton"
          onClick={calculateTotalAmount}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Calculate Total Amount
        </button>
      </div>

      {totalAmount !== null && (
        <p id="totalAmount" className="text-green-600 font-semibold">
          Total Amount: ${totalAmount.toFixed(2)}
        </p>
      )}
    </div>
  );
};

export default ProductDetails;
