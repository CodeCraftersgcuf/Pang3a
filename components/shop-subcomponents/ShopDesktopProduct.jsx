import React from 'react';
import ProductSlide from '../ProductDetails-subcomponents/ProductSlide';
import { memo } from 'react';
import DummyProductSlide from '../ProductDetails-subcomponents/DummyProductSlide';

const slides2 = [1, 2, 3, 4, 5, 6, 7, 8];
const ShopDesktopProduct = ({ addItem, products, isLoading }) => {
    return (
        <div className="w-4/5 hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {isLoading && slides2.map((slide, index) => (
                <DummyProductSlide key={index} />
            ))}
            {!isLoading && products.map((product, index) => (
                <div className="sliders overflow-hidden" key={index}>
                    <ProductSlide
                        key={product.id} // Use a unique product identifier if available
                        product={product}
                        addItem={addItem}
                        bigItemClass={true}
                    />
                </div>
            ))}
        </div>
    );
};

// Custom comparison function to avoid unnecessary re-renders
const areEqual = (prevProps, nextProps) => {
    // Shallow compare the products and addItem prop
    return (
        prevProps.addItem === nextProps.addItem &&
        prevProps.products === nextProps.products
    );
};

export default memo(ShopDesktopProduct, areEqual);
