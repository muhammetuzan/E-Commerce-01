import React from "react";
import { renderTeamCard } from "./TeamPage";
import team1 from "../assets/ourteam/0a05d6ce0fd1eeff9355b162a7e7c01605dd3c55.jpg";
import team2 from "../assets/ourteam/54268cf04ad0f612e9f8f311e9d1c6bbd31a03f3.jpg";
import team3 from "../assets/ourteam/24a6b8d9efd1b9c2401fb0702dc41f18a42ed89c.jpg";
import videoCardImg from "../assets/AboutUs/bf5361f308dd0c5a04f10121bc68f6cb9ff0d63d.jpg";
import TriangleIcon from "../assets/ikonvektorleri/3gen.png";
import testimonialImg from "../assets/AboutUs/a01449552eeaef7ecedd3954687aefbdb6236bb6.jpg";

import MobileClients from "../components/MobileClients";
import { AboutNoneBg } from "./ContactPage";
import aboutUsImg from "../assets/AboutUs/7466f01545eb1f33b39fa1e1f6b0ddf5bb703345.png";

// VideoCard Component (Tailwind only)
const VideoCard = ({ imageSrc = videoCardImg, imageAlt = "Video" }) => (
  <div className="w-[307px] h-[316px] rounded-[12.3px] overflow-hidden relative opacity-100 lg:w-[989px] lg:h-[540px] lg:opacity-100 lg:rounded-[20px]">
    {/* Media bg-cover with image */}
    <div className="w-full h-full bg-cover relative">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-full object-cover"
      />
      {/* Filter overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 14.58%, rgba(56,56,56,0.84) 100%)' }}
      />
      {/* Button - perfectly centered for both mobile and desktop */}
      <button
        className="absolute flex items-center justify-center bg-[#23A6F0] opacity-100 rounded-full w-[56.95px] h-[56.95px] p-[21.4px] px-[22.63px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        aria-label="Play Video"
      >
        <img src={TriangleIcon} alt="Play" width={19} height={22} />
      </button>
    </div>
  </div>
);



