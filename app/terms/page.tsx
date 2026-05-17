import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 px-5 py-14 sm:px-8">
        <section className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-4xl font-black text-gray-950">Terms of Use</h1>

          <p className="mt-5 leading-8 text-gray-600">
            By using PDFQuick, you agree to use the website responsibly and only
            upload files that you own or have permission to process.
          </p>

          <h2 className="mt-8 text-xl font-black text-gray-950">
            Tool Accuracy
          </h2>
          <p className="mt-3 leading-8 text-gray-600">
            We aim to provide useful tools, but we do not guarantee that every
            file will process perfectly. Users should check output files before
            using them for important work.
          </p>

          <h2 className="mt-8 text-xl font-black text-gray-950">
            User Responsibility
          </h2>
          <p className="mt-3 leading-8 text-gray-600">
            You are responsible for ensuring that your files, documents, and
            usage comply with applicable laws and permissions.
          </p>

          <h2 className="mt-8 text-xl font-black text-gray-950">
            Changes
          </h2>
          <p className="mt-3 leading-8 text-gray-600">
            We may update these terms as the website grows and new features are
            added.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}