import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";
import { productService } from "../services/product/productService";

const ProductContext = createContext();

export const ProductProvider = ({ children, skipInitialFetch = false }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [productDetail, setProductDetail] = useState(null);

    // ✅ GET all products
    const getAllProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await productService.getAllProducts(); // ✅ Correct method
            setProducts(data);
            console.log(data);
        } catch (err) {
            setError("Failed to fetch products. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // ✅ GET product by ID
    const getProductById = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const data = await productService.getProductById(id); // ✅ Correct method
            console.log("Single product:", data);
            setProductDetail(data);
        } catch (err) {
            setError("Failed to fetch product. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // ✅ CREATE product
    const createProduct = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await productService.createProduct(formData); // ✅ Correct method
            setProducts((prev) => [...prev, data]);
        } catch (err) {
            setError("Failed to create product. Please try again.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // ✅ UPDATE product
    const updateProduct = async (id, updatedData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await productService.updateProduct(id, updatedData); // ✅ Correct method
            setProducts((prev) =>
                prev.map((prod) => (prod.id === id ? data : prod))
            );
        } catch (err) {
            setError("Failed to update product. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ DELETE product
    const deleteProduct = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await productService.deleteProduct(id); // ✅ Correct method
            setProducts((prev) => prev.filter((prod) => prod.id !== id));
        } catch (err) {
            setError("Failed to delete product. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!skipInitialFetch) {
            getAllProducts();
        }
    }, [skipInitialFetch, getAllProducts]);

    return (
        <ProductContext.Provider
            value={{
                products,
                productDetail,
                loading,
                error,
                getAllProducts,
                getProductById,
                createProduct,
                updateProduct,
                deleteProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => useContext(ProductContext);
export default ProductContext;
