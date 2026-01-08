import React from "react";


import hooliLogo from "../assets/clients/Vector.png";
import lyftLogo from "../assets/clients/fa-brands_lyft.png";
import piperhatLogo from "../assets/clients/Vector (1).png";
import stripeLogo from "../assets/clients/fa-brands_stripe.png";
import awsLogo from "../assets/clients/Vector (2).png";
import redditLogo from "../assets/clients/Vector (3).png";

const logos = [
  { src: hooliLogo, alt: "hooli" },
  { src: lyftLogo, alt: "lyft" },
  { src: piperhatLogo, alt: "piperhat" },
  { src: stripeLogo, alt: "stripe" },
  { src: awsLogo, alt: "aws" },
  { src: redditLogo, alt: "reddit" },
];

export default function MobileClients({ bg = "#FAFAFA" }) {
  // Her logo için kutu ölçüleri (mobil ve desktop)
  const boxStyles = [
    "w-[153px] h-[50px] lg:w-[153px] lg:h-[34px]",   // hooli
    "w-[146px] h-[99px] lg:w-[146px] lg:h-[59px]",  // lyft
    "w-[152px] h-[109px] lg:w-[152px] lg:h-[75px]", // piperhat
    "w-[149px] h-[60px] lg:w-[151px] lg:h-[42px]",  // stripe
    "w-[151px] h-[92px] lg:w-[151px] lg:h-[62px]",  // aws
    "w-[151px] h-[142px] lg:w-[151px] lg:h-[72px]", // reddit
  ];
  const imgStyles = [
    "lg:w-[103px] lg:h-[34px]",   // hooli
    "lg:w-[83px] lg:h-[59px]",   // lyft
    "lg:w-[102px] lg:h-[75px]",  // piperhat
    "lg:w-[103px] lg:h-[42px]",  // stripe
    "lg:w-[104px] lg:h-[62px]",  // aws
    "lg:w-[76px] lg:h-[72px]",   // reddit
  ];

  return (
    <section className={`w-[414px] h-[1173px] flex flex-col justify-center items-center mx-auto lg:w-[1440px] lg:h-[175px] lg:mx-auto`} style={{ background: '#FAFAFA' }}>
      <div className="w-[414px] h-[952px] lg:w-[1050px] lg:h-[175px] lg:mx-auto">
        <div className="w-full flex flex-col items-center pt-[50px] pb-[50px] gap-[60px] lg:w-[1054px] lg:h-[175px] lg:flex-row lg:gap-[30px] lg:items-center lg:pt-[50px] lg:pb-[50px]">
          {logos.map((logo, i) => (
            <div
              key={i}
              className={`flex items-center justify-center ${boxStyles[i]} lg:rounded-none`}
              style={{ opacity: 1 }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className={`object-contain ${imgStyles[i]}`}
                style={{ filter: 'grayscale(1)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