const AboutUs = () => (
  <div className="w-full min-h-screen bg-white flex flex-col items-center">
    {/* About Us Container */}
    <div className="w-[418px] h-[1080px] flex flex-col items-center mx-auto lg:w-[1440px] lg:h-[758px]  lg:relative lg:flex lg:items-center lg:justify-center">
      {/* Row */}
      <div className="w-[418px] h-[1071px] flex flex-col items-center mx-auto lg:w-[1044px] lg:h-[321px] lg:gap-[30px] lg:bg-[#FFFFFF] lg:mx-auto lg:flex-row lg:justify-start lg:items-start">
        {/* Main Content */}
        <div className="w-[418px] h-[590px] flex flex-col items-center justify-center gap-[40px]
          lg:w-[599px] lg:h-[321px] lg:items-start lg:justify-center lg:gap-[35px]">
          {/* Desktop h5 başlık */}
          <h5 className="hidden lg:block w-[149px] h-[24px] font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#252B42] text-left whitespace-nowrap">ABOUT COMPANY</h5>
          {/* h1 başlık */}
          <h1 className="w-[213px] h-[50px] font-montserrat font-bold text-[40px] leading-[50px] tracking-[0.2px] text-center text-[#252B42] whitespace-nowrap
            lg:w-[542px] lg:h-[80px] lg:text-[58px] lg:leading-[80px] lg:tracking-[0.2px] lg:text-left">ABOUT US</h1>
          {/* h4 açıklama */}
          <h4 className="w-[277px] h-[120px] font-montserrat font-normal text-[20px] leading-[30px] tracking-[0.2px] text-center text-[#737373]
            lg:w-[376px] lg:h-[60px] lg:text-[20px] lg:leading-[30px] lg:tracking-[0.2px] lg:text-left">We know how large <span className="lg:hidden"><br />objects will act, but things <br />on a small scale just do <br />not act that way.</span><span className="hidden lg:inline">objects will act, <br />but things on a small scale</span></h4>
          {/* Buton */}
          <button className="w-[195px] h-[52px] flex items-center justify-center gap-[10px] pt-[15px] pr-[40px] pb-[15px] pl-[40px] rounded-[5px] bg-[#23A6F0] lg:mt-auto">
            <span className="w-[115px] h-[22px] font-montserrat font-bold text-[14px] leading-[22px] tracking-[0.2px] text-center text-white">Get Quote Now</span>
          </button>
        </div>
        {/* None Bölümü - Mobil ve desktop uyumlu */}
        <div
          className="w-full flex justify-center mt-8 lg:absolute lg:w-[632px] lg:h-[612px] lg:top-[0px] lg:left-[742px] lg:mt-0"
          style={{ pointerEvents: 'none' }}
        >
          <AboutNoneBg
            imgSrc={aboutUsImg}
            imgAlt="About Us Visual"
            imgClassName=" lg:!top-[-65px]"
          />
        </div>               
      </div>
    </div>
    {/* Content Section (Figma specs) */}
    <div  className="w-[414px] h-[500px] mx-auto flex flex-col items-center justify-center bg-[#FFFFFF] lg:bg-green lg:w-[1440px] lg:h-[236px] lg:pt-[24px] lg:pb-[24px] lg:flex lg:items-center lg:justify-center">
      <div className="w-[381px] h-[340px] flex flex-col items-center lg:w-[1018px] lg:h-[188px] lg:gap-[60px] relative">
        {/* p0: Problems trying */}
        <div className="w-full relative h-[44px] lg:h-full">
          <p className="w-[116px] h-[20px] mt-[24px] mx-auto font-montserrat font-normal text-[14px] leading-[20px] tracking-[0.2px] text-[#E74040] text-center lg:absolute lg:top-[24px] lg:left-[16px] lg:mt-0 lg:mx-0">
            Problems trying
          </p>
       
        {/* h2 başlık */}
       
          <h2 className="w-[269px] h-[128px] mt-[48px] mx-auto font-montserrat font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42] text-center
            lg:w-[394px] lg:h-[96px] lg:absolute lg:top-[72px] lg:left-[16px] lg:mt-0 lg:mx-0 lg:text-left">
            Met minim Mollie non br desert Alamo est sit cliquey dolor do met sent.
          </h2>
        
        <p className="w-[353px] h-[60px] mt-[80px] ml-[20px] font-montserrat font-normal text-[14px] leading-[20px] tracking-[0.2px] text-[#737373] text-left flex flex-col justify-end
          lg:w-[545px] lg:h-[40px] lg:absolute lg:top-[72px] lg:right-[16px] lg:mt-0 lg:text-left lg:justify-start">
          <span className="lg:hidden">
            Problems trying to resolve the conflict between<br />
            the two major realms of Classical physics:<br />
            Newtonian mechanics
          </span>
          <span className="hidden lg:inline">
            Problems trying to resolve the conflict between the two major realms of<br />
            Classical physics: Newtonian mechanics
          </span>
        </p>
      </div>
    </div>
    </div>
    {/* Stats Section - Sadece mobil layout ve iki div */}
    <div className="w-[414px] h-[1006px] opacity-100 mx-auto flex flex-col items-center justify-center bg-white lg:w-[1440px] lg:h-[264px] lg:opacity-100">
      {/* row bölümü - stats içinde ortalanmış */}
      <div className="w-[241px] h-[716px] bg-[#FFFFFF] opacity-100 mx-auto flex flex-col justify-between lg:flex-row lg:items-center lg:gap-[30px] lg:w-[1049px] lg:h-[104px] lg:opacity-100 lg:mx-auto">
        {/* 1. col-md-3 */}
        <div className="w-[240px] h-[104px] flex flex-col items-center justify-center mb-4 lg:mb-0">
          <span className="w-[100px] h-[80px] font-montserrat font-bold text-[58px] leading-[80px] tracking-[0.2px] text-center text-[#252B42] flex items-center justify-center">15K</span>
          <span className="w-[146px] h-[24px] font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-center text-[#737373] flex items-center justify-center mt-2 whitespace-nowrap">Happy Customers</span>
        </div>
        {/* 2. col-md-3 */}
        <div className="w-[240px] h-[104px] flex flex-col items-center justify-center mb-4 lg:mb-0">
          <span className="w-[140px] h-[80px] font-montserrat font-bold text-[58px] leading-[80px] tracking-[0.2px] text-center text-[#252B42] flex items-center justify-center">150K</span>
          <span className="w-[134px] h-[24px] font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-center text-[#737373] flex items-center justify-center mt-2 whitespace-nowrap">Monthly Visitors</span>
        </div>
        {/* 3. col-md-3 */}
        <div className="w-[240px] h-[104px] flex flex-col items-center justify-center mb-4 lg:mb-0">
          <span className="w-[59px] h-[80px] font-montserrat font-bold text-[58px] leading-[80px] tracking-[0.2px] text-center text-[#252B42] flex items-center justify-center">15</span>
          <span className="w-[177px] h-[24px] font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-center text-[#737373] flex items-center justify-center mt-2 whitespace-nowrap">Countries Worldwide</span>
        </div>
        {/* 4. col-md-3 */}
        <div className="w-[240px] h-[104px] flex flex-col items-center justify-center lg:mb-0">
          <span className="w-[138px] h-[80px] font-montserrat font-bold text-[58px] leading-[80px] tracking-[0.2px] text-center text-[#252B42] flex items-center justify-center">100+</span>
          <span className="w-[104px] h-[24px] font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-center text-[#737373] flex items-center justify-center mt-2 whitespace-nowrap">Top Partners</span>
        </div>
      </div>
    </div>
    <div className="w-[414px] h-[477px] opacity-100 bg-[#FFFFFF] flex items-center justify-center lg:w-[1440px] lg:h-[764px] lg:opacity-100 lg:flex lg:items-center lg:justify-center">
      <VideoCard />      
    </div>
    {/* Meet Team Section - Mobile only, all desktop (lg:) styles removed */}
    <div className="w-[414px] h-[1627px] opacity-100 flex items-center justify-center mx-auto bg-white lg:w-[1440px] lg:h-[826px] lg:opacity-100 lg:flex lg:items-center  lg:justify-center">
      {/* Container */}
      <div className="w-[361px] h-[1609px] opacity-100 bg-[#FFFFFF] flex flex-col items-center justify-center mx-auto lg:w-[1050px] lg:h-[819px] lg:opacity-100 lg:gap-[112px] lg:pt-[112px]  lg:bg-[#FFFFFF] lg:pb-[112px]">
        {/* Üstteki row */}
        <div className="w-[361px] h-[280px] opacity-100 flex flex-col items-center justify-center bg-[#FFFFFF] lg:w-[607px] lg:h-[100px] lg:opacity-100 lg:gap-[10px]">
          <h2
            className="w-[302px] h-[100px] font-montserrat font-bold text-[40px] leading-[50px] tracking-[0.2px] text-center text-[#252B42] flex items-center justify-center mx-auto lg:w-[316px] lg:h-[50px] lg:text-[40px] lg:leading-[50px] lg:whitespace-nowrap lg:mb-0"
            style={{ letterSpacing: '0.2px' }}
          >
            Meet Our Team
          </h2>
          <p
            className="w-[302px] h-[80px] font-montserrat font-normal text-[14px] leading-[20px] tracking-[0.2px] text-center text-[#737373] flex items-center justify-center mx-auto mt-4 lg:w-[469px] lg:h-[40px] lg:text-[14px] lg:leading-[20px] lg:font-normal lg:tracking-[0.2px] lg:text-center lg:mt-0"
            style={{ letterSpacing: '0.2px' }}
          >
            <span className="block lg:hidden">
              Problems trying to resolve <br />the conflict between the two major <br />realms of Classical physics: <br />Newtonian mechanics
            </span>
            <span className="hidden lg:block">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
            </span>
          </p>
        </div>
        {/* Alttaki row */}
        <div className="w-[329px] h-[1269px] opacity-100 flex flex-col items-center justify-center bg-[#FFFFFF] mt-4 lg:w-[1034px] lg:h-[383px] lg:opacity-100 lg:gap-[30px] lg:flex-row lg:items-center lg:justify-center">
          {/* 3 Team Cards - renderTeamCard fonksiyonu ile TeamPage'den */}
          <div className="flex flex-col gap-[30px] items-center w-full lg:flex-row lg:gap-[30px] lg:items-center lg:justify-center  lg:w-full">
            {[{ image: team1, name: "Username", role: "Profession" },
              { image: team2, name: "Username", role: "Profession" },
              { image: team3, name: "Username", role: "Profession" }].map(renderTeamCard)}
          </div>
        </div>
      </div>
    </div>
    {/* Clients Section - Mobile layout */}
    <div className="w-[414px] h-[1444px] opacity-100 bg-[#FAFAFA] mx-auto flex flex-col items-center justify-start lg:w-[1440px] lg:h-[479px] lg:opacity-100 lg:flex lg:items-center lg:justify-center">
      {/* Clients container */}
      <div className="w-[414px] h-[1192px] opacity-100 mt-[120px] lg:mt-0 flex flex-col items-center justify-start lg:w-[1050px] lg:h-[479px] lg:opacity-100 lg:gap-[24px] lg:pt-[80px] lg:pb-[80px] ">
          {/* Clients container content will be added here */}
          {/* Row 1 */}
          <div className="w-[325px] h-[240px] opacity-100 flex flex-col items-center justify-center mx-auto gap-[30px] lg:w-[864px]  lg:h-[120px] lg:opacity-100">
            <h2
              className="w-[287px] h-[150px] font-montserrat font-bold text-[40px] leading-[50px] tracking-[0.2px] text-center text-[#252B42] flex items-center justify-center mx-auto lg:w-[496px] lg:h-[50px] lg:opacity-100 lg:whitespace-nowrap"
              style={{ letterSpacing: '0.2px' }}
            >
              Big Companies Are Here
            </h2>
            <p
              className="w-[328px] h-[60px] font-montserrat font-normal text-[14px] leading-[20px] tracking-[0.2px] text-center text-[#737373] flex items-center justify-center mx-auto lg:w-[547px] lg:h-[40px] lg:opacity-100"
              style={{ letterSpacing: '0.2px' }}
            >
              <span className="block lg:hidden">
                Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
              </span>
              <span className="hidden lg:block">
                Problems trying to resolve the conflict between<br />the two major realms of Classical physics: Newtonian mechanics
              </span>
            </p>
          </div>
          {/* Row 2 */}
          <div className="w-[327px] h-[952px] opacity-100 flex items-center justify-center mx-auto bg-transparent overflow-hidden
            lg:w-[1054px] lg:h-[175px] lg:gap-[30px] lg:pt-[50px] lg:pb-[50px] lg:flex lg:items-center lg:justify-center">
            <div className="w-[327px] h-[952px] flex items-center justify-center lg:w-full lg:h-full lg:gap-[30px]">
              <MobileClients className="w-[327px] h-[952px] !mx-0 lg:w-full lg:h-full" />
            </div>
          </div>
      </div>
    </div>
    {/* Testimonial Section - Mobile layout */}
    <div className="w-[414px] h-[520px] opacity-100 bg-[#2A7CC7] mx-auto flex items-center justify-center lg:w-[1440px] lg:h-[636px] lg:opacity-100 lg:relative">
      {/* Desktop Testimonial Image */}
      <img
        src={testimonialImg}
        alt="Testimonial"
        className="hidden lg:block lg:w-[590px] lg:h-[640px] lg:absolute lg:left-[850px] lg:opacity-100 lg:object-cover"
      />
      {/* FlexRow */}
      <div className="w-[272px] h-[328px] bg-transparent mx-auto flex flex-col items-center justify-center gap-[24px] lg:w-[438px] lg:h-[238px] lg:absolute lg:top-[194px] lg:left-[195px] lg:mx-0 lg:items-start lg:justify-start">
        <h5 className="w-[128px] h-[24px] font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-center text-white mb-0 whitespace-nowrap lg:w-[128px] lg:h-[24px] lg:text-left">WORK WITH US</h5>
        <h2 className="w-[274px] h-[100px] font-montserrat font-bold text-[40px] leading-[50px] tracking-[0.2px] text-center text-white mb-0 lg:w-[440px] lg:h-[50px] lg:text-left lg:whitespace-nowrap">Now Let's grow Yours</h2>
        <p className="w-[257px] h-[80px] font-montserrat font-normal text-[14px] leading-[20px] tracking-[0.2px] text-center text-white mb-0 lg:w-[440px] lg:h-[40px] lg:text-left">
          The gradual accumulation of information about atomic and <br />small-scale behavior during the first quarter of the 20th
        </p>
        <button className="w-[130px] h-[52px] flex items-center justify-center gap-[10px] pt-[15px] pr-[40px] pb-[15px] pl-[40px] rounded-[5px] border border-[#FAFAFA] bg-transparent">
          <span className="w-[50px] h-[22px] font-montserrat font-bold text-[14px] leading-[22px] tracking-[0.2px] text-center text-[#FAFAFA]">Button</span>
        </button>
      </div>
    </div>
  </div>
);

export default AboutUs;
