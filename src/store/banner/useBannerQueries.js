import {useQuery} from "@tanstack/react-query";
import * as BannerService from "../../services/imageSlider/imageSliderService"

export const useBanners =()=>{
    return useQuery({
        queryKey: ['banners'],
        queryFn: BannerService.getAllSliderImages
    })
}
export const useBannerById = (id, enabled = true) => {
    return useQuery({
        queryKey: ['banner', id],
        queryFn: () => BannerService.getSliderImageById(id),
        enabled: !!id && enabled,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};