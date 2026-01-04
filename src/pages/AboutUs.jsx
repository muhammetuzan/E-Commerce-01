import React from "react";
import { renderTeamCard } from "./TeamPage";
import team1 from "../assets/ourteam/0a05d6ce0fd1eeff9355b162a7e7c01605dd3c55.jpg";
import team2 from "../assets/ourteam/54268cf04ad0f612e9f8f311e9d1c6bbd31a03f3.jpg";
import team3 from "../assets/ourteam/24a6b8d9efd1b9c2401fb0702dc41f18a42ed89c.jpg";
import videoCardImg from "../assets/AboutUs/bf5361f308dd0c5a04f10121bc68f6cb9ff0d63d.jpg";
import testimonialImg from "../assets/AboutUs/a01449552eeaef7ecedd3954687aefbdb6236bb6.jpg";

import MobileClients from "../components/MobileClients";
import { AboutNoneBg } from "./ContactPage";
import aboutUsImg from "../assets/AboutUs/7466f01545eb1f33b39fa1e1f6b0ddf5bb703345.png";

// VideoCard Component (Tailwind only)
const VideoCard = ({ imageSrc = videoCardImg, imageAlt = "Video" }) => (
  <div className="w-[307px] h-[316px] rounded-[12.3px] overflow-hidden relative opacity-100 md:w-[989px] md:h-[540px] md:opacity-100 md:rounded-[20px]">
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
        <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.7396 12.7028L2.62818 21.7265C1.34574 22.4915 -0.300049 21.5652 -0.300049 20.0229V1.97568C-0.300049 0.435901 1.34337 -0.492858 2.62818 0.27459L17.7396 9.29821C18.0313 9.4696 18.2738 9.71734 18.4424 10.0163C18.6111 10.3153 18.7 10.6548 18.7 11.0005C18.7 11.3462 18.6111 11.6858 18.4424 11.9848C18.2738 12.2837 18.0313 12.5315 17.7396 12.7028Z" fill="white"/>
        </svg>
      </button>
    </div>
  </div>
);



