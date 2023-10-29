import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

const Footer = () => {
  return (
    <div>
      <footer className="p-4 bg-cyan-300 md:p-8 lg:p-10 dark:bg-gray-800">
        <div className="mx-auto max-w-screen-xl text-center">
          <a
            href="#"
            className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
          >
            Brain Blitz
          </a>
          <p className="my-6 text-gray-900 font-semibold">
            Brain Blitz is a website designed for individuals having a passion
            for both playing and creating quizzes.
          </p>
          <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                <LocalPhoneIcon />
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                <InstagramIcon />
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                <YouTubeIcon />
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                <TwitterIcon />
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                <LinkedInIcon />
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                <GitHubIcon />
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                <FacebookIcon />
              </a>
            </li>
          </ul>
          <span className="text-sm text-gray-800 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="#" className="hover:underline">
              Brain Blitz™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
