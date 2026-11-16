
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import controller_1 from "../../assets/images/png/controller_1.png";
import controller_2 from "../../assets/images/png/controller_2.png";
import controller_3 from "../../assets/images/png/controller_3.png";
import controller_4 from "../../assets/images/png/controller_4.png";

gsap.registerPlugin(ScrollTrigger);

const controllers = [
  {
    image: controller_1,
    title: "DualShock 4",
    description:
      "The standard controller for PlayStation 4, known for its ergonomic design and touchpad.",
  },
  {
    image: controller_2,
    title: "DualSense",
    description:
      "The controller for PlayStation 5, featuring adaptive triggers and haptic feedback for a more immersive gaming experience.",
  },
  {
    image: controller_3,
    title: "DualShock 3",
    description:
      "The controller for PlayStation 3, featuring motion sensing and wireless gameplay.",
  },
  {
    image: controller_4,
    title: "PS Move Controller",
    description:
      "A motion-sensing controller used for PlayStation VR and certain PS3 and PS4 games.",
  },
];

const Homepage = () => {
  const componentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".card");
      const contents = gsap.utils.toArray(".controller-content");

      // Initial card position
      gsap.set(cards, {
        position: "absolute",
        top: "-70%",
        left: "-30%",
      });

      // Initial content position
      gsap.set(contents, {
        position: "absolute",
        top: "150%",
        opacity: 0,
      });

      // Scroll animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".this-section",
          start: "top top",
          end: "+=400%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, index) => {
        const content = contents[index];

        // Card enters
        tl.to(
          card,
          {
            top: "50%",
            left: "15%",
            yPercent: -50,
            duration: 2,
            ease: "power2.inOut",
          },
          `step-${index}`
        );

        // Content enters
        tl.to(
          content,
          {
            top: "50%",
            yPercent: -50,
            opacity: 1,
            duration: 2,
            ease: "power2.inOut",
          },
          `step-${index}`
        );

        // Current card exits
        if (index < cards.length - 1) {
          tl.to(
            card,
            {
              top: "150%",
              left: "-50%",
              duration: 2,
              ease: "power2.inOut",
            },
            `step-${index + 1}`
          );

          // Current content exits
          tl.to(
            content,
            {
              top: "-150%",
              opacity: 0,
              duration: 2,
              ease: "power2.inOut",
            },
            `step-${index + 1}`
          );
        }
      });
    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={componentRef}
      className="overflow-hidden bg-gray-200 text-black"
    >
      <div className="max-w-[1536px] mx-auto">

        {/* HERO SECTION */}
        <section className="min-h-screen flex justify-center items-center bg-gray-200 px-6">
          <div className="text-center">
            <p className="text-sm tracking-[0.5em] uppercase mb-6">
              PlayStation Controllers
            </p>

            <h1 className="text-[clamp(4rem,12vw,10rem)] leading-[0.8] uppercase font-black tracking-[-0.08em]">
              Scroll
              <br />
              Down
            </h1>

            <div className="mt-10 animate-bounce text-4xl">
              ↓
            </div>
          </div>
        </section>

        {/* PINNED ANIMATION SECTION */}
        <section className="this-section min-h-screen relative overflow-hidden bg-gray-200">

          {/* LEFT IMAGE AREA */}
          <div className="absolute inset-0">

            {controllers.map((controller, index) => (
              <div
                key={controller.title}
                className={`card card-${index + 1} w-[320px] h-[500px] flex justify-center items-center ${
                  index === 0 ? "z-50" : "z-40"
                }`}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={controller.image}
                    alt={controller.title}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            ))}

          </div>

          {/* RIGHT CONTENT AREA */}
          <div className="absolute inset-0">

            {controllers.map((controller, index) => (
              <div
                key={controller.title}
                className="controller-content absolute right-[8%] w-[500px] max-w-[40vw]"
              >
                <span className="block text-sm tracking-[0.4em] uppercase mb-5 opacity-50">
                  Controller 0{index + 1}
                </span>

                <h2 className="text-5xl lg:text-6xl xl:text-7xl uppercase font-black tracking-[-0.05em] leading-[0.9] mb-6">
                  {controller.title}
                </h2>

                <p className="text-xl lg:text-2xl leading-relaxed text-gray-600">
                  {controller.description}
                </p>

                <div className="mt-10 flex items-center gap-5">
                  <span className="w-12 h-px bg-black" />

                  <span className="text-xs uppercase tracking-[0.3em]">
                    Scroll for next
                  </span>
                </div>
              </div>
            ))}

          </div>

          {/* SECTION LABEL */}
          <div className="absolute bottom-8 left-8 text-xs tracking-[0.3em] uppercase">
            PlayStation / Collection
          </div>

          <div className="absolute bottom-8 right-8 text-xs tracking-[0.3em] uppercase">
            01 — 04
          </div>

        </section>

        {/* END SECTION */}
        <section className="min-h-screen flex flex-col justify-center items-center bg-gray-200 px-6 text-center">

          <p className="text-sm tracking-[0.5em] uppercase mb-8">
            Collection Complete
          </p>

          <h2 className="text-[clamp(4rem,12vw,10rem)] leading-[0.8] uppercase font-black tracking-[-0.08em]">
            Thank
            <br />
            You
          </h2>

          <p className="mt-10 text-xl text-gray-500">
            Scroll animation powered by GSAP + ScrollTrigger
          </p>

        </section>

      </div>
    </main>
  );
};

export default Homepage;