const AboutUs = () => (
  <div className="w-full min-h-screen bg-white flex flex-col items-center">
    {/* About Us Container */}
    <div className="w-[418px] h-[1080px] flex flex-col items-center mx-auto md:w-[1440px] md:h-[758px]  md:relative md:flex md:items-center md:justify-center">
      {/* Row */}
      <div className="w-[418px] h-[1071px] flex flex-col items-center mx-auto md:w-[1044px] md:h-[321px] md:gap-[30px] md:bg-[#FFFFFF] md:mx-auto md:flex-row md:justify-start md:items-start">
        {/* Main Content */}
        <div className="w-[418px] h-[590px] flex flex-col items-center justify-center gap-[40px]
          md:w-[599px] md:h-[321px] md:items-start md:justify-center md:gap-[35px]">
          {/* Desktop h5 başlık */}
          <h5 className="hidden md:block w-[149px] h-[24px] font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#252B42] text-left whitespace-nowrap">ABOUT COMPANY</h5>
          {/* h1 başlık */}
          <h1 className="w-[213px] h-[50px] font-montserrat font-bold text-[40px] leading-[50px] tracking-[0.2px] text-center text-[#252B42] whitespace-nowrap
            md:w-[542px] md:h-[80px] md:text-[58px] md:leading-[80px] md:tracking-[0.2px] md:text-left">ABOUT US</h1>
          {/* h4 açıklama */}
          <h4 className="w-[277px] h-[120px] font-montserrat font-normal text-[20px] leading-[30px] tracking-[0.2px] text-center text-[#737373]
            md:w-[376px] md:h-[60px] md:text-[20px] md:leading-[30px] md:tracking-[0.2px] md:text-left">We know how large <span className="md:hidden"><br />objects will act, but things <br />on a small scale just do <br />not act that way.</span><span className="hidden md:inline">objects will act, <br />but things on a small scale</span></h4>
          {/* Buton */}
          <button className="w-[195px] h-[52px] flex items-center justify-center gap-[10px] pt-[15px] pr-[40px] pb-[15px] pl-[40px] rounded-[5px] bg-[#23A6F0] md:mt-auto">
            <span className="w-[115px] h-[22px] font-montserrat font-bold text-[14px] leading-[22px] tracking-[0.2px] text-center text-white">Get Quote Now</span>
          </button>
        </div>
        {/* None Bölümü - Mobil ve desktop uyumlu */}
        <div
          className="w-full flex justify-center mt-8 md:absolute md:w-[632px] md:h-[612px] md:top-[0px] md:left-[742px] md:mt-0"
          style={{ pointerEvents: 'none' }}
        >
          <AboutNoneBg
            imgSrc={aboutUsImg}
            imgAlt="About Us Visual"
            imgClassName=" md:!top-[-65px]"
          />
        </div>               
      </div>
    </div>
    {/* Content Section (Figma specs) */}
    <div  className="w-[414px] h-[500px] mx-auto flex flex-col items-center justify-center bg-[#FFFFFF] md:bg-green md:w-[1440px] md:h-[236px] md:pt-[24px] md:pb-[24px] md:flex md:items-center md:justify-center">
      <div className="w-[381px] h-[340px] flex flex-col items-center md:w-[1018px] md:h-[188px] md:gap-[60px] relative">
        {/* p0: Problems trying */}
        <div className="w-full relative h-[44px] md:h-full">
          <p className="w-[116px] h-[20px] mt-[24px] mx-auto font-montserrat font-normal text-[14px] leading-[20px] tracking-[0.2px] text-[#E74040] text-center md:absolute md:top-[24px] md:left-[16px] md:mt-0 md:mx-0">
            Problems trying
          </p>
       
        {/* h2 başlık */}
       
          <h2 className="w-[269px] h-[128px] mt-[48px] mx-auto font-montserrat font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42] text-center
            md:w-[394px] md:h-[96px] md:absolute md:top-[72px] md:left-[16px] md:mt-0 md:mx-0 md:text-left">
            Met minim Mollie non br desert Alamo est sit cliquey dolor do met sent.
          </h2>
        
        <p className="w-[353px] h-[60px] mt-[80px] ml-[20px] font-montserrat font-normal text-[14px] leading-[20px] tracking-[0.2px] text-[#737373] text-left flex flex-col justify-end
          md:w-[545px] md:h-[40px] md:absolute md:top-[72px] md:right-[16px] md:mt-0 md:text-left md:justify-start">
          <span className="md:hidden">
            Problems trying to resolve the conflict between<br />
            the two major realms of Classical physics:<br />
            Newtonian mechanics
          </span>
          <span className="hidden md:inline">
            Problems trying to resolve the conflict between the two major realms of<br />
            Classical physics: Newtonian mechanics
          </span>
        </p>
      </div>
    </div>
    </div>
    {/* Stats Section - Sadece mobil layout ve iki div */}
    <div className="w-[414px] h-[1006px] opacity-100 mx-auto flex flex-col items-center justify-center bg-white md:w-[1440px] md:h-[264px] md:opacity-100">
      {/* row bölümü - stats içinde ortalanmış */}
      <div className="w-[241px] h-[716px] bg-[#FFFFFF] opacity-100 mx-auto flex flex-col justify-between md:flex-row md:items-center md:gap-[30px] md:w-[1049px] md:h-[104px] md:opacity-100 md:mx-auto">
        {/* 1. col-md-3 */}
        <div className="w-[240px] h-[104px] flex flex-col items-center justify-center mb-4 md:mb-0">
          <span className="w-[100px] h-[80px] font-montserrat font-bold text-[58px] leading-[80px] tracking-[0.2px] text-center text-[#252B42] flex items-center justify-center">15K</span>
          <span className="w-[146px] h-[24px] font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-center text-[#737373] flex items-center justify-center mt-2 whitespace-nowrap">Happy Customers</span>
        </div>
        {/* 2. col-md-3 */}
        <div className="w-[240px] h-[104px] flex flex-col items-center justify-center mb-4 md:mb-0">
          <span className="w-[140px] h-[80px] font-montserrat font-bold text-[58px] leading-[80px] tracking-[0.2px] text-center text-[#252B42] flex items-center justify-center">150K</span>
          <span className="w-[134px] h-[24px] font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-center text-[#737373] flex items-center justify-center mt-2 whitespace-nowrap">Monthly Visitors</span>
        </div>
        {/* 3. col-md-3 */}
        <div className="w-[240px] h-[104px] flex flex-col items-center justify-center mb-4 md:mb-0">
          <span className="w-[59px] h-[80px] font-montserrat font-bold text-[58px] leading-[80px] tracking-[0.2px] text-center text-[#252B42] flex items-center justify-center">15</span>
          <span className="w-[177px] h-[24px] font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-center text-[#737373] flex items-center justify-center mt-2 whitespace-nowrap">Countries Worldwide</span>
        </div>
        {/* 4. col-md-3 */}
        <div className="w-[240px] h-[104px] flex flex-col items-center justify-center md:mb-0">
          <span className="w-[138px] h-[80px] font-montserrat font-bold text-[58px] leading-[80px] tracking-[0.2px] text-center text-[#252B42] flex items-center justify-center">100+</span>
          <span className="w-[104px] h-[24px] font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-center text-[#737373] flex items-center justify-center mt-2 whitespace-nowrap">Top Partners</span>
        </div>
      </div>
    </div>
    <div className="w-[414px] h-[477px] opacity-100 bg-[#FFFFFF] flex items-center justify-center md:w-[1440px] md:h-[764px] md:opacity-100 md:flex md:items-center md:justify-center">
      <VideoCard />      
    </div>
    {/* Meet Team Section - Mobile only, all desktop (md:) styles removed */}
    <div className="w-[414px] h-[1627px] opacity-100 flex items-center justify-center mx-auto bg-white md:w-[1440px] md:h-[826px] md:opacity-100 md:flex md:items-center  md:justify-center">
      {/* Container */}
      <div className="w-[361px] h-[1609px] opacity-100 bg-[#FFFFFF] flex flex-col items-center justify-center mx-auto md:w-[1050px] md:h-[819px] md:opacity-100 md:gap-[112px] md:pt-[112px]  md:bg-[#FFFFFF] md:pb-[112px]">
        {/* Üstteki row */}
        <div className="w-[361px] h-[280px] opacity-100 flex flex-col items-center justify-center bg-[#FFFFFF] md:w-[607px] md:h-[100px] md:opacity-100 md:gap-[10px]">
          <h2
            className="w-[302px] h-[100px] font-montserrat font-bold text-[40px] leading-[50px] tracking-[0.2px] text-center text-[#252B42] flex items-center justify-center mx-auto md:w-[316px] md:h-[50px] md:text-[40px] md:leading-[50px] md:whitespace-nowrap md:mb-0"
            style={{ letterSpacing: '0.2px' }}
          >
            Meet Our Team
          </h2>
          <p
            className="w-[302px] h-[80px] font-montserrat font-normal text-[14px] leading-[20px] tracking-[0.2px] text-center text-[#737373] flex items-center justify-center mx-auto mt-4 md:w-[469px] md:h-[40px] md:text-[14px] md:leading-[20px] md:font-normal md:tracking-[0.2px] md:text-center md:mt-0"
            style={{ letterSpacing: '0.2px' }}
          >
            <span className="block md:hidden">
              Problems trying to resolve <br />the conflict between the two major <br />realms of Classical physics: <br />Newtonian mechanics
            </span>
            <span className="hidden md:block">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
            </span>
          </p>
        </div>
        {/* Alttaki row */}
        <div className="w-[329px] h-[1269px] opacity-100 flex flex-col items-center justify-center bg-[#FFFFFF] mt-4 md:w-[1034px] md:h-[383px] md:opacity-100 md:gap-[30px] md:flex-row md:items-center md:justify-center">
          {/* 3 Team Cards - renderTeamCard fonksiyonu ile TeamPage'den */}
          <div className="flex flex-col gap-[30px] items-center w-full md:flex-row md:gap-[30px] md:items-center md:justify-center  md:w-full">
            {[{ image: team1, name: "Username", role: "Profession" },
              { image: team2, name: "Username", role: "Profession" },
              { image: team3, name: "Username", role: "Profession" }].map(renderTeamCard)}
          </div>
        </div>
      </div>
    </div>
    {/* Clients Section - Mobile layout */}
    <div className="w-[414px] h-[1444px] opacity-100 bg-[#FAFAFA] mx-auto flex flex-col items-center justify-start md:w-[1440px] md:h-[479px] md:opacity-100 md:flex md:items-center md:justify-center">
      {/* Clients container */}
      <div className="w-[414px] h-[1192px] opacity-100 mt-[120px] md:mt-0 flex flex-col items-center justify-start md:w-[1050px] md:h-[479px] md:opacity-100 md:gap-[24px] md:pt-[80px] md:pb-[80px] ">
          {/* Clients container content will be added here */}
          {/* Row 1 */}
          <div className="w-[325px] h-[240px] opacity-100 flex flex-col items-center justify-center mx-auto gap-[30px] md:w-[864px]  md:h-[120px] md:opacity-100">
            <h2
              className="w-[287px] h-[150px] font-montserrat font-bold text-[40px] leading-[50px] tracking-[0.2px] text-center text-[#252B42] flex items-center justify-center mx-auto md:w-[496px] md:h-[50px] md:opacity-100 md:whitespace-nowrap"
              style={{ letterSpacing: '0.2px' }}
            >
              Big Companies Are Here
            </h2>
            <p
              className="w-[328px] h-[60px] font-montserrat font-normal text-[14px] leading-[20px] tracking-[0.2px] text-center text-[#737373] flex items-center justify-center mx-auto md:w-[547px] md:h-[40px] md:opacity-100"
              style={{ letterSpacing: '0.2px' }}
            >
              <span className="block md:hidden">
                Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
              </span>
              <span className="hidden md:block">
                Problems trying to resolve the conflict between<br />the two major realms of Classical physics: Newtonian mechanics
              </span>
            </p>
          </div>
          {/* Row 2 */}
          <div className="w-[327px] h-[952px] opacity-100 flex items-center justify-center mx-auto bg-transparent overflow-hidden
            md:w-[1054px] md:h-[175px] md:gap-[30px] md:pt-[50px] md:pb-[50px] md:flex md:items-center md:justify-center">
            <div className="w-[327px] h-[952px] flex items-center justify-center md:w-full md:h-full md:gap-[30px]">
              <MobileClients className="w-[327px] h-[952px] !mx-0 md:w-full md:h-full" />
            </div>
          </div>
      </div>
    </div>
    {/* Testimonial Section - Mobile layout */}
    <div className="w-[414px] h-[520px] opacity-100 bg-[#2A7CC7] mx-auto flex items-center justify-center md:w-[1440px] md:h-[636px] md:opacity-100 md:relative">
      {/* Desktop Testimonial Image */}
      <img
        src={testimonialImg}
        alt="Testimonial"
        className="hidden md:block md:w-[590px] md:h-[640px] md:absolute md:left-[850px] md:opacity-100 md:object-cover"
      />
      {/* FlexRow */}
      <div className="w-[272px] h-[328px] bg-transparent mx-auto flex flex-col items-center justify-center gap-[24px] md:w-[438px] md:h-[238px] md:absolute md:top-[194px] md:left-[195px] md:mx-0 md:items-start md:justify-start">
        <h5 className="w-[128px] h-[24px] font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-center text-white mb-0 whitespace-nowrap md:w-[128px] md:h-[24px] md:text-left">WORK WITH US</h5>
        <h2 className="w-[274px] h-[100px] font-montserrat font-bold text-[40px] leading-[50px] tracking-[0.2px] text-center text-white mb-0 md:w-[440px] md:h-[50px] md:text-left md:whitespace-nowrap">Now Let's grow Yours</h2>
        <p className="w-[257px] h-[80px] font-montserrat font-normal text-[14px] leading-[20px] tracking-[0.2px] text-center text-white mb-0 md:w-[440px] md:h-[40px] md:text-left">
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
