import Sidebar from "../../components/common/sidebar";

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="">
          <Sidebar />
          <div className="py-10  md:ms-80">{children}</div>
        </div>
      </body>
    </html>
  );
}
