import React, { useRef, useEffect, useState, memo } from "react";
import logo from "assets/logo2.png";
import { voteOption } from "ultils/contants";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Button } from "components";
const VoteOption = ({ nameProduct, handleSubmitVoteOption }) => {
  const modalRef = useRef();
  const [chosenScore, setChosenScore] = useState(null);
  const [comment, setComment] = useState("");
  //   const [score, setScore] = useState(null);
  useEffect(() => {
    modalRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
      className=" bg-white rounded-lg w-[700px] z-50  p-4 flex flex-col gap-4 items-center justify-center"
    >
      <img
        src={logo}
        alt="logo"
        className=" w-[300px]  my-8 object-contain"
      ></img>
      <h2 className=" text-center text-medium text-lg">
        Voting product <strong>{`${nameProduct}`}</strong>
      </h2>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Type something"
        className="w-full form-textarea placeholder:text-sm placeholder:text-gray-500 "
      ></textarea>
      <div className="w-full flex flex-col gap-4">
        <p>How do you like this product?</p>
        <div className="flex justify-center items-center gap-4">
          {voteOption.map((el) => (
            <div
              className="w-[100px] h-[100px] cursor-pointer hover:shadow-lg hover:rounded-lg flex items-center justify-center flex-col gap-2"
              key={el.id}
              onClick={() => setChosenScore(el.id)}
            >
              {Number(chosenScore) && chosenScore >= el.id ? (
                <AiFillStar color="#005f90"></AiFillStar>
              ) : (
                <AiOutlineStar color="#005f90"></AiOutlineStar>
              )}

              <span>{el.text}</span>
            </div>
          ))}
        </div>
      </div>
      <Button
        handleOnClick={() =>
          handleSubmitVoteOption({ comment, score: chosenScore })
        }
        fw
      >
        Submit
      </Button>
    </div>
  );
};

export default memo(VoteOption);
