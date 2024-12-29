import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const loginAdmin = async (credentials) =>
  axios.post(`${API_BASE}/auth/login`, credentials);

export const getFloorPlans = async () => axios.get(`${API_BASE}/floor-plans`);

export const createFloorPlan = async (floorPlan) =>
  axios.post(`${API_BASE}/floor-plans`, floorPlan);

export const updateFloorPlan = async (id, data) =>
  axios.put(`${API_BASE}/floor-plans/${id}`, data);
