export default function Tab3() {
  return (
    <div className="px-6 bg-gray-800 text-stone-300 w-full md:p-12 md:mx-auto md:max-w-6xl xl:px-20">
      <div className="py-8 space-y-6 md:flex md:space-y-0 md:gap-4 w-full">
        <div className="md:w-1/2">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium  dark:text-white"
          >
            Password
          </label>

          <input
            type="password"
            id="password"
            className="bg-gray-600 border border-gray-400 text-stone-100 
          text-sm rounded-lg  block w-full p-2.5 
          "
            placeholder="•••••••••"
            required
          />
        </div>

        <div className="md:w-1/2">
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-medium "
          >
            Confirm password
          </label>
          <input
            type="password"
            id="confirm_password"
            className="bg-gray-600 border border-gray-400 text-stone-100   text-sm rounded-lg 
           block w-full p-2.5 
          "
            placeholder="•••••••••"
            required
          />
        </div>
      </div>
      <div className="space-y-4 md:flex md:space-y-0 md:flex-wrap md:gap-4">
        {/* <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label> */}
        <div className="space-y-4 md:space-y-0 md:w-full md:flex md:gap-4">
          <input
            type="text"
            id="username"
            className="bg-gray-600 border border-gray-400 text-sm rounded-lg block w-full p-2.5 text-stone-100 
          md:w-1/2"
            placeholder="John"
            required
          />

          <input
            type="text"
            id="first_name"
            className="bg-gray-600 border cursor-not-allowed border-gray-400 text-sm rounded-lg block w-full p-2.5 text-stone-100 
          placeholder:text-stone-100 md:w-1/2"
            placeholder="First Name"
            disabled
          />
        </div>
        <div className="space-y-4 md:space-y-0 md:w-full md:flex md:gap-4">
          <input
            type="text"
            id="last_name"
            className="bg-gray-600 border cursor-not-allowed border-gray-400 text-sm rounded-lg block w-full p-2.5 text-stone-100 
          placeholder:text-stone-100"
            placeholder="Last Name"
            disabled
          />
          <input
            type="text"
            id="email"
            className="bg-gray-600 border cursor-not-allowed border-gray-400 text-sm rounded-lg block w-full p-2.5 text-stone-100 
          placeholder:text-stone-100"
            placeholder="Email"
            disabled
          />
        </div>
        <a href="" className="cursor-pointer text-center w-full">
          <button
            type="button"
            className="text-white shadow-gray-500 mt-4 shadow-md text-base bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg px-6 py-2 text-center 
          md:w-full md:max-w-52
            "
          >
            Actualizar
          </button>
        </a>
      </div>
    </div>
  );
}
