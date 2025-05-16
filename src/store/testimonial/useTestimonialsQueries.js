import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { testimonialService } from "../../services/testimonials/testimonialService";

export const useTestimonials = () => {
    return useQuery({
        queryKey: ["testimonials"],
        queryFn: testimonialService.getAllTestimonials,
    });
};

export const useCreateTestimonial = () => {
    const queryClient = useQueryClient();

    return useMutation(testimonialService.createTestimonial, {
        onSuccess: () => {
            // Invalidate testimonials query to refetch updated list
            queryClient.invalidateQueries(["testimonials"]);
        },
    });
};
