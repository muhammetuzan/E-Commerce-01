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
  <div className="w-[387px] h-[440px] bg-[#FFFFFF] mt-auto relative md:w-[632px] md:h-[612px]">
    {/* Daireler */}
    <div className="w-[9px] h-[9px] bg-[#977DF4] rounded-full absolute top-[285px] left-[19px] md:w-[15px] md:h-[15px] md:top-[409px] md:left-[24px]"></div>
    <div className="w-[9px] h-[9px] bg-[#977DF4] rounded-full absolute top-[110px] left-[356px] md:w-[15px] md:h-[15px] md:top-[122px] md:left-[577px]"></div>
    <div className="w-[18px] h-[18px] bg-[#FFE9EA] rounded-full absolute top-[187px] left-[343px] md:w-[30px] md:h-[30px] md:top-[248px] md:left-[554px]"></div>
    <div className="w-[47px] h-[47px] bg-[#FFE9EA] rounded-full absolute top-[43px] left-[4px] md:w-[77px] md:h-[77px] md:top-[12px]"></div>
    <div className="w-[296px] h-[296px] bg-[#FFE9EA] rounded-full absolute top-[35px] left-[40px] md:w-[484px] md:h-[484px] md:left-[58px]"></div>
    {/* Resim */}
    <img 
      src={imgSrc}
      alt={imgAlt}
      className={`absolute object-cover w-[376px] h-[439px] top-[1px] left-[11px] opacity-100 md:w-[571px] md:h-[826px] md:top-[-20px] md:left-[34px] ${imgClassName}`}
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
        className="w-[414px] h-[1080px] bg-white flex flex-col items-center mx-auto md:w-[1440px] md:h-[800px] md:relative"
      >
        {/*Content alanı */}
        <div
          className="w-[414px] h-[590px] bg-[#FFFFFF] flex flex-col items-center justify-between py-8 md:w-[599px] md:h-[518px] md:absolute md:left-[195px] md:top-[120px] md:gap-[35px] md:p-0 md:py-0 md:items-start">
          {/* Başlık: CONTACT US */}
          <h5
            className="w-[108px] h-[24px] text-[#252B42] font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] whitespace-nowrap md:mx-0 md:text-left md:w-auto">CONTACT US
          </h5>
          {/* Alt başlık: Get in touch today! */}
          <h1 className="w-[331px] h-[100px] mx-auto text-[#252B42] font-montserrat font-bold text-[40px] leading-[50px] tracking-[0.2px] text-center md:w-[378px] md:h-[160px] md:text-[58px] md:leading-[80px] md:text-left md:mx-0 md:mt-0">
            Get in touch today!
          </h1>
          {/* Açıklama metni */}
          <h4 className="w-full max-w-[400px] h-auto mx-auto text-[#737373] font-montserrat font-normal text-[20px] leading-[30px] tracking-[0.2px] text-center md:text-left md:mx-0 md:mt-0">
            <span className="block md:hidden">We know how large <br />objects will act, but things <br />on a small scale just do <br />not act that way.</span>
            <span className="hidden md:block">We know how large objects will act,<br/>but things on a small scale</span>
          </h4>
          {/* Numbers alanı */}
          <div className="w-[242px] h-[84px] flex flex-col items-center justify-center md:items-start md:mt-0">
            <div className="w-full h-[32px] text-[#252B42] font-montserrat font-bold text-[24px] leading-[32px] tracking-[0.1px] text-center whitespace-nowrap md:text-left">
              Phone : +451 215 215
            </div>
            <div className="w-full h-[32px] text-[#252B42] font-montserrat font-bold text-[24px] leading-[32px] tracking-[0.1px] text-center mt-2 whitespace-nowrap md:text-left md:mt-[20px]">
              Fax : +451 215 215
            </div>
          </div>
          {/* Sosyal medya ikonları alanı */}
          <div className="w-[242px] h-[50px] flex items-center justify-center gap-[34px] px-[10px] md:justify-start md:ml-0">
            <FaTwitter size={30} color="#252B42" />
            <FaFacebookF size={30} color="#252B42" />
            <FaInstagram size={30} color="#252B42" />
            <FaLinkedin size={30} color="#252B42" />
          </div>
        </div>
        {/* Alttan başlayan none bölümü */}
        <div className="w-[387px] h-[440px] bg-[#FFFFFF] mt-auto relative md:w-[632px] md:h-[612px] md:absolute md:left-[742px] md:top-[20px]">
          <AboutNoneBg />
        </div>
      </div>
      {/* Visit Our Office bölümü */}
      <div className="w-[414px] h-[1531px] bg-[#FAFAFA] flex flex-col items-center mx-auto md:w-[1440px] md:h-[814px] md:bg-[#ffffff] md:mx-auto md:flex md:flex-col md:items-center md:justify-center md:relative md:opacity-100">
        {/* Container */}
        <div className="w-[329px] h-[1453px] mt-[30px] flex flex-col gap-[60px] pt-[45px] pb-[45px]
          md:w-[1050px] md:h- [841px] md:gap-[80px] md:pt-0 md:pb-0    md:mt-0 md:relative md:opacity-100">
          {/* 1. Row */}
          <div className="w-[310px] h-[184px] flex flex-col items-center gap-[10px] mx-auto
            md:w-[633px] md:h-[134px] md:mt-[82px] md:mx-auto md:items-center md:justify-start md:gap-0 md:relative">
            {/* Kutu */}
            <div className="w-[301px] h-[184px] flex flex-col items-center
              md:w-[625px] md:h-[134px] md:gap-[10px] md:justify-between md:items-center md:mx-auto md:relative md:opacity-100">
              {/* Üstte ortalanmış h6 */}
              <h6 className="w-[132px] h-[24px] mx-auto text-[#252B42] font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center whitespace-nowrap md:absolute md:top-0 md:left-1/2 md:-translate-x-1/2 md:flex md:items-center md:justify-center">
                VISIT OUR OFFICE
              </h6>
              {/* Altında ortalanmış h2 */}
              {/* Mobile h2 */}
              <h2 className="font-montserrat font-bold text-[40px] leading-[50px] tracking-[0.2px] text-center mt-6 md:hidden text-[#252B42]">
                <span className="block whitespace-nowrap">We help small</span>
                <span className="block whitespace-nowrap">businesses</span>
                <span className="block whitespace-nowrap">with big ideas</span>
              </h2>
              {/* Desktop h2 */}
              <h2 className="hidden md:block md:w-[531px] md:h-[100px] md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:m-0 font-montserrat font-bold text-[40px] leading-[50px] tracking-[0.2px] text-[#252B42]">
                <span className="block text-left w-full whitespace-nowrap">We help small businesses</span>
                <span className="block text-center w-full">with big ideas</span>
              </h2>
            </div>
          </div>
          {/* 2. Row */}
          <div
            className="w-[329px] h-[1119px] flex flex-col justify-center items-center gap-[30px] bg-transparent
            md:w-[985px] md:h-[403px] md:flex-row md:items-center md:justify-between md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-[112px] md:mt-[80px] md:gap-0 md:bg-transparent"
            style={{ zIndex: 1 }}
          >
            {/* 1. col-md-4 */}
            <ContactCard
              icon={<img src={TelefonIcon} alt="Telefon" style={{width:72, height:72}} />}
              
              emails={["georgia.young@example.com", "georgia.young@ple.com"]}
              title="Get Support"
              buttonText="Submit Request"
              bg="bg-white"
              width="w-[327px] md:w-[327px]"
              height="h-[343px] md:h-[343px]"
            />
            {/* 2. col-md-4 */}
            <ContactCard
              icon={<img src={KonumIcon} alt="Konum" style={{width:51, height:67}} />}
              
              emails={["georgia.young@example.com", "georgia.young@ple.com"]}
              title="Get Support"
              buttonText="Submit Request"
              bg="bg-[#252B42]"
              width="w-[329px] md:w-[329px]"
              height="h-[403px] md:h-[403px]"
              textColor="text-white"
              paddingY="pt-[80px] pb-[80px]"
            />
            {/* 3. col-md-4 */}
            <ContactCard
              icon={
                <>
                  {/* Mobilde eski ikon */}
                  <span className="block md:hidden">
                    <img src={dm} alt="Mektup" style={{width:72, height:72}} />
                  </span>
                  {/* Desktopta yeni ikon */}
                  <span className="hidden md:block">
                    <img src={MektupIcon} alt="Mektup" style={{width:72, height:55}} />
                  </span>
                </>
              }
              emails={["georgia.young@example.com", "georgia.young@ple.com"]}
              title="Get Support"
              buttonText="Submit Request"
              width="w-[329px] md:w-[329px]"
              height="h-[343px] md:h-[343px]"
              paddingY="pt-[50px] pb-[50px]"
            />
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <div className="w-[414px] h-[440px] relative bg-white mx-auto md:w-[1440px] md:h-[348px] md:mx-auto md:opacity-100">
        {/* Arrow İkonu */}
        <div className="flex justify-center items-center w-full mt-[30px] md:mt-0">
          <img src={Arrow2} alt="Arrow" width={62} height={62} />
        </div>
        {/* CTA Container */}
        <div
          className="absolute left-[47px] top-0 flex flex-col w-[321px] h-[440px] pt-[112px] pb-[112px] gap-[96px] opacity-100 md:w-[1050px] md:h-[348px] md:left-[195px] md:pt-[80px] md:pb-[80px] md:gap-[96px] md:flex-row md:items-center md:justify-center"
        >
          {/* Row */}
          <div
            className="flex flex-col w-[321px] h-[216px] gap-[36px] opacity-100 md:w-[607px] md:h-[188px] md:gap-[36px] md:flex-row md:items-center md:justify-center"
          >
            {/* Main Content */}
            <div
              className="flex flex-col items-center w-[321px] h-[216px] gap-[30px] opacity-100 md:w-[272px] md:h-[188px] md:gap-[16px] md:items-center md:justify-center"
            >
              {/* h6 */}
              <div className="w-full flex justify-center items-center">
                <h6
                  className="w-[321px] h-[24px] font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#252B42] text-center md:w-[272px]"
                >
                  WE Can't WAIT TO MEET YOU
                </h6>
              </div>
              {/* h2 */}
              <h2
                className="w-[272px] h-[80px] font-montserrat font-bold text-[58px] leading-[80px] tracking-[0.2px] text-[#252B42] text-center whitespace-nowrap md:w-[272px] md:h-[80px] md:text-left"
                style={{margin:0}}
              >
                Let’s Talk
              </h2>
              {/* Button */}
              <button
                className="w-[186px] h-[52px] flex items-center justify-center gap-[10px] px-[40px] py-[15px] rounded-[5px] bg-[#23A6F0] border-none cursor-pointer md:w-[186px] md:h-[52px]"
              >
                <span
                  className="w-[106px] h-[22px] font-montserrat font-bold text-[14px] leading-[22px] tracking-[0.2px] text-white text-center whitespace-nowrap md:w-[106px] md:h-[22px]"
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

