const ProductSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col bg-white rounded-xl">
      {/* Image */}
      <div className="w-full h-44 bg-gray-200 rounded-t-xl" />

      {/* Content */}
      <div className="p-2 flex flex-col gap-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />

        <div className="flex items-center gap-2">
          <div className="h-3 bg-gray-200 rounded w-10" />
          <div className="h-3 bg-gray-200 rounded w-8" />
        </div>

        <div className="h-3 bg-gray-200 rounded w-2/3 mt-1" />
      </div>
    </div>
  );
};

export default ProductSkeleton;