const API_BASE = '/api/v1';

class ApiClient {
  constructor() {
    this.baseUrl = API_BASE;
  }

  getToken() {
    return localStorage.getItem('nexfly-token');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, { ...options, headers });

      if (response.status === 401 || response.status === 403) {
        // Token expired or invalid — clear auth state and redirect to login
        const hadToken = !!this.getToken();
        localStorage.removeItem('nexfly-token');
        localStorage.removeItem('nexfly-user');
        if (hadToken && window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        throw new Error('Session expired. Please login again.');
      }

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return response.json();
    } catch (err) {
      console.error(`API Error [${endpoint}]:`, err);
      throw err;
    }
  }

  // Auth
  async register(name, email, password) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  }

  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Flights
  async getFlights(from, to) {
    const params = new URLSearchParams();
    if (from) params.set('from', from);
    if (to) params.set('to', to);
    const query = params.toString();
    return this.request(`/flights${query ? '?' + query : ''}`);
  }

  async getFlightById(id) {
    return this.request(`/flights/${id}`);
  }

  // Charters
  async getCharters() {
    return this.request('/charters');
  }

  async getCharterById(id) {
    return this.request(`/charters/${id}`);
  }

  // Destinations
  async getDestinations() {
    return this.request('/destinations');
  }

  // Seats
  async getSeatsByFlight(flightId) {
    return this.request(`/seats/flight/${flightId}`);
  }

  // Bookings
  async createBooking(data) {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMyBookings(status) {
    const query = status ? `?status=${status}` : '';
    return this.request(`/bookings${query}`);
  }

  async getBookingById(id) {
    return this.request(`/bookings/${id}`);
  }

  async cancelBooking(id) {
    return this.request(`/bookings/${id}/cancel`, { method: 'PATCH' });
  }
}

export const api = new ApiClient();
export default api;
