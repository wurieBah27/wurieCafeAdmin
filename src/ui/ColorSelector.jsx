const ColorSelector = () => {
  return (
    <div>
      <p className="ml-4 mt-4 text-sm uppercase text-[#999]">Background</p>

      <div className="m-3 flex items-center gap-4">
        <span className="h-[20px] w-[20px] cursor-pointer rounded-md border border-[#7451f8] bg-[#f3f3f3]"></span>
        <span className="h-[20px] w-[20px] cursor-pointer rounded-md border border-[#7451f8] bg-[#333]"></span>
      </div>
    </div>
  );
};

export default ColorSelector;
