export default function UnderConstruction() {
  return (
    <div className="flex  flex-col gap-5 items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">
        🚧 Under Construction 🚧
      </h1>
      <p className="text-lg text-gray-600 mt-2">
        We're working hard to bring something amazing. Stay tuned!
      </p>
      <img
        src="/under-construction.svg"
        alt="Under Construction Illustration"
        width={400}
        height={400}
      />
    </div>
  );
}
