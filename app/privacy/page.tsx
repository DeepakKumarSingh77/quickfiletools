import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 px-5 py-14 sm:px-8">
        <section className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-4xl font-black text-gray-950">Privacy Policy</h1>

          <p className="mt-5 leading-8 text-gray-600">
            PDFQuick provides online file tools. Many tools run directly in your
            browser, which means your files are processed on your device when
            possible.
          </p>

          <h2 className="mt-8 text-xl font-black text-gray-950">
            Information We Collect
          </h2>
          <p className="mt-3 leading-8 text-gray-600">
            We may collect basic usage information such as pages visited, device
            type, browser type, and general analytics data to improve the
            website.
          </p>

          <h2 className="mt-8 text-xl font-black text-gray-950">
            Files and Uploads
          </h2>
          <p className="mt-3 leading-8 text-gray-600">
            Browser-based tools process files locally on your device. If a tool
            later requires server processing, we will clearly explain that on
            the tool page.
          </p>

          <h2 className="mt-8 text-xl font-black text-gray-950">
            Advertising
          </h2>
          <p className="mt-3 leading-8 text-gray-600">
            We may use advertising services such as Google AdSense. Advertising
            partners may use cookies to show relevant ads based on user visits.
          </p>

          <h2 className="mt-8 text-xl font-black text-gray-950">Contact</h2>
          <p className="mt-3 leading-8 text-gray-600">
            For privacy questions, contact us through the contact page.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}