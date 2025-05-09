// Simple in-memory database
let users: { email: string; name: string; password: string }[] = [];

export async function createUser(email: string, name: string, password: string) {
  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    throw new Error('An account with this email already exists');
  }

  // Add new user
  users.push({
    email,
    name,
    password, // In a real app, you should hash the password
  });

  return { email, name };
}

export async function verifyUser(email: string, password: string) {
  const user = users.find(user => user.email === email);
  
  if (!user) {
    throw new Error('No account found with this email');
  }

  if (user.password !== password) {
    throw new Error('Incorrect password');
  }

  return user;
} 