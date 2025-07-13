import { Profile, SAWScore } from '@models/Profile.ts';
import { fetchData } from '@networks/lib/ApiReq.ts';
import profileAPI from '@networks/apis/profileAPI.ts';

export async function getProfile(id: number): Promise<Profile> {
    try {
        const response = await fetchData<Profile>(profileAPI.getProfileURL(id));
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function getSAWScore(id: number): Promise<SAWScore> {
    try {
        const response = await fetchData<SAWScore>(
            profileAPI.getSAWScoreURL(id),
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
