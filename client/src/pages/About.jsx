import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl text-gray-800 dark:text-gray-200 font font-semibold text-center  my-7">
            About Free Ben Blog
          </h1>
          <div className="text-md text-gray-600 dark:text-gray-200 flex flex-col gap-6">
            <p>
              Welcome to{" "}
              <span className="text-amber-300  font-semibold text-center dark:text-cyan-500 px-1 text-2xl font-mono">
                Free Ben{" "}
              </span>
              Blog! This blog was created by Sahand Ghavidel as a personal
              project to share his thoughts and ideas with the world. Sahand is
              a passionate developer who loves to write about technology,
              coding, and everything in between.
            </p>

            <p>
              On this blog, you'll find weekly articles and tutorials on topics
              such as web development, software engineering, and programming
              languages. Sahand is always learning and exploring new
              technologies, so be sure to check back often for new content!
            </p>

            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. We believe that a community of learners can help
              each other grow and improve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
