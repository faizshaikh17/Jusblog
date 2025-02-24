
import React from "react";
import githubLogo from "../../assets/img/github.png";
import { FaGithub } from "react-icons/fa";

export function Footer() {
    return (
        <footer className="text-[#FAFAFA] z-[10] px-6 py-4 w-full">
            <div className=" flex justify-center items-center space-x-2">
                <p className="text-center text-xs">© Designed & Developed by Faiz Shaikh</p>
                <a
                    href="https://github.com/faizshaikh17/whyReact/tree/main/jusBlog"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaGithub className="h-4 w-4" />
                </a>

            </div>
        </footer>
    );
}

export default Footer;
