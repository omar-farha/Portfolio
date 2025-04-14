import { socialMedia } from "@/data";
import MagicButton from "./ui/MagicButton";
import { Send } from "lucide-react";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { motion } from "motion/react";
import Link from "next/link";

const Footer = () => {
  const form = useRef<HTMLFormElement>(null);
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm("service_lupckuk", "template_sytjikp", form.current, {
          publicKey: "EZscLU7fLWxc4TtnM",
        })
        .then(
          () => {
            console.log("SUCCESS!");
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
    } else {
      console.error("Form reference is null.");
    }
  };
  const fadeIn = {
    start: {
      opacity: 0,
    },
    end: {
      opacity: 1,
      transition: {
        duration: 0.7,
      },
    },
  };
  const fadeInUp = {
    start: {
      y: 30,
      opacity: 0,
    },
    end: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
      },
    },
  };

  return (
    <footer className="w-full pt-20 pb-10 text-white" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96 ">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50 "
        />
      </div>

      <div className="flex flex-col items-center">
        <motion.h1
          variants={fadeIn}
          initial="start"
          whileInView="end"
          viewport={{ once: true }}
          className="font-bold text-4xl md:text-5xl text-center lg:max-w-[45vw]"
        >
          Ready to take <span className="text-purple-400">your</span> digital
          presence to the next level?
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          initial="start"
          whileInView="end"
          viewport={{ once: true }}
          className="text-white-200 md:mt-10 my-5 text-center"
        >
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </motion.p>
        <div className="max-w-[1320px] px-4 flex justify-center z-50 mt-10">
          <form className="w-full  space-y-4" onSubmit={sendEmail} ref={form}>
            <motion.input
              variants={fadeInUp}
              initial="start"
              whileInView="end"
              viewport={{ once: true }}
              type="text"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-200 focus:border-[#000319] outline-none transition"
              placeholder="Name"
              name="name"
            />
            <motion.input
              variants={fadeInUp}
              initial="start"
              whileInView="end"
              viewport={{ once: true }}
              type="email"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-200 focus:border-[#000319] outline-none transition"
              placeholder="Email"
              name="email"
            />
            <motion.textarea
              variants={fadeInUp}
              initial="start"
              whileInView="end"
              viewport={{ once: true }}
              rows={5}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-200 focus:border-[#000319] outline-none transition"
              placeholder="Message"
              name="message"
            ></motion.textarea>
            <a className=" text-center">
              <MagicButton
                title="Send"
                icon={<Send size={17} />}
                position="right"
              />
            </a>
          </form>
        </div>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center ">
        <p className="md:text-base text-sm md:font-normal font-light cursor-pointer pb-5">
          Copyright © 2025{" "}
          <a
            href="about"
            className="text-purple-400 cursor-pointer z-[1000000]"
          >
            Omar Farha
          </a>
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <div
              key={info.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <a href={info.link} target="_blank">
                <img src={info.img} alt="icons" width={20} height={20} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
