import { Breadcrumb } from "components";
import React from "react";
import blogImg1 from "assets/Blog/blog1.png";
const Blogs = () => {
  return (
    <div className="w-full">
      <div className="h-[81px] flex  justify-center items-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold uppercase mb-2">Blog</h3>
          <Breadcrumb></Breadcrumb>
        </div>
      </div>
      <div className="w-main m-auto flex items-center justify-center mt-10">
        <h2 className="text-main text-4xl font-semibold">Blogs Of Shoes</h2>
      </div>
      <div className="w-main mt-8 m-auto grid grid-cols-3 gap-8">
        <div className=" shadow-lg rounded-lg">
          <div className=" relative">
            <img
              src="https://saigonsneaker.com/wp-content/uploads/2018/09/fila-la-gi.jpg.webp"
              className="w-full rounded-tl-lg rounded-tr-lg h-[300px]  object-cover"
            ></img>
            <div className="w-14 h-14 font-medium flex flex-col  justify-center items-center p-2 top-3 left-3 rounded-lg shadow-xl bg-white absolute z-50">
              <span className="border-b-2 border-black">04</span>
              <span>11</span>
            </div>
          </div>
          <h2 className=" text-center mt-4 font-medium text-lg px-2 uppercase">
            Thương Hiệu Thời Trang Fila Có Gì Đặc Biệt?
          </h2>
          <span className=" text-gray-500 line-clamp-[7] p-2 text-justify mb-4">
            Với những tính đồ thời trang và đặc biệt là những ai ưa thích street
            style, chắc hẳn chúng ta không còn lạ lẫm với thương hiệu mang tên
            Fila. Những đôi giày với logo Fila đã – đang và sẽ còn được diện
            trên đường phố như một biểu tượng của sự năng động và thời thượng.
            Vậy hãy cùng tìm hiểu và lý giải sức hút của thương hiệu này đối với
            giới trẻ nhé.
          </span>
        </div>
        <div className=" shadow-lg rounded-lg">
          <div className=" relative">
            <img
              src="https://saigonsneaker.com/wp-content/uploads/2020/01/adidas-logo.jpg.webp"
              className="w-full rounded-tl-lg rounded-tr-lg h-[300px]  object-cover"
            ></img>
            <div className="w-14 h-14 font-medium flex flex-col  justify-center items-center p-2 top-3 left-3 rounded-lg shadow-xl bg-white absolute z-50">
              <span className="border-b-2 border-black">04</span>
              <span>11</span>
            </div>
          </div>
          <h2 className=" text-center mt-4 font-medium px-2 text-lg uppercase">
            Ý Nghĩa Và Sự Khác Nhau Của Các Biểu Tượng Của Thương Hiệu Adidas
          </h2>
          <span className=" text-gray-500 line-clamp-[7] p-2 text-justify mb-4">
            Trong thị trường giày thể thao hiện nay, không thể nào không nhắc
            đến thương hiệu Adidas. Qua thời gian, Adidas càng ngày càng phát
            triển, song song với đó logo biểu tượng cho thương hiệu cũng thay
            đổi theo. Tùy vào từng thời gian giai đoạn quảng bá hay dòng sản
            phẩm sẽ được in những adidas logo khác nhau. Chính vì thế, hôm nay
            chúng tôi sẽ bật mí cho các bạn về ý nghĩa và sự khác nhau của 3
            logo Adidas đẹp nhưng quen thuộc qua từng mốc thời gian.
          </span>
        </div>
        <div className=" shadow-lg rounded-lg">
          <div className=" relative">
            <img
              src="https://saigonsneaker.com/wp-content/uploads/2020/01/nike-mag-doi-giay-dat-nhat-the-gioi.jpg.webp"
              className="w-full  rounded-tl-lg rounded-tr-lg h-[300px]  object-cover"
            ></img>
            <div className="w-14 h-14 font-medium flex flex-col  justify-center items-center p-2 top-3 left-3 rounded-lg shadow-xl bg-white absolute z-50">
              <span className="border-b-2 border-black">04</span>
              <span>11</span>
            </div>
          </div>
          <h2 className=" text-center mt-4 font-medium px-6 text-lg uppercase">
            Nike Air Mag – Đôi Giày Đắt Nhất Thế Giới
          </h2>
          <span className=" text-gray-500 line-clamp-[7] p-2 text-justify mb-4">
            Nike là một trong thương hiệu về giày thể thao nổi tiếng trên thế
            giới. Sản phẩm của tập đoàn Nike không chỉ đáp ứng về chất lượng mà
            còn về vẻ ngoài thời trang, phong cách. Ngoài ra, Nike cũng là
            thương hiệu đầu tiên tung ra đôi sneaker có có khả năng tự thắt dây
            với giá không tưởng. Hàng chục câu hỏi đặt ra, tại sao nó lại có giá
            như vậy? Hãy cùng SaigonSneaker.com tìm câu trả lời cho đôi Nike air
            mag – đôi giày đắt nhất thế giới nhé!
          </span>
        </div>
        <div className=" shadow-lg rounded-lg">
          <div className=" relative">
            <img
              src="https://saigonsneaker.com/wp-content/uploads/2019/12/giay-adidas-neo.jpg.webp"
              className="w-full rounded-tl-lg rounded-tr-lg h-[300px]  object-cover"
            ></img>
            <div className="w-14 h-14 font-medium flex flex-col  justify-center items-center p-2 top-3 left-3 rounded-lg shadow-xl bg-white absolute z-50">
              <span className="border-b-2 border-black">04</span>
              <span>11</span>
            </div>
          </div>
          <h2 className=" text-center mt-4 font-medium px-2 text-lg uppercase">
            Những Mẫu Giày Adidas Neo Nam, Nữ Thịnh Hành Tại Việt Nam Và Trên
            <br />
            Thế Giới
          </h2>
          <span className=" text-gray-500 line-clamp-[7] p-2 text-justify mb-4">
            Adidas là một thương hiệu giày thể thao rất được yêu thích trên thị
            trường toàn cầu. Chúng ta thường quen thuộc với các dòng Adidas
            Originals nhưng bên cạnh đó, dòng Adidas Neo cũng được ưa chuộng
            không kém. Vậy Adidas Neo là gì? Hãy cùng khám phá nhé.
          </span>
        </div>
        <div className=" shadow-lg rounded-lg">
          <div className=" relative">
            <img
              src="https://saigonsneaker.com/wp-content/uploads/2019/12/custom-giay-1.jpg.webp"
              className="w-full rounded-tl-lg rounded-tr-lg h-[300px]  object-cover"
            ></img>
            <div className="w-14 h-14 font-medium flex flex-col  justify-center items-center p-2 top-3 left-3 rounded-lg shadow-xl bg-white absolute z-50">
              <span className="border-b-2 border-black">04</span>
              <span>11</span>
            </div>
          </div>
          <h2 className=" text-center mt-4 font-medium px-2 min-h-[84px] text-lg uppercase">
            Custom Là Gì? Cách Custom Sneaker Bằng Màu Acrylic Cực Đẹp
          </h2>
          <span className=" text-gray-500 line-clamp-[7] p-2 text-justify mb-4">
            Custom giày là một xu hướng đã du nhập vào Việt Nam một thời gian và
            nhận được sự hưởng ứng mạnh từ các bạn trẻ, đặc biệt dân chơi giày.
            Vậy bạn đã bao giờ tự tay thổi hồn vào đôi giày của mình chưa ?
          </span>
        </div>
        <div className=" shadow-lg rounded-lg">
          <div className=" relative">
            <img
              src="https://saigonsneaker.com/wp-content/uploads/2019/12/vintage-style-1.jpg.webp"
              className="w-full rounded-tl-lg rounded-tr-lg h-[300px]  object-cover"
            ></img>
            <div className="w-14 h-14 font-medium flex flex-col  justify-center items-center p-2 top-3 left-3 rounded-lg shadow-xl bg-white absolute z-50">
              <span className="border-b-2 border-black">04</span>
              <span>11</span>
            </div>
          </div>
          <h2 className=" text-center mt-4 font-medium px-2 text-lg uppercase">
            Vintage Style Là Gì? Hướng Dẫn Phối Đồ Theo Phong Cách Thời Trang
            Vintage
          </h2>
          <span className=" text-gray-500 line-clamp-[7] p-2 text-justify mb-4">
            Khoảng thời gian gần đây, StoreShoe nhận được khá nhiều câu hỏi và
            thắc mắc về một phong cách thời trang đang dần lấy lại vị thế của
            mình trong làng thời trang: phong cách vintage. Thế thì vintage là
            gì? Phối đồ theo phong cách này ra sao? Mời mọi người cùng khám phá
            qua bài viết dưới đây nhé.
          </span>
        </div>
      </div>
      <div className="h-[200px]"></div>
    </div>
  );
};

export default Blogs;
