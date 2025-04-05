import React from "react";
import { HeroParallax } from "./ui/HeroParallax";
import img1 from "@/public/databox-saas-website-product-page.jpg";
import img2 from "@/public/equiem-saas-website.jpg";
import img3 from "@/public/apollo-saas-website-product-page.jpg";
import img4 from "@/public/6556a7088b772091a93a6448_CVmlqJ_-6LBkAGRcJguMlYXZSVzSnAA-LrugemlfArBgQRyqMltK9gQgjYthwq4IEsc0iZYHD-dw2w1fE_44hYAWtv7a3oxPuGSCoAl2Dvl9uDGSI3rJoRIBpzlNlG2rwoIn2JDP8JpJyShFwmEMi5o.png";
import img5 from "@/public/6556a6c780fd47f54b9c9b75_j4I45KAtx3CPjqZ3DoTpCOpwB-_kK0Byu2dtvgap0Y-FN-zag5wDhhLia8IrTYWm4QqopyN8pxRQdXtAMloL5438WTfvWk90e2XVerB7LdydmRctnRlZ8SYArFCNGaE4ZO8WX2IHR_J78YpK2Atd51o.png";
import img6 from "@/public/6556a686d05f920cd5b599a2_Hm9Zp59_O9uR9nJQFiJijyfWaHH2g78Bw8Fh3qVgLCzvTt3YNUMisFxkzcx6Irb8wN0Ibl-iU1RCQG2shB6Mw3pFYJPAifq2mB2x_9IC8ziZRuZ-sjI53f5KDs-JalMvxM739JOQomIAxSUkENUhkko.png";
import img7 from "@/public/original-4172ed9d2db71dfebb894800c368b8e3.png";
import img8 from "@/public/secondnature-saas-website.jpg";
import img9 from "@/public/labguru-saas-website-homepage.jpg";

function Grid() {
  return (
    <div>
      <HeroParallax
        products={[
          {
            title: "Product 1",
            link: "/product1",
            thumbnail: `${img1.src}`,
          },
          {
            title: "Product 2",
            link: "/product2",
            thumbnail: `${img2.src}`,
          },
          {
            title: "Product 3",
            link: "/product3",
            thumbnail: `${img3.src}`,
          },
          {
            title: "Product 4",
            link: "/product4",
            thumbnail: `${img4.src}`,
          },
          {
            title: "Product 5",
            link: "/product5",
            thumbnail: `${img5.src}`,
          },
          {
            title: "Product 6",
            link: "/product6",
            thumbnail: `${img6.src}`,
          },
          {
            title: "Product 7",
            link: "/product7",
            thumbnail: `${img7.src}`,
          },
          {
            title: "Product 8",
            link: "/product8",
            thumbnail: `${img8.src}`,
          },
          {
            title: "Product 9",
            link: "/product9",
            thumbnail: `${img9.src}`,
          },
          {
            title: "Product 10",
            link: "/product10",
            thumbnail: `${img4.src}`,
          },
          {
            title: "Product 11",
            link: "/product11",
            thumbnail: `${img5.src}`,
          },
          {
            title: "Product 12",
            link: "/product12",
            thumbnail: `${img6.src}`,
          },
          {
            title: "Product 1",
            link: "/product1",
            thumbnail: `${img1.src}`,
          },
          {
            title: "Product 2",
            link: "/product2",
            thumbnail: `${img2.src}`,
          },
          {
            title: "Product 3",
            link: "/product3",
            thumbnail: `${img3.src}`,
          },
          {
            title: "Product 4",
            link: "/product4",
            thumbnail: `${img4.src}`,
          },
          {
            title: "Product 5",
            link: "/product5",
            thumbnail: `${img5.src}`,
          },
          {
            title: "Product 6",
            link: "/product6",
            thumbnail: `${img6.src}`,
          },
        ]}
      />
    </div>
  );
}

export default Grid;
