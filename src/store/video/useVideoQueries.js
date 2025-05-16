import { useQuery } from '@tanstack/react-query';
import * as videoService from '../../services/video/videoService';

export const useAllVideos = () => {
    return useQuery({
        queryKey: ['videos'],
        queryFn: videoService.getAllVideos,
    });
};

export const useLatestVideo = () => {
    return useQuery({
        queryKey: ['latestVideo'],
        queryFn: videoService.getLatestVideo,
    });
};
