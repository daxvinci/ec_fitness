const adminLogin = () => {
    return (
      <>
        <div className="flex min-h-screen gym-bg items-center justify-center p-6">
          <div className="backdrop-blur-lg bg-white/10 border border-white/30 shadow-xl rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-center text-3xl font-bold text-black mb-6">
              Sign in to your account
            </h2>

            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 bg-white/20 px-4 py-2 text-black placeholder-black/30 focus:ring-2 focus:ring-indigo-400"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-black"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-gray-600 hover:text-blue-600"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 bg-white/20 px-4 py-2 text-black placeholder-black/30 focus:ring-2 focus:ring-indigo-400"
                    placeholder="*****"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md backdrop-blur hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
}
 
export default adminLogin;