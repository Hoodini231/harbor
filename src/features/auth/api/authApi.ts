/**
 * Authentication API
 * Stub implementation - returns mock success responses
 */

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
  error?: string;
}

/**
 * Login with email and password
 * @stub Returns mock success after 1 second delay
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Stub: Always return success
  return {
    success: true,
    token: 'mock_jwt_token_' + Date.now(),
    user: {
      id: 'user_123',
      email: credentials.email,
      name: 'Demo User',
    },
  };
}

/**
 * Login with Google OAuth
 * @stub Returns mock success after 1 second delay
 */
export async function loginWithGoogle(): Promise<AuthResponse> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Stub: Always return success
  return {
    success: true,
    token: 'mock_google_token_' + Date.now(),
    user: {
      id: 'user_google_123',
      email: 'user@gmail.com',
      name: 'Google User',
    },
  };
}

/**
 * Login with Apple OAuth
 * @stub Returns mock success after 1 second delay
 */
export async function loginWithApple(): Promise<AuthResponse> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Stub: Always return success
  return {
    success: true,
    token: 'mock_apple_token_' + Date.now(),
    user: {
      id: 'user_apple_123',
      email: 'user@icloud.com',
      name: 'Apple User',
    },
  };
}

/**
 * Request password reset
 * @stub Returns mock success
 */
export async function forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    message: 'Password reset link sent to ' + email,
  };
}
