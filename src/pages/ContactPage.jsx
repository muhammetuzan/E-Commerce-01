import React from "react";
import MektupIcon from "../assets/ikonvektorleri/Mektup.png";
import dm from "../assets/ikonvektorleri/dm.png";
import Arrow2 from "../assets/ikonvektorleri/Arrow 2.png";
import KonumIcon from "../assets/ikonvektorleri/Konum.png";
import TelefonIcon from "../assets/ikonvektorleri/Telefon.png";
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import contactImg from "../assets/contactpics/0becd76fb529bdb1f9ac06ee979d8665aade6757.png";

// ContactPage'deki none arka planı reusable component olarak burada tanımlı
export const AboutNoneBg = ({ imgSrc = contactImg, imgAlt = "About Visual", imgClassName = "" }) => (
  <div className="w-[387px] h-[440px] bg-[#FFFFFF] mt-auto relative lg:w-[632px] lg:h-[612px]">
    {/* Daireler */}
    <div className="w-[9px] h-[9px] bg-[#977DF4] rounded-full absolute top-[285px] left-[19px] lg:w-[15px] lg:h-[15px] lg:top-[409px] lg:left-[24px]"></div>
    <div className="w-[9px] h-[9px] bg-[#977DF4] rounded-full absolute top-[110px] left-[356px] lg:w-[15px] lg:h-[15px] lg:top-[122px] lg:left-[577px]"></div>
    <div className="w-[18px] h-[18px] bg-[#FFE9EA] rounded-full absolute top-[187px] left-[343px] lg:w-[30px] lg:h-[30px] lg:top-[248px] lg:left-[554px]"></div>
    <div className="w-[47px] h-[47px] bg-[#FFE9EA] rounded-full absolute top-[43px] left-[4px] lg:w-[77px] lg:h-[77px] lg:top-[12px]"></div>
    <div className="w-[296px] h-[296px] bg-[#FFE9EA] rounded-full absolute top-[35px] left-[40px] lg:w-[484px] lg:h-[484px] lg:left-[58px]"></div>
    {/* Resim */}
    <img 
      src={imgSrc}
      alt={imgAlt}
      className={`absolute object-cover w-[376px] h-[439px] top-[1px] left-[11px] opacity-100 lg:w-[571px] lg:h-[826px] lg:top-[-20px] lg:left-[34px] ${imgClassName}`}
    />
  </div>
);

