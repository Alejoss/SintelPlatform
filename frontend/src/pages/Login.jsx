import  {useState}  from 'react';
import API from '../api'; // Ensure this path is correct based on where you save your API setup

export default function Login() {
  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSignIn = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await API.post('/login/', { username: email, password }); // Assuming your endpoint expects a username
      console.log('Login successful:', response.data);
      // Here, you might want to handle redirection or state updates based on success
    } catch (error) {
      console.error('Login failed:', error.response || error);
      // Here, you might want to show an error message to the user
    }
  };

  return (
    <div className="bg-gray-800 text-stone-300 flex justify-center items-center h-[100vh] -mt-20 lg:mt-0">
      <div className="px-6 md:px-12 space-y-8 bg-gray-700 py-16 w-11/12 mx-auto rounded-xl max-w-xl 2xl:max-w-3xl">
        <h1 className="text-4xl">Sign In</h1>
        <form onSubmit={handleSignIn}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="bg-gray-500 border border-gray-400 text-stone-100 text-sm rounded-lg block w-full p-2.5 placeholder:text-stone-300"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-500 border-gray-400 text-stone-100 border text-sm rounded-lg block w-full p-2.5 placeholder:text-stone-300"
              placeholder="•••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="text-white shadow-gray-500 shadow-md mt-6 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg px-6 py-2 text-center"
          >
            Sign In!
          </button>
        </form>
      </div>
    </div>
  );
}
