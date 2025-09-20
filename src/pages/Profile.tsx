import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state: RootState) => state.user);
  return (
    <main className="min-h-screen bg-background container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center uppercase underline ">
        {user.username}'s Profile
      </h1>

      <section className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User Data
              </th>
              <th scope="col" className="px-6 py-3">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Username
              </th>
              <td className="px-6 py-4">{user.username}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Role
              </th>
              <td className="px-6 py-4">{user.role}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default Profile;
