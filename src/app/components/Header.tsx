import { AdminDetails } from "../lib/types";

type HeaderProps = {
    admin?: AdminDetails;
  };
  
const Header = ({admin}:HeaderProps) => {
    return ( 
        <>
        <header className="bg-white shadow-sm">
          <div className="sub-head flex justify-between items-center px-20">
            <div className="px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-800">
                Welcome {admin?.firstName}
              </h1>
              {admin?.email && (
                <p className="text-sm text-gray-500 mt-1">{admin.email}</p>
              )}
            </div>
            <a href="/register" className="add-members cursor-pointer bg-gray-900 text-gray-200 px-3 py-2 rounded-lg active:translate-y-2 m-2">
              Register Member
            </a>
          </div>
        </header>
        </>
     );
}
 
export default Header;