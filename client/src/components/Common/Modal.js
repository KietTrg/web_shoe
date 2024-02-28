import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "../../store/app/appSlice";
const Modal = ({ children }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() =>
        dispatch(showModal({ isshowModal: false, modalChildren: null }))
      }
      className="flex justify-center items-center z-50000 absolute inset-0 bg-overlay"
    >
      {children}
    </div>
  );
};

export default memo(Modal);
