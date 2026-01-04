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
    "w-[153px] h-[50px] md:w-[153px] md:h-[34px]",   // hooli
    "w-[146px] h-[99px] md:w-[146px] md:h-[59px]",  // lyft
    "w-[152px] h-[109px] md:w-[152px] md:h-[75px]", // piperhat
    "w-[149px] h-[60px] md:w-[151px] md:h-[42px]",  // stripe
    "w-[151px] h-[92px] md:w-[151px] md:h-[62px]",  // aws
    "w-[151px] h-[142px] md:w-[151px] md:h-[72px]", // reddit
  ];
  const imgStyles = [
    "md:w-[103px] md:h-[34px]",   // hooli
    "md:w-[83px] md:h-[59px]",   // lyft
    "md:w-[102px] md:h-[75px]",  // piperhat
    "md:w-[103px] md:h-[42px]",  // stripe
    "md:w-[104px] md:h-[62px]",  // aws
    "md:w-[76px] md:h-[72px]",   // reddit
  ];

  return (
    <section className={`w-[414px] h-[1173px] flex flex-col justify-center items-center mx-auto md:w-[1440px] md:h-[175px] md:mx-auto`} style={{ background: '#FAFAFA' }}>
      <div className="w-[414px] h-[952px] md:w-[1050px] md:h-[175px] md:mx-auto">
        <div className="w-full flex flex-col items-center pt-[50px] pb-[50px] gap-[60px] md:w-[1054px] md:h-[175px] md:flex-row md:gap-[30px] md:items-center md:pt-[50px] md:pb-[50px]">
          {logos.map((logo, i) => (
            <div
              key={i}
              className={`flex items-center justify-center ${boxStyles[i]} md:rounded-none`}
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
