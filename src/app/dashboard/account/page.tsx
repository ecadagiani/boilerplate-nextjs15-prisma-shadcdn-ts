import { auth } from "@/auth";
import DefaultLayout from "@/components/DefaultLayout";
import type { Session } from "next-auth";

const AccountPage = async () => {
  const session = (await auth()) as Session;
  // TODO: move this out of the dashboard, and use AccessControl
  return (
    <DefaultLayout title="My Account">
      <div className="space-y-4 p-4">
        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Name
              </label>
              <div className="mt-1 text-lg font-medium text-gray-900">
                {session.user.name}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Email
              </label>
              <div className="mt-1 text-lg font-medium text-gray-900">
                {session.user.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
export default AccountPage;
