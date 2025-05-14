import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";
import axios from "axios";

// Create context
const ProductContext = createContext();

// Provider component
export const ProductProvider = ({ children, skipInitialFetch = false }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [productDetail, setProductDetail] = useState(null); // Single product state

    // Memoized GET all products
    const getAllProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:8081/api/v1/getAllProducts");
            setProducts(response.data);
            console.log(response.data);
        } catch (err) {
            setError("Failed to fetch products. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []); // No dependencies — safe and stable

    // GET product by ID
    const getProductById = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:8081/api/v1/getProduct/${id}`);
            setProductDetail(response.data);
        } catch (err) {
            setError("Failed to fetch product. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // POST: Create new product
    const createProduct = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post("http://localhost:8081/api/v1/createProduct", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setProducts((prev) => [...prev, response.data]);
        } catch (err) {
            setError("Failed to create product. Please try again.");
            throw err; // Allow the caller (AddProduct) to handle it
        } finally {
            setLoading(false);
        }
    };
    // PUT: Update product
    const updateProduct = async (id, updatedData) => {
        setLoading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append("productName", updatedData.productName);
            formData.append("productWeight", updatedData.productWeight);
            formData.append("productPrice", updatedData.productPrice);
            formData.append("productDescription", updatedData.productDescription);

            // Only include image if available
            if (updatedData.image instanceof File) {
                formData.append("image", updatedData.image);
            }

            const response = await axios.put(
                `http://localhost:8081/api/v1/updateProduct/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setProducts((prev) =>
                prev.map((prod) => (prod.id === id ? response.data : prod))
            );
        } catch (err) {
            setError("Failed to update product. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    

    // DELETE: Remove product
    const deleteProduct = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`http://localhost:8081/api/v1/removeProduct/${id}`);
            setProducts((prev) => prev.filter((prod) => prod.id !== id));
        } catch (err) {
            setError("Failed to delete product. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Initial data fetch
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

// Custom hook
export const useProductContext = () => useContext(ProductContext);

export default ProductContext;
