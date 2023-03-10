import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({ baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}` });

API.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    }

    return req;
});

// AUTH

export const signIn = (formData) => API.post("/users/signin", formData);

export const signUp = (formData) => API.post("/users/signup", formData);

export const googleSignin = (result) => API.post("/users/googleSignin", result);

// TOUR

export const createTour = (tourData) => API.post("/tour", tourData);

export const getTours = (page) => API.get(`/tour?page=${page}`);

export const getTour = (id) => API.get(`/tour/${id}`);

export const getToursByUser = (userId) => API.get(`/tour/userTours/${userId}`);

export const deleteTour = (id) => API.delete(`/tour/${id}`);

export const updateTour = (updatedTourData, id) => API.patch(`/tour/${id}`, updatedTourData);

export const getToursBySearch = (searchQuery) => API.get(`/tour/search?searchQuery=${searchQuery}`);

export const getTagTours = (tag) => API.get(`/tour/tag/${tag}`);

export const getRelatedTours = (tags) => API.post(`/tour/relatedTours`, tags);

export const likeTour = (id) => API.patch(`/tour/like/${id}`);