import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="mb-10">
      <div className="container px-5">
        <div className="hero py-8 lg:min-h-[78vh]">
          <div className="hero-content p-0">
            <div className="max-w-screen-xl">
              <h3 className="text-xl md:text-2xl lg:text-4xl text-accent">
                Hey there!, I'm-
              </h3>
              <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold">
                Nahid Ibn Ali
              </h1>
              <h3 className="text-xl md:text-2xl lg:text-4xl py-6">
                <span className="text-secondary">Software Engineering</span>{" "}
                student with over 2 years of experience as a web developer.
                Passionate about design and innovation.
              </h3>
              <p className="text-base md:text-lg lg:text-2xl">
                🚀 Currently specializing in Frontend (React / Next.js)
              </p>
              <p className="text-base md:text-lg lg:text-2xl">
                ⚡ Freelance Frontend Engineer
              </p>
              <Link to="/services">
                <button className="btn btn-primary text-base mt-8">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
