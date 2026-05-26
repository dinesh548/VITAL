const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  [key: string]: any;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('authToken');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Auth methods
  async login(email: string, password: string) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.success && response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  async register(doctorData: any) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(doctorData),
    });

    if (response.success && response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  async getCurrentDoctor() {
    return this.request('/auth/me');
  }

  async updateProfile(profileData: any) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Doctor methods
  async getDoctors(filters?: {
    specialization?: string;
    language?: string;
    availability?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
    }
    
    const query = queryParams.toString();
    return this.request(`/doctors${query ? `?${query}` : ''}`);
  }

  async getDoctor(id: string) {
    return this.request(`/doctors/${id}`);
  }

  async getDoctorConsultations(doctorId: string, filters?: {
    status?: string;
    type?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });
    }
    
    const query = queryParams.toString();
    return this.request(`/doctors/${doctorId}/consultations${query ? `?${query}` : ''}`);
  }

  async updateAvailability(availability: 'Available' | 'Busy' | 'Offline') {
    return this.request('/doctors/availability', {
      method: 'PUT',
      body: JSON.stringify({ availability }),
    });
  }

  // Patient methods
  async createPatient(patientData: any) {
    return this.request('/patients', {
      method: 'POST',
      body: JSON.stringify(patientData),
    });
  }

  async getPatient(id: string) {
    return this.request(`/patients/${id}`);
  }

  async getPatientConsultations(patientId: string) {
    return this.request(`/patients/${patientId}/consultations`);
  }

  // Medicine methods
  async getMedicines(filters?: {
    search?: string;
    category?: string;
    form?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });
    }
    
    const query = queryParams.toString();
    return this.request(`/medicines${query ? `?${query}` : ''}`);
  }

  async getMedicine(id: string) {
    return this.request(`/medicines/${id}`);
  }

  async searchMedicines(query: string) {
    return this.request(`/medicines/search/${encodeURIComponent(query)}`);
  }

  // Consultation methods
  async createConsultation(consultationData: any) {
    return this.request('/consultations', {
      method: 'POST',
      body: JSON.stringify(consultationData),
    });
  }

  async getConsultations(filters?: {
    status?: string;
    type?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });
    }
    
    const query = queryParams.toString();
    return this.request(`/consultations${query ? `?${query}` : ''}`);
  }

  async getConsultation(id: string) {
    return this.request(`/consultations/${id}`);
  }

  async updateConsultationStatus(id: string, status: string) {
    return this.request(`/consultations/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async addDiagnosis(id: string, diagnosisData: {
    diagnosis: string;
    treatment: string;
    prescription?: any[];
    notes?: string;
  }) {
    return this.request(`/consultations/${id}/diagnosis`, {
      method: 'PUT',
      body: JSON.stringify(diagnosisData),
    });
  }

  // Token management
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  isAuthenticated() {
    return !!this.token;
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
