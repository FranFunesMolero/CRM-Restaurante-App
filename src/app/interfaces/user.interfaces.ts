/**
 * Interface representing a user login request
 * Used for authenticating existing users in the system
 */
export interface IUserLogin {
    /** User's email address used as login identifier */
    email: string;
    /** User's password for authentication */
    password: string;
}

/**
 * Interface representing a user in the system
 * Used for user registration and profile management
 */
export interface IUserRegister extends IUserLogin {
    /** User's first name */
    name: string;
    /** User's last name/family name */
    surname: string;
    /** User's contact phone number */
    phone: string;
}

export interface IUserUpdate {
    /** User's email address used as login identifier */
    email?: string;
    /** User's password for authentication */
    password?: string;
    /** User's first name */
    name?: string;
    /** User's last name/family name */
    surname?: string;
    /** User's contact phone number */
    phone?: string;
    /** User's role */
    role?: string;
}

/**
 * Interface representing an API response for user-related operations
 * Used to handle responses from user registration, login, etc.
 */
export interface IUserResponse {
    /** Response status */
    status: string;
    /** Title/header of the response message */
    title: string;
    /** Detailed response message providing more information */
    message: string;
}

/**
 * Interface representing the API response specifically for login operations
 * Extends the base IUserResponse interface to include the authentication token
 */
export interface IUserLoginResponse extends IUserResponse {
    /** JWT token returned after successful authentication, used for subsequent authorized requests */
    token: string;
}


