interface User {
  isAuth: boolean;
  name: string | null;
  email: string | null;
  token: string | null;
  role: string | null;
}

export default User;