// Tekrar kullanılabilir kart bileşeni
export const ContactCard = ({ icon, emails, title, buttonText, bg = "bg-white", width = "w-[328px]", height = "h-[333px]", textColor = "text-[#252B42]", paddingY = "pt-[45px] pb-[45px]" }) => {
  // Use vertical distribution for content if paddingY contains a value > 45px
  const getPaddingValue = (str) => {
    const match = str.match(/pt-\[(\d+)px\]/);
    return match ? parseInt(match[1], 10) : 0;
  };
  const pt = getPaddingValue(paddingY);
  const isTall = pt > 45;
  return (
    <div className={`${width} ${height} flex flex-col items-center mx-auto ${bg} ${paddingY} ${isTall ? "justify-between" : "gap-[15px]"}`}>
      {isTall ? (
        <div className="flex flex-col items-center flex-grow w-full justify-between">
          <div className="w-[72px] h-[72px] flex items-center justify-center mb-2">{icon}</div>
          <div className="w-[216px] h-[48px] flex flex-col items-center justify-center">
            {emails.map((email, i) => (
              <h6 key={i} className={`w-[216px] h-[24px] ${textColor} font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center whitespace-nowrap`}>
                {email}
              </h6>
            ))}
          </div>
          <h5 className={`w-[100px] h-[24px] ${textColor} font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-center mt-2 whitespace-nowrap`}>
            {title}
          </h5>
        </div>
      ) : (
        <>
          <div className="w-[72px] h-[72px] flex items-center justify-center mb-2">{icon}</div>
          <div className="w-[216px] h-[48px] flex flex-col items-center justify-center">
            {emails.map((email, i) => (
              <h6 key={i} className={`w-[216px] h-[24px] ${textColor} font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center whitespace-nowrap`}>
                {email}
              </h6>
            ))}
          </div>
          <h5 className={`w-[100px] h-[24px] ${textColor} font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-center mt-2 whitespace-nowrap`}>
            {title}
          </h5>
        </>
      )}
      <button className="w-[161px] h-[44px] flex items-center justify-center gap-[10px] px-[20px] py-[10px] border border-[#23A6F0] rounded-[5px] mt-2">
        <span className="text-[#23A6F0] font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center whitespace-nowrap">
          {buttonText}
        </span>
      </button>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#F9F9F9] flex flex-col items-center">
      {/* üst kısım */}
      <div
        className="w-[414px] h-[1080px] bg-white flex flex-col items-center mx-auto lg:w-[1440px] lg:h-[800px] lg:relative"
      >
        {/*Content alanı */}
        <div
          className="w-[414px] h-[590px] bg-[#FFFFFF] flex flex-col items-center justify-between py-8 lg:w-[599px] lg:h-[518px] lg:absolute lg:left-[195px] lg:top-[120px] lg:gap-[35px] lg:p-0 lg:py-0 lg:items-start">
          {/* Başlık: CONTACT US */}
          <h5
            className="w-[108px] h-[24px] text-[#252B42] font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] whitespace-nowrap lg:mx-0 lg:text-left lg:w-auto">CONTACT US
          </h5>
          {/* Alt başlık: Get in touch today! */}
          <h1 className="w-[331px] h-[100px] mx-auto text-[#252B42] font-montserrat font-bold text-[40px] leading-[50px] tracking-[0.2px] text-center lg:w-[378px] lg:h-[160px] lg:text-[58px] lg:leading-[80px] lg:text-left lg:mx-0 lg:mt-0">
            Get in touch today!
          </h1>
          {/* Açıklama metni */}
          <h4 className="w-full max-w-[400px] h-auto mx-auto text-[#737373] font-montserrat font-normal text-[20px] leading-[30px] tracking-[0.2px] text-center lg:text-left lg:mx-0 lg:mt-0">
            <span className="block lg:hidden">We know how large <br />objects will act, but things <br />on a small scale just do <br />not act that way.</span>
            <span className="hidden lg:block">We know how large objects will act,<br/>but things on a small scale</span>
          </h4>
          {/* Numbers alanı */}
          <div className="w-[242px] h-[84px] flex flex-col items-center justify-center lg:items-start lg:mt-0">
            <div className="w-full h-[32px] text-[#252B42] font-montserrat font-bold text-[24px] leading-[32px] tracking-[0.1px] text-center whitespace-nowrap lg:text-left">
              Phone : +451 215 215
            </div>
            <div className="w-full h-[32px] text-[#252B42] font-montserrat font-bold text-[24px] leading-[32px] tracking-[0.1px] text-center mt-2 whitespace-nowrap lg:text-left lg:mt-[20px]">
              Fax : +451 215 215
            </div>
          </div>
          {/* Sosyal medya ikonları alanı */}
          <div className="w-[242px] h-[50px] flex items-center justify-center gap-[34px] px-[10px] lg:justify-start lg:ml-0">
            <FaTwitter size={30} color="#252B42" />
            <FaFacebookF size={30} color="#252B42" />
            <FaInstagram size={30} color="#252B42" />
            <FaLinkedin size={30} color="#252B42" />
          </div>
        </div>
        {/* Alttan başlayan none bölümü */}
        <div className="w-[387px] h-[440px] bg-[#FFFFFF] mt-auto relative lg:w-[632px] lg:h-[612px] lg:absolute lg:left-[742px] lg:top-[20px]">
          <AboutNoneBg />
        </div>
      </div>
      {/* Visit Our Office bölümü */}
      <div className="w-[414px] h-[1531px] bg-[#FAFAFA] flex flex-col items-center mx-auto lg:w-[1440px] lg:h-[814px] lg:bg-[#ffffff] lg:mx-auto lg:flex lg:flex-col lg:items-center lg:justify-center lg:relative lg:opacity-100">
        {/* Container */}
        <div className="w-[329px] h-[1453px] mt-[30px] flex flex-col gap-[60px] pt-[45px] pb-[45px]
          lg:w-[1050px] lg:h- [841px] lg:gap-[80px] lg:pt-0 lg:pb-0    lg:mt-0 lg:relative lg:opacity-100">
          {/* 1. Row */}
          <div className="w-[310px] h-[184px] flex flex-col items-center gap-[10px] mx-auto
            lg:w-[633px] lg:h-[134px] lg:mt-[82px] lg:mx-auto lg:items-center lg:justify-start lg:gap-0 lg:relative">
            {/* Kutu */}
            <div className="w-[301px] h-[184px] flex flex-col items-center
              lg:w-[625px] lg:h-[134px] lg:gap-[10px] lg:justify-between lg:items-center lg:mx-auto lg:relative lg:opacity-100">
              {/* Üstte ortalanmış h6 */}
              <h6 className="w-[132px] h-[24px] mx-auto text-[#252B42] font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center whitespace-nowrap lg:absolute lg:top-0 lg:left-1/2 lg:-translate-x-1/2 lg:flex lg:items-center lg:justify-center">
                VISIT OUR OFFICE
              </h6>
              {/* Altında ortalanmış h2 */}
              {/* Mobile h2 */}
              <h2 className="font-montserrat font-bold text-[40px] leading-[50px] tracking-[0.2px] text-center mt-6 lg:hidden text-[#252B42]">
                <span className="block whitespace-nowrap">We help small</span>
                <span className="block whitespace-nowrap">businesses</span>
                <span className="block whitespace-nowrap">with big ideas</span>
              </h2>
              {/* Desktop h2 */}
              <h2 className="hidden lg:block lg:w-[531px] lg:h-[100px] lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 lg:m-0 font-montserrat font-bold text-[40px] leading-[50px] tracking-[0.2px] text-[#252B42]">
                <span className="block text-left w-full whitespace-nowrap">We help small businesses</span>
                <span className="block text-center w-full">with big ideas</span>
              </h2>
            </div>
          </div>
          {/* 2. Row */}
          <div
            className="w-[329px] h-[1119px] flex flex-col justify-center items-center gap-[30px] bg-transparent
            lg:w-[985px] lg:h-[403px] lg:flex-row lg:items-center lg:justify-between lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:bottom-[112px] lg:mt-[80px] lg:gap-0 lg:bg-transparent"
            style={{ zIndex: 1 }}
          >
            {/* 1. col-md-4 */}
            <ContactCard
              icon={<img src={TelefonIcon} alt="Telefon" style={{width:72, height:72}} />}
              
              emails={["georgia.young@example.com", "georgia.young@ple.com"]}
              title="Get Support"
              buttonText="Submit Request"
              bg="bg-white"
              width="w-[327px] lg:w-[327px]"
              height="h-[343px] lg:h-[343px]"
            />
            {/* 2. col-md-4 */}
            <ContactCard
              icon={<img src={KonumIcon} alt="Konum" style={{width:51, height:67}} />}
              
              emails={["georgia.young@example.com", "georgia.young@ple.com"]}
              title="Get Support"
              buttonText="Submit Request"
              bg="bg-[#252B42]"
              width="w-[329px] lg:w-[329px]"
              height="h-[403px] lg:h-[403px]"
              textColor="text-white"
              paddingY="pt-[80px] pb-[80px]"
            />
            {/* 3. col-md-4 */}
            <ContactCard
              icon={
                <>
                  {/* Mobilde eski ikon */}
                  <span className="block lg:hidden">
                    <img src={dm} alt="Mektup" style={{width:72, height:72}} />
                  </span>
                  {/* Desktopta yeni ikon */}
                  <span className="hidden lg:block">
                    <img src={MektupIcon} alt="Mektup" style={{width:72, height:55}} />
                  </span>
                </>
              }
              emails={["georgia.young@example.com", "georgia.young@ple.com"]}
              title="Get Support"
              buttonText="Submit Request"
              width="w-[329px] lg:w-[329px]"
              height="h-[343px] lg:h-[343px]"
              paddingY="pt-[50px] pb-[50px]"
            />
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <div className="w-[414px] h-[440px] relative bg-white mx-auto lg:w-[1440px] lg:h-[348px] lg:mx-auto lg:opacity-100">
        {/* Arrow İkonu */}
        <div className="flex justify-center items-center w-full mt-[30px] lg:mt-0">
          <img src={Arrow2} alt="Arrow" width={62} height={62} />
        </div>
        {/* CTA Container */}
        <div
          className="absolute left-[47px] top-0 flex flex-col w-[321px] h-[440px] pt-[112px] pb-[112px] gap-[96px] opacity-100 lg:w-[1050px] lg:h-[348px] lg:left-[195px] lg:pt-[80px] lg:pb-[80px] lg:gap-[96px] lg:flex-row lg:items-center lg:justify-center"
        >
          {/* Row */}
          <div
            className="flex flex-col w-[321px] h-[216px] gap-[36px] opacity-100 lg:w-[607px] lg:h-[188px] lg:gap-[36px] lg:flex-row lg:items-center lg:justify-center"
          >
            {/* Main Content */}
            <div
              className="flex flex-col items-center w-[321px] h-[216px] gap-[30px] opacity-100 lg:w-[272px] lg:h-[188px] lg:gap-[16px] lg:items-center lg:justify-center"
            >
              {/* h6 */}
              <div className="w-full flex justify-center items-center">
                <h6
                  className="w-[321px] h-[24px] font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#252B42] text-center lg:w-[272px]"
                >
                  WE Can't WAIT TO MEET YOU
                </h6>
              </div>
              {/* h2 */}
              <h2
                className="w-[272px] h-[80px] font-montserrat font-bold text-[58px] leading-[80px] tracking-[0.2px] text-[#252B42] text-center whitespace-nowrap lg:w-[272px] lg:h-[80px] lg:text-left"
                style={{margin:0}}
              >
                Let’s Talk
              </h2>
              {/* Button */}
              <button
                className="w-[186px] h-[52px] flex items-center justify-center gap-[10px] px-[40px] py-[15px] rounded-[5px] bg-[#23A6F0] border-none cursor-pointer lg:w-[186px] lg:h-[52px]"
              >
                <span
                  className="w-[106px] h-[22px] font-montserrat font-bold text-[14px] leading-[22px] tracking-[0.2px] text-white text-center whitespace-nowrap lg:w-[106px] lg:h-[22px]"
                >
                  Try it free now
                </span>
              </button>
            </div>
            {/* ... Diğer içerikler buraya eklenebilir ... */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

