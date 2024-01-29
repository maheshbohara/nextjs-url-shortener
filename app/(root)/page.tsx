import ShortUrlForm from "@/components/shared/ShortUrlForm";

export default function Home() {
  return (
    <section className="flex flex-col min-h-screen items-center justify-center px-5 md:px-0 py-10">
      <div className="max-w-3xl mx-auto w-full">
        <h1 className="block mb-8 text-5xl font-semibold text-center">
          Short URL
        </h1>
        <div className="p-8 lg:p-12 lg:px-16 w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <h3 className="mb-6 text-3xl font-semibold text-gray-900 text-center">
            Paste the URL to be shortened
          </h3>
          <ShortUrlForm />
        </div>
      </div>
    </section>
  );
}
