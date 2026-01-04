import React from "react";
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
            {/* Twitter */}
            <svg className="w-[30px] h-[30px] text-[#252B42]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.46 5.924c-.793.352-1.645.59-2.54.697a4.48 4.48 0 0 0 1.965-2.475a8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 11.07 9.03a12.72 12.72 0 0 1-9.24-4.685a4.48 4.48 0 0 0 1.39 5.98a4.44 4.44 0 0 1-2.03-.56v.057a4.48 4.48 0 0 0 3.6 4.39a4.52 4.52 0 0 1-2.02.077a4.48 4.48 0 0 0 4.18 3.11A8.98 8.98 0 0 1 2 19.54a12.67 12.67 0 0 0 6.88 2.02c8.26 0 12.78-6.84 12.78-12.77c0-.19-.01-.38-.02-.57a9.22 9.22 0 0 0 2.26-2.35z"/>
            </svg>
            {/* Facebook */}
            <svg className="w-[30px] h-[30px] text-[#252B42]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788c1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
            </svg>
            {/* Instagram */}
            <svg className="w-[30px] h-[30px] text-[#252B42]" fill="none" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="#252B42" strokeWidth="2"/>
              <circle cx="12" cy="12" r="6" stroke="#252B42" strokeWidth="2"/>
              <circle cx="18" cy="6" r="1.5" fill="#252B42"/>
            </svg>
            {/* LinkedIn */}
            <svg className="w-[30px] h-[30px] text-[#252B42]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5zM7.12 20.452H3.56V9.048h3.56v11.404zM5.34 7.633a2.062 2.062 0 1 1 0-4.124a2.062 2.062 0 0 1 0 4.124zM20.452 20.452h-3.56v-5.604c0-1.336-.025-3.057-1.865-3.057c-1.867 0-2.153 1.457-2.153 2.963v5.698h-3.56V9.048h3.418v1.561h.049c.477-.9 1.637-1.85 3.37-1.85c3.602 0 4.267 2.37 4.267 5.455v6.238z"/>
            </svg>
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
              icon={
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M55.7357 38.9947C55.3842 38.6426 54.9667 38.3632 54.5071 38.1726C54.0475 37.982 53.5548 37.8839 53.0573 37.8839C52.5597 37.8839 52.0671 37.982 51.6075 38.1726C51.1479 38.3632 50.7304 38.6426 50.3789 38.9947L44.3402 45.0334C41.5406 44.1999 36.3164 42.3057 33.0053 38.9947C29.6943 35.6836 27.8001 30.4594 26.9666 27.6598L33.0053 21.6211C33.3574 21.2696 33.6368 20.8521 33.8274 20.3925C34.018 19.9329 34.1161 19.4403 34.1161 18.9427C34.1161 18.4452 34.018 17.9525 33.8274 17.4929C33.6368 17.0333 33.3574 16.6159 33.0053 16.2643L17.8517 1.11076C17.5002 0.758646 17.0827 0.479298 16.6231 0.288701C16.1635 0.0981045 15.6709 0 15.1733 0C14.6758 0 14.1831 0.0981045 13.7235 0.288701C13.264 0.479298 12.8465 0.758646 12.4949 1.11076L2.22082 11.3849C0.78123 12.8245 -0.0294868 14.802 0.000820357 16.8212C0.0879534 22.2159 1.51618 40.9533 16.2833 55.7204C31.0505 70.4876 49.7879 71.912 55.1864 72.003H55.2924C57.2927 72.003 59.1831 71.215 60.6151 69.783L70.8892 59.5088C71.2414 59.1573 71.5207 58.7398 71.7113 58.2802C71.9019 57.8207 72 57.328 72 56.8304C72 56.3329 71.9019 55.8402 71.7113 55.3807C71.5207 54.9211 71.2414 54.5036 70.8892 54.1521L55.7357 38.9947ZM55.2545 64.4224C50.5266 64.3428 34.3502 63.0737 21.6401 50.3599C8.88839 37.6081 7.65338 21.3749 7.57761 16.7417L15.1733 9.14594L24.9701 18.9427L20.0717 23.8411C19.6264 24.2861 19.2991 24.835 19.1191 25.4382C18.9392 26.0414 18.9125 26.68 19.0413 27.2961C19.1322 27.7318 21.356 38.0627 27.6447 44.3515C33.9335 50.6402 44.2644 52.864 44.7001 52.9549C45.3159 53.0874 45.9551 53.0627 46.5588 52.8833C47.1626 52.7039 47.7116 52.3755 48.1551 51.9283L53.0573 47.0299L62.8541 56.8267L55.2545 64.4224Z" fill="#23A6F0"/>
                </svg>
              }
              emails={["georgia.young@example.com", "georgia.young@ple.com"]}
              title="Get Support"
              buttonText="Submit Request"
              bg="bg-white"
              width="w-[327px] md:w-[327px]"
              height="h-[343px] md:h-[343px]"
            />
            {/* 2. col-md-4 */}
            <ContactCard
              icon={
                <svg width="51" height="67" viewBox="0 0 51 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25.5 0C11.4168 0 0 11.3074 0 25.2559C0 29.9206 0.921868 34.7384 3.56734 38.2109L25.5 67L47.4327 38.2109C49.8356 35.0569 51 29.4811 51 25.2559C51.0001 11.3074 39.5833 0 25.5 0ZM25.5 14.6276C31.4257 14.6276 36.231 19.3869 36.231 25.2558C36.231 31.1248 31.4257 35.8841 25.5 35.8841C19.5743 35.8841 14.7691 31.1248 14.7691 25.2559C14.7691 19.3869 19.5743 14.6276 25.5 14.6276Z" fill="#23A6F0"/>
                </svg>
              }
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
                    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M69.8484 2.16199C69.4592 1.75903 68.9674 1.48003 68.4308 1.35781C67.8943 1.23558 67.3354 1.27521 66.8198 1.47202L3.3615 25.4708C2.81422 25.6867 2.34305 26.0706 2.01056 26.5716C1.67807 27.0726 1.5 27.6669 1.5 28.2756C1.5 28.8844 1.67807 29.4787 2.01056 29.9797C2.34305 30.4807 2.81422 30.8646 3.3615 31.0805L31.0524 42.5999L42.1287 71.3984C42.3368 71.9426 42.6935 72.4115 43.1549 72.7473C43.6162 73.0832 44.1619 73.2712 44.7248 73.2883C45.3077 73.2759 45.8733 73.08 46.347 72.7266C46.8207 72.3732 47.1804 71.8787 47.3785 71.3084L70.4542 5.31183C70.6507 4.78108 70.6981 4.20317 70.5909 3.64548C70.4836 3.08779 70.2261 2.5733 69.8484 2.16199ZM44.7248 61.8889L36.6771 40.89L50.4937 26.5207L46.4266 22.291L32.4946 36.7802L12.4187 28.2906L62.9834 9.30162L44.7248 61.8889Z" fill="#23A6F0"/>
                    </svg>
                  </span>
                  {/* Desktopta yeni ikon */}
                  <span className="hidden md:block">
                    <svg width="72" height="55" viewBox="0 0 72 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0.225 7.12708C0.678682 5.10236 1.79395 3.29456 3.38815 1.99975C4.98235 0.704934 6.96098 -0.000139766 9 2.07815e-08H63C65.039 -0.000139766 67.0177 0.704934 68.6118 1.99975C70.206 3.29456 71.3213 5.10236 71.775 7.12708L36 29.3975L0.225 7.12708ZM0 12.3612V44.9212L26.1135 28.6137L0 12.3612ZM30.4245 31.3042L0.8595 49.7612C1.58997 51.3301 2.74287 52.6553 4.18402 53.5827C5.62516 54.5102 7.29529 55.0017 9 55H63C64.7044 55.0004 66.3739 54.5078 67.8143 53.5796C69.2546 52.6513 70.4065 51.3256 71.136 49.7567L41.571 31.2996L36 34.7692L30.4245 31.2996V31.3042ZM45.8865 28.6183L72 44.9212V12.3612L45.8865 28.6137V28.6183Z" fill="#23A6F0"/>
                    </svg>
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
        {/* Arrow SVG */}
        <div className="flex justify-center items-center w-full mt-[30px] md:mt-0">
          <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M43.538 60.7014C44.2041 61.5825 45.4584 61.7567 46.3395 61.0905L60.6973 50.2345C61.5784 49.5683 61.7526 48.314 61.0864 47.433C60.4202 46.5519 59.1659 46.3777 58.2849 47.0439L45.5224 56.6937L35.8726 43.9312C35.2064 43.0501 33.9521 42.8759 33.071 43.5421C32.19 44.2083 32.0158 45.4625 32.6819 46.3436L43.538 60.7014ZM3.57179e-05 3.9912C12.7638 4.84202 21.7214 8.74474 28.034 13.9941C34.3611 19.2556 38.1679 25.9844 40.425 32.6953C42.6849 39.4147 43.3711 46.0603 43.4853 51.0488C43.5423 53.5373 43.4567 55.5984 43.3578 57.0301C43.3083 57.7457 43.2556 58.3029 43.2159 58.6766C43.196 58.8634 43.1794 59.0042 43.1682 59.0959C43.1625 59.1417 43.1582 59.1752 43.1555 59.1961C43.1541 59.2065 43.1531 59.2137 43.1526 59.2178C43.1523 59.2198 43.1522 59.221 43.1521 59.2214C43.1521 59.2215 43.1521 59.2212 43.1521 59.2213C43.1522 59.2208 43.1523 59.2201 45.1333 59.4952C47.1143 59.7703 47.1144 59.7692 47.1146 59.7678C47.1147 59.7671 47.1149 59.7656 47.1151 59.7641C47.1155 59.7612 47.116 59.7575 47.1166 59.753C47.1179 59.7439 47.1195 59.7316 47.1215 59.716C47.1256 59.6849 47.1313 59.6409 47.1382 59.5845C47.1521 59.4716 47.1712 59.3088 47.1935 59.0992C47.238 58.6802 47.2952 58.0738 47.3482 57.306C47.4543 55.771 47.5445 53.5859 47.4843 50.9572C47.3641 45.7114 46.644 38.6383 44.2163 31.4202C41.7858 24.1937 37.6238 16.7664 30.5915 10.9186C23.5447 5.05867 13.7523 0.899035 0.266082 5.55558e-05L3.57179e-05 3.9912Z" fill="#23A6F0"/>
          </svg>
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

