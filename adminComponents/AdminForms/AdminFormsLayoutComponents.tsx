export const FormConfirmationPopup = ({
  name,
  deleteHandler,
  archiveHandler,
  setHideState,
  action,
  promptText,
}: {
  name: string;
  deleteHandler: any;
  archiveHandler: any;
  setHideState: any;
  action: string;
  promptText: string;
}) => {
  return (
    <div className="fixed z-50 flex items-center justify-center w-full h-full bg-opacity-50 bg-slate-600 ">
      <div className="flex flex-col items-center p-4 bg-white border-2 shadow-lg h-fit w-96">
        <div className="pt-5 text-lg text-red-700 font-roboto">
          Are you sure you want to {promptText}
        </div>
        <div className="p-2 m-5 text-red-700 border-2 font-roboto">{name}</div>
        <button
          onClick={
            action === "archive"
              ? () => archiveHandler()
              : () => deleteHandler()
          }
          className="flex rounded-full justify-center items-center bg-[#8b3479] max-w-fit mt-5 hover:shadow-inner"
        >
          <div className="flex items-center justify-center pt-4 pb-4 text-sm font-normal text-white pr-9 pl-9 font-poppins">
            <span className="">Yes</span>
          </div>
        </button>
        <button
          onClick={() => setHideState(true)}
          className="flex rounded-full justify-center items-center bg-[#8b3479] max-w-fit mt-5 hover:shadow-inner"
        >
          <div className="flex items-center justify-center pt-4 pb-4 text-sm font-normal text-white pr-9 pl-9 font-poppins">
            <span className="">No</span>
          </div>
        </button>
      </div>
    </div>
  );
};
