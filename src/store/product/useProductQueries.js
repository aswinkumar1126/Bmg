// hooks/useProductQueries.js
import { useQuery } from "@tanstack/react-query";
import { productService } from "../../services/product/productService";

export const useProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: productService.getAllProducts,
    });
};

export const useProductById = (id, enabled = true) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => productService.getProductById(id),
        enabled: !!id && enabled,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};