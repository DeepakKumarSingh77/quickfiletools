import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 px-5 py-14 sm:px-8">
        <section className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-4xl font-black text-gray-950">About</h1>
          <p className="mt-5 leading-8 text-gray-600">
            PDFQuick is a free online file tools website built to help users
            compress images, resize photos, convert files, create PDFs, generate
            QR codes, and complete everyday document tasks quickly.
          </p>
          <p className="mt-4 leading-8 text-gray-600">
            Our goal is to make simple browser-based tools that are fast,
            mobile-friendly, and easy to use without complicated software.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}