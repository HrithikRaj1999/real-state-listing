const ImageViewer = ({ src, alt, onClose }: modalPropsType) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex z-50 items-center justify-center bg-black bg-opacity-80 backdrop-blur-md"
      onClick={onClose}
    >
      <img
        src={src}
        alt={alt}
        className="w-40 h-40 md:w-50 md:h-50 lg:w-70 lg:h-70 xl:w-96 xl:h-96 object-cover rounded-full"
        onClick={(e) => e.stopPropagation()} // Prevent the modal from closing when clicking on the image
      />
    </div>
  );
};

export default ImageViewer;
