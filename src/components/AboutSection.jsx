import { HashLink } from "react-router-hash-link";
import dp from "../assets/dp.png";

const AboutSection = () => {
  return (
    <section className="mt-8 mb-16">
      <div className="container px-5">
        <div className="hero">
          <div className="hero-content p-0 flex-col lg:flex-row gap-8 lg:gap-14">
            {/* About Image */}
            <img
              src={dp}
              alt="About Me"
              className="w-full max-w-[300px] sm:max-w-sm rounded-[100px] shadow-2xl backdrop-contrast-50"
            />

            {/* About Text */}
            <div className="">
              <h2 className="text-4xl font-bold mb-5">About Me</h2>
              <h4 className="text-xl mb-4">
                I love creating something simple and clean
              </h4>
              <p className="mb-4">
                Since I was a child, I've been interested in the world of
                technology. I currently work as a Web Developer. I have worked
                as a freelancer for companies in The United Kingdom, The United
                States, Bangladesh, Germany and Chile.
              </p>
              <p className="mb-4">
                I live in Bangladesh, where I enjoy good food and incredible
                landscapes. I like to explore minimalist designs that prioritize
                functionality.
              </p>
              <p className="mb-7">
                I am also active on{" "}
                <a
                  className="hover:text-primary"
                  href="https://x.com/nahidibnali_"
                >
                  x.com
                </a>{" "}
                and if you have any questions, feel free to mention me, I am
                sure it will be an interesting chat.
              </p>
              <HashLink to="/about#team" className="btn btn-accent">
                Learn More
              </HashLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
