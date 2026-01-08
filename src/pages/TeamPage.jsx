
import React from "react";
import { MdChevronRight } from "react-icons/md";

import FbKare from "../assets/ikonvektorleri/fb-kare.png";
import LinkedinIcon from "../assets/ikonvektorleri/linkedin.png";
import InstaRed from "../assets/ikonvektorleri/insta-red.png";
import InstaBlack from "../assets/ikonvektorleri/insta-black.png";
import InstaBlue from "../assets/ikonvektorleri/insta-blue.png";
import FbDaire from "../assets/ikonvektorleri/fb-daire.png";
import TwitterIcon from "../assets/ikonvektorleri/twitter.png";


// Kart yapısını yukarıda fonksiyon olarak tanımla
export function renderTeamCard({ image, name, role }, idx) {
  return (
    <div key={idx} className="w-[316px] h-[403px] flex flex-col items-center bg-white rounded">
      {/* Card Item - Media */}
      <div className="w-[316px] h-[231px] flex items-center justify-center bg-gray-100 rounded-t">
        <img src={image} alt={name} className="w-[316px] h-[231px] object-cover rounded-t" />
      </div>
      {/* Card Content */}
      <div className="w-[316px] h-[172px] flex flex-col items-center justify-center gap-[10px] p-[30px]">
        <h5 className="font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-center text-[#252B42] w-[83px] h-[24px]">{name}</h5>
        <h6 className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center text-[#737373] w-[77px] h-[24px]">{role}</h6>
        <div className="flex items-center justify-center gap-[20px] w-[112px] h-[44px] pt-[10px] pb-[10px]">
          {/* Facebook Icon - Mobil */}
          <span className="w-[24px] h-[24px] flex items-center justify-center lg:hidden">
            <img src={FbKare} alt="Facebook Kare" width={24} height={24} />
          </span>
          {/* Facebook Icon - Desktop */}
          <span className="hidden lg:flex w-[23px] h-[23px] items-center justify-center">
            <img src={FbDaire} alt="Facebook Daire" width={23} height={23} />
          </span>
          {/* Instagram Icon - Mobil */}
          <span className="w-[24px] h-[24px] flex items-center justify-center lg:hidden">
            <img src={InstaRed} alt="Instagram Red" width={23} height={23} />
          </span>
          {/* Instagram Icon - Desktop */}
          <span className="hidden lg:flex w-[23px] h-[23px] items-center justify-center">
            <img src={InstaBlue} alt="Instagram Blue" width={23} height={23} />

          </span>
          {/* Twitter Icon - Mobil ve Desktop aynı kalıyor */}
          <span className="w-[24px] h-[20px] flex items-center justify-center">
            <img src={TwitterIcon} alt="Twitter" width={24} height={20} />
          </span>
        </div>
      </div>
    </div>
  );
}
import hero1 from "../assets/team-heropicture/e98c6914973e6a41dfef7ffabf70f468edcc4107.jpg";
import hero2 from "../assets/team-heropicture/5c2a4592b5f3cb754566bde7b62ef5da4222383b.jpg";
import hero3 from "../assets/team-heropicture/4ead0629924f04ede9b2a5224dec41b501dbaa4c.jpg";
import hero4 from "../assets/team-heropicture/147ec7b917b3032e65f4538f6803ef11e8c0e09c.jpg";
import hero5 from "../assets/team-heropicture/12516b52a12de21bbd956c34ab16e5b1e48eeefe.jpg";
import team1 from "../assets/ourteam/14788f70a6747b5e74aa8fc67a9e46c99f77543b.jpg";
import team2 from "../assets/ourteam/98e76ada179d14c5b5b80c9862a7cf5f8bdf6437.jpg";
import team3 from "../assets/ourteam/ca3428bbb53263f3cb265f6e0a1129f5afc25e74.jpg";
import team4 from "../assets/ourteam/24a6b8d9efd1b9c2401fb0702dc41f18a42ed89c.jpg";
import team5 from "../assets/ourteam/ded65d448bb85dbe4a56197785c542fd6e7e057f.jpg";
import team6 from "../assets/ourteam/0a05d6ce0fd1eeff9355b162a7e7c01605dd3c55.jpg";
import team7 from "../assets/ourteam/54268cf04ad0f612e9f8f311e9d1c6bbd31a03f3.jpg";
import team8 from "../assets/ourteam/7e902282946c71109661dfcd96fe9458abbd0e5b.jpg";
import team9 from "../assets/ourteam/139086e5ca1b2a889adad8205d13222ab4105506.jpg";

const TeamPage = () => (
  <div className="w-full min-h-screen bg-[#FFFFFF] flex flex-col items-center">
    {/* What We Do */}
    <div className="bg-white/50 rounded-xl mt-4 flex items-center justify-center w-[414px] h-[330px] lg:w-[1440px] lg:h-[280px]">
      {/*row */}  
      <div
        className="flex flex-col items-center justify-center gap-[30px] w-[414px] h-[200px] lg:w-[870px] lg:h-[280px] lg:py-[50px] lg:flex-row">
            <div
        className="flex flex-col items-center justify-center gap-[30px] w-[414px] h-[200px] lg:w-[870px] lg:h-[280px] lg:py-[50px] lg:flex-col"
        style={{opacity: 1}}
      >
        <h5 className="font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-center text-[#737373]">WHAT WE DO</h5>
        <h2 className="font-montserrat font-bold text-[40px] leading-[50px] tracking-[0.2px] text-center text-[#252B42]">Innovation<br className="lg:hidden" /> tailored for you</h2>
        <div className="flex items-center justify-center gap-[15px] w-[120px] h-[44px] pt-[10px] pb-[10px] opacity-100">
          {/* Breadcrumb örneği */}
          <span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center text-[#252B42] w-[43px] h-[24px]">Home</span>
          <span className="flex items-center">
            <MdChevronRight size={20} color="#BDBDBD" />
          </span>
          <span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center text-[#737373] w-[40px] h-[24px]">Team</span>
        </div>
        </div>
      </div>
    </div>
    {/* Hero Picture Section */}
    <div className="bg-white w-[413px] h-[1070px] lg:w-[1440px] lg:h-[530px] flex flex-col items-center justify-center mt-8">
      {/* Hero Picture Images - Responsive Layout */}
      <div className="flex flex-col lg:flex-row w-full h-full items-center lg:items-stretch justify-center lg:gap-[10px]">
        {/* 1. büyük resim */}
        <img
          src={hero1}
          alt="Hero 1"
          className="w-[413px] h-[530px] lg:w-[700px] lg:h-[530px] object-cover rounded mb-2 lg:mb-0 lg:rounded-l"
        />
        {/* Sağdaki resimler: 2-3 ve 4-5 */}
        <div className="flex flex-col lg:flex-row w-full lg:w-[722px] lg:gap-[10px]">
          {/* 2 ve 3 */}
          <div className="flex flex-row lg:flex-col w-full lg:w-[361px] gap-[5px] lg:gap-[10px] mb-[10px] lg:mb-0">
            <img
              src={hero2}
              alt="Hero 2"
              className="w-[204px] h-[260px] lg:w-[361px] lg:h-[260px] object-cover rounded scale-x-[-1] lg:rounded-t"
            />
            <img
              src={hero3}
              alt="Hero 3"
              className="w-[204px] h-[260px] lg:w-[361px] lg:h-[260px] object-cover rounded lg:rounded-b"
            />
          </div>
          {/* 4 ve 5 */}
          <div className="flex flex-row lg:flex-col w-full lg:w-[361px] gap-[5px] lg:gap-[10px]">
            <img
              src={hero4}
              alt="Hero 4"
              className="w-[204px] h-[260px] lg:w-[361px] lg:h-[260px] object-cover rounded lg:rounded-t"
            />
            <img
              src={hero5}
              alt="Hero 5"
              className="w-[204px] h-[260px] lg:w-[361px] lg:h-[260px] object-cover rounded scale-x-[-1] lg:rounded-b"
            />
          </div>
        </div>
      </div>
    </div>
      {/* Meet Our Team Section */}
      <div className="w-[414px] h-[4180px] lg:w-[1440px] lg:h-[1759px] bg-white flex flex-col items-center mx-auto mt-8">
        {/* Üst Container: Sadece mobilde görünür */}
        <div className="w-[361px] h-[190px] pt-[45px] pb-[45px] flex flex-col items-center justify-center lg:hidden">
          <div className="w-[310px] h-[100px] flex items-center justify-center mx-auto">
            <h2 className="font-montserrat font-bold text-[40px] leading-[50px] tracking-[0.2px] text-center text-[#252B42]">Meet Our Team</h2>
          </div>
        </div>
        {/* Alt Container: Mobilde başlık hidden, desktopta başlık görünür, desktop ölçüleri güncellendi */}
        <div className="w-[329px] h-[3867px] flex flex-col items-center gap-[30px] mx-auto
          lg:w-[1050px] lg:h-[1759px] lg:flex lg:flex-col lg:gap-[112px] lg:items-center lg:mx-auto">
          {/* Desktop: başlık ve 3 satır kart, gap ile eşit aralıklı */}
          <div className="hidden lg:flex lg:flex-col lg:gap-[112px] lg:w-full lg:h-full lg:items-center lg:justify-center">
            {/* Başlık */}
            <div className="lg:w-[607px] lg:h-[50px] lg:flex lg:items-center lg:justify-center mx-auto">
              <h2 className="font-montserrat font-bold text-[40px] leading-[50px] tracking-[0.2px] text-center text-[#252B42]">Meet Our Team</h2>
            </div>
            {/* 3 satır kart */}
            <div className="lg:w-[1034px] lg:h-[383px] lg:flex lg:flex-row lg:gap-[30px] lg:justify-center lg:items-center">
              {[{ image: team1, name: "Username", role: "Profession" },
                { image: team2, name: "Username", role: "Profession" },
                { image: team3, name: "Username", role: "Profession" }].map(renderTeamCard)}
            </div>
            <div className="lg:w-[1034px] lg:h-[383px] lg:flex lg:flex-row lg:gap-[30px] lg:justify-center lg:items-center">
              {[{ image: team4, name: "Username", role: "Profession" },
                { image: team5, name: "Username", role: "Profession" },
                { image: team6, name: "Username", role: "Profession" }].map(renderTeamCard)}
            </div>
            <div className="lg:w-[1034px] lg:h-[383px] lg:flex lg:flex-row lg:gap-[30px] lg:justify-center lg:items-center">
              {[{ image: team7, name: "Username", role: "Profession" },
                { image: team8, name: "Username", role: "Profession" },
                { image: team9, name: "Username", role: "Profession" }].map(renderTeamCard)}
            </div>
          </div>
          {/* Mobilde eski yapı korunur */}
          <div className="lg:hidden w-[329px] flex flex-col gap-[30px] items-center mx-auto">
            {[ 
              { image: team1, name: "Username", role: "Profession" },
              { image: team2, name: "Username", role: "Profession" },
              { image: team3, name: "Username", role: "Profession" },
              { image: team4, name: "Username", role: "Profession" },
              { image: team5, name: "Username", role: "Profession" },
              { image: team6, name: "Username", role: "Profession" },
              { image: team7, name: "Username", role: "Profession" },
              { image: team2, name: "Username", role: "Profession" },
              { image: team3, name: "Username", role: "Profession" }
            ].map(renderTeamCard)}
          </div>
        </div>
      </div>
      {/* TEAM CTA BÖLÜMÜ - doğrudan JSX olarak eklenmiştir */}
    <section className="w-[414px] h-[586px] flex flex-col items-center justify-center bg-white mx-auto lg:w-[1440px] lg:h-[442px]">
    <div className="w-[332px] h-[576px] flex flex-col items-center justify-center mx-auto lg:w-[1050px] lg:h-[442px] lg:gap-[96px] lg:pt-[80px] lg:pb-[80px] lg:items-center lg:justify-center lg:mx-auto" >
      <div className="w-[332px] h-[352px] flex flex-col items-center justify-center mx-auto lg:w-[607px] lg:h-[282px] lg:mx-auto lg:items-center lg:justify-center">
        <div className="w-[332px] h-[352px] flex flex-col items-center justify-center gap-[30px] lg:w-[547px] lg:h-[282px] lg:gap-[30px]">
          <h2 className="w-[332px] h-[100px] font-montserrat font-bold text-[38px] leading-[48px] tracking-[0.2px] text-center text-[#252B42] whitespace-nowrap lg:w-[547px] lg:h-[50px] lg:text-[40px] lg:leading-[50px] lg:tracking-[0.2px] lg:font-bold lg:font-montserrat lg:text-center lg:text-[#252B42] lg:whitespace-nowrap">Start your<span className="lg:hidden"><br /></span> 14 days free trial</h2>
          <h6 className="w-[321px] h-[60px] font-montserrat font-normal text-[14px] leading-[20px] tracking-[0.2px] text-center text-[#737373] lg:w-[411px] lg:h-[40px] lg:font-montserrat lg:font-normal lg:text-[14px] lg:leading-[20px] lg:tracking-[0.2px] lg:text-center lg:text-[#737373]">Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent.</h6>
          <button className="w-[186px] h-[52px] flex items-center justify-center gap-[10px] pt-[15px] pr-[40px] pb-[15px] pl-[40px] rounded-[5px] bg-[#23A6F0]">
            <span className="w-[106px] h-[22px] font-montserrat font-bold text-[14px] leading-[22px] tracking-[0.2px] text-center text-white whitespace-nowrap">Try it free now</span>
          </button>
          {/* sm: Sosyal medya ikonları bölümü */}
          <div className="w-[242px] h-[50px] flex flex-row items-center justify-center gap-[34px] p-[10px] mt-[24px]">
            {/* Twitter */}
            <span className="w-[30px] h-[24px] flex items-center justify-center">
              <img src={TwitterIcon} alt="Twitter" width={30} height={24} />
            </span>
            {/* Facebook */}
            <span className="w-[30px] h-[30px] flex items-center justify-center">
              <img src={FbKare} alt="Facebook Kare" width={30} height={30} />
            </span>
            {/* Instagram */}
            <span className="w-[30px] h-[30px] flex items-center justify-center">
              <img src={InstaBlack} alt="Instagram Black" width={30} height={30} />
            </span>
            {/* Linkedin */}
            <span className="w-[30px] h-[30px] flex items-center justify-center">
              <img src={LinkedinIcon} alt="LinkedIn" width={30} height={30} />
            </span>
          </div>
        </div>
      </div>
     </div>
    </section>
  </div>
);

export default TeamPage;
