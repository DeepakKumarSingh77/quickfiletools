import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 px-5 py-14 sm:px-8">
        <section className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-4xl font-black text-gray-950">Contact</h1>
          <p className="mt-5 leading-8 text-gray-600">
            Have feedback, a bug report, or a feature request? Contact the
            PDFQuick team by email.
          </p>

          <div className="mt-6 rounded-2xl bg-gray-50 p-5">
            <div className="text-sm font-bold uppercase text-gray-500">
              Email
            </div>
            <div className="mt-2 text-lg font-black text-gray-950">
              rishukumar11006@gmail.com
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}